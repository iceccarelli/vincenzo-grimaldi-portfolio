'use client';

import Image from 'next/image';
import ContactForm from './ContactForm';
import Pipeline from './cluster/Pipeline';
import RegistryTable from './cluster/RegistryTable';
import KpiTable from './cluster/KpiTable';
import StatusBadge from './cluster/StatusBadge';
import { useLanguage } from '../lib/i18n';
import { pick } from '../lib/copy';
import { CITY, SITE_NAME } from '../lib/site';
import { owned, boundaries, REGISTRY_SNAPSHOT_DATE } from '../lib/cluster/registry';
import { palletizerKpis, lidarKpis, countMeasured } from '../lib/cluster/kpis';
import { mission, gate, agentTools } from '../lib/cluster/stack';
import { decisions, killRegister } from '../lib/cluster/decisions';
import { latestReport } from '../lib/cluster/report';
import { firstPrinciple, finalRules } from '../lib/cluster/constitution';
import type { LiveMeta } from '../lib/cluster/github';

/**
 * HomeLanding — the cockpit, read top to bottom.
 *
 *   1. Mandate                6. Safety gate + agent permissions
 *   2. Mission pipeline       7. Latest decisions
 *   3. Status board           8. Weekly report: next experiment, decision required
 *   4. Repository register    9. Boundaries (what is not ours)
 *   5. First target KPIs     10. Operator + enquiry
 *
 * The server renders English; the client adopts DE for the chrome after
 * hydration. Register contents are records and stay in English.
 */
