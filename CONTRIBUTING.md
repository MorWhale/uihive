# Contributing to uihive

> 🇫🇷 [Français](CONTRIBUTING.fr.md)

This document describes the conventions and project structure for contributing to the uihive CLI.

## 🛠️ Tech stack

- **Language:** TypeScript (Node.js LTS)
- **CLI framework:** Commander.js / Clack
- **AST parsing:** `@swc/core`
- **P2P discovery:** `bonjour-service` (mDNS)
- **Tests:** Vitest

## 📁 Project structure

```text
uihive/
├── src/
│   ├── commands/        # Command logic (init, discover, add, publish, list, info, serve, remove, search)
│   ├── core/            # AST engine, import parsing, manifest handling
│   ├── network/         # mDNS module and temporary P2P server
│   ├── utils/           # File handling, paths, terminal formatting
│   └── index.ts         # CLI entry point
├── tests/               # Vitest suites
├── README.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

## 🚀 Run locally

```bash
git clone https://github.com/MorWhale/uihive.git
cd uihive
npm install
npm run dev -- init
npm link
uihive --help
```

## 🧪 Tests & quality

Before opening a PR, make sure the checks pass:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:coverage
npm run build
```
