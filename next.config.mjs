/** @type {import('next').NextConfig} */

// Security headers are authoritative in vercel.json (platform edge).
// Mirrored here so `next start` (CI, local verification) serves identical headers.
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
  async redirects() {
    return [
      { source: '/payments', destination: '/connect', permanent: true },
      { source: '/cluster', destination: '/', permanent: true },
      { source: '/cluster/:path*', destination: '/:path*', permanent: true },
      { source: '/palletizer', destination: '/machines', permanent: true },
      { source: '/work/palletizer-os', destination: '/machines', permanent: true },
      { source: '/registry/palletizer', destination: '/registry', permanent: true },
      { source: '/registry/robot-lidar-fusion', destination: '/registry', permanent: true },
      { source: '/registry/autonomous-inspection', destination: '/registry', permanent: true },
      { source: '/registry/tamp-core', destination: '/registry', permanent: true },
      { source: '/architecture', destination: '/digital-twins', permanent: true },
      { source: '/constitution', destination: '/digital-twins', permanent: true },
      { source: '/contracts', destination: '/digital-twins', permanent: true },
      { source: '/decisions', destination: '/registry', permanent: true },
      { source: '/kill-list', destination: '/registry', permanent: true },
      { source: '/report', destination: '/articles', permanent: true },
      { source: '/report.md', destination: '/llms.txt', permanent: true },
      { source: '/research', destination: '/articles', permanent: true },
      { source: '/roadmap', destination: '/articles', permanent: true },
      { source: '/capabilities', destination: '/work', permanent: true },
      { source: '/capabilities/:path*', destination: '/work', permanent: true },
      { source: '/work/gridos', destination: '/work', permanent: true },
      { source: '/api/cluster', destination: '/api/register', permanent: true },
      { source: '/api/cluster/:path*', destination: '/api/register', permanent: true },
    ];
  },
};

export default nextConfig;
