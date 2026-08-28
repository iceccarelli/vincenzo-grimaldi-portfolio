'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/i18n';

/**
 * Warm-gradient feedback strip between the last content section and the
 * footer. "Yes" thanks the visitor; "No" routes them to the contact
 * section so the miss becomes a conversation.
 */
export default function FeedbackBanner() {
  const { t } = useLanguage();
  const [answered, setAnswered] = useState(false);

  return (
    <section className="section-shell" aria-label={t.feedback.title}>
      <div className="feedback-banner">
        <div className="feedback-copy">
          <h2>{t.feedback.title}</h2>
          <p>{t.feedback.body}</p>
        </div>
        {answered ? (
          <span className="feedback-thanks">{t.feedback.thanks}</span>
        ) : (
          <div className="feedback-actions">
            <button type="button" className="primary-button feedback-button" onClick={() => setAnswered(true)}>
              {t.feedback.yes} 👍
            </button>
            <a className="primary-button feedback-button" href="#connect">
              {t.feedback.no} 👎
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
