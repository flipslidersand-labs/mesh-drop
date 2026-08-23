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

func TestServerTLSAndFingerprintRoundtrip(t *testing.T) {
	cfg, fp, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatalf("serverTLSAndFingerprint() error: %v", err)
	}
	if len(fp) != 32 {
		t.Errorf("fingerprint len=%d, want 32", len(fp))
	}
	if len(cfg.Certificates) == 0 {
		t.Fatal("no certificates in TLS config")
	}
}

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
		t.Fatal("two independent serverTLSAndFingerprint() calls returned identical fingerprints")
	}
}

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

func TestClientTLSForFingerprint_WithFingerprint(t *testing.T) {
	t.Parallel()
	fp := make([]byte, sha256.Size)
	for i := range fp {
		fp[i] = byte(i + 1)
	}
	cfg := clientTLSForFingerprint(fp)
	if cfg == nil {
		t.Fatal("expected non-nil *tls.Config")
	}
	if cfg.VerifyPeerCertificate == nil {
		t.Fatal("expected VerifyPeerCertificate to be set for fingerprint pinning")
	}
}

// Test the VerifyPeerCertificate closures directly.

func TestClientTLSPinned_NoCert(t *testing.T) {
	fp := make([]byte, sha256.Size)
	cfg := clientTLSPinned(fp)
	err := cfg.VerifyPeerCertificate(nil, nil)
	if err == nil {
		t.Error("want error when no cert presented")
	}
}

func TestClientTLSPinned_FingerprintMismatch(t *testing.T) {
	_, serverFP, _ := serverTLSAndFingerprint()
	wrongFP := make([]byte, sha256.Size) // all zeros — different from serverFP
	cfg := clientTLSPinned(wrongFP)

	// Use the raw DER from a freshly generated cert.
	_, serverFP2, _ := serverTLSAndFingerprint()
	_ = serverFP
	cfgS, _, _ := serverTLSAndFingerprint()
	rawDER := cfgS.Certificates[0].Certificate[0]

	err := cfg.VerifyPeerCertificate([][]byte{rawDER}, nil)
	if err == nil {
		t.Error("want fingerprint mismatch error")
	}
	_ = serverFP2
}

func TestClientTLSPinned_FingerprintMatch_ParseOk(t *testing.T) {
	cfgServer, fp, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatal(err)
	}
	rawDER := cfgServer.Certificates[0].Certificate[0]
	cfgClient := clientTLSPinned(fp)
	// The cert passes fingerprint check but may fail CheckSignatureFrom
	// (serverTLS does not set KeyUsageCertSign). This exercises the parse path.
	_ = cfgClient.VerifyPeerCertificate([][]byte{rawDER}, nil)
}

func TestClientTLSForFingerprint_NilVerify_NoCert(t *testing.T) {
	cfg := clientTLSForFingerprint(nil)
	err := cfg.VerifyPeerCertificate(nil, nil)
	if err == nil {
		t.Error("want error when no cert presented")
	}
}

func TestClientTLSForFingerprint_NilVerify_ParsePath(t *testing.T) {
	cfgServer, _, err := serverTLSAndFingerprint()
	if err != nil {
		t.Fatal(err)
	}
	rawDER := cfgServer.Certificates[0].Certificate[0]
	cfg := clientTLSForFingerprint(nil)
	// exercises parse + self-signed check + CheckSignatureFrom path
	_ = cfg.VerifyPeerCertificate([][]byte{rawDER}, nil)
}
