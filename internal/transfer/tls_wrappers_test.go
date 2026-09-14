package transfer

import "testing"

func TestClientTLS_InsecureSkipVerify(t *testing.T) {
	cfg := clientTLS()
	if !cfg.InsecureSkipVerify {
		t.Error("want InsecureSkipVerify=true (Noise handles authentication)")
	}
	if len(cfg.NextProtos) != 1 || cfg.NextProtos[0] != "meshdrop/1" {
		t.Errorf("want NextProtos=[meshdrop/1], got %v", cfg.NextProtos)
	}
}

func TestCountWriter_Write(t *testing.T) {
	var total int64
	cw := &countWriter{fn: func(n int64) { total += n }}

	n, err := cw.Write([]byte("hello"))
	if err != nil {
		t.Fatalf("Write: %v", err)
	}
	if n != 5 {
		t.Errorf("want n=5, got %d", n)
	}
	if total != 5 {
		t.Errorf("want total=5, got %d", total)
	}

	n2, err := cw.Write([]byte("world!"))
	if err != nil {
		t.Fatalf("second Write: %v", err)
	}
	if n2 != 6 || total != 11 {
		t.Errorf("want n2=6,total=11, got n2=%d,total=%d", n2, total)
	}
}
