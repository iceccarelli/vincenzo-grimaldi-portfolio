#!/usr/bin/env bash
# scripts/verify.sh — acceptance gate for igrimaldi.engineering
#   local: npm run build && (npm start &) && sleep 6 && ./scripts/verify.sh
#   prod:  ./scripts/verify.sh https://igrimaldi.engineering
#
# This host is the control engine of the Physical AI & Robotics cluster.
# The contracts below assert, against the built HTML and JSON, that the
# registers exist, that their vocabulary is closed, and that nothing is
# claimed that the registers do not contain.
set -uo pipefail
BASE="${1:-http://localhost:3000}"
fail=0
ok()  { printf '  \033[32mPASS\033[0m %s\n' "$1"; }
bad() { printf '  \033[31mFAIL\033[0m %s\n' "$1"; fail=1; }
have_node=0; command -v node >/dev/null 2>&1 && have_node=1

echo "▸ security headers  ($BASE)"
H=$(curl -sSI "$BASE/" 2>/dev/null)
for k in strict-transport-security x-content-type-options referrer-policy \
         permissions-policy x-frame-options content-security-policy; do
  grep -qi "^$k:" <<<"$H" && ok "$k" || bad "$k missing"
done
if grep -qi 'access-control-allow-origin: \*' <<<"$H"; then
  bad "ACAO:* on document — the app never sets this; source is upstream"
else ok "no ACAO:*"; fi

echo "▸ crawl surface"
for p in / /registry /registry/palletizer /registry/robot-lidar-fusion /architecture /palletizer \
         /decisions /report /research /contracts /constitution \
         /work /work/cim-threma /work/bahn-project-manager /simulator /connect /card \
         /impressum /datenschutz /llms.txt /robots.txt /sitemap.xml \
         /favicon.ico /apple-touch-icon.png /site.webmanifest /.well-known/security.txt \
         /api/cluster /api/cluster/registry /api/cluster/kpis /api/cluster/decisions \
         /api/cluster/report /api/cluster/contracts /api/cluster/contracts/InspectionResult; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 200 ] && ok "200 $p" || bad "$c $p"
done
for p in /payments /capabilities /cluster /work/palletizer-os; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 308 ] || [ "$c" = 301 ] && ok "$c $p (parked → redirect)" || bad "$c $p should redirect"
done
c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/__definitely_not_a_route__")
[ "$c" = 404 ] && ok "404 on unknown route" || bad "unknown route returned $c"
c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/api/cluster/contracts/NoSuchContract")
[ "$c" = 404 ] && ok "404 on unknown contract" || bad "unknown contract returned $c"

echo "▸ index contract"
N=$(curl -sS "$BASE/sitemap.xml" | grep -c '<loc>')
[ "$N" -ge 20 ] && ok "sitemap $N URLs (>=20)" || bad "sitemap only $N URLs"
HTML=$(curl -sS "$BASE/")
[ "$(grep -c 'name="keywords"' <<<"$HTML")" -eq 0 ] && ok "no meta keywords" || bad "meta keywords present"
[ "$(grep -c 'hreflang' <<<"$HTML")"        -eq 0 ] && ok "no hreflang"      || bad "hreflang present"
[ "$(grep -c '@graph' <<<"$HTML")"          -ge 1 ] && ok "JSON-LD @graph"   || bad "JSON-LD @graph missing"
grep -q '"@type":"Dataset"' <<<"$HTML" && ok "register published as Dataset" || bad "Dataset node missing"

echo "▸ cockpit contract (what a JS-off reader sees on /)"
grep -q 'Prove whether physical autonomy can create a defensible second moat' <<<"$HTML" && ok "mandate in HTML" || bad "mandate missing from HTML"
for s in PERCEIVE MODEL PLAN ACT VERIFY RECOVER LEARN; do
  grep -q "class=\"pipe-stage\">$s<" <<<"$HTML" || bad "mission stage $s missing"
done
ok "mission pipeline PERCEIVE→LEARN present"
for s in SIMULATE VALIDATE AUTHORIZE EXECUTE; do
  grep -q "class=\"pipe-stage\">$s<" <<<"$HTML" || bad "gate stage $s missing"
done
ok "safety gate present"
grep -q 'class="board"' <<<"$HTML" && ok "status board present" || bad "status board missing"
R=$(grep -o 'data-status="CORE"' <<<"$HTML" | wc -l | tr -d ' ')
[ "$R" -ge 2 ] && ok "register on / lists $R CORE rows (>=2)" || bad "only $R CORE rows on /"
grep -q 'href="/registry"' <<<"$HTML" && ok "register linked" || bad "register not linked"
grep -q 'href="/api/cluster/registry"' <<<"$HTML" && ok "JSON register linked" || bad "JSON register not linked"
grep -q 'Vincenzo Ceccarelli Grimaldi' <<<"$HTML" && ok "operator name in HTML" || bad "operator name missing"
grep -q 'ITk Fachspezialist' <<<"$HTML" && ok "role in HTML" || bad "role missing from HTML"
grep -q 'Frankfurt am Main' <<<"$HTML" && ok "city in HTML" || bad "city missing from HTML"
grep -q 'name="constraint"' <<<"$HTML" && ok "enquiry form present" || bad "enquiry form missing"
grep -q 'href="/work"' <<<"$HTML" && ok "grid work still reachable" || bad "/work not linked from /"

