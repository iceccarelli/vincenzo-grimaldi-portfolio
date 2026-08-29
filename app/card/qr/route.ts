import QRCode from 'qrcode';

/**
 * /card/qr — the QR code of the digital business card, as SVG.
 *
 * Generated at build time by the site itself, so it can never drift from the
 * card's real URL the way a printed or hand-exported code would.
 */

export const dynamic = 'force-static';

const CARD_URL = 'https://igrimaldi.engineering/card';

export async function GET(): Promise<Response> {
  const svg = await QRCode.toString(CARD_URL, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 512,
    color: { dark: '#161e2d', light: '#ffffff' },
  });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex',
      Link: `<${CARD_URL}>; rel="canonical"`,
    },
  });
}
