import { ImageResponse } from 'next/og';
import { SITE_NAME, ONE_LINE, CITY } from './lib/site';

/**
 * The share card, generated from the site's own tokens: paper ground,
 * ink name, one line, city. No gradient, no mark, no tagline.
 */

export const runtime = 'nodejs';
export const alt = `${SITE_NAME} — ${ONE_LINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F6F2',
          color: '#141414',
          padding: 72,
          fontFamily: 'serif',
          borderTop: '14px solid #1E3A5F',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 500, letterSpacing: -1, lineHeight: 1.1 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 30, color: '#5A584F', marginTop: 22, fontFamily: 'sans-serif' }}>{ONE_LINE}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'sans-serif', fontSize: 24, color: '#5A584F' }}>
          <div>{CITY}</div>
          <div>igrimaldi.engineering</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
