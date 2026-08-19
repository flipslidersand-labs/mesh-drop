package main

import (
	"testing"

	"github.com/flipslidersand/mesh-drop/internal/discovery"
)

func makePeer(name string) discovery.Peer {
	return discovery.Peer{Name: name, Host: "localhost", Port: 44444, IP: "127.0.0.1"}
}

func TestFilterPeers_ExactPrefix(t *testing.T) {
	peers := []discovery.Peer{makePeer("web1"), makePeer("web2"), makePeer("minipc")}
	got := filterPeers(peers, []string{"web"})
	if len(got) != 2 {
		t.Errorf("want 2 peers, got %d: %v", len(got), got)
	}
}

func TestFilterPeers_CaseInsensitive(t *testing.T) {
	peers := []discovery.Peer{makePeer("Web1"), makePeer("minipc")}
	got := filterPeers(peers, []string{"WEB"})
	if len(got) != 1 || got[0].Name != "Web1" {
		t.Errorf("want [Web1], got %v", got)
	}
}

func TestFilterPeers_NoMatch(t *testing.T) {
	peers := []discovery.Peer{makePeer("web1")}
	got := filterPeers(peers, []string{"ds1"})
	if len(got) != 0 {
		t.Errorf("want empty, got %v", got)
	}
}

func TestFilterPeers_EmptyPrefix(t *testing.T) {
	peers := []discovery.Peer{makePeer("web1")}
	got := filterPeers(peers, []string{""})
	if len(got) != 0 {
		t.Errorf("want empty for blank prefix, got %v", got)
	}
}

func TestFilterPeers_MultipleNames(t *testing.T) {
	peers := []discovery.Peer{makePeer("web1"), makePeer("web2"), makePeer("minipc"), makePeer("yuki")}
	got := filterPeers(peers, []string{"minipc", "yuki"})
	if len(got) != 2 {
		t.Errorf("want 2, got %d: %v", len(got), got)
	}
}
