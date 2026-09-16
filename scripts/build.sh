#!/usr/bin/env bash

set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

echo "=== Packaging Vesper Chromium Themes ==="

# 1. Run validation
if [ -x "$(command -v node)" ]; then
  node "$SCRIPT_DIR/validate.js"
else
  echo "Node.js not found in PATH; skipping validate.js"
fi

# 2. Prepare dist directory
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# 3. Package Dark Theme
echo "Packaging dark theme -> dist/vesper-dark.zip"
(
  cd "$ROOT_DIR/dark"
  zip -r -q "$DIST_DIR/vesper-dark.zip" manifest.json *.png -x "*.DS_Store" "*Cached Theme.pak*"
)

# 4. Package Light Theme
echo "Packaging light theme -> dist/vesper-light.zip"
(
  cd "$ROOT_DIR/light"
  zip -r -q "$DIST_DIR/vesper-light.zip" manifest.json *.png -x "*.DS_Store" "*Cached Theme.pak*"
)

echo ""
echo "=== Build Complete ==="
ls -lh "$DIST_DIR"/*.zip

echo ""
echo "SHA-256 Checksums:"
if [ -x "$(command -v shasum)" ]; then
  shasum -a 256 "$DIST_DIR"/*.zip
elif [ -x "$(command -v sha256sum)" ]; then
  sha256sum "$DIST_DIR"/*.zip
fi

echo ""
echo "Done! Zips are ready in dist/"
