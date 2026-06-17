# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Voranex.ai, a healthcare AI company. It's a single-page application built with vanilla HTML, CSS, and JavaScript — no frameworks, no build process, no dependencies.

**Live site:** https://www.voranex.ai (hosted on GitHub Pages)

## File Structure

The entire website is composed of three core files:

- `index.html` - Complete page structure with all sections (hero, services, about, how-it-works, contact)
- `style.css` - All styling with CSS custom properties for theming
- `script.js` - Interactive behaviors and animations

Supporting files:
- `CNAME` - Custom domain configuration for GitHub Pages
- `sitemap.xml`, `robots.txt` - SEO files
- Image assets: `Voranex_Logo.png` (logo), `AI_Agents_Clinical_Decision_Support.jpg`, `Future_Clinical_Intelligence.jpg`

## Development Workflow

### Testing Locally

Since this is a static site with no build process, you can:

1. **Open directly in browser:**
   ```bash
   start index.html  # Windows
   ```

2. **Use a local server (recommended for testing JS features):**
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Deployment

The site automatically deploys to GitHub Pages on push to the `main` branch. No manual deployment steps needed.

### Git Workflow

- Single branch workflow: `main` (GitHub Pages deploys automatically on push)
- All changes are committed directly to `main`
- See `DOMAIN_SETUP.md` for detailed domain and DNS configuration instructions

## Architecture Notes

### Styling System

All styles use CSS custom properties defined in `:root` for consistent theming:
- Color scheme: Dark theme with accent gradients (`--accent-1`, `--accent-2`, `--accent-3`)
- Spacing and sizing use consistent variables
- Mobile-responsive with breakpoints defined throughout `style.css`

### Interactive Features (script.js)

The JavaScript handles:
- **Navbar behavior:** Scroll-based hiding/showing, active link tracking
- **Mobile menu:** Toggle with hamburger icon, closes on outside click
- **Scroll animations:** Intersection Observer for fade-in effects with staggered delays
- **Hero effects:** Parallax glow on mouse movement, animated stat counters
- **Service cards:** 3D tilt effect on hover
- **Form handling:** Client-side validation (form submission currently returns a "temporarily unavailable" message)
- **Smooth scrolling:** For anchor links with navbar offset

### SEO & Meta

The site includes comprehensive SEO meta tags:
- Open Graph tags for social sharing
- Twitter Card meta
- Structured data (JSON-LD) for organization info
- Canonical URL set to www.voranex.ai

## Making Changes

### Adding/Editing Content

All content is in `index.html`. Sections are clearly marked with comments:
```html
<!-- Hero Section -->
<!-- Services Section -->
<!-- About Section -->
<!-- How It Works -->
<!-- Contact Section -->
```

### Styling Changes

Edit `style.css`. The file is organized by component:
- Global styles and variables at top
- Component styles follow (navbar, hero, services, etc.)
- Utility classes and animations at end

### Adding Interactivity

Add new features to `script.js` within the `DOMContentLoaded` event listener. Existing patterns:
- Use Intersection Observer for scroll-based animations
- Maintain consistent animation timing (delays, transitions)
- Follow mobile-first responsive patterns

## Important Considerations

- **No build step:** Changes take effect immediately, test thoroughly before committing
- **Performance:** Keep images optimized; current JPGs are for hero/feature images
- **Form backend:** Contact form currently shows an error message — needs backend integration to function
- **Custom domain:** The CNAME file must contain exactly `www.voranex.ai` for proper routing
- **Missing assets:** HTML references `logo-icon.svg` as favicon which doesn't exist — browser will show default icon until added
