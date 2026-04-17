/**
 * Resolves the public site origin. Without NEXT_PUBLIC_SITE_URL, local dev uses
 * http://localhost:3000 so metadata (favicons, OG images) resolve to your dev server
 * instead of a production domain (which caused stale/wrong favicons in the tab).
 * Set NEXT_PUBLIC_SITE_URL on Vercel/hosting to your real domain.
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
 * Site & SEO — set NEXT_PUBLIC_SITE_URL in production (e.g. https://rahulraj.dev).
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

  /** Meta description (~150–160 chars ideal for Google) */
  description:
    'Rahul Raj is a freelance full-stack web developer specializing in Next.js, React, Three.js, and WebGL. Hire for freelance front-end, UI engineering, and immersive web experiences worldwide.',

  /** Comma-separated keywords are outdated; Next passes an array */
  keywords: [
    'Rahul Raj',
    'Rahul Raj freelance developer',
    'freelance web developer',
    'freelance full-stack developer',
    'Next.js developer',
    'React developer freelance',
    'front-end developer India',
    'WebGL developer',
    'Three.js',
    'hire freelance developer',
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
