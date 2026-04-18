import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Unbounded, JetBrains_Mono } from 'next/font/google'
import Header from '../components/Header';
import Cursor from '../common/Cursor';
import SeoJsonLd from '../components/SeoJsonLd';
import { SITE, absoluteUrl, getMetadataBase } from '../config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: '400',
})

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata = {
  metadataBase: getMetadataBase(),
  applicationName: SITE.siteName,
  title: {
    default: SITE.title,
    template: `%s · ${SITE.author}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  publisher: SITE.author,
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: absoluteUrl('/'),
    siteName: SITE.siteName,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: '/image.png',
        width: 1024,
        height: 1024,
        alt: `${SITE.author} — site icon`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/image.png'],
    ...(SITE.twitterHandle
      ? { creator: SITE.twitterHandle, site: SITE.twitterHandle }
      : {}),
  },
  category: 'technology',
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/image.png', sizes: '1024x1024', type: 'image/png' }],
    shortcut: '/image.png',
    apple: [{ url: '/image.png', sizes: '1024x1024', type: 'image/png' }],
  },
  themeColor: '#EA580C',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body
        className={`${inter.className} ${inter.variable} ${unbounded.variable} ${jetbrainsMono.variable}`}
      >
        <SeoJsonLd />
        <Cursor />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
