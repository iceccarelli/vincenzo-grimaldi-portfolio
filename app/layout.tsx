import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
import SiteFooter from './components/SiteFooter';
import ConsentGate from './components/ConsentGate';
import { GlobalJsonLd } from './components/JsonLd';
import { LanguageProvider } from './lib/i18n';
import { SITE_URL, SITE_NAME, ONE_LINE, CITY } from './lib/site';
import './globals.css';

const DEFAULT_TITLE = SITE_NAME + ' — ' + ONE_LINE;
const DESCRIPTION =
  SITE_NAME +
  ' (' +
  CITY +
  '): independent electrical engineering work across high-voltage grids, railway traction power, electrical machines, power electronics, and physics-informed digital twins — documented with runnable models, technical articles, and public repositories.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s — ' + SITE_NAME,
  },
  description: DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    url: SITE_URL + '/',
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: SITE_URL + '/images/electrical/01-high-voltage-substation.jpg',
        width: 1168,
        height: 784,
        alt: 'High-voltage electrical substation with transformers and transmission infrastructure at dusk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    images: [SITE_URL + '/images/electrical/01-high-voltage-substation.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <SiteFooter />
          <ConsentGate />
        </LanguageProvider>
        <GlobalJsonLd />
      </body>
    </html>
  );
}
