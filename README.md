# Zihan Zhang's Personal Website

A bilingual (English/中文) personal portfolio website showcasing research, photography, and creative work.

## Live Site

Published at: [https://hzhang29-droid.github.io/HannahZhang-Personal-Website/](https://hzhang29-droid.github.io/HannahZhang-Personal-Website/)

## Project Structure

```
Figma/portfolio/                       # Main React application
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main component with all sections
│   │   └── components/             # UI components (figma, ui library)
│   └── styles/                     # CSS and Tailwind configuration
├── index.html                      # Entry point
├── package.json                    # Dependencies
├── vite.config.ts                  # Vite build configuration
└── postcss.config.mjs              # PostCSS setup for Tailwind

照片/                               # Local photo assets
├── astronomy/
├── erhu/
├── lab/
├── photograph/
├── collage/
└── life photos/
```

## Getting Started

### Install Dependencies
```bash
cd "Figma/portfolio"
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features

- Bilingual Support: Toggle between English and 中文
- Interactive Gallery: Draggable Polaroid-style photo grid
- Image Comparison Slider: Before/after reveal effect with mouse interaction
- Smooth Animations: Reveal effects and parallax scrolling
- Responsive Design: Built with Tailwind CSS
- Research Showcase: Zebrafish developmental biology projects
- Photography Portfolio: Personal photography and astrophotography work

## Technologies

- Frontend: React 18, TypeScript
- Build: Vite 6.3.5
- Styling: Tailwind CSS, custom CSS-in-JS
- Animation: motion/react
- Deployment: GitHub Pages

## Content Sections

1. Hero - Archive information and language toggle
2. Intro - Personal introduction with location context
3. About - Work philosophy and daily activities
4. Research - Academic and research projects
5. Photography - Gallery of personal work
6. Resume - Education and experience
7. Notes - Internal thoughts and reflections

## Local Photo Organization

All personal photos are stored in the `/照片/` directory by category:
- `astronomy/` - Astrophotography and startrails
- `lab/` - Research-related photos
- `erhu/` - Performance and practice photos
- `photograph/` - General photography portfolio
- Life photos for intro section

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on push to `main` branch.

Repository: [HannahZhang-Personal-Website](https://github.com/hzhang29-droid/HannahZhang-Personal-Website)

## Contact

For inquiries, visit the website or check the contact section.

---

Last updated: July 2026
