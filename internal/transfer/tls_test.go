package transfer

import (
	"crypto/sha256"
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

// TestNewTLSBundle_CreatesBundle — serverTLSAndFingerprint() returns without error.
func TestNewTLSBundle_CreatesBundle(t *testing.T) {
	t.Parallel()
	cfg, fp, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint() error: %v", err)
	}
	if cfg == nil {
		t.Fatal("expected non-nil *tls.Config")
	}
	if fp == nil {
		t.Fatal("expected non-nil fingerprint")
	}
}

// TestNewTLSBundle_HasFingerprint — fingerprint is 32 bytes and non-zero.
func TestNewTLSBundle_HasFingerprint(t *testing.T) {
	t.Parallel()
	_, fp, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint() error: %v", err)
	}
	if len(fp) != sha256.Size {
		t.Fatalf("fingerprint length = %d, want %d", len(fp), sha256.Size)
	}
	allZero := true
	for _, b := range fp {
		if b != 0 {
			allZero = false
			break
		}
	}
	if allZero {
		t.Fatal("fingerprint is all-zero; expected non-zero SHA-256 digest")
	}
}

// TestNewTLSBundle_FingerprintStable — recomputing the fingerprint from the same
// certificate DER bytes yields the identical value.
func TestNewTLSBundle_FingerprintStable(t *testing.T) {
	t.Parallel()
	cfg, fp1, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint() error: %v", err)
	}
	if len(cfg.Certificates) == 0 || len(cfg.Certificates[0].Certificate) == 0 {
		t.Fatal("no certificate in config")
	}
	sum := sha256.Sum256(cfg.Certificates[0].Certificate[0])
	fp2 := sum[:]

	if len(fp1) != len(fp2) {
		t.Fatalf("fingerprint length mismatch: %d vs %d", len(fp1), len(fp2))
	}
	for i := range fp1 {
		if fp1[i] != fp2[i] {
			t.Fatalf("fingerprint not stable: first=%x, recomputed=%x", fp1, fp2)
		}
	}
}

// TestNewTLSBundle_Unique — two calls to serverTLSAndFingerprint() produce
// different fingerprints because each generates a fresh key pair.
func TestNewTLSBundle_Unique(t *testing.T) {
	t.Parallel()
	_, fp1, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("first serverTLSAndFingerprint() error: %v", err)
	}
	_, fp2, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("second serverTLSAndFingerprint() error: %v", err)
	}

	identical := true
	for i := range fp1 {
		if fp1[i] != fp2[i] {
			identical = false
			break
		}
	}
	if identical {
		t.Fatal("two independent serverTLSAndFingerprint() calls returned identical fingerprints; expected unique key pairs")
	}
}

// TestClientTLSForFingerprint_NilFingerprint — nil fingerprint returns a config
// with a VerifyPeerCertificate hook (self-signed check), not a bare open config.
func TestClientTLSForFingerprint_NilFingerprint(t *testing.T) {
	t.Parallel()
	cfg := clientTLSForFingerprint(nil)
	if cfg == nil {
		t.Fatal("expected non-nil *tls.Config")
	}
	if cfg.VerifyPeerCertificate == nil {
		t.Fatal("expected VerifyPeerCertificate to be set for self-signed check")
	}
}

// TestClientTLSForFingerprint_WithFingerprint — non-nil fingerprint returns a
// config with VerifyPeerCertificate set (pinning callback).
func TestClientTLSForFingerprint_WithFingerprint(t *testing.T) {
	t.Parallel()
	fp := make([]byte, sha256.Size)
	for i := range fp {
		fp[i] = byte(i + 1) // arbitrary non-zero bytes
	}
	cfg := clientTLSForFingerprint(fp)
	if cfg == nil {
		t.Fatal("expected non-nil *tls.Config")
	}
	if cfg.VerifyPeerCertificate == nil {
		t.Fatal("expected VerifyPeerCertificate to be set for fingerprint pinning")
	}
}
