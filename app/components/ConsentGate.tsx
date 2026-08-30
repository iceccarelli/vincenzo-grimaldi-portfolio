'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useLanguage } from '../lib/i18n';
import { extra } from '../lib/uiStrings';

const KEY = 'vg-consent'; // 'granted' | 'denied'

/**
 * ConsentGate — minimal CMP. Vercel Web Analytics is cookieless, but the
 * measurement still transmits page URLs + coarse device data, so we gate
 * it on explicit opt-in and document it in /datenschutz. The <Analytics/>
 * script is mounted ONLY after consent; decline mounts nothing and the
 * banner never returns.
 */
export default function ConsentGate() {
  const { locale } = useLanguage();
  const t = extra[locale];
  const [state, setState] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored === 'granted' || stored === 'denied') setState(stored);
    } catch {
      /* storage unavailable → keep asking, never load */
    }
    setReady(true);
  }, []);

  const decide = (value: 'granted' | 'denied') => {
    setState(value);
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* non-fatal */
    }
  };

  return (
    <>
      {state === 'granted' && <Analytics />}
      {ready && state === 'unknown' && (
        <div className="consent-banner" role="dialog" aria-live="polite" aria-label="Analytics consent">
          <p>
            {t.consentText}{' '}
            <a href="/datenschutz">{t.privacy}</a>
          </p>
          <div className="consent-actions">
            <button type="button" className="secondary-button" onClick={() => decide('denied')}>
              {t.consentDecline}
            </button>
            <button type="button" className="primary-button" onClick={() => decide('granted')}>
              {t.consentAccept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
