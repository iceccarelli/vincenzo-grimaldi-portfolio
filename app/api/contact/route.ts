import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/contact — first-party contact form backend via Resend's REST
 * API (no SDK dependency). Returns:
 *   200 {ok:true}          — relayed
 *   400 {error}            — validation failure
 *   429 {error}            — rate-limited
 *   503 {error:'unconfigured'} — RESEND_API_KEY missing; the client falls
 *                                back to a pre-filled mailto.
 *
 * Rate limit is per-instance in-memory (serverless: best-effort). The
 * honeypot field `_gotcha` returns a fake 200 so bots learn nothing.
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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'noreply@igrimaldi.engineering';

  if (!apiKey || !to) {
    return NextResponse.json({ error: 'unconfigured' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (typeof body._gotcha === 'string' && body._gotcha.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().slice(0, 320);
  const company = String(body.company ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Portfolio contact <${from}>`,
      to: [to],
      reply_to: email,
      subject: `Portfolio contact — ${name}${company ? ` (${company})` : ''}`,
      text: `${message}\n\n— ${name} <${email}> ${company}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'relay_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
