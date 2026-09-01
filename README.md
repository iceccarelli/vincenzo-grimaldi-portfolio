# igrimaldi.engineering

**Physics-constrained intelligence for grids and traction power.**
*Residuals you can check. Agents you can audit. Patterns from live HV rail assets — sanitized.*

[![Live site](https://img.shields.io/badge/Live-igrimaldi.engineering-38bdf8?style=for-the-badge)](https://igrimaldi.engineering/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GitHub](https://img.shields.io/badge/GitHub-iceccarelli-black?style=for-the-badge&logo=github)](https://github.com/iceccarelli)

---

## What this domain is

The vendor site of Vincenzo Ceccarelli Grimaldi for **grids, traction power and verification**. One live instrument (an in-browser IEEE 9-bus DC power flow that reproduces the explorer's analytical solution and prints its residual), one paid door (a €280 / 60-min teardown), and a capability register gated to artefacts a stranger can open.

Identity split across the network (never blurred):

- igrimaldi.engineering — verifiable intelligence for grids and traction power
- engineeringgrimaldi.com — one trade cell, shipped and measured
- grimaldi.ca — logbook, podcast, reviews, books
- github.com/iceccarelli — clone or it does not exist

## Routes

| Route | Purpose |
|---|---|
| `/` | H1 + live instrument + €280 teardown CTA; three proof chips |
| `/work` | Capability register — only 200-URL, honestly badged, on-niche artefacts |
| `/simulator` | In-browser IEEE 9-bus DC solver, deep link to the explorer, residual table, "what this is not" |
| `/advisory` | €280 teardown · €3,200 monthly (only after a teardown) · pilot · scope boundaries |
| `/network` | One line + one verb per address |
| `/ventures` | Client builds and off-niche work (Palletizer, Plastilonas, ecowoods-app, Bahn PM) |
| `/lab` | Parked: GridOS, NeuralBridge, DERIM, robot-lidar-fusion, mcp-foundry, Forge vapor |
| `/books` | Pointer to grimaldi.ca/books |
| `/capabilities` `/payments` `/connect` `/card` `/impressum` `/datenschutz` | kept |

Every artefact carries a status badge (`app/lib/status.ts`): SHIPPED · SHIPPED DEMO · PILOT · CLIENT BUILD · RESEARCH · IN REVISION · PARKED · 404-DO-NOT-LINK.

## Honesty rules enforced in code

- A GitHub path that returned 404 on 2026-09-01 (`GridOS`, `neuralbridge`, `derim-middleware`, `robot-lidar-fusion`, `physics-informed`) is never rendered as a link (`linkable()` in `app/lib/status.ts`). Remove a name from `GITHUB_404` only after `curl -sI https://github.com/iceccarelli/<name>` returns 200.
- Residual numbers come from the explorer's machine-readable report (`app/lib/validation.ts`): fetched at build/revalidate, with a dated snapshot fallback. The UI says which one it is showing.
- `scripts/verify.sh` fails the build if the homepage links a 404 path, loses the H1 sentence, loses the server-rendered instrument, or mentions Peru / paint / orbital / any banned phrase.

## The instrument

`app/lib/ieee9.ts` — DC power flow on the IEEE 9-bus (WSCC) system, same data as [physics-informed.vercel.app/demos](https://physics-informed.vercel.app/demos). Default injections reproduce that page's angles, flows and the 4.44e-16 p.u. balance residual. Trip a line: the six ring lines stay solvable, the three generator step-ups island — 6/9 secure, matching the explorer's N-1 result.

## Experience (context, not a product)

**ITk Fachspezialist — Digitisation of high-voltage assets** · DB InfraGO AG · Aug 2024 – present · Frankfurt
Railway traction HV grids, IT/OT, KRITIS-aligned cybersecurity governance. Advisory work is independent; no employer data, topologies or systems are used.

**Industrial Engineering Intern — HV maintenance** · DB Fahrzeuginstandhaltung GmbH & DB Netz AG · Jun 2022 – Sep 2024

**RWTH Aachen University** — M.Sc. 2025. Thesis: *Data Modeling in a Cross-domain Ontology for Cyber Intelligence in Smart-Grids Using Reinforcement Learning* (CIM–ThreMA + RL, IEEE 9-bus cyber testbed). Background, not what the explorer currently validates.

---

## Run locally

```bash
git clone https://github.com/iceccarelli/vincenzo-grimaldi-portfolio.git
cd vincenzo-grimaldi-portfolio
npm install
npm run dev      # http://localhost:3000
```

Next.js 14.2 App Router · TypeScript · Tailwind CSS · deployed on Vercel.

---

## Contact

- **Site**: [igrimaldi.engineering](https://igrimaldi.engineering/)
- **Email**: vincenzo@igrimaldi.engineering
- **GitHub**: [github.com/iceccarelli](https://github.com/iceccarelli)
- **Base**: Frankfurt, Germany

---

## License

MIT — feel free to use the structure as inspiration; please attribute the original work.
