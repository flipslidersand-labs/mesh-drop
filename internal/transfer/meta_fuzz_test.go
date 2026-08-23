package transfer

import (
	"path/filepath"
	"strings"
	"testing"
	"unicode/utf8"
)

// FuzzSanitizeName exercises the sanitizeName guard (#325) across the full
// Unicode + byte space. Any input accepted by sanitizeName must satisfy all
// security invariants; rejected inputs are fine (the function's job is to
// error early).
func FuzzSanitizeName(f *testing.F) {
	// Seed corpus: normal names + known-bad patterns
	f.Add("normal.txt")
	f.Add("file with spaces.txt")
	f.Add("日本語ファイル.txt")
	f.Add("../escape.txt")
	f.Add("./relative.txt")
	f.Add("/absolute/path.txt")
	f.Add("null\x00byte.txt")
	f.Add("\x01control.txt")
	f.Add("\x7fdelete.txt")
	f.Add("mid\x00null.txt")
	f.Add("\xc0\xaf")      // overlong UTF-8 encoding of '/'
	f.Add("\xed\xa0\x80")  // surrogate half (invalid UTF-8)
	f.Add("unicode\u202etxt.") // RTL override character (U+202E)
	f.Add("..\x00/etc/passwd")
	f.Add(strings.Repeat("a", 4096)) // long name

	f.Fuzz(func(t *testing.T, name string) {
		err := sanitizeName(name)
		if err != nil {
			// Rejected names are always fine — sanitizeName did its job.
			return
		}

		// --- Invariants that accepted names MUST satisfy ---

		// 1. Must be valid UTF-8 (sanitizeName explicitly checks this).
		if !utf8.ValidString(name) {
			t.Errorf("accepted invalid UTF-8: %q", name)
		}

		// 2. Must not contain control characters (0x00–0x1f, 0x7f).
		for i, r := range name {
			if r < 0x20 || r == 0x7f {
				t.Errorf("accepted control character U+%04X at byte %d in %q", r, i, name)
			}
		}

		// 3. Must not be an absolute path (defence-in-depth; callers also check).
		if filepath.IsAbs(name) {
			t.Errorf("accepted absolute path: %q", name)
		}
	})
}
