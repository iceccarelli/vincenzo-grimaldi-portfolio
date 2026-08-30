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
grep -qi 'access-control-allow-origin: \*' <<<"$H" && bad "ACAO:* on document" || ok "no ACAO:*"

echo "▸ crawl surface"
for p in / /work /work/cim-threma /work/palletizer-os /work/bahn-project-manager \
         /work/gridos /capabilities /simulator /payments /connect /card \
         /impressum /datenschutz /llms.txt /robots.txt /sitemap.xml \
         /favicon.ico /apple-touch-icon.png /site.webmanifest /.well-known/security.txt; do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$c" = 200 ] && ok "200 $p" || bad "$c $p"
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
grep -q 'href="/connect"' <<<"$HTML" && ok "hero CTA -> /connect" || bad "hero CTA not booking-first"

# Readiness = your dashboard work. Auto-runs against https:// targets; force with READINESS=1.
if [ "$fail" -eq 0 ] && { [ "${READINESS:-0}" = 1 ] || [[ "$BASE" == https://* ]]; }; then
echo "▸ legal / commercial readiness"
for p in /impressum /datenschutz; do
  if curl -sS "$BASE$p" | grep -q 'TODO_OPERATOR'; then bad "$p still has TODO_OPERATOR placeholders"
  else ok "$p complete"; fi
done
if curl -sS "$BASE/payments" | grep -q 'buy.stripe.com'; then ok "Stripe Payment Links wired"
else bad "payments CTAs are not Stripe links (env not set)"; fi
else
echo "▸ legal / commercial readiness  (skipped — run against https:// or set READINESS=1)"
fi

echo
[ "$fail" -eq 0 ] && echo "✓ ALL CONTRACTS HELD" || echo "✗ CONTRACT VIOLATIONS — see FAIL lines above"
exit "$fail"
