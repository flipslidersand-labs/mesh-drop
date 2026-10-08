package webui

import (
	"regexp"
	"strings"
	"testing"
)

// 埋め込み UI が CSP (default-src 'self') 下で動くこと、ネットワーク由来の値を
// HTML として挿入しないことを静的に保証する。以前はインライン script/style が
// ブロックされ UI が一切動作せず、innerHTML にピア由来のファイル名を入れていた。
func TestStaticUI_CSPCompatible(t *testing.T) {
	read := func(name string) string {
		b, err := staticFiles.ReadFile("static/" + name)
		if err != nil {
			t.Fatal(err)
		}
		return string(b)
	}
	html := read("index.html")
	if regexp.MustCompile(`<script(\s[^>]*)?>\s*[^<\s]`).MatchString(html) {
		t.Error("index.html must not contain inline <script> bodies (blocked by CSP)")
	}
	for _, bad := range []string{"<style", " style=", " on"} {
		if bad == " on" {
			if regexp.MustCompile(`\son[a-z]+=`).MatchString(html) {
				t.Error("index.html must not use inline event handlers")
			}
			continue
		}
		if strings.Contains(html, bad) {
			t.Errorf("index.html must not contain %q (blocked by CSP)", bad)
		}
	}
	js := read("app.js")
	for _, bad := range []string{".innerHTML", ".outerHTML", "insertAdjacentHTML", "document.write", "setAttribute('style'"} {
		if strings.Contains(js, bad) {
			t.Errorf("app.js must not use %s (XSS sink / CSP-blocked)", bad)
		}
	}
	read("app.css")
}
