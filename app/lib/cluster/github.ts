import { registry, REGISTRY_SNAPSHOT_DATE } from './registry';
import type { RegistryEntry } from './types';

/**
 * github.ts — live metadata for the public repositories in the register.
 *
 * Fail-safe by construction: any error, rate limit or timeout returns the
 * dated snapshot from registry.ts, labelled as such. The page never breaks
 * and never shows a live number it did not get.
 */

export type LiveMeta = {
  id: string;
  source: 'live' | 'snapshot';
  pushedAt: string | null;
  stars: number | null;
  openIssues: number | null;
  defaultBranch: string | null;
  language: string | null;
  asOf: string;
};

const TIMEOUT_MS = 4000;

async function fetchOne(entry: RegistryEntry): Promise<LiveMeta> {
  const snapshot: LiveMeta = {
    id: entry.id,
    source: 'snapshot',
    pushedAt: entry.lastCommitSnapshot,
    stars: null,
    openIssues: null,
    defaultBranch: null,
    language: entry.language[0] ?? null,
    asOf: REGISTRY_SNAPSHOT_DATE,
  };
  if (!entry.github) return snapshot;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`https://api.github.com/repos/${entry.github.owner}/${entry.github.name}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'igrimaldi.engineering-control-engine' },
      next: { revalidate: 3600 },
      signal: ctrl.signal,
    });
    if (!res.ok) return snapshot;
    const j = (await res.json()) as {
      pushed_at?: string;
      stargazers_count?: number;
      open_issues_count?: number;
      default_branch?: string;
      language?: string | null;
    };
    return {
      id: entry.id,
      source: 'live',
      pushedAt: j.pushed_at ? j.pushed_at.slice(0, 10) : snapshot.pushedAt,
      stars: typeof j.stargazers_count === 'number' ? j.stargazers_count : null,
      openIssues: typeof j.open_issues_count === 'number' ? j.open_issues_count : null,
      defaultBranch: j.default_branch ?? null,
      language: j.language ?? snapshot.language,
      asOf: new Date().toISOString().slice(0, 10),
    };
  } catch {
    return snapshot;
  } finally {
    clearTimeout(timer);
  }
}

/** Live metadata for every register entry, keyed by id. Never throws. */
export async function liveMetadata(): Promise<Record<string, LiveMeta>> {
  const results = await Promise.all(registry.map(fetchOne));
  return Object.fromEntries(results.map((r) => [r.id, r]));
}
