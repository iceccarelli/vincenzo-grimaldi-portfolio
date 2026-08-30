#!/usr/bin/env bash
# scripts/env-push.sh — non-interactive, validated push of production env vars
# to Vercel. Exists because `vercel env add` interactively accepts an EMPTY
# value and reports success, which silently ships a non-functional commerce
# layer. This script refuses empty and malformed values.
#
#   cp .env.example .env.production   # fill it in (gitignored by .env*)
#   ./scripts/env-push.sh .env.production
#   vercel --prod
set -euo pipefail
FILE="${1:-.env.production}"
[ -f "$FILE" ] || { echo "✗ $FILE not found. cp .env.example .env.production and fill it in."; exit 1; }

fail=0
validate() { # name value
  case "$1" in
    STRIPE_PAYMENT_LINK_*)
      [[ "$2" == https://buy.stripe.com/* ]] || { echo "  ✗ $1 must start with https://buy.stripe.com/ — got '${2:0:40}'"; return 1; } ;;
    NEXT_PUBLIC_CAL_URL)
      [[ "$2" == https://cal.com/* || "$2" == https://app.cal.com/* ]] || { echo "  ✗ $1 must be a https://cal.com/... URL"; return 1; } ;;
    RESEND_API_KEY)
      [[ "$2" == re_* ]] || { echo "  ✗ $1 must start with re_"; return 1; } ;;
    CONTACT_TO_EMAIL|CONTACT_FROM_EMAIL)
      [[ "$2" == *@*.* ]] || { echo "  ✗ $1 must be an email address"; return 1; } ;;
  esac
  return 0
}

echo "▸ validating $FILE"
declare -a NAMES VALUES
while IFS= read -r line || [ -n "$line" ]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ "$line" =~ ^[[:space:]]*$ ]] && continue
  name="${line%%=*}"; value="${line#*=}"
  name="$(echo "$name" | tr -d '[:space:]')"
  value="${value%\"}"; value="${value#\"}"
  [ -z "$value" ] && { echo "  ⊘ $name empty — skipped (will not be pushed)"; continue; }
  validate "$name" "$value" || { fail=1; continue; }
  echo "  ✓ $name"
  NAMES+=("$name"); VALUES+=("$value")
done < "$FILE"

[ "$fail" -eq 0 ] || { echo "✗ validation failed — nothing pushed"; exit 1; }
[ "${#NAMES[@]}" -gt 0 ] || { echo "✗ no values to push"; exit 1; }

echo "▸ pushing ${#NAMES[@]} vars to Vercel production (replacing existing)"
for i in "${!NAMES[@]}"; do
  n="${NAMES[$i]}"
  vercel env rm "$n" production --yes >/dev/null 2>&1 || true
  printf '%s' "${VALUES[$i]}" | vercel env add "$n" production >/dev/null
  echo "  → $n"
done

echo
echo "✓ pushed. Now: vercel --prod && ./scripts/verify.sh https://igrimaldi.engineering"
