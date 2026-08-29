import { ImageResponse } from 'next/og';

/**
 * The share card, generated from the brand itself: every link shared to
 * LinkedIn, X, Slack or iMessage renders the Grimaldi mark, the name and
 * the three domains — never a stale exported bitmap.
 */

export const runtime = 'nodejs';
export const alt = 'Vincenzo Grimaldi — Physics-Informed Cyber-Physical Systems Engineer';
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
          background: 'linear-gradient(155deg, #d8c7e3 0%, #b7bce7 42%, #6b83d6 100%)',
          padding: 64,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 28,
            padding: '48px 56px',
            boxShadow: '0 20px 60px rgba(22,25,31,0.25)',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* The Grimaldi mark, drawn inline */}
            <svg width="110" height="110" viewBox="0 0 96 96">
              <defs>
                <linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#7a52f4" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="92" height="92" rx="22" fill="#161e2d" />
              <path d="M 24 28 L 37 58 L 50 28" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 77.3 34.7 A 16 16 0 1 0 82 46 L 69 46" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 22 76 q 6.5 -9 13 0 t 13 0 t 13 0 t 13 0" fill="none" stroke="url(#f)" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: '#16191f', letterSpacing: -1.5 }}>Vincenzo Grimaldi</div>
              <div style={{ fontSize: 27, fontWeight: 600, color: '#0972d3', marginTop: 6 }}>
                Physics-Informed Cyber-Physical Systems Engineer
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 26, color: '#414d5c' }}>
              Deterministic control · Grid intelligence · AI orchestration
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {['igrimaldi.engineering', 'engineeringgrimaldi.com', 'grimaldi.ca'].map((d) => (
                <div
                  key={d}
                  style={{
                    display: 'flex',
                    fontSize: 21,
                    fontWeight: 700,
                    color: '#161e2d',
                    background: '#f2f3f3',
                    border: '1px solid #d1d5db',
                    borderRadius: 999,
                    padding: '10px 22px',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
