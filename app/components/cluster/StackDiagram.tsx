import { stack } from '../../lib/cluster/stack';
import { owned } from '../../lib/cluster/registry';
import type { LayerKey } from '../../lib/cluster/types';

/**
 * StackDiagram — the eleven layers as one column, with what occupies each
 * layer today drawn beside it. Nature is encoded three ways at once: the
 * word in the left band, the fill (ink = deterministic, outline =
 * probabilistic, hatch = physical, dotted = telemetry) and the row order.
 * A layer nothing occupies is drawn hatched and says "not built".
 * Pure SVG, server-rendered, no script.
 */
const W = 900;
const ROW = 52;
const PAD = 16;
const LEFT = 150; // nature band + layer name column
const NAME_W = 200;
const CHIP_W = 124;
const CHIP_GAP = 8;
const H = PAD * 2 + stack.length * ROW + 34;

const byLayer: Record<LayerKey, string[]> = Object.fromEntries(
  stack.map((l) => [l.key, owned.filter((e) => e.layers.includes(l.key)).map((e) => e.id)]),
) as Record<LayerKey, string[]>;

export default function StackDiagram({ compact = false }: { compact?: boolean }) {
  const gateFrom = stack.findIndex((l) => l.key === 'simulator');
  const gateTo = stack.findIndex((l) => l.key === 'controller');
  return (
    <figure className="fig">
      <svg
        className="svg-stack"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="stack-title stack-desc"
        style={{ width: '100%', height: 'auto', maxWidth: compact ? 760 : W }}
      >
        <title id="stack-title">Target stack: eleven layers and what occupies each today</title>
        <desc id="stack-desc">
          {stack.map((l) => `${l.name}: ${byLayer[l.key].length ? byLayer[l.key].join(', ') : 'not built'}`).join('. ')}
        </desc>
        <defs>
          <pattern id="stk-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#DDD9CE" strokeWidth="2" />
          </pattern>
        </defs>

        {stack.map((l, i) => {
          const y = PAD + i * ROW;
          const occupants = byLayer[l.key];
          const det = l.nature === 'deterministic';
          const fill = det ? '#141414' : l.nature === 'physical' ? 'url(#stk-hatch)' : '#FFFCF7';
          const stroke = det ? '#141414' : l.nature === 'telemetry' ? '#5A584F' : '#141414';
          const dash = l.nature === 'telemetry' ? '3 3' : undefined;
          return (
            <g key={l.key}>
              {/* nature band */}
              <text x={PAD} y={y + 30} fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#5A584F" letterSpacing="0.06em">
                {l.nature.toUpperCase()}
              </text>
              {/* layer box */}
              <rect x={LEFT} y={y + 6} width={NAME_W} height={ROW - 12} fill={fill} stroke={stroke} strokeWidth="1.25" strokeDasharray={dash} />
              <text
                x={LEFT + 12}
                y={y + 31}
                fontSize="13.5"
                fontFamily="IBM Plex Sans, Inter, system-ui, sans-serif"
                fontWeight={600}
                fill={det ? '#F7F6F2' : '#141414'}
              >
                {String(i + 1).padStart(2, '0')} {l.key === 'safety' ? 'Safety / constraints' : l.name}
              </text>
              {/* connector to next */}
              {i < stack.length - 1 && (
                <line x1={LEFT + NAME_W / 2} y1={y + ROW - 6} x2={LEFT + NAME_W / 2} y2={y + ROW + 6} stroke="#5A584F" strokeWidth="1" />
              )}
              {/* occupants */}
              {occupants.length ? (
                occupants.map((id, k) => (
                  <g key={id}>
                    <rect x={LEFT + NAME_W + 24 + k * (CHIP_W + CHIP_GAP)} y={y + 14} width={CHIP_W} height={24} fill="#FFFCF7" stroke="#DDD9CE" />
                    <text x={LEFT + NAME_W + 24 + k * (CHIP_W + CHIP_GAP) + 8} y={y + 30} fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#141414">
                      {id.length > 17 ? id.slice(0, 16) + '…' : id}
                    </text>
                    <title>{id}</title>
                  </g>
                ))
              ) : (
                <g>
                  <rect x={LEFT + NAME_W + 24} y={y + 14} width={CHIP_W} height={24} fill="url(#stk-hatch)" stroke="#DDD9CE" />
                  <text x={LEFT + NAME_W + 32} y={y + 30} fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#5A584F">
                    not built
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* gate bracket */}
        <g>
          <path
            d={`M ${LEFT - 14} ${PAD + gateFrom * ROW + 6} h -8 V ${PAD + gateTo * ROW + ROW - 6} h 8`}
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="1.5"
          />
          <text
            x={LEFT - 30}
            y={PAD + ((gateFrom + gateTo + 1) / 2) * ROW}
            fontSize="10"
            fontFamily="IBM Plex Mono, monospace"
            fill="#1E3A5F"
            textAnchor="middle"
            transform={`rotate(-90 ${LEFT - 30} ${PAD + ((gateFrom + gateTo + 1) / 2) * ROW})`}
            letterSpacing="0.08em"
          >
            GATE · MODELS STOP HERE
          </text>
        </g>

        {/* legend */}
        <g fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#5A584F">
          <rect x={LEFT} y={H - 24} width="14" height="10" fill="#FFFCF7" stroke="#141414" />
          <text x={LEFT + 20} y={H - 15}>probabilistic — proposes</text>
          <rect x={LEFT + 190} y={H - 24} width="14" height="10" fill="#141414" />
          <text x={LEFT + 210} y={H - 15}>deterministic — refuses</text>
          <rect x={LEFT + 380} y={H - 24} width="14" height="10" fill="url(#stk-hatch)" stroke="#DDD9CE" />
          <text x={LEFT + 400} y={H - 15}>not built / physical</text>
        </g>
      </svg>
      <figcaption>
        Layers a register entry occupies today are named beside it; hatched means nothing in the cluster occupies that
        layer yet. The bracket marks the deterministic gate.
      </figcaption>
    </figure>
  );
}
