# Upaaya — Portfolio Site

## Setup

```bash
npm install
npm run dev
```

If dropping these files into an existing Next.js App Router project instead of
using this scaffold directly, install the dependencies listed in
`package.json` and copy `app/`, `components/`, `hooks/`, and
`tailwind.config.ts` in.

## Structure

- `app/` — root layout, global styles, and the page that composes every section
- `components/` — one file per page section (`Header`, `Hero`, `WorkCatalogue`, `About`, `Contact`)
- `components/canvas/` — the Three.js / React Three Fiber layer (starfield + glass prism)
- `components/ui/` — reusable motion primitives (`Float`, `Magnetic`, `TiltCard`)
- `hooks/useZeroGravity.ts` — the cursor-repel physics shared by every `Magnetic` element

## Known follow-ups

- `ReelOverlay` points at `/public/reel.mp4` — swap in the real showreel file.
- `Contact.tsx` has a placeholder studio address — drop in the real one.
- `WorkCatalogue.tsx` ships with placeholder project data — wire up to a CMS or replace with real case studies.
- Tune `radius` / `strength` on `Magnetic` per-element if the push feels too strong on smaller nav items (already dialed down for nav links vs. the hero play button).
