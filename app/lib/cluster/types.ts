/**
 * types.ts — the registers of the Physical AI control engine.
 *
 * Everything the cluster knows about itself is typed here and nowhere else.
 * The pages render these registers; the /api/cluster/* routes serialise
 * them; scripts/verify.sh asserts their invariants against the built site.
 *
 * Vocabulary is closed on purpose. A status outside `Status`, a KPI without
 * a measurement source, or a decision without a date is a compile error.
 */

/** The only six statuses the Group Constitution allows. No seventh. */
export const STATUSES = ['CORE', 'MODULE', 'RESEARCH', 'INTERNAL', 'EXPERIMENT', 'ARCHIVE'] as const;
export type Status = (typeof STATUSES)[number];

/** The three strategic clusters. There is no fourth. */
export const CLUSTERS = ['energy', 'physical-ai', 'operations'] as const;
export type Cluster = (typeof CLUSTERS)[number];

export type Maturity = 'concept' | 'prototype' | 'alpha' | 'beta' | 'production';
export type Grade = 'none' | 'low' | 'medium' | 'high';

export type PublicArtifact =
  | { kind: 'github'; url: string; label: string }
  | { kind: 'pypi'; url: string; label: string }
  | { kind: 'deployment'; url: string; label: string; verified: boolean };

export type RegistryEntry = {
  /** Stable machine id, kebab-case. */
  id: string;
  /** Repository or module path as a visitor would type it. */
  repository: string;
  /** Owning cluster. Entries outside `physical-ai` appear only as boundaries. */
  cluster: Cluster;
  status: Status;
  description: string;
  language: string[];
  /** ISO date of the last commit known to this register (snapshot). */
  lastCommitSnapshot: string | null;
  /** GitHub owner/name when the repository is public, for live metadata. */
  github?: { owner: string; name: string };
  artifacts: PublicArtifact[];
  architecture: string;
  dependencies: string[];
  maturity: Maturity;
  businessHypothesis: string;
  customer: string;
  technicalRole: string;
  duplicateFunctionality: string;
  strategicValue: Grade;
  ipValue: Grade;
  revenuePotential: Grade;
  integrationPotential: Grade;
  securityRisk: Grade;
  regulatory: string;
  /** Why the status is what it is. One sentence a CEO can check. */
  rationale: string;
};

export type Measurement = {
  value: number;
  unit: string;
  /** Where the number comes from — a public artifact, or a dated report. */
  source: string;
  date: string;
};

export type Kpi = {
  id: string;
  name: string;
  definition: string;
  unit: string;
  /** null until a public artifact or dated customer report produces it. */
  measured: Measurement | null;
  /** How the number will be produced. */
  method: string;
};

export type StackLayer = {
  name: string;
  /** 'probabilistic' layers may propose; 'deterministic' layers may refuse. */
  nature: 'probabilistic' | 'deterministic' | 'physical' | 'telemetry';
  role: string;
  /** Where it lives today, if anywhere. */
  today: string;
};

export type Decision = {
  id: string;
  date: string;
  title: string;
  decision: string;
  reason: string;
  reversibleWhen: string;
  affects: string[];
};

export type KillCriterion = { key: string; label: string };

export type KillReview = {
  id: string;
  subject: string;
  /** Which of the six criteria currently fail. */
  failing: string[];
  note: string;
  state: 'REVIEW' | 'FROZEN' | 'ARCHIVED';
  decisionBy: string;
};

export type ResearchItem = {
  topic: string;
  relevance: string;
  baseline: string;
  dataset: string;
  metric: string;
  state: 'OPEN' | 'RUNNING' | 'REPORTED';
};

export type IntelligenceEntry = {
  date: string;
  source: string;
  whatIsNew: string;
  actuallyBetter: string;
  reproducible: string;
  commercialAdvantage: string;
  verdict: 'BUY' | 'BUILD' | 'PARTNER' | 'IGNORE' | 'WATCH';
};

export type ReportSection = { heading: string; body: string };

export type WeeklyReport = {
  week: string;
  date: string;
  sections: ReportSection[];
};

export type Contract = {
  id: string;
  version: string;
  producer: Cluster;
  consumer: Cluster;
  summary: string;
  schema: Record<string, unknown>;
};

export type AgentTool = {
  name: string;
  may: boolean;
  note: string;
};
