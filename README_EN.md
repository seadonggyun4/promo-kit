<img width="300" height="300" alt="logo" src="https://github.com/user-attachments/assets/4ca6be3b-249e-4ac7-aae5-2330abbbced8" />

# PromoKit

**Event landing pages in 5 minutes.** Stop writing HTML/CSS and adjusting button coordinates manually.

[한국어](./README.md)

## The Problem

Frontend developers repeatedly receive event landing page requests from planners. Each time, you need to:
- Write HTML/CSS from scratch
- Manually calculate button positions
- Adjust coordinates pixel by pixel
- Repeat for every new campaign

## The Solution

PromoKit lets you visually place buttons on the planner's image and instantly generate production-ready code for your stack.

```
1. Upload image from planner
2. Drag & drop buttons
3. Copy code to your project
```

---

## Key Features

### Button Editor
27 button presets available.

| Category | Count | Description |
|:--------:|:-----:|:------------|
| Simple | 11 | SimpleBtn, PrimaryBtn, SecondaryBtn, SuccessBtn, DangerBtn, WarningBtn, DarkBtn, OutlineBtn, PillBtn, GhostBtn, NeonBtn |
| Gradient | 10 | GradationBtn, SunsetBtn, OceanBtn, ForestBtn, PurpleHazeBtn, FireBtn, AuroraBtn, MidnightBtn, RoseGoldBtn, CyberBtn |
| Animated | 6 | BounceBtn, GlowBtn, PulseBtn, ShakeBtn, SlideBtn, RippleBtn |

**Animation Parameter Controls**: Adjust bounce height, glow size/intensity, pulse scale, shake distance, and more.

### Text Editor
5 text presets (H1~H3, P, Strong)
- Font family, size, weight, line height, letter spacing
- Color, alignment, decoration, transform
- Shadow effects

### Image Overlay Editor
12 image style presets

| Category | Styles |
|:--------:|:-------|
| Simple | SimpleImage, RoundedImage, CircleImage, PillImage |
| Framed | BorderedImage, ShadowImage, NeonBorderImage, DoubleFrameImage |
| Decorative | PolaroidImage, GradientBorderImage, GlowImage, VintageImage |

### Version History
- **Undo/Redo** support (Ctrl+Z / Ctrl+Y)
- History timeline visualization
- Jump to specific snapshots
- Action type icons

### Project Management
- **Auto-save**: Saves to localStorage every 10 seconds
- **JSON Export/Import**: Save and restore project files
- **New Project**: SweetAlert2 confirmation dialog

---

## Code Generation

Generate code that matches your project environment. Select framework and styling method.

### Supported Frameworks (10)

| Framework | Description |
|:---------:|:------------|
| HTML/CSS/JS | Vanilla implementation, zero dependencies |
| React | TypeScript functional component |
| Vue 3 | Composition API SFC |
| Svelte | Svelte component |
| Angular | Angular component |
| Solid | SolidJS component |
| Preact | Preact component |
| Astro | Astro component |
| Qwik | Qwik component |
| Lit | Lit web component |

### Supported Styling (16)

| Style | Vanilla | React | Vue |
|:-----:|:-------:|:-----:|:---:|
| CSS | ✓ | ✓ | ✓ |
| SCSS | ✓ | ✓ | ✓ |
| Styled Components | - | ✓ | - |
| Emotion | - | ✓ | - |
| Tailwind CSS | ✓ | ✓ | ✓ |
| CSS Modules | ✓ | ✓ | ✓ |
| UnoCSS | ✓ | ✓ | ✓ |
| Panda CSS | - | ✓ | - |
| Vanilla Extract | - | ✓ | - |
| Stitches | - | ✓ | - |
| Less | ✓ | ✓ | ✓ |
| Stylus | ✓ | ✓ | ✓ |
| Bootstrap | ✓ | ✓ | ✓ |
| Bulma | ✓ | ✓ | ✓ |
| Chakra UI | - | ✓ | - |
| MUI (sx) | - | ✓ | - |

### Code Quality Options

- **Responsive**: Mobile/tablet/desktop media queries
- **Accessibility (a11y)**: aria-label, focus styles, role attributes, aria-describedby
- **SEO**: Open Graph, Twitter Card meta tags

---

## Quick Start

```bash
git clone https://github.com/seadonggyun4/promo-kit.git
cd promo-kit
npm install
npm run dev
```

---

## Tech Stack

| Category | Technology |
|:--------:|:-----------|
| Framework | React 18 + TypeScript + Vite |
| State Management | Zustand |
| Styling | Styled Components |
| Drag & Drop | @dnd-kit/core |
| i18n | react-i18next (Korean, English, Japanese) |
| Notifications | SweetAlert2, seo-toast |

---

## Project Structure

```
src/
├── app/                    # App config, routing
├── pages/                  # Pages
│   ├── home/              # Landing page
│   └── editor/            # Editor page
├── widgets/                # Layout widgets
│   ├── editor-panel/      # Edit panel (menu + content)
│   └── preview-panel/     # Preview panel
├── features/               # Feature modules
│   ├── button-editor/     # Button editing
│   ├── text-editor/       # Text editing
│   ├── image-overlay-editor/  # Image overlay editing
│   ├── image-upload/      # Image upload
│   ├── download/          # Code generation & download
│   └── version-history/   # History panel
├── entities/               # Domain entities
│   ├── button/            # Button style components
│   ├── text/              # Text style components
│   └── image-overlay/     # Image overlay styles
└── shared/                 # Shared resources
    ├── store/             # Zustand stores
    ├── types/             # TypeScript types
    ├── constants/         # Constants
    ├── config/            # i18n config
    └── ui/                # Shared UI components
```

---

## License

MIT
