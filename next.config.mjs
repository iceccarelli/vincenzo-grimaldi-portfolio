/** @type {import('next').NextConfig} */

// NOTE: next.config.ts requires Next >= 15. This project pins next@14.2.35,
// so the config stays .mjs. Revisit on the Next 15 upgrade (P2).

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
  { key: 'Access-Control-Allow-Origin', value: 'https://igrimaldi.engineering' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Parked routes. Nothing commercial is served on this host; the old
  // addresses resolve to the nearest document instead of a 404.
  async redirects() {
    return [
      { source: '/payments', destination: '/connect', permanent: true },
      { source: '/cluster', destination: '/', permanent: true },
      { source: '/cluster/:path*', destination: '/:path*', permanent: true },
      { source: '/kill-list', destination: '/decisions#kill', permanent: true },
      { source: '/roadmap', destination: '/research', permanent: true },
      { source: '/capabilities', destination: '/work', permanent: true },
      { source: '/capabilities/:path*', destination: '/work', permanent: true },
      { source: '/work/palletizer-os', destination: '/palletizer', permanent: true },
      { source: '/work/gridos', destination: '/work', permanent: true },
    ];
  },
};

export default nextConfig;
