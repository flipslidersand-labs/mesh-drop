package main

import (
	"context"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func newUDP(t *testing.T) *net.UDPConn {
	t.Helper()
	c, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { c.Close() })
	return c
}

// conn が閉じられたか (書き込みが失敗するか) を確かめる。
func isClosed(c *net.UDPConn) bool {
	_, err := c.WriteToUDP([]byte("x"), &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1), Port: 9})
	return err != nil && strings.Contains(err.Error(), "closed")
}

func TestNatRendezvousAndPunch(t *testing.T) {
	t.Run("success calls onFound and returns resolved peer", func(t *testing.T) {
		srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte(`{"peer":"127.0.0.1:45678"}`))
		}))
		defer srv.Close()
		c := newUDP(t)
		var found string
		peer, err := natRendezvousAndPunch(context.Background(), c, srv.URL, "CODE", "1.2.3.4:1", func(a string) { found = a })
		if err != nil {
			t.Fatal(err)
		}
		if found != "127.0.0.1:45678" || peer.String() != "127.0.0.1:45678" {
			t.Errorf("found=%q peer=%v", found, peer)
		}
		if isClosed(c) {
			t.Error("conn must stay open on success")
		}
	})
	t.Run("relay error closes conn and wraps as rendezvous", func(t *testing.T) {
		srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, "nope", http.StatusNotFound)
		}))
		defer srv.Close()
		c := newUDP(t)
		_, err := natRendezvousAndPunch(context.Background(), c, srv.URL, "CODE", "1.2.3.4:1", nil)
		if err == nil || !strings.HasPrefix(err.Error(), "rendezvous:") {
			t.Fatalf("err = %v", err)
		}
		if !isClosed(c) {
			t.Error("conn must be closed on failure")
		}
	})
	t.Run("unparseable peer closes conn", func(t *testing.T) {
		srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte(`{"peer":"not-an-addr"}`))
		}))
		defer srv.Close()
		c := newUDP(t)
		_, err := natRendezvousAndPunch(context.Background(), c, srv.URL, "CODE", "1.2.3.4:1", nil)
		if err == nil || !strings.HasPrefix(err.Error(), "parse peer addr:") {
			t.Fatalf("err = %v", err)
		}
		if !isClosed(c) {
			t.Error("conn must be closed on failure")
		}
	})
}
