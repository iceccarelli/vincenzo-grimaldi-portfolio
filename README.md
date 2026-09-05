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

## Rules the code enforces

- **Closed vocabulary.** A status is one of `CORE MODULE RESEARCH INTERNAL EXPERIMENT ARCHIVE` (`app/lib/cluster/types.ts`). A seventh is a compile error and a `verify.sh` failure.
- **No number without a source.** A KPI is `measured: null` until a public artifact or a dated customer report produces it; pages print a dash, never a target.
- **No 404 as a product.** A private repository is `INTERNAL`/`RESEARCH` and is never linked as if public (`robot-lidar-fusion` is PyPI-only; the register says so).
- **Boundaries stay outside.** FloorForge, PaintForge and DryForge appear only as boundaries owned by Operations; `verify.sh` fails if one gains a register page.
- **Probabilistic ≠ deterministic.** Every physical action passes `PLAN → SIMULATE → VALIDATE → AUTHORIZE → EXECUTE → VERIFY`; no agent tool exists that bypasses it (`app/lib/cluster/stack.ts`).
- **No commerce, no performance marketing.** `scripts/verify.sh` bans payment scripts, prices, and unbenchmarked phrases on every register page.
- **Fail-safe live data.** Public repositories refresh last-commit dates from GitHub at build/ISR time; any error falls back to the dated snapshot, labelled `snapshot`.

## Where things live

```
app/lib/cluster/
  types.ts        closed vocabularies and register types
  registry.ts     repository register + boundaries (snapshot date inside)
  kpis.ts         12 palletizing KPIs, 6 LiDAR metrics — definitions and measurements
  stack.ts        11-layer stack, mission, gate, agent tools, abstraction tests
  decisions.ts    decision log, kill criteria, kill register
  research.ts     research program, watchlist, intelligence log, customer questions
  report.ts       weekly CEO reports (newest first)
  contracts.ts    cross-cluster event contracts as JSON Schema
  constitution.ts Group Constitution + mandate text
  github.ts       fail-safe live metadata
app/api/cluster/  JSON routes for every register
app/lib/work.ts   grid / traction-power case studies (kept)
scripts/verify.sh acceptance contract (same command locally and against production)
```

## Weekly cycle

1. Edit the registers in `app/lib/cluster/*.ts` (new report at the top of `report.ts`; new decisions with reversal conditions; kill-register states only with a matching decision).
2. `npm run build && npm run start & sleep 6 && npm run verify`.
3. Push. CI runs typecheck, lint, build, `verify.sh`, axe on 18 routes, and Lighthouse.

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
