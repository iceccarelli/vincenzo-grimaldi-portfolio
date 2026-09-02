#!/usr/bin/env bash
# scripts/verify.sh — acceptance gate for igrimaldi.engineering
#   local: npm run build && (npm start &) && sleep 6 && ./scripts/verify.sh
#   prod:  ./scripts/verify.sh https://igrimaldi.engineering
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
  bad "ACAO:* on document — the app never sets this; source is upstream"
else ok "no ACAO:*"; fi

echo "▸ crawl surface"
for p in / /work /work/cim-threma /work/bahn-project-manager /simulator /connect /card \
         /impressum /datenschutz /llms.txt /robots.txt /sitemap.xml \
         /favicon.ico /apple-touch-icon.png /site.webmanifest /.well-known/security.txt; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 200 ] && ok "200 $p" || bad "$c $p"
done
for p in /payments /capabilities; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 308 ] || [ "$c" = 301 ] && ok "$c $p (parked → redirect)" || bad "$c $p should redirect"
done
c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/__definitely_not_a_route__")
[ "$c" = 404 ] && ok "404 on unknown route" || bad "unknown route returned $c"

echo "▸ index contract"
N=$(curl -sS "$BASE/sitemap.xml" | grep -c '<loc>')
[ "$N" -ge 8 ] && ok "sitemap $N URLs (>=8)" || bad "sitemap only $N URLs"
HTML=$(curl -sS "$BASE/")
[ "$(grep -c 'name="keywords"' <<<"$HTML")" -eq 0 ] && ok "no meta keywords" || bad "meta keywords present"
[ "$(grep -c 'hreflang' <<<"$HTML")"        -eq 0 ] && ok "no hreflang"      || bad "hreflang present"
[ "$(grep -c '@graph' <<<"$HTML")"          -ge 1 ] && ok "JSON-LD @graph"   || bad "JSON-LD @graph missing"

echo "▸ home contract (what a JS-off reader sees)"
grep -q 'Vincenzo Ceccarelli Grimaldi' <<<"$HTML" && ok "name in HTML" || bad "name missing from HTML"
grep -q 'ITk Fachspezialist' <<<"$HTML" && ok "role in HTML" || bad "role missing from HTML"
grep -q 'Frankfurt am Main' <<<"$HTML" && ok "city in HTML" || bad "city missing from HTML"
A=$(grep -o 'class="artifact"' <<<"$HTML" | wc -l | tr -d ' ')
[ "$A" -eq 3 ] && ok "exactly three artifacts" || bad "artifact count is $A, expected 3"
grep -q 'name="constraint"' <<<"$HTML" && ok "enquiry form present" || bad "enquiry form missing"
grep -q 'href="/simulator"' <<<"$HTML" && ok "simulator door linked" || bad "simulator door not linked"

echo "▸ honesty contract"
# Words that must not appear on this host. Case-insensitive, whole HTML.
for w in 'buy\b' 'retainer' 'waitlist' 'stripe' 'cal\.com' 'palletiz' 'forge' 'hardwood' \
         'peru' 'settle securely' 'EUR\b' '€' 'SIL-4' 'ASIL-D' 'sub-8' 'curtailment' \
         'Enterprise platform' 'FF8A00' '2F5D50' 'carousel' 'network'; do
  if grep -qiE "$w" <<<"$HTML"; then bad "banned token on /: $w"; else ok "no '$w' on /"; fi
done
for p in /work /simulator /connect /llms.txt; do
  B=$(curl -sS "$BASE$p")
  for w in 'retainer' 'stripe' 'palletiz' 'forge' 'hardwood' 'EUR\b' '€' 'Enterprise platform'; do
    grep -qiE "$w" <<<"$B" && bad "banned token on $p: $w"
  done
done
ok "no banned tokens on /work /simulator /connect /llms.txt"
grep -qiE 'github\.com/iceccarelli/(GridOS|neuralbridge|derim-middleware|robot-lidar-fusion|physics-informed)' <<<"$HTML" \
  && bad "homepage links a GitHub path that 404s" || ok "no 404 GitHub paths on /"
# Zero payment / booking scripts anywhere on the landing.
grep -qiE 'js\.stripe\.com|buy\.stripe\.com|app\.cal\.com|embed\.cal\.com' <<<"$HTML" \
  && bad "third-party payment/booking script on landing" || ok "zero payment scripts on landing"

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
