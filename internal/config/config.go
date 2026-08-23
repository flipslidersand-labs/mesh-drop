package config

import (
	"errors"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// Config holds settings loaded from ~/.meshdrop/config.yaml.
// Zero values mean "not set" — callers must use them only when the
// corresponding CLI flag was not explicitly passed.
type Config struct {
	Relay       string `yaml:"relay"`
	Port        int    `yaml:"port"`
	RateLimit   string `yaml:"rate-limit"`
	AuthToken   string `yaml:"auth-token"`
	IdleTimeout int    `yaml:"idle-timeout"` // seconds
}

// ConfigPath returns the resolved path to the config file.
// Precedence: $XDG_CONFIG_HOME/meshdrop/config.yaml > ~/.meshdrop/config.yaml
func ConfigPath() string {
	if xdg := os.Getenv("XDG_CONFIG_HOME"); xdg != "" {
		return filepath.Join(xdg, "meshdrop", "config.yaml")
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return filepath.Join(home, ".meshdrop", "config.yaml")
}

// DataPath returns the resolved path for a data file in the meshdrop data dir.
// Precedence: $XDG_DATA_HOME/meshdrop/<name> > ~/.meshdrop/<name>
func DataPath(name string) string {
	if xdg := os.Getenv("XDG_DATA_HOME"); xdg != "" {
		return filepath.Join(xdg, "meshdrop", name)
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return filepath.Join(home, ".meshdrop", name)
}

// Load reads the config file from ConfigPath().
// If the file does not exist, a zero-value Config is returned with no error.
// If the file exists but contains invalid YAML, an error is returned.
func Load() (*Config, error) {
	path := ConfigPath()
	if path == "" {
		return &Config{}, nil
	}

	data, err := os.ReadFile(path)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return &Config{}, nil
		}
		return nil, err
	}

	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}

// InitTemplate is the comment-annotated YAML written by `meshdrop config init`.
const InitTemplate = `# MeshDrop configuration file
# Location: ~/.meshdrop/config.yaml
#
# All settings are optional. CLI flags take precedence over this file.
# Priority: CLI flag > environment variable > config.yaml > built-in default

# relay: relay server URL for NAT traversal (e.g. http://relay.example.com:8080)
# relay: ""

# port: default listen/connect port
# port: 9494

# rate-limit: maximum send throughput (e.g. "10MB/s", "512KB/s")
# rate-limit: ""

# auth-token: bearer token for the Web UI REST API
# auth-token: ""

# idle-timeout: connection idle timeout in seconds (0 = disabled)
# idle-timeout: 0
`
