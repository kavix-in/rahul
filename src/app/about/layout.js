import { SITE } from '../../config/site';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    absolute: `About ${SITE.author} — Python & MERN Developer`,
  },
  description: `${SITE.author} — Python backend and MERN full-stack developer in Bangalore. Django, Flask, FastAPI, React, Node.js, scalable APIs and mobile with React Native.`,
  keywords: [
    ...SITE.keywords,
    'Python developer',
    'MERN stack',
    'Django',
    'Flask',
    'FastAPI',
    'React',
    'Node.js',
    'Bangalore developer',
  ],
  openGraph: {
    title: `About ${SITE.author}`,
    description: `Python & MERN full-stack developer — scalable backends, React, and modern web apps.`,
    url: `${SITE.url}/about`,
    siteName: SITE.siteName,
    locale: SITE.locale,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${SITE.author}`,
    description: `Python & MERN developer — backends, APIs, and full-stack web apps.`,
  },
  alternates: {
    canonical: `${SITE.url}/about`,
  },
};

export default function AboutLayout({ children }) {
  return <div className={styles.root}>{children}</div>;
}
