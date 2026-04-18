import { SITE } from '../../config/site';

export const metadata = {
  title: 'Contact',
  description: `Get in touch with ${SITE.author} for freelance web development, Next.js and React projects, and collaborations.`,
  openGraph: {
    title: `Contact · ${SITE.author}`,
    description: `Reach out for project inquiries, freelance work, and collaborations.`,
    url: `${SITE.url}/contact`,
    siteName: SITE.siteName,
    locale: SITE.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact · ${SITE.author}`,
    description: `Reach out for project inquiries and collaborations.`,
  },
  alternates: {
    canonical: `${SITE.url}/contact`,
  },
};

export default function ContactLayout({ children }) {
  return children;
}
