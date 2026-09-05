import HomeLanding from './components/HomeLanding';
import { liveMetadata } from './lib/cluster/github';

/**
 * app/page.tsx — the cluster cockpit. The server fetches live GitHub
 * metadata for the public repositories (fail-safe to the dated snapshot)
 * and hands it to the client component, which only chooses the language
 * of the chrome. No payment configuration, no third-party scripts.
 */
export const revalidate = 3600;

export default async function Home() {
  const meta = await liveMetadata();
  return <HomeLanding meta={meta} />;
}
