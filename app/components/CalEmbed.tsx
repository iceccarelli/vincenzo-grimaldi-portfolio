'use client';

import { useState } from 'react';
import { emit } from '../lib/events';

/**
 * CalEmbed — Cal.com booking, click-to-load.
 *
 * The iframe is NOT mounted on page load: a placeholder button loads it on
 * demand. This (a) keeps LCP clean, (b) defers the third-party connection
 * until the visitor acts (GDPR data-minimisation, documented in
 * /datenschutz §5), (c) gives us the book_click event for free.
 * Renders nothing when NEXT_PUBLIC_CAL_URL is unset — no dead embeds.
 */
export default function CalEmbed({ calUrl, label }: { calUrl: string; label: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!calUrl) return null;

  if (!loaded) {
    return (
      <div className="cal-placeholder">
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            emit('book_click', { source: 'cal_embed' });
            setLoaded(true);
          }}
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <iframe
      src={`${calUrl}${calUrl.includes('?') ? '&' : '?'}embed=true&theme=dark`}
      className="cal-frame"
      title="Book a consultation"
      loading="lazy"
      allow="payment"
    />
  );
}
