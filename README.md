# igrimaldi.engineering — Vincenzo Ceccarelli Grimaldi

Personal engineering site and technical register for **Vincenzo Ceccarelli Grimaldi** (Frankfurt am Main, Germany · M.Sc. RWTH Aachen University · ITk Fachspezialist, DB InfraGO AG).

## Focus Areas

- **High-Voltage Grids & Railway Traction Power** (`/grids`) — Substations, bulk transmission corridors, 16.7 Hz / 110 kV railway traction supply, interconnection queues, and 50 Hz synchronous inertia.
- **Electrical Machines & Power Electronics** (`/machines`) — Stator electromagnetics, copper winding thermal paths, grid-scale converters, IEC 61850 protection hardware, and deterministic safety assurance.
- **Physics-Informed Digital Twins** (`/digital-twins`) — Coupling AC power-flow equations, CIM/CGMES network topology, and hybrid state estimation.
- **Technical Articles** (`/articles`) — Domain analyses on 50 Hz inertia, IT/OT convergence in traction power, and AI data-center power capacity envelopes.
- **Runnable Simulator & Public Artifacts** (`/simulator`, `/work`, `/registry`) — RWTH Aachen CIM–ThreMA smart-grid ontology simulator and open-data rail portfolio model.

## Visual Asset Architecture

- `public/images/cool/` — 10 cinematic high-voltage, machine electromagnetics, traction, and simulator plates (`1168×784`).
- `public/images/electrical/` — 10 domain plates across substations, windings, digital twins, inertia, IT/OT, and simulator workspace (`1168×784`).
- `public/images/critical/` — 10 prospect and bottleneck plates covering AI power capacity envelopes, interconnection queues, traction digitisation, and assurance (`1168×784`).
- `public/vincenzo_grimaldi_headshot.jpg` & `public/Vincenzo_Grimaldi_footer_picture_website.jpg` — Optimized MozJPEG portraits.

## Quality & Verification Gates

```bash
npm run typecheck
npm run lint
npm run build
npm run verify
```

Everything on this site is independent of, and outside the scope of, employment at DB InfraGO AG.
