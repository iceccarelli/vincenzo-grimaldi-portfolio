'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

// 1. Create a free form at formspree.io → paste its ID (the part after /f/) below.
const FORMSPREE_ID = 'REPLACE_FORMSPREE_ID';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
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
        <CheckCircle2 size={22} /> <span>Thanks — your message is in. I&apos;ll reply within one business day.</span>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-row">
        <input className="contact-input" name="name" type="text" placeholder="Your name" required />
        <input className="contact-input" name="email" type="email" placeholder="Your email" required />
      </div>
      <input className="contact-input" name="company" type="text" placeholder="Company / organisation (optional)" />
      <textarea className="contact-input" name="message" rows={4} placeholder="What would you like to build or discuss?" required />
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <button className="primary-button contact-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <>Send message <Send size={16} /></>}
      </button>
      {status === 'error' && (
        <p className="contact-error"><AlertCircle size={15} /> Something went wrong. Email vincenzo@igrimaldi.engineering directly.</p>
      )}
    </form>
  );
}
