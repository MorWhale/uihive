# Demo script (PowerShell) — run from the repo root after `npm install`
$ErrorActionPreference = "Stop"
$env:UIHIVE_LANG = "en"
$demo = Join-Path $env:TEMP "uihive-demo"
New-Item -ItemType Directory -Force $demo | Out-Null
Set-Location $demo
npx tsx "$PSScriptRoot/../src/index.ts" init
New-Item -ItemType Directory -Force "src/components/ui" | Out-Null
@'
import React from "react";
export const Button = () => <button>Hi</button>;
'@ | Set-Content "src/components/ui/button.tsx"
npx tsx "$PSScriptRoot/../src/index.ts" publish "src/components/ui/button.tsx"
npx tsx "$PSScriptRoot/../src/index.ts" list
npx tsx "$PSScriptRoot/../src/index.ts" info button
npx tsx "$PSScriptRoot/../src/index.ts" add button
Get-Content "src/components/ui/button.tsx"
