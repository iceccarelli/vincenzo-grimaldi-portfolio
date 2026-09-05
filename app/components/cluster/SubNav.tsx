/**
 * SubNav — the register rail shown on every register page. Same order
 * everywhere; the current register is marked with aria-current.
 */
export const REGISTERS: { href: string; label: string }[] = [
  { href: '/', label: 'Cockpit' },
  { href: '/registry', label: 'Register' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/palletizer', label: 'Palletizer' },
  { href: '/decisions', label: 'Decisions' },
  { href: '/report', label: 'Report' },
  { href: '/research', label: 'Research' },
  { href: '/contracts', label: 'Contracts' },
  { href: '/constitution', label: 'Constitution' },
];

export default function SubNav({ current }: { current: string }) {
  return (
    <nav className="subnav" aria-label="Registers">
      <ol>
        {REGISTERS.map((r) => (
          <li key={r.href}>
            <a href={r.href} aria-current={r.href === current ? 'page' : undefined}>
              {r.label}
            </a>
          </li>
        ))}
      </ol>
      <a className="subnav-json" href="/api/cluster">
        JSON
      </a>
    </nav>
  );
}