export default function HomeLanding({ meta }: { meta: Record<string, LiveMeta> }) {
  const { locale } = useLanguage();
  const c = pick(locale);

  const core = owned.filter((r) => r.status === 'CORE');
  const measured = countMeasured(palletizerKpis) + countMeasured(lidarKpis);
  const totalKpis = palletizerKpis.length + lidarKpis.length;
  const review = killRegister.filter((k) => k.state === 'REVIEW').length;
  const liveCount = Object.values(meta).filter((m) => m.source === 'live').length;
  const asOf = liveCount > 0 ? Object.values(meta).find((m) => m.source === 'live')?.asOf : REGISTRY_SNAPSHOT_DATE;
  const section = (h: string) => latestReport.sections.find((s) => s.heading === h)?.body ?? '';

  const board: { label: string; value: string; href: string }[] = [
    { label: c.home.board.repositories, value: `${owned.length} · ${core.length} CORE`, href: '/registry' },
    { label: c.home.board.customers, value: '0', href: '/research#customers' },
    { label: c.home.board.deployments, value: '0', href: '/palletizer' },
    { label: c.home.board.kpisMeasured, value: `${measured} / ${totalKpis}`, href: '/palletizer' },
    { label: c.home.board.benchmarks, value: '0', href: '/research' },
    { label: c.home.board.decisions, value: String(decisions.length), href: '/decisions' },
    { label: c.home.board.killReview, value: String(review), href: '/decisions#kill' },
  ];

  return (
    <main className="doc doc-wide">
      <section className="blk blk-first" aria-labelledby="mandate">
        <p className="kicker">{c.home.kicker}</p>
        <h1 id="mandate" className="h1 mandate">{c.home.mandate}</h1>
        <p className="lead">{c.home.lead}</p>
      </section>

      <section className="blk" aria-labelledby="mission">
        <h2 id="mission" className="blk-h">{c.home.missionHeading}</h2>
        <Pipeline stages={mission} label="Mission" />
        <p className="fine">{firstPrinciple.lead}</p>
        <ul className="inline-list">
          {firstPrinciple.conditions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="blk" aria-labelledby="board">
        <h2 id="board" className="blk-h">
          {c.home.boardHeading} <span className="muted h-note">{c.home.boardAsOf} <time dateTime={asOf}>{asOf}</time></span>
        </h2>
        <dl className="board">
          {board.map((b) => (
            <div key={b.label} className="board-cell">
              <dt>{b.label}</dt>
              <dd>
                <a href={b.href}>{b.value}</a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="blk" aria-labelledby="registry">
        <h2 id="registry" className="blk-h">{c.home.registryHeading}</h2>
        <p className="blk-intro">{c.home.registryIntro}</p>
        <RegistryTable entries={owned} meta={meta} compact />
        <p className="blk-more">
          <a href="/registry">{c.home.registryAll} →</a> · <a href="/api/cluster/registry">JSON</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="first">
        <h2 id="first" className="blk-h">{c.home.firstTargetHeading}</h2>
        <p className="blk-intro">{c.home.firstTargetIntro}</p>
        <KpiTable kpis={palletizerKpis} caption="Palletizing KPIs" />
        <p className="blk-more">
          <a href="/palletizer">{c.home.firstTargetAll} →</a> · <a href="/api/cluster/kpis">JSON</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="gate">
        <h2 id="gate" className="blk-h">{c.home.gateHeading}</h2>
        <p className="blk-intro">{c.home.gateIntro}</p>
        <Pipeline stages={gate} label="Safety gate" deterministicFrom={1} />
        <div className="two-col">
          <div>
            <h3 className="sub-h">Agents may</h3>
            <ul className="plain mono-list">
              {agentTools.filter((t) => t.may).map((t) => (
                <li key={t.name}>
                  <code className="path">{t.name}</code>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub-h">Agents may not</h3>
            <ul className="plain mono-list">
              {agentTools.filter((t) => !t.may).map((t) => (
                <li key={t.name}>
                  <code className="path path-no">{t.name}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="blk-more">
          <a href="/architecture">{c.home.gateAll} →</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="decisions">
        <h2 id="decisions" className="blk-h">{c.home.decisionsHeading}</h2>
        <ol className="dec-list">
          {decisions.slice(-3).reverse().map((d) => (
            <li key={d.id}>
              <a href={`/decisions#${d.id}`}>
                <code className="path">{d.id}</code> <span className="dec-title">{d.title}</span>
              </a>
              <time className="muted" dateTime={d.date}>{d.date}</time>
            </li>
          ))}
        </ol>
        <p className="blk-more">
          <a href="/decisions">{c.home.decisionsAll} →</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="report">
        <h2 id="report" className="blk-h">
          {c.home.reportHeading} <span className="muted h-note">{latestReport.week}</span>
        </h2>
        <div className="two-col">
          <div>
            <h3 className="sub-h">{c.home.nextExperiment}</h3>
            <p>{section('Next experiment')}</p>
          </div>
          <div>
            <h3 className="sub-h">{c.home.decisionRequired}</h3>
            <p>{section('Decision required')}</p>
          </div>
        </div>
        <p className="blk-more">
          <a href="/report">{c.home.reportAll} →</a> · <a href="/api/cluster/report">JSON</a>
        </p>
      </section>

      <section className="blk" aria-labelledby="boundary">
        <h2 id="boundary" className="blk-h">{c.home.boundaryHeading}</h2>
        <p className="blk-intro">{c.home.boundaryIntro}</p>
        <ul className="notes">
          {boundaries.map((b) => (
            <li key={b.name}>
              <span className="notes-name">{b.name}</span> <StatusBadge status="INTERNAL" />{' '}
              <span className="muted">{b.owner}</span> — {b.rule}
            </li>
          ))}
        </ul>
        <ul className="inline-list rules">
          {finalRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="blk id-blk" aria-labelledby="operator">
        <h2 id="operator" className="blk-h">{c.home.operatorHeading}</h2>
        <div className="id">
          <div className="id-portrait">
            <Image src="/vincenzo_grimaldi_headshot.jpg" alt="" width={96} height={96} />
          </div>
          <div className="id-text">
            <p className="name name-sm">{SITE_NAME}</p>
            <p className="city">{CITY}</p>
            <p className="role">
              <strong>{c.home.roleLine}</strong> {c.home.roleDetail}
            </p>
            <p className="fine">{c.home.thesisNote} <a href="/work">/work</a> · <a href="/simulator">/simulator</a></p>
          </div>
        </div>
      </section>

      <section className="blk" id="connect" aria-labelledby="enquiry">
        <h2 id="enquiry" className="blk-h">{c.home.formHeading}</h2>
        <p className="blk-intro">{c.home.formIntro}</p>
        <ContactForm compact />
      </section>
    </main>
  );
}
