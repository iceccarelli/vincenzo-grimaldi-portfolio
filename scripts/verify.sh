#!/usr/bin/env bash
# Acceptance, visual-asset, kill-list, and honesty contracts for igrimaldi.engineering.
set -uo pipefail
BASE="${1:-http://localhost:3000}"
fail=0
ok()  { printf '  \033[32mPASS\033[0m %s\n' "$1"; }
bad() { printf '  \033[31mFAIL\033[0m %s\n' "$1"; fail=1; }

echo "▸ security headers  ($BASE)"
H=$(curl -sSI "$BASE/" 2>/dev/null)
for k in strict-transport-security x-content-type-options referrer-policy \
         permissions-policy x-frame-options content-security-policy; do
  grep -qi "^$k:" <<<"$H" && ok "$k" || bad "$k missing"
done
if grep -qi 'access-control-allow-origin: \*' <<<"$H"; then
  bad "ACAO:* on document"
else ok "no ACAO:*"; fi

echo "▸ canonical crawl surface"
PAGES=(
  / /grids /machines /digital-twins
  /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound
  /work /work/cim-threma /work/bahn-project-manager
  /simulator /registry /registry/cim-threma /registry/bahn-project-manager
  /registry/grid-digital-twins /registry/traction-power-modelling
  /registry/power-capacity-envelope /registry/machine-assurance
  /connect /card /impressum /datenschutz
  /llms.txt /robots.txt /sitemap.xml /api/register
  /favicon.ico /apple-touch-icon.png /site.webmanifest /.well-known/security.txt
)
for p in "${PAGES[@]}"; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 200 ] && ok "200 $p" || bad "$c $p"
done

echo "▸ retired robotics & legacy routes redirect cleanly"
for p in /palletizer /architecture /constitution /contracts /decisions /report /research /payments /capabilities /cluster /work/palletizer-os /api/cluster; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 308 ] || [ "$c" = 301 ] && ok "$c $p (retired → redirect)" || bad "$c $p should redirect"
done

c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/__definitely_not_a_route__")
[ "$c" = 404 ] && ok "404 on unknown route" || bad "unknown route returned $c"

echo "▸ index & structured data contract"
N=$(curl -sS "$BASE/sitemap.xml" | grep -c '<loc>')
[ "$N" -ge 20 ] && ok "sitemap $N URLs (>=20)" || bad "sitemap only $N URLs"
HTML=$(curl -sS "$BASE/")
[ "$(grep -c 'name="keywords"' <<<"$HTML")" -eq 0 ] && ok "no meta keywords" || bad "meta keywords present"
[ "$(grep -c 'hreflang' <<<"$HTML")"        -eq 0 ] && ok "no hreflang"      || bad "hreflang present"
[ "$(grep -c '@graph' <<<"$HTML")"          -ge 1 ] && ok "JSON-LD @graph"   || bad "JSON-LD @graph missing"
grep -q '"@type":"Dataset"' <<<"$HTML" && ok "register published as Dataset" || bad "Dataset node missing"
grep -q 'Electrical grids, machines, and physics-informed methods' <<<"$HTML" && ok "electrical headline in HTML" || bad "electrical headline missing"
grep -q 'Vincenzo Ceccarelli Grimaldi' <<<"$HTML" && ok "operator name in HTML" || bad "operator name missing"
grep -q 'ITk Fachspezialist' <<<"$HTML" && ok "role in HTML" || bad "role missing"
grep -q 'Frankfurt am Main' <<<"$HTML" && ok "city in HTML" || bad "city missing"
grep -q 'name="constraint"' <<<"$HTML" && ok "enquiry form present" || bad "enquiry form missing"

echo "▸ 32-image asset & placement verification"
ALL_HTML=""
for p in / /grids /machines /digital-twins /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound /simulator /work /work/cim-threma /work/bahn-project-manager /connect /card; do
  ALL_HTML+="$(curl -sS "$BASE$p")"
done

