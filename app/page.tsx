import HomeLanding from './components/HomeLanding';
import { getPaymentLinks } from './lib/site';
import { getValidation } from './lib/validation';

/**
 * app/page.tsx — server shell for the homepage. Reads the Stripe Payment
 * Link env vars on the server and fetches the explorer's validation report
 * (with a dated snapshot fallback), then injects both into the client
 * landing so no payment configuration ships as NEXT_PUBLIC_ globals.
 */
export const revalidate = 3600;

export default async function Home() {
  const validation = await getValidation();
  return <HomeLanding links={getPaymentLinks()} validation={validation} />;
}
