import HomeLanding from './components/HomeLanding';
import { getPaymentLinks } from './lib/site';

/**
 * app/page.tsx — server shell for the homepage. Reads the Stripe Payment
 * Link env vars on the server and injects them into the client landing,
 * so no payment configuration ships as NEXT_PUBLIC_ globals.
 */
export const revalidate = 3600;

export default function Home() {
  return <HomeLanding links={getPaymentLinks()} />;
}
