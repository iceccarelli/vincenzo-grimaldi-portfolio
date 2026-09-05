/**
 * constitution.ts — the Group Constitution shared by the three clusters,
 * and the mandate lines of this one. Text, not code: the pages render it,
 * /llms.txt quotes it, verify.sh checks that the seven-step gate for new
 * projects appears on the page.
 */

export const clusters = [
  { id: 'energy', name: 'Energy Intelligence', mandate: 'Create the highest-value deep-tech company.', here: false },
  { id: 'physical-ai', name: 'Physical AI & Robotics', mandate: 'Prove whether physical autonomy can create a defensible second moat.', here: true },
  { id: 'operations', name: 'Operations & Commercial Automation', mandate: 'Make money and build distribution.', here: false },
] as const;

export const MANDATE_LINE = 'Prove whether physical autonomy can create a defensible second moat.';

export const firstPrinciple = {
  lead: 'Do not build robots because robots are exciting. Find a repetitive physical task where:',
  conditions: [
    'labour is expensive',
    'task frequency is high',
    'the environment is sufficiently structured',
    'failure cost is understood',
    'automation can be measured',
    'the customer already has budget',
    'deployment is technically feasible',
  ],
};

export const finalRules = [
  'No customer = no scale.',
  'No benchmark = no performance claim.',
  'No ROI = no product.',
  'No safety = no deployment.',
];

export const newProjectGate = ['Customer pain', 'Buyer', 'Money', 'Differentiation', 'Technical feasibility', 'Strategic fit', 'Execution cost'];

export const constitution = {
  rules: [
    'There are exactly three strategic clusters. No agent may create a fourth.',
    'Each cluster owns its domain. Domain logic remains isolated: energy logic is Energy, robotics logic is Robotics, operations logic is Operations.',
    'No repository moves between clusters without a documented reason, commercial benefit, technical benefit, migration cost, dependency impact and CEO approval.',
    'Shared primitives are allowed only when genuinely cross-cluster.',
    'Clusters communicate through versioned APIs, events, schemas, contracts and documented interfaces — never through undocumented database coupling.',
    'A proposed project that fails two or more of the seven gate criteria is archived.',
  ],
  registers: [
    'repository registry', 'architecture map', 'dependency graph', 'decision log', 'kill list', 'roadmap',
    'customer evidence', 'competitive intelligence', 'research backlog', 'weekly KPI report',
  ],
  notRewarded: ['number of commits', 'number of repositories', 'lines of code', 'number of features', 'architectural complexity'],
  rewarded: ['revenue', 'customers', 'deployments', 'measurable ROI', 'technical benchmarks', 'proprietary IP', 'research quality', 'reduced engineering complexity'],
  whenUncertain: ['smaller scope', 'fewer repositories', 'clearer ownership', 'faster customer validation', 'stronger interfaces', 'lower burn', 'higher evidence'],
  allocation:
    'Clusters compete for resources on evidence. Revenue, a signed pilot or contracted value moves the allocation; an impressive demo does not.',
};
