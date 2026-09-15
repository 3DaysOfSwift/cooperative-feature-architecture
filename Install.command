#!/bin/sh
cd "$(dirname "$0")" || exit 1
PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
export PATH
if ! command -v node >/dev/null 2>&1; then
  echo "CFA requires Node.js 20 or newer. Install Node.js, then run: node scripts/install.mjs"
  exit 1
fi
node scripts/install.mjs
status=$?
printf '\nPress Return to close. '
read -r answer
exit "$status"