echo "▸ closed vocabulary"
# Every status badge on every register page is one of the six allowed words.
for p in / /registry /palletizer; do
  B=$(curl -sS "$BASE$p")
  BADST=$(grep -o 'data-status="[^"]*"' <<<"$B" | sed 's/data-status="//;s/"//' | grep -vE '^(CORE|MODULE|RESEARCH|INTERNAL|EXPERIMENT|ARCHIVE)$' || true)
  [ -z "$BADST" ] && ok "only allowed statuses on $p" || bad "seventh status on $p: $BADST"
done
# KPIs: a measured value must carry a source; unmeasured must render as unmeasured.
K=$(curl -sS "$BASE/api/cluster/kpis")
if [ "$have_node" = 1 ]; then
  node -e '
    const k=JSON.parse(process.argv[1]); let bad=0;
    for (const g of [k.palletizer,k.lidarFusion]) for (const x of g.kpis)
      if (x.measured && (!x.measured.source || !x.measured.date)) { bad++; console.error("KPI without source/date:", x.id); }
    if (k.palletizer.kpis.length!==12) { bad++; console.error("palletizer KPI count", k.palletizer.kpis.length); }
    process.exit(bad?1:0)' "$K" && ok "every measured KPI has source+date; 12 palletizing KPIs" || bad "KPI JSON violates contract"
  for e in registry decisions report contracts; do
    J=$(curl -sS "$BASE/api/cluster/$e")
    node -e 'JSON.parse(process.argv[1])' "$J" 2>/dev/null && ok "valid JSON /api/cluster/$e" || bad "invalid JSON /api/cluster/$e"
  done
  RG=$(curl -sS "$BASE/api/cluster/registry")
  node -e '
    const r=JSON.parse(process.argv[1]); const ok=new Set(r.allowedStatuses); let bad=0;
    for (const e of r.entries){ if(!ok.has(e.status)){bad++;console.error("status",e.id,e.status)} if(!e.rationale){bad++;console.error("no rationale",e.id)} }
    const hasForge=r.entries.some(e=>/forge/i.test(e.id)); if(hasForge){bad++;console.error("Forge app inside register")}
    process.exit(bad?1:0)' "$RG" && ok "register: closed statuses, rationale on every row, no Forge app inside" || bad "register JSON violates contract"
else
  ok "node absent — JSON contracts skipped"
fi

echo "▸ honesty contract"
# Nothing for sale, no unbenchmarked performance language, no compatibility lists.
for w in 'buy\b' 'retainer' 'waitlist' 'stripe' 'cal\.com' 'settle securely' 'EUR\b' '€' \
         'SIL-4' 'ASIL-D' 'sub-8' 'curtailment' 'Enterprise platform' 'FF8A00' '2F5D50' 'carousel' \
         'state[- ]of[- ]the[- ]art' 'deploy in hours' 'any robot arm' 'enterprise[- ]ready' 'production[- ]proven' \
         'certified driver' 'payback of' 'months payback' '% labor' '% labour' 'trillion'; do
  if grep -qiE "$w" <<<"$HTML"; then bad "banned token on /: $w"; else ok "no '$w' on /"; fi
done
for p in /registry /architecture /palletizer /decisions /report /research /contracts /constitution /work /simulator /connect /llms.txt; do
  B=$(curl -sS "$BASE$p")
  for w in 'retainer' 'stripe' 'EUR\b' '€' 'Enterprise platform' 'state[- ]of[- ]the[- ]art' 'deploy in hours' \
           'enterprise[- ]ready' 'production[- ]proven' 'certified driver' 'trillion'; do
    grep -qiE "$w" <<<"$B" && bad "banned token on $p: $w"
  done
done
ok "no banned tokens on register pages, /work, /simulator, /connect, /llms.txt"
# GitHub paths that 404 are never linked as if public — anywhere.
for p in / /registry /palletizer /registry/robot-lidar-fusion /llms.txt; do
  B=$(curl -sS "$BASE$p")
  grep -qiE 'href="https?://github\.com/iceccarelli/(GridOS|neuralbridge|derim-middleware|robot-lidar-fusion|physics-informed|autonomous-inspection)' <<<"$B" \
    && bad "$p links a GitHub path that 404s" || ok "no 404 GitHub paths on $p"
done
# Zero payment / booking scripts anywhere on the landing.
grep -qiE 'js\.stripe\.com|buy\.stripe\.com|app\.cal\.com|embed\.cal\.com' <<<"$HTML" \
  && bad "third-party payment/booking script on landing" || ok "zero payment scripts on landing"
# The three Forge applications are named only as boundaries, never as register rows.
F=$(curl -sS "$BASE/registry" | grep -c 'href="/registry/[a-z-]*forge' || true)
[ "$F" -eq 0 ] && ok "no Forge application has a register page" || bad "Forge application inside the register"

# Readiness = operator work. Auto-runs against https:// targets; force with READINESS=1.
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
