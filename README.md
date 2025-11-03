# Transition Feeding Rubric — Vercel-ready

This repository contains a static rubric app that can be deployed instantly to Vercel.

What I added
- `public/index.html` — HTML for the rubric
- `public/styles.css` — styles
- `public/script.js` — JS to compute section totals and reset sections
- `api/health.js` — lightweight serverless endpoint for health checks
- `vercel.json` — routes to serve `public/` contents
- `package.json` — minimal scripts (optional)

Quick deploy
1. Push this repo to GitHub (if not already pushed).
2. Go to https://vercel.com, click "Import Project", pick your repo and deploy.

Or deploy from CLI (if you have Vercel CLI installed):

```bash
# from repo root
vercel --prod
```

Run locally
- Option A — using Node `serve` (recommended if you `npm install`):

```bash
npm install
npm start
# open http://localhost:3000
```

- Option B — using Python built-in server (no deps):

```bash
python3 -m http.server 8000 --directory public
# open http://localhost:8000
```

Notes
- The `vercel.json` routes map `/` to `public/index.html` and static assets under `/public`.
- If you prefer to host static files from repo root instead of `public/`, I can move files.
