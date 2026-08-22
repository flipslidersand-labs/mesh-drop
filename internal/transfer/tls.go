package transfer

import (
	"bytes"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	"math/big"
	"os"
	"time"
)

func serverTLS() (*tls.Config, error) {
	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return nil, err
	}
	tmpl := &x509.Certificate{
		SerialNumber: big.NewInt(1),
		Subject:      pkix.Name{CommonName: "meshdrop"},
		NotBefore:    time.Now(),
		NotAfter:     time.Now().Add(10 * 365 * 24 * time.Hour),
	}
	der, err := x509.CreateCertificate(rand.Reader, tmpl, tmpl, &key.PublicKey, key)
	if err != nil {
		return nil, err
	}
	certPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: der})
	keyDER, err := x509.MarshalECPrivateKey(key)
	if err != nil {
		return nil, err
	}
	keyPEM := pem.EncodeToMemory(&pem.Block{Type: "EC PRIVATE KEY", Bytes: keyDER})
	cert, err := tls.X509KeyPair(certPEM, keyPEM)
	if err != nil {
		return nil, err
	}
	return &tls.Config{
		Certificates: []tls.Certificate{cert},
		NextProtos:   []string{"meshdrop/1"},
	}, nil
}

// #160: serverTLSAndFingerprint generates a self-signed TLS cert and returns
// both the *tls.Config for the listener and the SHA-256 fingerprint of the
// DER-encoded certificate. The fingerprint is used by the sender to pin the
// connection and prevent MITM via a forged self-signed cert.
func serverTLSAndFingerprint() (*tls.Config, []byte, error) {
	cfg, err := serverTLS()
	if err != nil {
		return nil, nil, err
	}
	if len(cfg.Certificates) == 0 || len(cfg.Certificates[0].Certificate) == 0 {
		return nil, nil, fmt.Errorf("serverTLS returned no certificate")
	}
	der := cfg.Certificates[0].Certificate[0]
	sum := sha256.Sum256(der)
	return cfg, sum[:], nil
}

// clientTLS は QUIC トランスポート用の最小 TLS 設定を返す。
// 実際の認証は Noise_XX ハンドシェイク (Phase 4) が担うため、証明書検証は行わない。
func clientTLS() *tls.Config {
	return &tls.Config{
		InsecureSkipVerify: true, //nolint:gosec — Noise が上位で認証する
		NextProtos:         []string{"meshdrop/1"},
	}
}

// #160: clientTLSPinned returns a *tls.Config that pins the peer certificate to
// the expected SHA-256 fingerprint. InsecureSkipVerify is set true to suppress
// the default chain verification (cert is self-signed and has no CA), but the
// custom VerifyPeerCertificate callback enforces the exact fingerprint instead.
// This provides equivalent security to certificate pinning and prevents MITM.
func clientTLSPinned(expectedFingerprint []byte) *tls.Config {
	return &tls.Config{
		InsecureSkipVerify: true, //nolint:gosec — replaced by fingerprint pinning below
		NextProtos:         []string{"meshdrop/1"},
		VerifyPeerCertificate: func(rawCerts [][]byte, _ [][]*x509.Certificate) error {
			if len(rawCerts) == 0 {
				return fmt.Errorf("TLS: peer sent no certificate")
			}
			sum := sha256.Sum256(rawCerts[0])
			if !bytes.Equal(sum[:], expectedFingerprint) {
				return fmt.Errorf("TLS: certificate fingerprint mismatch — possible MITM (got %x, want %x)",
					sum[:8], expectedFingerprint[:8])
			}
			cert, err := x509.ParseCertificate(rawCerts[0])
			if err != nil {
				return fmt.Errorf("TLS: could not parse peer certificate: %w", err)
			}
			if !bytes.Equal(cert.RawIssuer, cert.RawSubject) {
				return fmt.Errorf("TLS: peer certificate is not self-signed")
			}
			// #210: DN 一致だけでは不十分。署名自体も検証する。
			if err := cert.CheckSignatureFrom(cert); err != nil {
				return fmt.Errorf("TLS: peer certificate signature invalid: %w", err)
			}
			return nil
		},
	}
}

// clientTLSForFingerprint returns a pinned TLS config when a fingerprint is
// provided, or a self-signed-only config when fingerprint is nil.
// #160: Never use a fully open InsecureSkipVerify without at minimum checking
// that the certificate is self-signed.
func clientTLSForFingerprint(fingerprint []byte) *tls.Config {
	if len(fingerprint) > 0 {
		return clientTLSPinned(fingerprint)
	}
	fmt.Fprintln(os.Stderr, "WARNING: no --fingerprint provided; TLS is using self-signed-only check (weaker). Pass --fingerprint from the receiver for full MITM protection.")
	return &tls.Config{
		InsecureSkipVerify: true, //nolint:gosec — replaced by self-signed check below
		NextProtos:         []string{"meshdrop/1"},
		VerifyPeerCertificate: func(rawCerts [][]byte, _ [][]*x509.Certificate) error {
			if len(rawCerts) == 0 {
				return fmt.Errorf("TLS: peer sent no certificate")
			}
			cert, err := x509.ParseCertificate(rawCerts[0])
			if err != nil {
				return fmt.Errorf("TLS: could not parse peer certificate: %w", err)
			}
			if !bytes.Equal(cert.RawIssuer, cert.RawSubject) {
				return fmt.Errorf("TLS: peer certificate is not self-signed — possible MITM or misconfiguration")
			}
			// #210: DN 一致だけでは不十分。署名自体も検証する。
			if err := cert.CheckSignatureFrom(cert); err != nil {
				return fmt.Errorf("TLS: peer certificate signature invalid: %w", err)
			}
			return nil
		},
	}
}
