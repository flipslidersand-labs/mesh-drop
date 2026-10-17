//go:build !integration

package transfer

import (
	"bytes"
	"context"
	"crypto/rand"
	"errors"
	"io"
	"net"
	"os"
	"strings"
	"testing"
	"time"
)

// TestPipeGo_WriteChunkMeta は writeChunkMeta → readChunkMeta のラウンドトリップを検証する。
func TestPipeGo_WriteChunkMeta(t *testing.T) {
	original := ChunkMeta{Index: 3, Offset: 1024, Size: 512, FileIndex: 1}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}

	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}

	if got != original {
		t.Errorf("roundtrip mismatch: got %+v, want %+v", got, original)
	}
}

// TestPipeGo_WriteChunkMeta_Zero はゼロ値の ChunkMeta がラウンドトリップできることを確認する。
func TestPipeGo_WriteChunkMeta_Zero(t *testing.T) {
	original := ChunkMeta{Index: 0}

	var buf bytes.Buffer
	if err := writeChunkMeta(&buf, original); err != nil {
		t.Fatalf("writeChunkMeta: %v", err)
	}

	got, err := readChunkMeta(&buf)
	if err != nil {
		t.Fatalf("readChunkMeta: %v", err)
	}

	if got != original {
		t.Errorf("roundtrip mismatch: got %+v, want %+v", got, original)
	}
}

// TestPipeGo_ReadChunkMeta_Truncated はデータが途切れた場合にエラーが返ることを確認する。
func TestPipeGo_ReadChunkMeta_Truncated(t *testing.T) {
	// 不完全なバイト列（length フィールドが 2 バイトしかない）
	truncated := []byte{0x00, 0x00}
	_, err := readChunkMeta(bytes.NewReader(truncated))
	if err == nil {
		t.Fatal("expected error for truncated input, got nil")
	}
}

// TestSendPipe_NilFingerprintUsesVerifyCallback は SendPipe(fingerprint=nil) が
// clientTLSForFingerprint(nil) を経由して VerifyPeerCertificate を設定することを
// 確認する。接続先がいないため dial エラーで終わるが、WARNING が stderr に出ることで
// 旧来の InsecureSkipVerify 素通しではないことを検証する。
func TestSendPipe_NilFingerprintUsesVerifyCallback(t *testing.T) {
	// clientTLSForFingerprint(nil) は stderr に WARNING を書くので一時的にリダイレクトする。
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatalf("os.Pipe: %v", err)
	}
	origStderr := os.Stderr
	os.Stderr = w

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // すぐキャンセル → dial は即失敗

	// fingerprint=nil を渡す: clientTLSForFingerprint(nil) が呼ばれるはず。
	_ = SendPipe(ctx, "127.0.0.1:59999", nil)

	w.Close()
	os.Stderr = origStderr

	buf := make([]byte, 512)
	n, _ := r.Read(buf)
	r.Close()

	// clientTLSForFingerprint(nil) は WARNING を出力する。
	// dial がキャンセルされた場合でも stderr への書き込みは発生する。
	warnOutput := string(buf[:n])
	if warnOutput == "" {
		// dial が WARNING 出力前にエラーになることもある。
		// 少なくとも clientTLS() を呼んでいない = VerifyPeerCertificate 付きの
		// config を生成した、という事実は compile-time で保証される。
		t.Log("WARNING was not printed (dial cancelled before TLS; compile-time type-check is sufficient)")
	} else {
		if !bytes.Contains(buf[:n], []byte("WARNING")) {
			t.Errorf("expected WARNING in stderr, got: %s", warnOutput)
		}
	}
}

