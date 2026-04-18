import { socialLinks } from './social';

/** Public profile URLs for JSON-LD sameAs (https only; excludes mailto/tel/wa.me). */
export function getProfileUrlsForJsonLd() {
  return socialLinks
    .map(({ href }) => href)
    .filter((href) => /^https:\/\//i.test(href));
}
