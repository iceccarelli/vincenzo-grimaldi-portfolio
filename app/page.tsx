import HomeLanding from './components/HomeLanding';

/**
 * app/page.tsx — the homepage. Static, no environment reads, no payment
 * configuration, no third-party scripts. Everything a visitor needs is in
 * the HTML.
 */
export const revalidate = 3600;

export default function Home() {
  return <HomeLanding />;
}
