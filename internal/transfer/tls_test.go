package transfer

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"
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

func TestClientTLS_Basic(t *testing.T) {
	t.Parallel()
	cfg := clientTLS()
	if cfg == nil {
		t.Fatal("clientTLS() returned nil")
	}
	if !cfg.InsecureSkipVerify {
		t.Error("expected InsecureSkipVerify=true (Noise handles auth)")
	}
	found := false
	for _, p := range cfg.NextProtos {
		if p == "meshdrop/1" {
			found = true
		}
	}
	if !found {
		t.Errorf("NextProtos %v does not contain meshdrop/1", cfg.NextProtos)
	}
	// clientTLS does not pin — no VerifyPeerCertificate callback.
	if cfg.VerifyPeerCertificate != nil {
		t.Error("clientTLS should not set VerifyPeerCertificate (Noise layer handles auth)")
	}
}

func TestClientTLSPinned_StructFields(t *testing.T) {
	t.Parallel()
	fp := make([]byte, sha256.Size)
	for i := range fp {
		fp[i] = byte(i + 1)
	}
	cfg := clientTLSPinned(fp)
	if cfg == nil {
		t.Fatal("clientTLSPinned returned nil")
	}
	if !cfg.InsecureSkipVerify {
		t.Error("InsecureSkipVerify must be true (replaced by fingerprint callback)")
	}
	if cfg.VerifyPeerCertificate == nil {
		t.Fatal("expected VerifyPeerCertificate to be set for fingerprint pinning")
	}
	found := false
	for _, p := range cfg.NextProtos {
		if p == "meshdrop/1" {
			found = true
		}
	}
	if !found {
		t.Errorf("NextProtos %v does not contain meshdrop/1", cfg.NextProtos)
	}
}

func TestClientTLSPinned_WrongFingerprint(t *testing.T) {
	t.Parallel()
	der, fp := selfSignedCACertDER(t) // CA cert so CheckSignatureFrom succeeds
	wrongFP := make([]byte, sha256.Size)
	for i := range wrongFP {
		wrongFP[i] = 0xFF
	}
	_ = fp
	pinned := clientTLSPinned(wrongFP)
	if err := pinned.VerifyPeerCertificate([][]byte{der}, nil); err == nil {
		t.Error("expected error for wrong fingerprint, got nil")
	}
}

func TestClientTLSPinned_CorrectFingerprint(t *testing.T) {
	t.Parallel()
	der, fp := selfSignedCACertDER(t)
	pinned := clientTLSPinned(fp)
	if err := pinned.VerifyPeerCertificate([][]byte{der}, nil); err != nil {
		t.Errorf("expected nil for correct fingerprint+CA cert, got: %v", err)
	}
}

func TestClientTLSPinned_NoCertificate(t *testing.T) {
	t.Parallel()
	pinned := clientTLSPinned(make([]byte, sha256.Size))
	if err := pinned.VerifyPeerCertificate([][]byte{}, nil); err == nil {
		t.Error("expected error when peer sends no certificate")
	}
}

func TestClientTLSForFingerprint_SelfSignedCheck(t *testing.T) {
	t.Parallel()
	der, _ := selfSignedCACertDER(t)
	noFP := clientTLSForFingerprint(nil)
	if err := noFP.VerifyPeerCertificate([][]byte{der}, nil); err != nil {
		t.Errorf("expected nil for self-signed CA cert without fingerprint, got: %v", err)
	}
}

func TestClientTLSForFingerprint_SelfSignedCheck_NoCert(t *testing.T) {
	t.Parallel()
	noFP := clientTLSForFingerprint(nil)
	if err := noFP.VerifyPeerCertificate([][]byte{}, nil); err == nil {
		t.Error("expected error when peer sends no certificate")
	}
}

// selfSignedCACertDER generates a minimal self-signed CA certificate whose
// CheckSignatureFrom passes (requires IsCA=true and KeyUsageCertSign).
func selfSignedCACertDER(t *testing.T) ([]byte, []byte) {
	t.Helper()
	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		t.Fatal(err)
	}
	tmpl := &x509.Certificate{
		SerialNumber:          big.NewInt(1),
		Subject:               pkix.Name{CommonName: "test-ca"},
		NotBefore:             time.Now().Add(-time.Minute),
		NotAfter:              time.Now().Add(time.Hour),
		IsCA:                  true,
		KeyUsage:              x509.KeyUsageCertSign | x509.KeyUsageDigitalSignature,
		BasicConstraintsValid: true,
	}
	der, err := x509.CreateCertificate(rand.Reader, tmpl, tmpl, &key.PublicKey, key)
	if err != nil {
		t.Fatal(err)
	}
	sum := sha256.Sum256(der)
	return der, sum[:]
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
