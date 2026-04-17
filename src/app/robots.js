import { SITE } from '../config/site';

export default function robots() {
  const base = SITE.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
