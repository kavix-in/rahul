import { SITE, absoluteUrl } from '../config/site';

/**
 * Person + WebSite JSON-LD for Google rich results (server-rendered).
 */
export default function SeoJsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author,
    url: absoluteUrl('/'),
    image: absoluteUrl('/image.png'),
    jobTitle: 'Freelance Full-Stack Web Developer',
    description: SITE.description,
    knowsAbout: [
      'Web development',
      'Next.js',
      'React',
      'JavaScript',
      'TypeScript',
      'Three.js',
      'WebGL',
      'Freelance software development',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.siteName,
    url: absoluteUrl('/'),
    description: SITE.description,
    author: {
      '@type': 'Person',
      name: SITE.author,
    },
    inLanguage: 'en',
  };

  const json = JSON.stringify([person, website]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
