'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { emit } from '../lib/events';
import { EMAIL } from '../lib/site';

/**
 * ContactForm — posts to the first-party /api/contact (Resend relay).
 * If the backend reports 503 (RESEND_API_KEY not configured) the form
 * degrades to a pre-filled mailto instead of a guaranteed failure.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const { t } = useLanguage();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name') ?? '',
      email: data.get('email') ?? '',
      company: data.get('company') ?? '',
      message: data.get('message') ?? '',
      _gotcha: data.get('_gotcha') ?? '',
    };

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 503) {
        // Backend not configured — fall back to a pre-filled email.
        const subject = encodeURIComponent(`Portfolio contact — ${payload.name}`);
        const body = encodeURIComponent(
          `${payload.message}\n\n— ${payload.name} (${payload.email}) ${payload.company}`,
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setStatus('idle');
        return;
      }

      if (res.ok) {
        emit('form_submit', { form: 'contact' });
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
