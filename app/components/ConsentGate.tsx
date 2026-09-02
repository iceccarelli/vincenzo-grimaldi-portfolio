'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';

const KEY = 'vg-consent'; // 'granted' | 'denied'

/**
 * ConsentGate — minimal CMP. Vercel Web Analytics is cookieless, but the
 * measurement still transmits page URLs + coarse device data, so it is
 * gated on explicit opt-in and documented in /datenschutz. The
 * <Analytics/> script mounts ONLY after consent; decline mounts nothing
 * and the notice never returns. This is the only third-party script on
 * the site, and it never loads on a landing without consent.
 */
export default function ConsentGate() {
  const { locale } = useLanguage();
  const t = pick(locale).consent;
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
        <div className="consent" role="dialog" aria-live="polite" aria-label="Analytics consent">
          <p>
            {t.text} <a href="/datenschutz">Datenschutz</a>
          </p>
          <div className="consent-actions">
            <button type="button" className="btn-quiet" onClick={() => decide('denied')}>
              {t.decline}
            </button>
            <button type="button" className="btn" onClick={() => decide('granted')}>
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
