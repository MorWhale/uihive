#!/usr/bin/env bash
set -euo pipefail
export UIHIVE_LANG=en
DEMO="${TMPDIR:-/tmp}/uihive-demo"
mkdir -p "$DEMO"
cd "$DEMO"
npx tsx "$(dirname "$0")/../src/index.ts" init
mkdir -p src/components/ui
cat <<'EOF' > src/components/ui/button.tsx
import React from "react";
export const Button = () => <button>Hi</button>;
EOF
npx tsx "$(dirname "$0")/../src/index.ts" publish src/components/ui/button.tsx
npx tsx "$(dirname "$0")/../src/index.ts" list
npx tsx "$(dirname "$0")/../src/index.ts" info button
npx tsx "$(dirname "$0")/../src/index.ts" add button
cat src/components/ui/button.tsx
