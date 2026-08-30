/**
 * site.ts — single source of truth for identity, canonical URLs and the
 * commercial offer. Every schema node, metadata block and CTA reads from
 * here so the identity cannot fragment again.
 */

export const SITE_URL = 'https://igrimaldi.engineering';
export const SITE_NAME = 'Vincenzo Grimaldi';
export const LEGAL_NAME = 'Vincenzo Ceccarelli Grimaldi';
export const EMAIL = 'vincenzo@igrimaldi.engineering';
export const JOB_TITLE = 'Physics-Informed Cyber-Physical Systems Engineer';
export const HEADSHOT = `${SITE_URL}/vincenzo_grimaldi_headshot.jpg`;

export const SAME_AS = [
  'https://github.com/iceccarelli',
  'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0',
  'https://physics-informed.vercel.app/',
  'https://engineeringgrimaldi.com/',
  'https://grimaldi.ca/',
];

export const OFFER = {
  consult: { name: 'Engineering consultation (60 min)', price: '280', currency: 'EUR' },
  retainer: { name: 'Advisory retainer (monthly)', price: '3200', currency: 'EUR' },
} as const;

/** Employer-conflict disclosure. Must render in the footer and /impressum. */
export const CONFLICT_EN =
  'Advisory work is independent and outside the scope of my role at DB InfraGO AG. No employer data, systems or confidential information are used.';
export const CONFLICT_DE =
  'Beratungsleistungen erfolgen unabhängig und außerhalb meiner Tätigkeit bei der DB InfraGO AG. Es werden keine Daten, Systeme oder vertraulichen Informationen des Arbeitgebers verwendet.';

export function getPaymentLinks() {
  const real = (v: string | undefined) =>
    !!v && v.startsWith('https://buy.stripe.com/') && !v.includes('REPLACE');
  const mail = (subject: string) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
  const consult = process.env.STRIPE_PAYMENT_LINK_CONSULT;
  const retainer = process.env.STRIPE_PAYMENT_LINK_RETAINER;
  const custom = process.env.STRIPE_PAYMENT_LINK_CUSTOM;
  return {
    consult: {
      href: real(consult) ? (consult as string) : mail('Consultation booking'),
      isStripe: real(consult),
    },
    retainer: {
      href: real(retainer) ? (retainer as string) : mail('Advisory retainer'),
      isStripe: real(retainer),
    },
    invoice: {
      href: real(custom) ? (custom as string) : mail('Invoice payment'),
      isStripe: real(custom),
    },
  };
}

export type PaymentLinks = ReturnType<typeof getPaymentLinks>;

export const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || '';
