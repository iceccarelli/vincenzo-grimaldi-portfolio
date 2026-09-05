import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
import SiteFooter from './components/SiteFooter';
import ConsentGate from './components/ConsentGate';
import { GlobalJsonLd } from './components/JsonLd';
import { LanguageProvider } from './lib/i18n';
import { SITE_URL, SITE_NAME, ONE_LINE, CITY } from './lib/site';
import './globals.css';

const DEFAULT_TITLE = `${SITE_NAME} — ${ONE_LINE}`;
const DESCRIPTION =
  `Control engine of the Physical AI & Robotics cluster, operated by ${SITE_NAME}, ${CITY}: repository register, target architecture, safety gate, palletizing KPIs, decision log, kill register, research program, weekly CEO report and cross-cluster contracts — as pages and as JSON. Robot-agnostic palletizing software first.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  // One indexable language (en). The DE toggle is a client-side view of
  // the same document, not an alternate URL, so no hreflang is emitted.
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
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
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
