/**
 * _json.ts — one response helper for every /api/cluster/* route.
 * Static JSON, cached an hour at the edge, CORS closed (the app-wide
 * Access-Control-Allow-Origin header stays authoritative).
 */
export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

export const GENERATOR = {
  engine: 'igrimaldi.engineering — Physical AI & Robotics cluster control engine',
  cluster: 'physical-ai',
  schemaVersion: '0.1.0',
};