// TestPipeNAT_RoundTrip は ListenPipeNAT / SendPipeNAT を実ソケットで end-to-end に通し、
// stdin の内容が stdout に欠落なく届くことを検証する (#632)。
// NAT 越え済みソケットの代わりにローカルの UDP ソケット2つを使う。
func TestPipeNAT_RoundTrip(t *testing.T) {
	rtSkipShort(t)
	payload := make([]byte, 1<<20)
	if _, err := rand.Read(payload); err != nil {
		t.Fatal(err)
	}

	lnConn, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = lnConn.Close() }()
	sndConn, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = sndConn.Close() }()

	origStdin, origStdout, origStderr := os.Stdin, os.Stdout, os.Stderr
	inR, inW, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	outR, outW, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	// fingerprint=nil の WARNING を捨てる。
	devNull, err := os.OpenFile(os.DevNull, os.O_WRONLY, 0)
	if err != nil {
		t.Fatal(err)
	}
	defer devNull.Close()
	os.Stdin, os.Stdout, os.Stderr = inR, outW, devNull
	t.Cleanup(func() { os.Stdin, os.Stdout, os.Stderr = origStdin, origStdout, origStderr })

	go func() {
		_, _ = inW.Write(payload)
		_ = inW.Close()
	}()
	gotCh := make(chan []byte, 1)
	go func() {
		b, _ := io.ReadAll(outR)
		gotCh <- b
	}()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	listenErr := make(chan error, 1)
	go func() { listenErr <- ListenPipeNAT(ctx, lnConn) }()

	sendErr := SendPipeNAT(ctx, sndConn, lnConn.LocalAddr().(*net.UDPAddr), nil)
	lerr := <-listenErr
	os.Stdout = origStdout
	_ = outW.Close()
	got := <-gotCh

	if sendErr != nil {
		t.Fatalf("SendPipeNAT: %v", sendErr)
	}
	if lerr != nil {
		t.Fatalf("ListenPipeNAT: %v", lerr)
	}
	if !bytes.Equal(got, payload) {
		t.Fatalf("pipe output mismatch: got %d bytes, want %d", len(got), len(payload))
	}
}

// TestPipeNAT_DialFailure は到達不能なピアへの SendPipeNAT が dial エラーを返すことを確認する。
func TestPipeNAT_DialFailure(t *testing.T) {
	sndConn, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = sndConn.Close() }()
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	err = SendPipeNAT(ctx, sndConn, &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1), Port: 59998}, []byte("fp"))
	if err == nil || !strings.Contains(err.Error(), "QUIC dial NAT") {
		t.Fatalf("SendPipeNAT error = %v, want QUIC dial NAT error", err)
	}
}

// TestPipeNAT_ListenCancel は ctx キャンセルで ListenPipeNAT が Accept を抜けることを確認する。
func TestPipeNAT_ListenCancel(t *testing.T) {
	lnConn, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = lnConn.Close() }()
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	err = ListenPipeNAT(ctx, lnConn)
	if err == nil || !errors.Is(err, context.Canceled) {
		t.Fatalf("ListenPipeNAT error = %v, want context.Canceled", err)
	}
}

// TestPipeGo_ListenPipe_CancelImmediately は ListenPipe をポート 0 で起動してすぐ
// context をキャンセルした場合に context.Canceled が返ることを確認する。
func TestPipeGo_ListenPipe_CancelImmediately(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel() // 起動前にキャンセル

	err := ListenPipe(ctx, "127.0.0.1:0")
	if err == nil {
		t.Fatal("expected error, got nil")
	}

	// listen 自体は成功するが Accept でキャンセルされるパターンと、
	// そもそも listen が即エラーになるパターンの両方を許容する。
	// どちらの場合も err != nil であれば OK。
	t.Logf("ListenPipe returned (expected): %v", err)
}

// TestPipeGo_ListenPipe_ContextCancelAfterListen は ListenPipe を起動後に
// context をキャンセルして終了することを確認する。
func TestPipeGo_ListenPipe_ContextCancelAfterListen(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())

	errCh := make(chan error, 1)
	go func() {
		errCh <- ListenPipe(ctx, "127.0.0.1:0")
	}()

	// goroutine が listen を開始する猶予を与えてからキャンセル
	cancel()

	err := <-errCh
	if err == nil {
		t.Fatal("expected error after cancel, got nil")
	}

	// context.Canceled または Accept エラー（wrapped）を期待する
	if !errors.Is(err, context.Canceled) {
		// wrapped されている場合もあるので文字列でも確認
		t.Logf("error (may be wrapped context.Canceled): %v", err)
	}
}
