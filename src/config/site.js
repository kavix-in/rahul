/**
 * Resolves the public site origin. Without NEXT_PUBLIC_SITE_URL, local dev uses
 * http://localhost:3000 so metadata (favicons, OG images) resolve to your dev server
 * instead of a production domain (which caused stale/wrong favicons in the tab).
 *
 * Production: set NEXT_PUBLIC_SITE_URL=https://www.rahul.studio (no trailing slash).
 * In Vercel → Project → Environment Variables. Prefer www consistently; redirect
 * apex → www in your host/DNS to avoid duplicate URLs in search indexes.
 */
function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

/** Use for metadataBase — same rules as SITE.url */
export function getMetadataBase() {
  return new URL(resolveSiteUrl())
}

/**
 * Site & SEO — set NEXT_PUBLIC_SITE_URL in production (https://www.rahul.studio).
 */
export const SITE = {
  /** Public site URL, no trailing slash */
  url: resolveSiteUrl(),

  /** Your name as it should appear in titles and structured data */
  author: 'Rahul Raj',

  /** Short site label */
  siteName: 'Rahul Raj — Portfolio',

  /** Default title (browser tab + search) */
  title:
    'Rahul Raj | Freelance Full-Stack Developer — Next.js, React & Interactive Web',

  /** Meta description (~150–160 chars ideal for Google SERP snippets) */
  description:
    'Hire Rahul Raj — freelance full-stack & front-end developer (Next.js, React, Three.js, WebGL). Building fast, accessible web apps and immersive UI. Remote worldwide; based in India.',

  /** Topics and queries you want to be associated with (use naturally in on-page copy too) */
  keywords: [
    'Rahul Raj',
    'Rahul Raj developer',
    'rahul.studio',
    'freelance web developer India',
    'freelance full-stack developer',
    'Next.js developer',
    'React freelance developer',
    'Three.js developer',
    'WebGL developer',
    'front-end engineer',
    'hire freelance developer',
    'remote web developer',
    'portfolio',
  ],

  /** ISO region/locale hint */
  locale: 'en_IN',

  /** Set to your real handle (e.g. @yourname) for Twitter/X cards; leave empty to omit */
  twitterHandle: '',
};

export function absoluteUrl(path = '') {
  const base = SITE.url;
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
