'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { EMAIL } from '../lib/site';

/**
 * ContactForm — the advisory enquiry form. Four fields: name, organisation,
 * constraint, email. No price, no calendar, no payment.
 *
 * Progressive: the <form> carries a real action, so with JavaScript off it
 * posts form-encoded to /api/contact and the server redirects back with a
 * status. With JavaScript on, the same fields go as JSON without a page
 * load. If the backend reports 503 (RESEND_API_KEY unset) the form
 * degrades to a pre-filled mailto rather than a silent failure.
 */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const { locale } = useLanguage();
  const f = pick(locale).form;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      organisation: String(data.get('organisation') ?? ''),
      constraint: String(data.get('constraint') ?? ''),
      _gotcha: String(data.get('_gotcha') ?? ''),
    };

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 503) {
        const subject = encodeURIComponent(`Advisory enquiry — ${payload.name}`);
        const body = encodeURIComponent(
          `Organisation: ${payload.organisation}\nConstraint: ${payload.constraint}\n\n— ${payload.name} (${payload.email})`,
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setStatus('idle');
        return;
      }

      if (res.ok) {
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
    return <p className="form-ok" role="status">{f.sent}</p>;
  }

  return (
    <form className={`form ${compact ? 'form-compact' : ''}`} action="/api/contact" method="post" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="field">
          <span>{f.name}</span>
          <input name="name" type="text" autoComplete="name" required maxLength={200} />
        </label>
        <label className="field">
          <span>{f.organisation}</span>
          <input name="organisation" type="text" autoComplete="organization" maxLength={200} />
        </label>
      </div>
      <label className="field">
        <span>{f.constraint}</span>
        <textarea name="constraint" rows={3} required maxLength={5000} placeholder={f.constraintHint} />
      </label>
      <label className="field">
        <span>{f.email}</span>
        <input name="email" type="email" autoComplete="email" required maxLength={320} />
      </label>
      <input type="text" name="_gotcha" className="gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.send}
        </button>
        {status === 'error' && <span className="form-err" role="alert">{f.error}</span>}
      </div>
    </form>
  );
}
