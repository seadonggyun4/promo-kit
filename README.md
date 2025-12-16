<img width="300" height="300" alt="logo" src="https://github.com/user-attachments/assets/4ca6be3b-249e-4ac7-aae5-2330abbbced8" />

# PromoKit - Promotion Page Editor

A web-based visual editor for creating promotion pages effortlessly. Design your promotion layout, place buttons with drag-and-drop, and export production-ready code in your preferred framework and styling method.

## Features

### Visual Editor
- **Image Upload**: Upload your designed promotion page image as the background canvas
- **Drag & Drop Button Placement**: Intuitively position buttons anywhere on your promotion page using @dnd-kit/core
- **21 Button Styles**: Choose from a variety of pre-designed button styles including solid colors and gradients
- **Button Customization**: Adjust button dimensions (width/height), text content, and link URLs

### Multi-Framework Code Export
Export your promotion page as production-ready code. Select your preferred framework and styling approach, then download a ZIP file containing all necessary files.

**Supported Frameworks**
| Framework | Output | Description |
|:---------:|:------:|:------------|
| HTML/CSS | `.html`, `.css`, `.js` | Pure vanilla implementation with no dependencies |
| React | `.tsx` | TypeScript-based React functional component |
| Vue | `.vue` | Vue 3 Single File Component (SFC) with Composition API |

**Supported Styling Methods**
| Style | Vanilla | React | Vue | Description |
|:-----:|:-------:|:-----:|:---:|:------------|
| CSS | ✓ | ✓ | ✓ | Standard CSS with class selectors |
| SCSS | ✓ | ✓ | ✓ | Sass/SCSS with nested selectors |
| Styled Components | - | ✓ | - | CSS-in-JS with tagged template literals |
| Emotion | - | ✓ | - | CSS-in-JS with `@emotion/styled` |
| Tailwind CSS | ✓ | ✓ | ✓ | Utility-first CSS framework classes |

### Internationalization (i18n)
Full multi-language support with seamless language switching:
- English
- Korean (한국어)
- Japanese (日本語)

## Tech Stack

| Category | Technology |
|:--------:|:-----------|
| Framework | React 18 with TypeScript |
| Styling | Styled Components |
| State Management | Zustand |
| Drag & Drop | @dnd-kit/core |
| Internationalization | react-i18next |
| Build Tool | Vite |
| File Download | JSZip, FileSaver |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/promo-kit.git
cd promo-kit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Usage

1. **Upload Image**: Click the upload area to select your promotion page design image
2. **Add Buttons**: Select a button style from the panel and place it on the canvas
3. **Position Buttons**: Drag buttons to position them precisely over your design
4. **Customize**: Edit button text, links, and dimensions as needed
5. **Export**: Click the Download button, select your framework and styling preference, then download the generated code

## Project Structure

```
src/
├── app/              # App configuration and providers
├── pages/            # Page components (Home, Editor)
├── widgets/          # Complex UI components (Menu, Preview Panel, Webview)
├── features/         # Feature modules (Download, Button Editor)
└── shared/           # Shared utilities, types, and assets
    ├── types/        # TypeScript type definitions
    ├── store/        # Zustand stores
    ├── constants/    # Button styles and configurations
    └── assets/       # Images and static files
```

## License

MIT
