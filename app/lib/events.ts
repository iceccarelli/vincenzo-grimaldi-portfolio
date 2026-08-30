'use client';

import { track } from '@vercel/analytics';

export type SiteEvent = 'book_click' | 'pay_click' | 'form_submit';

/**
 * emit — single funnel-event chokepoint. Wraps @vercel/analytics track();
 * if the analytics script was never mounted (consent declined), track()
 * queues into a window buffer that is never flushed, so nothing leaves
 * the browser. Never throws.
 */
export function emit(name: SiteEvent, data?: Record<string, string | number>) {
  try {
    track(name, data);
  } catch {
    /* analytics unavailable — non-fatal by design */
  }
}
