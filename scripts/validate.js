#!/usr/bin/env node

/**
 * Validates Chromium theme manifests and icon assets.
 * Zero external dependencies required.
 */

const fs = require('fs');
const path = require('path');

const THEMES = ['dark', 'light'];
const REQUIRED_MANIFEST_VERSION = 3;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

let hasError = false;

function logPass(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
}

function logFail(msg) {
  console.error(`  \x1b[31m✖\x1b[0m ${msg}`);
  hasError = true;
}

function readPngDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);

  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error('Not a valid PNG file (invalid signature)');
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

console.log('=== Validating Chromium Themes ===\n');

for (const theme of THEMES) {
  const themeDir = path.resolve(__dirname, '..', theme);
  const manifestPath = path.join(themeDir, 'manifest.json');

  console.log(`Checking theme: \x1b[1m${theme}\x1b[0m`);

  if (!fs.existsSync(manifestPath)) {
    logFail(`Missing manifest.json at ${manifestPath}`);
    continue;
  }

  let manifest;
  try {
    const raw = fs.readFileSync(manifestPath, 'utf8');
    manifest = JSON.parse(raw);
    logPass('manifest.json is valid JSON');
  } catch (err) {
    logFail(`Failed to parse manifest.json: ${err.message}`);
    continue;
  }

  // Check manifest_version
  if (manifest.manifest_version === REQUIRED_MANIFEST_VERSION) {
    logPass(`manifest_version is ${REQUIRED_MANIFEST_VERSION}`);
  } else {
    logFail(`Expected manifest_version ${REQUIRED_MANIFEST_VERSION}, got ${manifest.manifest_version}`);
  }

  // Check name & version
  if (manifest.name && typeof manifest.name === 'string') {
    logPass(`name: "${manifest.name}"`);
  } else {
    logFail('manifest.json missing required string "name"');
  }

  if (manifest.version && typeof manifest.version === 'string') {
    logPass(`version: "${manifest.version}"`);
  } else {
    logFail('manifest.json missing required string "version"');
  }

  // Check theme section
  if (manifest.theme && typeof manifest.theme === 'object') {
    logPass('theme section is present');
    if (manifest.theme.colors && typeof manifest.theme.colors === 'object') {
      const colorKeys = Object.keys(manifest.theme.colors);
      let colorsValid = true;
      for (const key of colorKeys) {
        const val = manifest.theme.colors[key];
        if (!Array.isArray(val) || (val.length !== 3 && val.length !== 4)) {
          logFail(`Invalid color array for "${key}": ${JSON.stringify(val)}`);
          colorsValid = false;
        } else if (val.some(c => typeof c !== 'number' || c < 0 || c > 255)) {
          logFail(`Color values for "${key}" must be integers in [0, 255]: ${JSON.stringify(val)}`);
          colorsValid = false;
        }
      }
      if (colorsValid) {
        logPass(`theme.colors defined with ${colorKeys.length} valid RGB(A) rules`);
      }
    } else {
      logFail('theme.colors is missing or invalid');
    }
  } else {
    logFail('manifest.json missing "theme" object');
  }

  // Check icons
  if (manifest.icons && typeof manifest.icons === 'object') {
    for (const [sizeStr, iconRelPath] of Object.entries(manifest.icons)) {
      const expectedSize = parseInt(sizeStr, 10);
      const iconPath = path.join(themeDir, iconRelPath);

      if (!fs.existsSync(iconPath)) {
        logFail(`Icon declared for size ${sizeStr} not found: ${iconRelPath}`);
        continue;
      }

      try {
        const dims = readPngDimensions(iconPath);
        if (dims.width === expectedSize && dims.height === expectedSize) {
          logPass(`icon ${sizeStr} (${iconRelPath}) verified: ${dims.width}x${dims.height} PNG`);
        } else {
          logFail(`icon ${sizeStr} has wrong dimensions: expected ${expectedSize}x${expectedSize}, got ${dims.width}x${dims.height}`);
        }
      } catch (err) {
        logFail(`Error reading icon ${iconRelPath}: ${err.message}`);
      }
    }
  } else {
    logFail('manifest.json missing "icons" mapping');
  }

  // Check for forbidden cache files
  const cachedPak = path.join(themeDir, 'Cached Theme.pak');
  if (fs.existsSync(cachedPak)) {
    logFail(`Found forbidden cache file: ${cachedPak}`);
  }

  console.log('');
}

if (hasError) {
  console.error('\x1b[31mValidation failed with errors.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\x1b[32mAll themes passed validation successfully!\x1b[0m\n');
  process.exit(0);
}
