import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import FeedbackBanner from './components/FeedbackBanner';
import SiteFooter from './components/SiteFooter';
import AskWidget from './components/AskWidget';
import BookBar from './components/BookBar';
import ConsentGate from './components/ConsentGate';
import { GlobalJsonLd } from './components/JsonLd';
import { LanguageProvider } from './lib/i18n';
import { SITE_URL, SITE_NAME, JOB_TITLE } from './lib/site';
import './globals.css';

const DEFAULT_TITLE = `${SITE_NAME} | ${JOB_TITLE}`;
const DESCRIPTION =
  'Independent engineering advisory for safety-critical grids and cyber-physical systems: physics-informed AI, deterministic control, OT security. Book a 60-minute consultation or a monthly retainer.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  // i18n decision A: the site ships one indexable language (en). All
  // hreflang alternates were removed — /?lang=x is a client-side toggle,
  // not an alternate document. Reintroduce languages only with real
  // localized routes (next-intl, unique metadata per locale).
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
    siteName: 'Vincenzo Grimaldi — Engineering',
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
          <div className="site-chrome">
            <ScrollProgress />
            <Header />

            {children}

            <FeedbackBanner />

            <SiteFooter />
          </div>

          <AskWidget />
          <BookBar />
          <ConsentGate />
        </LanguageProvider>

        <GlobalJsonLd />
      </body>
    </html>
  );
}
