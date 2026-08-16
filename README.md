# אימון שחקים — Shchakim Practice

A personal-use practice app for IDF elite intelligence program ("שח״קים") admissions tests.
Hebrew/RTL, mobile-first, installable as a PWA, and fully offline-capable.

**Live:** https://shushi-psi.vercel.app

## Test categories

| Category | Tests | Questions |
| --- | --- | --- |
| ידע כללי (general knowledge, multiple choice) | 9 | 174 |
| הקשרים רחוקים (remote associates) | 4 | 80 |

Each category holds a fixed, numbered list of tests so results are comparable across
attempts. Tests are labelled by origin:

- **מהלומדה** — built from the original source material.
- **נוצר אוטומטית** — written to add practice volume in the same style. Lower confidence
  than the source material; worth reviewing before relying on them.

## Test modes

- **מתוזמן (timed)** — feedback is withheld until the end, like the real exam. The timer is
  scoped either per-question (15/20/30/45/60s, auto-advances on expiry) or across the whole
  exam (5–30 min, auto-submits on expiry).
- **תרגול חופשי (practice)** — untimed; each answer reveals the correct answer plus a short
  explanation immediately.

Both converge on the same results screen: score, duration, and a per-question review with
explanations. Attempts are saved per-device in `localStorage` — no account, no server.

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build (service worker only registers in a built app)
npm run preview  # serve the production build locally
npm run smoke    # Playwright end-to-end check (see below)
```

`npm run smoke` drives a real browser through both categories, all three timer
configurations, results, and history. Point it at any deployment:

```bash
BASE_URL=https://shushi-psi.vercel.app npm run smoke
node scripts/check-installable.mjs   # verifies PWA install criteria on the live site
```

## Adding a test category

The engine renders any question type off a discriminated union, so a new category needs no
changes to the session logic:

1. Add a variant to `Question` in `src/types/question.ts`.
2. Add a renderer and branch in `src/components/test/QuestionRenderer.tsx`.
3. Add the question data under `src/data/categories/`.
4. Register the category in `src/data/categoryRegistry.ts`.

## Deployment

Hosted free on Vercel; pushes to `master` deploy automatically. `vercel.json` rewrites all
paths to `index.html` so client-side routes survive a hard refresh.
