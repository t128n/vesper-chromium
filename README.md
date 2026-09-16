# Vesper for Chromium

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![CI / Release](https://github.com/t128n/vesper-chromium/actions/workflows/ci.yml/badge.svg)](https://github.com/t128n/vesper-chromium/actions/workflows/ci.yml)

A faithful port of Rauno Freiberg's popular [Vesper](https://github.com/raunofreiberg/vesper) theme for Chromium-based browsers (Google Chrome, Brave, Arc, Microsoft Edge, Opera, Vivaldi).

Includes both the signature **Vesper Dark** theme and the **Vesper Light** companion theme.

---

## 🎨 Themes & Color Palette

### Vesper (Dark)
A deep, clean dark theme with warm orange accents and low-contrast UI chrome designed to reduce eye strain.

| Element | RGB | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Background / Frame** | `16, 16, 16` | `#101010` | Tab bar & main frame background |
| **Inactive Frame** | `28, 28, 28` | `#1C1C1C` | Background when window is unfocused |
| **Toolbar / Omnibox** | `16, 16, 16` | `#101010` | Address bar and toolbar background |
| **Accent / Buttons** | `255, 199, 153` | `#FFC799` | Toolbar icons, links, active elements |
| **Primary Text** | `255, 255, 255` | `#FFFFFF` | Tab and toolbar titles |
| **Muted Text** | `160, 160, 160` | `#A0A0A0` | Background tabs & inactive text |

### Vesper Light
A crisp, warm light companion theme using the same visual hierarchy.

| Element | RGB | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Background / Frame** | `255, 255, 255` | `#FFFFFF` | Tab bar & main frame background |
| **Inactive Frame** | `240, 240, 240` | `#F0F0F0` | Background when window is unfocused |
| **Toolbar / Omnibox** | `255, 255, 255` | `#FFFFFF` | Address bar and toolbar background |
| **Accent / Buttons** | `217, 127, 65` | `#D97F41` | Toolbar icons, links, active elements |
| **Primary Text** | `16, 16, 16` | `#101010` | Tab and toolbar titles |
| **Muted Text** | `130, 130, 130` | `#828282` | Background tabs & inactive text |

---

## 📥 Installation

### Method 1: Drag and Drop (Recommended)

1. Download `vesper-dark.zip` or `vesper-light.zip` from the latest [GitHub Releases](../../releases) (or from the latest [CI run](../../actions)).
2. Open your browser's extensions page:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Edge: `edge://extensions`
3. Toggle on **Developer mode** (top-right corner).
4. Drag and drop the downloaded `.zip` file (or the extracted folder) directly into the extensions page.
5. The theme will apply immediately!

### Method 2: Load Unpacked

1. Clone or download this repository.
2. Open `chrome://extensions` and ensure **Developer mode** is enabled.
3. Click **Load unpacked** in the top-left corner.
4. Select the `dark/` or `light/` folder from this repo.

---

## 🚀 CI/CD & Automated Packaging

This repository uses GitHub Actions (`.github/workflows/ci.yml`) to automatically validate and package releases:

- **Push & Pull Request**: Runs `scripts/validate.js` to ensure valid Manifest V3 schemas and icon specifications, packages both extensions into `dist/*.zip`, and uploads them as workflow build artifacts.
- **Git Tags (`v*`)**: Whenever a release tag like `v1.0.0` is pushed, CI automatically creates a GitHub Release and attaches `vesper-dark.zip` and `vesper-light.zip` for one-click downloading.

---

## 🛠️ Local Development & Building

To validate manifests and build the distribution zips locally:

```bash
# Validate manifests and icon assets
npm run validate
# or: node scripts/validate.js

# Build zip archives into dist/
npm run build
# or: bash scripts/build.sh
```

The resulting zip files will be placed in `dist/`:
- `dist/vesper-dark.zip`
- `dist/vesper-light.zip`

---

## 🌐 Supported Browsers

- Google Chrome (Desktop)
- Brave Browser
- Arc Browser
- Microsoft Edge
- Opera / Opera GX
- Vivaldi
- Chromium

---

## 📄 Credits & Attribution

- Original Vesper color scheme and design by **[Rauno Freiberg](https://github.com/raunofreiberg)** ([raunofreiberg/vesper](https://github.com/raunofreiberg/vesper)).
- Chromium ports maintained by **Torben Haack**.

## ⚖️ License

[MIT](LICENSE)
