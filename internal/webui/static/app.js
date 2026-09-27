// MeshDrop Web UI.
// CSP (default-src 'self') のためインライン script/style は使わない。
// ピア・ファイル名・エラー文はネットワーク由来なので HTML 文字列として挿入せず、
// el() で DOM を組み立ててテキストノードとして入れる。
'use strict';

// el はタグ名・クラス・子（文字列はテキストノード扱い）から要素を作る。
function el(tag, className, ...children) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  for (const c of children) {
    if (c == null || c === '') continue;
    e.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return e;
}

const dropZone  = document.getElementById('drop-zone');
const dropLabel = document.getElementById('drop-label');
const fileInput = document.getElementById('file-input');
const dirInput  = document.getElementById('dir-input');
const peersEl   = document.getElementById('peers');
const sendBtn   = document.getElementById('send-btn');
const eventsEl  = document.getElementById('events');
const logCard   = document.getElementById('log-card');
const selName   = document.getElementById('selected-name');
const progWrap  = document.getElementById('progress-wrap');
const progBar   = document.getElementById('progress-bar');
const progLabel = document.getElementById('progress-label');

let sendMode     = 'file';   // 'file' | 'dir'
let selectedFile = null;
let selectedFiles = [];      // dir mode
let selectedPaths = [];      // dir mode relative paths (parallel to selectedFiles)
let selectedPeer = null;
let activeSendId = null;

// Mode toggle
document.getElementById('mode-file').addEventListener('click', () => setMode('file'));
document.getElementById('mode-dir').addEventListener('click',  () => setMode('dir'));

function setMode(m) {
  sendMode = m;
  document.getElementById('mode-file').classList.toggle('active', m === 'file');
  document.getElementById('mode-dir').classList.toggle('active',  m === 'dir');
  dropLabel.textContent = m === 'dir' ? 'Drop folder here' : 'Drop file here';
  selectedFile = null; selectedFiles = []; selectedPaths = [];
  selName.textContent = '';
  updateBtn();
}

// Recursive directory reader for drag-and-drop
async function readEntry(entry, prefix) {
  if (entry.isFile) {
    return new Promise(resolve => entry.file(f => resolve([{ file: f, path: prefix + f.name }])));
  }
  const reader = entry.createReader();
  let all = [];
  for (;;) {
    const batch = await new Promise(resolve => reader.readEntries(resolve));
    if (!batch.length) break;
    all = all.concat(batch);
  }
  const nested = await Promise.all(all.map(e => readEntry(e, prefix + entry.name + '/')));
  return nested.flat();
}

dropZone.addEventListener('click', () => sendMode === 'dir' ? dirInput.click() : fileInput.click());
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('over'));
dropZone.addEventListener('drop', async e => {
  e.preventDefault(); dropZone.classList.remove('over');
  if (sendMode === 'dir') {
    const items = Array.from(e.dataTransfer.items || []);
    const entries = items.map(it => it.webkitGetAsEntry()).filter(Boolean);
    const results = (await Promise.all(entries.map(en => readEntry(en, '')))).flat();
    if (results.length) setDirFiles(results.map(r => r.file), results.map(r => r.path));
  } else {
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  }
});
fileInput.addEventListener('change', () => { if (fileInput.files[0]) setFile(fileInput.files[0]); });
dirInput.addEventListener('change', () => {
  const files = Array.from(dirInput.files);
  if (files.length) setDirFiles(files, files.map(f => f.webkitRelativePath || f.name));
});

function setFile(f) {
  selectedFile = f;
  selName.textContent = `${f.name}  (${fmtSize(f.size)})`;
  updateBtn();
}

function setDirFiles(files, paths) {
  const roots = new Set(paths.map(p => {
    const clean = p.replace(/^\/+|\/+$/g, '');
    const slash = clean.indexOf('/');
    return slash > 0 ? clean.slice(0, slash) : '';
  }));
  if (roots.size !== 1 || roots.has('')) {
    alert('Please select or drop one directory at a time.');
    selectedFiles = []; selectedPaths = [];
    selName.textContent = '';
    updateBtn();
    return;
  }
  selectedFiles = files;
  selectedPaths = paths;
  const total = files.reduce((s, f) => s + f.size, 0);
  selName.textContent = `${files.length} file(s)  (${fmtSize(total)})`;
  updateBtn();
}

function fmtSize(b) {
  if (b < 1024) return b + ' B';
  if (b < 1<<20) return (b/1024).toFixed(1) + ' KB';
  if (b < 1<<30) return (b/(1<<20)).toFixed(1) + ' MB';
  return (b/(1<<30)).toFixed(2) + ' GB';
}

function updateBtn() {
  const hasSelection = sendMode === 'dir' ? selectedFiles.length > 0 : selectedFile != null;
  sendBtn.disabled = !(hasSelection && selectedPeer) || activeSendId != null;
}

