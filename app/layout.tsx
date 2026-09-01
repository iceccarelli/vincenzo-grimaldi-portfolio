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
import { SITE_URL, SITE_NAME } from './lib/site';
import './globals.css';

const DEFAULT_TITLE = 'Verifiable physics-informed intelligence for HV grids and traction | Grimaldi';
const DESCRIPTION =
  'Physics-constrained intelligence for grids and traction power. Residuals you can check (IEEE 9-bus: DC PINN vs analytical 0.0124°, AC vs Newton-Raphson 0.0035°), agents you can audit, sanitized patterns from live HV rail assets. €280 teardown; monthly advisory only after a teardown.';

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
    siteName: 'igrimaldi.engineering',
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
