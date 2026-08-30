/** @type {import('next').NextConfig} */

// NOTE: next.config.ts requires Next >= 15. This project pins next@14.2.35,
// so the config stays .mjs. Revisit on the Next 15 upgrade (P2).

// The pay.* subdomain redirects straight to the Stripe "pay any amount" link.
// Set STRIPE_PAYMENT_LINK_CUSTOM in Vercel env; until then the redirect
// falls back to /payments so the subdomain never lands on a dead URL.
const PAY_HOST = 'pay.igrimaldi.engineering';
const STRIPE_PAY_LINK =
  process.env.STRIPE_PAYMENT_LINK_CUSTOM || 'https://igrimaldi.engineering/payments';

// Security headers are authoritative in vercel.json (platform edge).
// They are mirrored here so `next start` (CI, self-host) serves identical
// headers and the curl assertions in .github/workflows/ci.yml can run
// without a Vercel deployment. KEEP BOTH IN SYNC.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://raw.githubusercontent.com; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://api.cal.com; frame-src https://cal.com https://app.cal.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://buy.stripe.com; object-src 'none'; upgrade-insecure-requests",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: PAY_HOST }],
        destination: STRIPE_PAY_LINK,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
