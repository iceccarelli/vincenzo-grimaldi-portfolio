import { NextResponse } from 'next/server';
import { EMAIL, SITE_URL } from '../../lib/site';

export const runtime = 'nodejs';

/**
 * POST /api/contact — first-party relay for the advisory enquiry form via
 * Resend's REST API (no SDK dependency).
 *
 * Accepts JSON (the hydrated form) or application/x-www-form-urlencoded
 * (the same form with JavaScript disabled). JSON callers get status codes;
 * form callers get a 303 back to /connect with a `sent` flag so the page
 * can say what happened.
 *
 *   200 {ok:true}               — relayed
 *   400 {error}                 — validation failure
 *   429 {error}                 — rate-limited
 *   503 {error:'unconfigured'}  — RESEND_API_KEY / CONTACT_TO_EMAIL unset;
 *                                 the client falls back to a mailto.
 *
 * Rate limit is per-instance in-memory (serverless: best-effort). The
 * honeypot field `_gotcha` returns a fake success so bots learn nothing.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

type Fields = {
  name: string;
  email: string;
  organisation: string;
  constraint: string;
  gotcha: string;
};

async function readFields(request: Request): Promise<{ fields: Fields; isForm: boolean } | null> {
  const type = request.headers.get('content-type') || '';
  const str = (v: unknown) => String(v ?? '').trim();
  if (type.includes('application/json')) {
    try {
      const b = (await request.json()) as Record<string, unknown>;
      return {
        isForm: false,
        fields: {
          name: str(b.name),
          email: str(b.email),
          organisation: str(b.organisation ?? b.company),
          constraint: str(b.constraint ?? b.message),
          gotcha: str(b._gotcha),
        },
      };
    } catch {
      return null;
    }
  }
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    try {
      const d = await request.formData();
      return {
        isForm: true,
        fields: {
          name: str(d.get('name')),
          email: str(d.get('email')),
          organisation: str(d.get('organisation')),
          constraint: str(d.get('constraint')),
          gotcha: str(d.get('_gotcha')),
        },
      };
    } catch {
      return null;
    }
  }
  return null;
}

function answer(
  request: Request,
  isForm: boolean,
  code: number,
  body: Record<string, unknown>,
  flag: string,
) {
  if (isForm) {
    return NextResponse.redirect(new URL(`/connect?sent=${flag}`, request.url), { status: 303 });
  }
  return NextResponse.json(body, { status: code });
}

export async function POST(request: Request) {
  const parsed = await readFields(request);
  if (!parsed) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  const { fields, isForm } = parsed;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || `noreply@${new URL(SITE_URL).host}`;

  if (!apiKey || !to) {
    return answer(request, isForm, 503, { error: 'unconfigured', mailto: EMAIL }, 'unconfigured');
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return answer(request, isForm, 429, { error: 'rate_limited' }, 'error');
  }

  // Honeypot: pretend success, send nothing.
  if (fields.gotcha.length > 0) {
    return answer(request, isForm, 200, { ok: true }, 'ok');
  }

  const name = fields.name.slice(0, 200);
  const email = fields.email.slice(0, 320);
  const organisation = fields.organisation.slice(0, 200);
  const constraint = fields.constraint.slice(0, 5000);

  if (!name || !constraint || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return answer(request, isForm, 400, { error: 'validation' }, 'error');
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Advisory enquiry <${from}>`,
      to: [to],
      reply_to: email,
      subject: `Advisory enquiry — ${name}${organisation ? ` (${organisation})` : ''}`,
      text: `Constraint:\n${constraint}\n\n— ${name} <${email}>${organisation ? `, ${organisation}` : ''}`,
    }),
  });

  if (!res.ok) {
    return answer(request, isForm, 502, { error: 'relay_failed' }, 'error');
  }
  return answer(request, isForm, 200, { ok: true }, 'ok');
}
