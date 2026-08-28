'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

// 1. Create a free form at formspree.io → paste its ID (the part after /f/) below.
const FORMSPREE_ID = 'REPLACE_FORMSPREE_ID';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const { t } = useLanguage();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // No Formspree ID configured yet → degrade gracefully to a pre-filled
    // email instead of a request that is guaranteed to fail.
    if (FORMSPREE_ID.includes('REPLACE')) {
      const subject = encodeURIComponent(`Portfolio contact — ${data.get('name') ?? ''}`);
      const body = encodeURIComponent(
        `${data.get('message') ?? ''}\n\n— ${data.get('name') ?? ''} (${data.get('email') ?? ''}) ${data.get('company') ?? ''}`,
      );
      window.location.href = `mailto:vincenzo@igrimaldi.engineering?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) { setStatus('ok'); e.currentTarget.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'ok') {
    return (
      <div className="contact-result">
        <CheckCircle2 size={22} /> <span>{t.contact.success}</span>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-row">
        <input className="contact-input" name="name" type="text" placeholder={t.contact.name} required />
        <input className="contact-input" name="email" type="email" placeholder={t.contact.email} required />
      </div>
      <input className="contact-input" name="company" type="text" placeholder={t.contact.company} />
      <textarea className="contact-input" name="message" rows={4} placeholder={t.contact.message} required />
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <button className="primary-button contact-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.contact.sending : <>{t.contact.send} <Send size={16} /></>}
      </button>
      {status === 'error' && (
        <p className="contact-error"><AlertCircle size={15} /> {t.contact.error}</p>
      )}
    </form>
  );
}
