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
- `.nojekyll` - Prevents Jekyll processing on GitHub Pages (required for static deployment)
- `sitemap.xml`, `robots.txt` - SEO files
- `.well-known/security.txt` - Security disclosure contact information (RFC 9116 compliant)
- Image assets: `Voranex_Logo.png` (logo), `AI_Agents_Clinical_Decision_Support.jpg`, `Future_Clinical_Intelligence.jpg`
- Video asset: `Agentic-Clinical-Document-Investigation-Platform.mp4` (demo video, not currently used in index.html)

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

The site automatically deploys to GitHub Pages on push to the `main` branch via GitHub Actions (`.github/workflows/deploy.yml`). No manual deployment steps needed.

The workflow:
1. Triggers on push to `main` or manual dispatch
2. Uploads entire directory as artifact
3. Deploys to GitHub Pages environment

### Git Workflow

- Single branch workflow: `main` (GitHub Pages deploys automatically on push)
- All changes are committed directly to `main`
- `.netlify/` directory exists from previous hosting setup but is no longer used (now on GitHub Pages)

### Additional Documentation

- `DOMAIN_SETUP.md` - Detailed domain and DNS configuration instructions
- `EMAIL_SETUP.md` - Zoho Mail setup guide for professional email
- `SECURITY.md` - Comprehensive security protections and anti-redirect measures
- `DEPLOYMENT_SUMMARY.md` - Deployment overview and history
- `PERMANENT_HOSTING.md` - GitHub Pages hosting documentation

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
- **Form handling:** Integrated with Web3Forms (access key: `c32b6ad3-9447-4cb9-b115-de956dfc77dd`), includes client-side validation
- **Smooth scrolling:** For anchor links with navbar offset
- **Security protections:** Multi-layer defense against redirects, XSS, and injection attacks (see SECURITY.md for details)

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
- **Performance:** Keep images optimized; current JPGs are for hero/feature images. The 89MB MP4 video file exists but is not currently used in the site.
- **Form backend:** Contact form uses Web3Forms service - already functional and configured
- **Custom domain:** The CNAME file must contain exactly `www.voranex.ai` for proper routing
- **Missing assets:** HTML references `logo-icon.svg` as favicon which doesn't exist — browser will show default icon until added
- **Security:** Site implements extensive security protections including CSP headers, runtime protections against redirects, and XSS prevention (see SECURITY.md). Security contact: security@voranex.ai (.well-known/security.txt)
- **GitHub Pages:** The `.nojekyll` file is required to prevent GitHub Pages from processing the site with Jekyll
