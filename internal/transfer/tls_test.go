package transfer

import (
	"crypto/x509"
	"testing"
	"time"
)

func TestServerTLSCertExpiry(t *testing.T) {
	cfg, err := serverTLS()
	if err != nil {
		t.Fatalf("serverTLS() error: %v", err)
	}
	if len(cfg.Certificates) == 0 || len(cfg.Certificates[0].Certificate) == 0 {
		t.Fatal("serverTLS returned no certificate")
	}
	cert, err := x509.ParseCertificate(cfg.Certificates[0].Certificate[0])
	if err != nil {
		t.Fatalf("failed to parse certificate: %v", err)
	}
	minExpiry := time.Now().Add(365 * 24 * time.Hour)
	if cert.NotAfter.Before(minExpiry) {
		t.Fatalf("cert expires %v — want at least 1 year from now (%v)", cert.NotAfter, minExpiry)
	}
}

func TestServerTLSAndFingerprintCertExpiry(t *testing.T) {
	_, _, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint() error: %v", err)
	}
}
