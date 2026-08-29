/**
 * /card.vcf — Vincenzo Grimaldi as a vCard 3.0.
 *
 * One tap on the digital business card and the visitor's phone stores name,
 * title, email, site and every profile of the network. Served with noindex
 * and a canonical Link to /card: it duplicates the card's data, so the HTML
 * page keeps the ranking signal.
 */

export const dynamic = 'force-static';

const CANONICAL = 'https://igrimaldi.engineering/card';

const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Grimaldi;Vincenzo;;;',
  'FN:Vincenzo Grimaldi',
  'TITLE:Physics-Informed Cyber-Physical Systems Engineer',
  'ORG:Grimaldi Engineering',
  'EMAIL;TYPE=WORK:vincenzo@igrimaldi.engineering',
  'URL:https://igrimaldi.engineering/',
  'X-SOCIALPROFILE;TYPE=github:https://github.com/iceccarelli',
  'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0',
  'X-SOCIALPROFILE;TYPE=twitter:https://x.com/Vince87Grimaldi',
  'X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/grimaldiengineering/',
  'NOTE:Deterministic control · Grid intelligence · AI orchestration. The Grimaldi Network: igrimaldi.engineering (software & AI) · engineeringgrimaldi.com (hardware & EE) · grimaldi.ca (personal).',
  'END:VCARD',
  '',
].join('\r\n');

export async function GET(): Promise<Response> {
  return new Response(VCARD, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vincenzo-grimaldi.vcf"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex',
      Link: `<${CANONICAL}>; rel="canonical"`,
      'Access-Control-Allow-Origin': '*',
    },
  });
}
