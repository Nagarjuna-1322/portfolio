# Nagarjuna Reddy — Portfolio

An editorial developer portfolio inspired by the reference's white canvas, oversized serif type, curved gallery, reflection, continuous drag, orbital view, and fragment transition. All content is Nagarjuna's; Work uses original terrain artwork, and ScholarAI's screenshot appears only in its project entry.

## Development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```

With Playwright available in the test environment, run `node tests/smoke.cjs` against the preview. Set `PORTFOLIO_URL` to override `http://127.0.0.1:3000`, and `BROWSER_CHANNEL` to choose an installed Chromium browser (default: `msedge`). The test compares rendered details with the saved portfolio data, checks each project, and exercises navigation, dragging, mobile layout, reduced motion, printing, and the WebGL fallback.

## Content and interactions

- `src/data/portfolioData.ts` holds the existing profile, skills, five projects, education, awards, certifications, and seven repositories.
- The Index and detail navigation expose About, Skills, Work, Journey, Certifications, GitHub, Resume, and Contact.
- Projects include descriptions, metrics, features, technology breakdowns, development processes, architecture notes, and links.
- Resume content is generated from the same data. Print / Save as PDF uses the browser print dialog; Copy Text copies the displayed resume.
- The contact form validates inputs and opens a prepared email in the visitor's mail app. It does not claim to send messages without a backend.
- Work's cover uses original terrain artwork. The ScholarAI and previous portfolio screenshots are local project preview assets.
- The gallery renders on demand, pauses under dialogs and hidden tabs, caps pixel density, supports reduced motion, and supplies a flat-image fallback without WebGL.

## Existing external limitations

The career-predictor deployment returned a 404 during validation and is labeled accordingly. Repository statistics remain the saved portfolio snapshot, with links to current GitHub activity. Existing dependency security advisories have not been upgraded as part of this design change.
