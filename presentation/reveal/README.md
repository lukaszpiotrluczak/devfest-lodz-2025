# Reveal.js Presentation

This directory contains the Reveal.js slide deck for the DevFest Łódź 2025 talk:

**"Are Frontend Developers at Risk? AI Is Already Writing HTML for Us"**

## Overview

A minimal, professional presentation that supports a live talk about building a production-grade digital business card platform using AI-assisted development workflow.

The deck demonstrates:

- The problem (no online business card)
- The AI-assisted process (artifacts pipeline)
- Real-world friction points (CI failures and fixes)
- Lessons learned (AI as accelerator, not replacement)

## Local Development

### Prerequisites

Ensure you have installed dependencies from the repository root:

```bash
pnpm install
```

### Run Locally

From the repository root:

```bash
pnpm run slides:dev
```

This starts a development server at `http://localhost:3001`.

### Build for Production

From the repository root:

```bash
pnpm run slides:build
```

This builds the presentation to `dist/presentation/`.

### Preview Production Build

From the repository root:

```bash
pnpm run slides:preview
```

This serves the built presentation from `dist/presentation/`.

## File Structure

```
presentation/reveal/
├── index.html         # Main HTML file with slide content
├── theme.css          # Custom theme (brand-aligned)
├── vite.config.js     # Vite build configuration
├── assets/            # Images, logos (if needed)
└── README.md          # This file
```

## Slide Content

The presentation uses Reveal.js markdown format embedded in `index.html`.

Slides are separated by `---` (horizontal) and `--` (vertical, not used here).

Speaker notes are included using `<aside class="notes">` blocks.

## Brand Alignment

The custom theme (`theme.css`) uses brand tokens from `docs/design-profile.json`:

- **Primary Color:** `#FAD228` (consulting yellow)
- **Secondary Color:** `#D28C0A` (darker yellow)
- **Background:** `#0B0B0C` (neutral 900)
- **Text:** `#FAFAFA` (neutral 50)
- **Typography:** Inter (body), Space Grotesk (headings)

## Deployment

The presentation is automatically deployed to GitHub Pages via `.github/workflows/pages.yml`.

Live URL: [https://lukaszpiotrluczak.github.io/devfest-lodz-2025/](https://lukaszpiotrluczak.github.io/devfest-lodz-2025/)

## Speaker Notes

To view speaker notes during the presentation:

1. Press `S` to open the speaker view
2. Speaker notes appear in a separate window
3. Speaker view shows current slide, next slide, and timer

## Keyboard Shortcuts

- **Arrow keys:** Navigate slides
- **S:** Open speaker view
- **F:** Enter fullscreen
- **ESC:** Exit fullscreen or overview
- **O:** Toggle overview mode
- **B or .:** Pause (black screen)

## License

MIT — same as the parent repository.
