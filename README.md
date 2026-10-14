# Portfolio

React, TypeScript, Vite, Tailwind CSS, and Three.js.

## Local development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```

With Playwright available in your test environment, run `node tests/smoke.cjs` while the preview is running. Set `PORTFOLIO_URL` to override the local URL and `BROWSER_CHANNEL` to choose an installed Chromium browser (default: `msedge`). The smoke check covers desktop/mobile navigation, filtering, reduced motion, and unavailable WebGL.

The hero pauses rendering while offscreen or the tab is hidden. Reduced-motion preferences disable its ambient animation and inertial scrolling. WebGL is decorative; profile content and navigation remain usable without it.

## Content

Edit `src/data/portfolioData.ts` to update projects and profile details. Add your resume at `public/resume.pdf` to enable the existing PDF download link; that file is currently missing.

The initial dependency installation reported security advisories. Review `npm audit` before upgrading dependencies; this visual refresh does not apply breaking dependency upgrades.
