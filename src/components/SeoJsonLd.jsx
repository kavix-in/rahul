import { SITE, absoluteUrl } from '../config/site';
import { getProfileUrlsForJsonLd } from '../config/seoProfiles';

/**
 * Person + WebSite JSON-LD for Google rich results (server-rendered).
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */
export default function SeoJsonLd() {
  const origin = absoluteUrl('/');
  const personId = `${origin}#person`;
  const websiteId = `${origin}#website`;

  const sameAs = getProfileUrlsForJsonLd();

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: SITE.author,
    url: origin,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl('/image.png'),
    },
    jobTitle: 'Freelance Full-Stack Web Developer',
    description: SITE.description,
    sameAs: sameAs.length ? sameAs : undefined,
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
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE.siteName,
    url: origin,
    description: SITE.description,
    inLanguage: 'en-IN',
    publisher: { '@id': personId },
    author: { '@id': personId },
  };

  const personNode = { ...person };
  if (personNode.sameAs === undefined) delete personNode.sameAs;

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [personNode, website],
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
