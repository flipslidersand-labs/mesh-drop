package transfer

import (
	"context"
	"fmt"
	"io"
	"net"
	"os"

	"github.com/quic-go/quic-go"
)

// SendPipe は os.Stdin を QUIC ストリームで送信する。
// サイズ不明のためチャンク数は1固定。
// fingerprint が非 nil の場合は TLS ピンニングを行い、nil の場合は自己署名チェックのみ行う。
func SendPipe(ctx context.Context, addr string, fingerprint []byte) error {
	conn, err := quic.DialAddr(ctx, addr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("dial %s: %w", addr, err)
	}
	return doSendPipe(ctx, conn)
}

// SendPipeNAT は NAT Traversal 済みソケット経由で stdin を送信する。
// fingerprint が非 nil の場合は TLS ピンニングを行い、nil の場合は自己署名チェックのみ行う。
func SendPipeNAT(ctx context.Context, udpConn *net.UDPConn, peerAddr *net.UDPAddr, fingerprint []byte) error {
	conn, err := quic.Dial(ctx, udpConn, peerAddr, clientTLSForFingerprint(fingerprint), quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC dial NAT: %w", err)
	}
	return doSendPipe(ctx, conn)
}

func doSendPipe(ctx context.Context, conn *quic.Conn) error {
	defer conn.CloseWithError(0, "done")

	meta := Meta{Name: "stdin", Size: -1, Chunks: 1, IsPipe: true}
	peerKey, err := sendMeta(ctx, conn, meta)
	if err != nil {
		return fmt.Errorf("control stream: %w", err)
	}

	stream, err := conn.OpenStreamSync(ctx)
	if err != nil {
		return fmt.Errorf("pipe stream open: %w", err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeInitiator(ctx, stream, peerKey)
	if err != nil {
		return fmt.Errorf("pipe noise: %w", err)
	}

	// ChunkMeta はダミー（offset/size 無効、pipe では使わない）
	if err := writeChunkMeta(ns, ChunkMeta{Index: 0}); err != nil {
		return fmt.Errorf("pipe chunk meta: %w", err)
	}

	_, err = io.Copy(ns, os.Stdin)
	return err
}

// ListenPipe は QUIC で接続を待ち受け、受信データを os.Stdout に書き出す。
func ListenPipe(ctx context.Context, addr string) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.ListenAddr(addr, tlsConf, quicConfig())
	if err != nil {
		return fmt.Errorf("listen %s: %w", addr, err)
	}
	defer ln.Close()
	fmt.Fprintf(os.Stderr, "Waiting for pipe on %s ...\n", ln.Addr())
	conn, err := ln.Accept(ctx)
	if err != nil {
		return fmt.Errorf("accept: %w", err)
	}
	// dispatchConn 経由で Meta 検証と TOFU 検証を行う
	return dispatchConn(ctx, conn)
}

// ListenPipeNAT は NAT Traversal 済みソケットで受信して stdout に書く。
func ListenPipeNAT(ctx context.Context, udpConn *net.UDPConn) error {
	tlsConf, err := serverTLS()
	if err != nil {
		return fmt.Errorf("TLS setup: %w", err)
	}
	ln, err := quic.Listen(udpConn, tlsConf, quicConfig())
	if err != nil {
		return fmt.Errorf("QUIC listen on conn: %w", err)
	}
	defer ln.Close()
	conn, err := ln.Accept(ctx)
	if err != nil {
		return fmt.Errorf("accept: %w", err)
	}
	return dispatchConn(ctx, conn)
}

// doReceivePipeConn は Meta 解析済みの接続からパイプデータを stdout へ書く。
// dispatchConn から IsPipe=true のとき呼ばれる。
// peerKey は制御ストリームで確認したピアの静的公開鍵（チャンクストリームの検証に使う）。
func doReceivePipeConn(ctx context.Context, conn *quic.Conn, peerKey []byte) error {
	defer conn.CloseWithError(0, "done")

	stream, err := conn.AcceptStream(ctx)
	if err != nil {
		return fmt.Errorf("accept pipe stream: %w", err)
	}
	defer stream.Close()

	ns, err := chunkHandshakeResponder(ctx, stream, peerKey)
	if err != nil {
		return fmt.Errorf("pipe noise: %w", err)
	}

	if _, err := readChunkMeta(ns); err != nil {
		return fmt.Errorf("pipe chunk meta: %w", err)
	}

	_, err = io.Copy(os.Stdout, ns)
	return err
}
