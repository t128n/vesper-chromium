# Vesper for Chromium

A faithful port of Rauno Freiberg's popular [Vesper](https://github.com/raunofreiberg/vesper) theme for Chromium-based browsers.

Includes both the signature **Vesper Dark** theme and the **Vesper Light** companion theme.

## 🎨 Themes & Color Palette

### Vesper (Dark)
A deep, clean dark theme with warm orange accents and low-contrast UI chrome designed to reduce eye strain.

| Element | RGB | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Active Tab & Toolbar** | `22, 22, 22` | `#161616` | Active tab surface & subtle dark toolbar |
| **Tab Strip / Frame** | `16, 16, 16` | `#101010` | Base background & inactive tabs |
| **Inactive Frame** | `10, 10, 10` | `#0A0A0A` | Tab bar when window is unfocused |
| **Accent / Buttons** | `255, 199, 153` | `#FFC799` | Toolbar icons, links, active elements |
| **Active Tab Text** | `255, 255, 255` | `#FFFFFF` | Active tab & toolbar titles |
| **Inactive Tab Text** | `140, 140, 140` | `#8C8C8C` | Background tabs & inactive text |
| **Omnibox Background** | `16, 16, 16` | `#101010` | Recessed address bar |

### Vesper Light
A crisp, warm light companion theme using the same visual hierarchy.

| Element | RGB | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Active Tab & Toolbar** | `255, 255, 255` | `#FFFFFF` | Crisp white active tab & toolbar |
| **Tab Strip / Frame** | `244, 244, 244` | `#F4F4F4` | Soft light grey tab bar & inactive tabs |
| **Inactive Frame** | `248, 248, 248` | `#F8F8F8` | Tab bar when window is unfocused |
| **Accent / Buttons** | `217, 127, 65` | `#D97F41` | Toolbar icons, links, active elements |
| **Active Tab Text** | `16, 16, 16` | `#101010` | High-contrast dark active tab title |
| **Inactive Tab Text** | `130, 130, 130` | `#828282` | Muted background tabs text |
| **Omnibox Background** | `244, 244, 244` | `#F4F4F4` | Soft recessed address bar |

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

## 📄 Credits & Attribution

Original Vesper color scheme and design by **[Rauno Freiberg](https://github.com/raunofreiberg)** ([raunofreiberg/vesper](https://github.com/raunofreiberg/vesper)).

## ⚖️ License

[MIT](LICENSE)
