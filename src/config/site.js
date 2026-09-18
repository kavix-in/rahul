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
    'Rahul Raj | Python & Full-Stack Developer — Django, FastAPI & MERN',

  /** Meta description (~150–160 chars ideal for Google SERP snippets) */
  description:
    'Rahul Raj — Python & full-stack developer with 4+ years building scalable backends (Django, Flask, FastAPI) and MERN web apps. Download résumé, view work. Based in Bangalore, India.',

  /** Topics and queries you want to be associated with (use naturally in on-page copy too) */
  keywords: [
    'Rahul Raj',
    'Rahul Raj developer',
    'Python developer',
    'Python backend developer',
    'Django developer',
    'FastAPI developer',
    'Flask developer',
    'MERN stack developer',
    'full-stack developer India',
    'React Native developer',
    'Node.js developer',
    'hire Python developer',
    'software developer Bangalore',
    'resume',
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
