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
  `${SITE_NAME}, ${CITY}. Physics-constrained control and grid digitalisation for safety-critical rail and OT systems: CIM/CGMES, IEC 61850, IT/OT, traction HV. Thesis simulator, write-up and public-dataset work.`;

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
