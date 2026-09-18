# Rahul Raj — Résumé Portfolio

A fast, recruiter-first single-page portfolio built with **Next.js 13** (App Router).
Resume-first layout: hero → summary → experience → skills → selected work → education → contact,
with a prominent **Download Résumé (PDF)** call to action.

## Design

Monochrome system (black canvas · white text · one silver-mist gray) — see `DESIGN.md`.
Fonts: Unbounded (display), Inter (body), JetBrains Mono (labels).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Editing content

- **Résumé content** (summary, experience, skills, education): `src/data/aboutResume.js`
- **Résumé PDF** (Download CV button): `public/Rahul-Raj-Resume.pdf`
- **Projects / work grid**: `src/data.js` (`rawProjects`) + thumbnails in `public/projects/`
- **Contact / social links**: `src/config/social.js`
- **SEO / site metadata**: `src/config/site.js` (set `NEXT_PUBLIC_SITE_URL` in production)

## Deploy

Deploys on Vercel. Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in project env vars.
