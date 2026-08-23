package transfer

import (
	"crypto/x509"
	"testing"
	"time"
)

func TestServerTLSCertExpiry(t *testing.T) {
	cfg, err := serverTLS()
	if err != nil {
		t.Fatalf("serverTLS: %v", err)
	}
	if len(cfg.Certificates) == 0 || len(cfg.Certificates[0].Certificate) == 0 {
		t.Fatal("serverTLS returned no certificate")
	}
	cert, err := x509.ParseCertificate(cfg.Certificates[0].Certificate[0])
	if err != nil {
		t.Fatalf("ParseCertificate: %v", err)
	}
	minExpiry := time.Now().Add(365 * 24 * time.Hour)
	if cert.NotAfter.Before(minExpiry) {
		t.Errorf("cert NotAfter %v is less than 1 year from now (%v)", cert.NotAfter, minExpiry)
	}
}

func TestServerTLSAndFingerprintRoundtrip(t *testing.T) {
	cfg, fp, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint: %v", err)
	}
	if len(fp) != 32 {
		t.Errorf("fingerprint len=%d, want 32", len(fp))
	}
	if len(cfg.Certificates) == 0 {
		t.Fatal("no certificates in TLS config")
	}
}