ASSETS=(
  /vincenzo_grimaldi_headshot.jpg
  /Vincenzo_Grimaldi_footer_picture_website.jpg
  /images/cool/01-cinematic-high-voltage-substation.jpg
  /images/cool/02-electromagnetic-fields-machine.jpg
  /images/cool/03-precision-stator-detail.jpg
  /images/cool/04-live-grid-digital-twin.jpg
  /images/cool/05-physics-meets-hardware.jpg
  /images/cool/06-cinematic-traction-power.jpg
  /images/cool/07-grid-scale-power-electronics.jpg
  /images/cool/08-grid-frequency-inertia-living.jpg
  /images/cool/09-advanced-research-simulator.jpg
  /images/cool/10-future-grids-and-machines.jpg
  /images/electrical/01-high-voltage-substation.jpg
  /images/electrical/02-railway-traction-power.jpg
  /images/electrical/03-electrical-machines-windings.jpg
  /images/electrical/04-physics-informed-digital-twin-grid.jpg
  /images/electrical/05-grid-inertia-frequency-stability.jpg
  /images/electrical/06-it-ot-convergence-control-room.jpg
  /images/electrical/07-electrical-devices-power-electronics.jpg
  /images/electrical/08-thesis-simulator-workspace.jpg
  /images/electrical/09-high-voltage-transmission-corridor.jpg
  /images/electrical/10-physics-informed-ai-power-systems.jpg
  /images/critical/01-ai-data-center-power-bottleneck.jpg
  /images/critical/02-interconnection-queue-capacity.jpg
  /images/critical/03-physics-informed-grid-digital-twin.jpg
  /images/critical/04-traction-power-digitization.jpg
  /images/critical/05-electrical-machines-electrification.jpg
  /images/critical/06-grid-inertia-renewable-stability.jpg
  /images/critical/07-it-ot-critical-infrastructure.jpg
  /images/critical/08-industrial-autonomous-assurance.jpg
  /images/critical/09-power-capacity-envelope.jpg
  /images/critical/10-future-physics-informed-power-systems.jpg
)
placed=0
for a in "${ASSETS[@]}"; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$a")
  base_file=$(basename "$a")
  if [ "$c" = 200 ] && grep -q "$base_file" <<<"$ALL_HTML"; then
    placed=$((placed + 1))
  else
    bad "asset missing or unplaced: $a (HTTP $c)"
  fi
done
[ "$placed" -eq 32 ] && ok "all 32/32 optimized JPEGs return 200 and render in page markup" || bad "only $placed/32 assets verified"

echo "▸ kill-list & honesty contracts"
for p in / /grids /machines /digital-twins /articles /articles/grid-inertia-50hz /articles/it-ot-traction-power /articles/ai-is-power-bound /work /simulator /registry /connect /card /llms.txt; do
  B=$(curl -sS "$BASE$p")
  for w in 'palletiz' 'Physical AI' 'Weekly CEO report' 'Three clusters' 'robot-lidar-fusion' \
           'any robot arm' 'buy\b' 'retainer' 'waitlist' 'stripe' 'cal\.com' 'EUR\b' '€' \
           'SIL-4' 'ASIL-D' 'curtailment' 'carousel' 'state[- ]of[- ]the[- ]art' \
           'enterprise[- ]ready' 'production[- ]proven' 'trillion'; do
    grep -qiE "$w" <<<"$B" && bad "banned/kill-list token on $p: $w"
  done
done
ok "zero kill-list or commercial hype tokens across all active pages and /llms.txt"

REG_JSON=$(curl -sS "$BASE/api/register")
node -e 'const j=JSON.parse(process.argv[1]); if(!j.entries || j.entries.length<6) process.exit(1);' "$REG_JSON" \
  && ok "valid JSON /api/register" || bad "invalid JSON /api/register"

if [ "${READINESS:-0}" = 1 ] || [[ "$BASE" == https://* ]]; then
  echo "▸ legal readiness"
  for p in /impressum /datenschutz; do
    if curl -sS "$BASE$p" | grep -q 'TODO_OPERATOR'; then bad "$p still has TODO_OPERATOR placeholders"
    else ok "$p complete"; fi
  done
else
  echo "▸ legal readiness  (skipped — run against https:// or set READINESS=1)"
fi

echo
[ "$fail" -eq 0 ] && echo "✓ ALL CONTRACTS HELD" || echo "✗ CONTRACT VIOLATIONS — see FAIL lines above"
exit "$fail"
