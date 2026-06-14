/** @type {import('next').NextConfig} */

// The pay.* subdomain redirects straight to your Stripe "pay any amount" link.
// Replace STRIPE_PAY_LINK with your real Payment Link, then redeploy.
const PAY_HOST = 'pay.igrimaldi.engineering';
const STRIPE_PAY_LINK = 'https://buy.stripe.com/REPLACE_PAY_ANY_AMOUNT';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
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