async function loadPeers() {
  try {
    const res = await fetch('/api/peers');
    const peers = await res.json();
    document.getElementById('refresh-hint').textContent = '(auto-refresh 3s)';
    if (!peers.length) {
      peersEl.replaceChildren(el('div', 'empty', 'No peers found — is receiver running?'));
      selectedPeer = null; updateBtn(); return;
    }
    const prev = selectedPeer;
    peersEl.replaceChildren();
    peers.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'peer-btn' + (prev === p.addr ? ' selected' : '');
      btn.append(el('span', 'dot'), String(p.name), el('span', 'peer-addr', p.addr));
      btn.addEventListener('click', () => {
        document.querySelectorAll('.peer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedPeer = p.addr;
        updateBtn();
      });
      peersEl.appendChild(btn);
      if (prev === p.addr) selectedPeer = p.addr;
    });
    updateBtn();
  } catch { document.getElementById('refresh-hint').textContent = '(error)'; }
}
loadPeers();
setInterval(loadPeers, 3000);

// SSE — progress (#238)
const sse = new EventSource('/sse/progress');
sse.onmessage = e => {
  const ev = JSON.parse(e.data);
  // Receive events arrive regardless of activeSendId
  if (ev.direction === 'recv' && ev.done) {
    addEntry(ev);
    return;
  }
  if (ev.id !== activeSendId) return;
  if (ev.done) {
    progWrap.classList.add('hidden');
    activeSendId = null;
    sendBtn.textContent = 'Send';
    updateBtn();
    const pending = eventsEl.querySelector(`[data-id="${CSS.escape(String(ev.id))}"]`);
    if (pending) pending.remove();
    addEntry(ev);
  } else if (ev.total > 0) {
    const pct = Math.min(99, Math.round(ev.sent / ev.total * 100));
    progBar.value = pct;
    progLabel.textContent = pct + '%  —  ' + fmtSize(ev.sent) + ' / ' + fmtSize(ev.total);
  }
};

// History: load on page start (#240)
async function loadHistory() {
  try {
    const res = await fetch('/api/history');
    const entries = await res.json();
    if (entries && entries.length) {
      logCard.classList.remove('hidden');
      entries.forEach(e => addEntry({ id: e.id, direction: e.direction, file: e.file, peer: e.peer, done: true, error: e.error }));
    }
  } catch {}
}
loadHistory();

function addEntry(ev) {
  logCard.classList.remove('hidden');
  const ok = !ev.error;
  const isRecv = ev.direction === 'recv';
  const icon = ok ? (isRecv ? '⬇' : '⬆') : '✗';
  const arrow = isRecv ? '←' : '→';
  let dlLink = null;
  if (ok && isRecv) {
    dlLink = el('a', 'dl-link', 'Download');
    dlLink.href = '/api/downloads/' + encodeURIComponent(ev.id);
    dlLink.download = String(ev.file);
  }
  const div = el('div', 'event ' + (ok ? 'ok' : 'err'),
    el('span', 'icon', icon),
    el('span', null, ev.file, ' ', el('span', 'muted', arrow + ' ' + ev.peer),
      ev.error ? ' — ' + ev.error : '', dlLink));
  div.dataset.id = ev.id;
  eventsEl.prepend(div);
}

sendBtn.addEventListener('click', async () => {
  const isDir = sendMode === 'dir';
  if ((!isDir && !selectedFile) || (isDir && !selectedFiles.length) || !selectedPeer || activeSendId != null) return;

  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending…';
  progBar.value = 0;
  progLabel.textContent = '0%';
  progWrap.classList.remove('hidden');

  const form = new FormData();
  form.append('peer', selectedPeer);
  form.append('compress', document.getElementById('opt-compress').checked ? 'true' : 'false');
  form.append('compress_level', document.getElementById('opt-level').value);
  form.append('rate_limit', document.getElementById('opt-rate').value.trim());

  let displayName, endpoint;
  if (isDir) {
    selectedFiles.forEach(f => form.append('files', f));
    form.append('paths', JSON.stringify(selectedPaths));
    const total = selectedFiles.reduce((s, f) => s + f.size, 0);
    // derive directory name from first path
    const firstPath = selectedPaths[0] || '';
    const slash = firstPath.indexOf('/');
    displayName = slash > 0 ? firstPath.slice(0, slash) : firstPath || 'directory';
    endpoint = '/api/send-dir';
    // inject total as hidden meta for the progress label
    form.append('_total_hint', String(total));
  } else {
    form.append('file', selectedFile);
    displayName = selectedFile.name;
    endpoint = '/api/send';
  }

  const pendingId = 'pending-' + Date.now();
  logCard.classList.remove('hidden');
  const pendingDiv = el('div', 'event pending',
    el('span', 'icon', '⏳'),
    el('span', null, displayName, ' ', el('span', 'muted', '→ ' + selectedPeer)));
  pendingDiv.dataset.id = pendingId;
  eventsEl.prepend(pendingDiv);

  try {
    const res = await fetch(endpoint, { method: 'POST', body: form });
    if (!res.ok) {
      const txt = await res.text();
      progWrap.classList.add('hidden');
      pendingDiv.remove();
      addEntry({ id: pendingId, direction: 'send', file: displayName, peer: selectedPeer, done: true, error: txt });
      sendBtn.textContent = 'Send';
      updateBtn();
      return;
    }
    const { id } = await res.json();
    activeSendId = id;
    pendingDiv.setAttribute('data-id', id);
  } catch (err) {
    progWrap.classList.add('hidden');
    pendingDiv.remove();
    addEntry({ id: pendingId, direction: 'send', file: displayName, peer: selectedPeer, done: true, error: err.message });
    sendBtn.textContent = 'Send';
    activeSendId = null;
    updateBtn();
  }
});
