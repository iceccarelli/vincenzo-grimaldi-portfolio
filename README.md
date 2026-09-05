# igrimaldi.engineering — Physical AI & Robotics cluster control engine

> **Mandate:** Prove whether physical autonomy can create a defensible second moat.

This repository is the control and integration engine of the **Physical AI & Robotics** cluster — one of three strategic clusters (Energy Intelligence · Physical AI & Robotics · Operations & Commercial Automation) that share one [Group Constitution](https://igrimaldi.engineering/constitution). It publishes the cluster's registers as pages and as JSON, so the CEO layer, the other two cluster agents, procurement teams and AI crawlers read the same words.

Operated by Vincenzo Ceccarelli Grimaldi, Frankfurt am Main. Everything here is independent of, and outside the scope of, his role at DB InfraGO AG. Nothing on this host is for sale.

[![Live](https://img.shields.io/badge/live-igrimaldi.engineering-141414)](https://igrimaldi.engineering/)
[![CI](https://github.com/iceccarelli/vincenzo-grimaldi-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/iceccarelli/vincenzo-grimaldi-portfolio/actions/workflows/ci.yml)

## Registers

| Register | Page | JSON |
| --- | --- | --- |
| Cockpit (mandate, mission, status board, gate) | [/](https://igrimaldi.engineering/) | [/api/cluster](https://igrimaldi.engineering/api/cluster) |
| Repository register | [/registry](https://igrimaldi.engineering/registry), `/registry/[id]` | [/api/cluster/registry](https://igrimaldi.engineering/api/cluster/registry) |
| Target architecture, safety gate, agent permissions, abstraction tests | [/architecture](https://igrimaldi.engineering/architecture) | — |
| First target: palletizing KPIs, LiDAR-fusion metrics, inspection chain | [/palletizer](https://igrimaldi.engineering/palletizer) | [/api/cluster/kpis](https://igrimaldi.engineering/api/cluster/kpis) |
| Decision log and kill register | [/decisions](https://igrimaldi.engineering/decisions) | [/api/cluster/decisions](https://igrimaldi.engineering/api/cluster/decisions) |
| Weekly CEO report (12 fixed sections) | [/report](https://igrimaldi.engineering/report) | [/api/cluster/report](https://igrimaldi.engineering/api/cluster/report) |
| Research program, intelligence log, customer validation | [/research](https://igrimaldi.engineering/research) | — |
| Cross-cluster contracts (JSON Schema) | [/contracts](https://igrimaldi.engineering/contracts) | [/api/cluster/contracts](https://igrimaldi.engineering/api/cluster/contracts) |
| Group Constitution and mandate | [/constitution](https://igrimaldi.engineering/constitution) | — |
| Grid / traction-power work (thesis simulator, public-dataset app) | [/work](https://igrimaldi.engineering/work), [/simulator](https://igrimaldi.engineering/simulator) | — |
| Machine brief for AI agents | [/llms.txt](https://igrimaldi.engineering/llms.txt) | — |

## Visuals — drawn from the registers, never pasted

Every picture is computed at render time from `app/lib/cluster/*.ts`, so it cannot drift from the data: the eleven-layer **stack diagram** with what occupies each layer today (hatched = not built) and the deterministic gate bracket; the **mission coverage** grid (which entry's existing code covers PERCEIVE → LEARN — ACT, RECOVER and LEARN are empty, honestly); the **dependency graph** computed from `dependsOn`; the **KPI strip** (12 hatched cells until a number exists); the **evidence timeline** (PyPI releases, commits, decisions, due dates — each with its source) and the **test-suite map** onto the stack; the **status distribution bar**; the **contract flow** between the three clusters. All SVG/HTML, no chart library, every figure with a text description, axe-clean at 1280 and 390 px.

## Rules the code enforces

- **Closed vocabulary.** A status is one of `CORE MODULE RESEARCH INTERNAL EXPERIMENT ARCHIVE` (`app/lib/cluster/types.ts`). A seventh is a compile error and a `verify.sh` failure.
- **No number without a source.** A KPI is `measured: null` until a public artifact or a dated customer report produces it; pages print a dash, never a target.
- **No 404 as a product.** A private repository is `INTERNAL`/`RESEARCH` and is never linked as if public (`robot-lidar-fusion` is PyPI-only; the register says so).
- **Boundaries stay outside.** FloorForge, PaintForge and DryForge appear only as boundaries owned by Operations; `verify.sh` fails if one gains a register page.
- **Probabilistic ≠ deterministic.** Every physical action passes `PLAN → SIMULATE → VALIDATE → AUTHORIZE → EXECUTE → VERIFY`; no agent tool exists that bypasses it (`app/lib/cluster/stack.ts`).
- **No commerce, no performance marketing.** `scripts/verify.sh` bans payment scripts, prices, and unbenchmarked phrases on every register page.
- **Fail-safe live data.** Public repositories refresh last-commit dates from GitHub at build/ISR time; any error falls back to the dated snapshot, labelled `snapshot`. Set `GITHUB_TOKEN` (fine-grained, no scopes) in Vercel to lift the anonymous 60 req/h limit.
- **Graph integrity.** `verify.sh` fails on a dangling `dependsOn`, an unknown mission stage or stack layer, a figure without a `<desc>`, or a `TODO` left by the weekly scaffold.

## Where things live

```
app/lib/cluster/
  types.ts        closed vocabularies (statuses, mission stages, stack layers) and register types
  evidence.ts     dated timeline (with sources) + test-suite map
  registry.ts     repository register + boundaries (snapshot date inside)
  kpis.ts         12 palletizing KPIs, 6 LiDAR metrics — definitions and measurements
  stack.ts        11-layer stack, mission, gate, agent tools, abstraction tests
  decisions.ts    decision log, kill criteria, kill register
  research.ts     research program, watchlist, intelligence log, customer questions
  report.ts       weekly CEO reports (newest first)
  contracts.ts    cross-cluster event contracts as JSON Schema
  constitution.ts Group Constitution + mandate text
  github.ts       fail-safe live metadata
app/api/cluster/  JSON routes for every register (+ /api/cluster/registry/<id>)
app/report.md/    latest weekly report as Markdown
app/components/cluster/  StatusBadge, Pipeline, RegistryTable, KpiTable, SubNav, StackDiagram,
                  MissionCoverage, DependencyGraph, KpiCoverage, Timeline, ContractFlow, EvidenceGrid, StatusBar
scripts/new-week.mjs  scaffold next week's report (12 headings, TODO bodies that verify.sh refuses to ship)
app/lib/work.ts   grid / traction-power case studies (kept)
scripts/verify.sh acceptance contract (same command locally and against production)
```

## Weekly cycle

1. `node scripts/new-week.mjs` — scaffolds the next report at the top of `report.ts`. Replace every `TODO`.
2. Edit the other registers as needed (`decisions.ts` with reversal conditions; kill-register states only with a matching decision; `kpis.ts` a `measured` object only with `source` + `date`; `evidence.ts` for dated events with sources).
3. `npm run build && npm run start & sleep 6 && npm run verify`.
4. Push. CI runs typecheck, lint, build, `verify.sh` (126 contracts), axe on 18 routes, Lighthouse on 6.
5. Paste `/report.md` into the CEO mail; the same words are on `/report` and `/api/cluster/report`.

## Run locally

```bash
git clone https://github.com/iceccarelli/vincenzo-grimaldi-portfolio.git
cd vincenzo-grimaldi-portfolio
npm ci
npm run dev      # http://localhost:3000
```

Next.js 14.2 App Router · TypeScript · deployed on Vercel.

## Contact

vincenzo@igrimaldi.engineering · [github.com/iceccarelli](https://github.com/iceccarelli) · Frankfurt am Main

## License

Code: MIT. Register contents (`app/lib/cluster/*.ts`, `/api/cluster/*`): CC BY 4.0.
