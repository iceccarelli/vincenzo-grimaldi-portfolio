#!/usr/bin/env node
/**
 * scripts/new-week.mjs — scaffold next week's CEO report at the top of
 * app/lib/cluster/report.ts with the twelve headings in mandate order.
 *
 *   node scripts/new-week.mjs            # ISO week of today
 *   node scripts/new-week.mjs 2026-W37   # explicit week
 *
 * Fills every section with "TODO" so the build cannot ship it silently:
 * scripts/verify.sh fails on the token TODO anywhere on /report.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../app/lib/cluster/report.ts', import.meta.url);
const src = readFileSync(file, 'utf8');

function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const w = Math.ceil(((t - y0) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(w).padStart(2, '0')}`;
}

const week = process.argv[2] ?? isoWeek();
if (src.includes(`week: '${week}'`)) {
  console.error(`report for ${week} already exists`);
  process.exit(1);
}
const sections = [
  'Customer signal', 'Hardware status', 'Robot performance', 'Simulation results', 'Benchmark results',
  'Research developments', 'Competitive threats', 'ROI', 'Failures', 'Killed projects', 'Next experiment', 'Decision required',
];
const today = new Date().toISOString().slice(0, 10);
const block = `  {
    week: '${week}',
    date: '${today}',
    sections: [
${sections.map((h) => `      { heading: '${h}', body: 'TODO' },`).join('\n')}
    ],
  },
`;
const marker = 'export const reports: WeeklyReport[] = [\n';
if (!src.includes(marker)) {
  console.error('marker not found in report.ts');
  process.exit(1);
}
writeFileSync(file, src.replace(marker, marker + block));
console.log(`scaffolded ${week} at the top of app/lib/cluster/report.ts — replace every TODO, then build and verify`);
