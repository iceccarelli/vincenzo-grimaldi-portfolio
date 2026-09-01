import type { Locale } from './i18n';

/**
 * status.ts — the ONE status vocabulary for every artefact on this domain.
 *
 * Rule: wherever an artefact (repo, deployment, product, manuscript) appears,
 * it carries one of these badges. A badge is a claim a stranger can check:
 *
 *   SHIPPED          — public, versioned, in use.
 *   SHIPPED DEMO     — public deployment that computes something real, not a product.
 *   PILOT            — public repo/site, recruiting or running a scoped pilot.
 *   CLIENT BUILD     — built for a third party; not this domain's product.
 *   RESEARCH         — thesis / paper background; not a runnable claim here.
 *   IN REVISION      — manuscript or document, not final.
 *   PARKED           — exists as an idea or a private tree; nothing to open.
 *   404-DO-NOT-LINK  — a URL that was claimed and does not resolve; never rendered as a link.
 */
export type Status =
  | 'SHIPPED'
  | 'SHIPPED DEMO'
  | 'PILOT'
  | 'CLIENT BUILD'
  | 'RESEARCH'
  | 'IN REVISION'
  | 'PARKED'
  | '404-DO-NOT-LINK';

export const STATUS_LABEL: Record<Status, Record<Locale, string>> = {
  SHIPPED: { en: 'SHIPPED', es: 'ENTREGADO', de: 'AUSGELIEFERT', zh: '已发布' },
  'SHIPPED DEMO': { en: 'SHIPPED DEMO', es: 'DEMO ENTREGADA', de: 'DEMO LIVE', zh: '已发布演示' },
  PILOT: { en: 'PILOT', es: 'PILOTO', de: 'PILOT', zh: '试点' },
  'CLIENT BUILD': { en: 'CLIENT BUILD', es: 'PROYECTO CLIENTE', de: 'KUNDENPROJEKT', zh: '客户项目' },
  RESEARCH: { en: 'RESEARCH', es: 'INVESTIGACIÓN', de: 'FORSCHUNG', zh: '研究' },
  'IN REVISION': { en: 'IN REVISION', es: 'EN REVISIÓN', de: 'IN ÜBERARBEITUNG', zh: '修订中' },
  PARKED: { en: 'PARKED', es: 'APARCADO', de: 'GEPARKT', zh: '搁置' },
  '404-DO-NOT-LINK': { en: '404 — NOT LINKED', es: '404 — SIN ENLACE', de: '404 — NICHT VERLINKT', zh: '404 — 不链接' },
};

/** CSS modifier per status (see globals.css `.status-badge--*`). */
export const STATUS_TONE: Record<Status, 'ship' | 'demo' | 'pilot' | 'client' | 'research' | 'revision' | 'parked' | 'dead'> = {
  SHIPPED: 'ship',
  'SHIPPED DEMO': 'demo',
  PILOT: 'pilot',
  'CLIENT BUILD': 'client',
  RESEARCH: 'research',
  'IN REVISION': 'revision',
  PARKED: 'parked',
  '404-DO-NOT-LINK': 'dead',
};

/**
 * GitHub paths that were claimed on this domain and returned 404 on the
 * 2026-09-01 inspection. They are never rendered as links. Remove an entry
 * ONLY after `curl -sI https://github.com/iceccarelli/<name>` returns 200.
 */
export const GITHUB_404 = [
  'GridOS',
  'neuralbridge',
  'derim-middleware',
  'robot-lidar-fusion',
  'physics-informed',
] as const;

export function isDeadGithubUrl(url: string | undefined): boolean {
  if (!url) return false;
  return GITHUB_404.some((name) =>
    url.toLowerCase().startsWith(`https://github.com/iceccarelli/${name.toLowerCase()}`),
  );
}

/** Returns the URL only if it is safe to render as a link on this domain. */
export function linkable(url: string | undefined): string | undefined {
  if (!url || isDeadGithubUrl(url)) return undefined;
  return url;
}
