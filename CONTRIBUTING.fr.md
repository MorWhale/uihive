# Contribuer à uihive

> 🇬🇧 [English](CONTRIBUTING.md)

Ce document décrit les conventions de développement et la structure du projet pour contribuer à la CLI uihive.

## 🛠️ Stack technique

- **Langage :** TypeScript (Node.js LTS)
- **CLI Framework :** Commander.js / Clack
- **AST Parsing :** `@swc/core`
- **Découverte P2P :** `bonjour-service` (mDNS)
- **Tests :** Vitest

## 📁 Structure du projet

```text
uihive/
├── src/
│   ├── commands/        # Logique des commandes (init, add, publish, discover)
│   ├── core/            # Moteur AST, parsing d'imports et gestion du manifest
│   ├── network/         # Module mDNS et serveur P2P temporaire
│   ├── utils/           # Gestion des fichiers, chemins, formatage terminal
│   └── index.ts         # Point d'entrée de la CLI
├── tests/               # Suites Vitest
├── README.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

## 🚀 Lancer le projet en local

```bash
git clone https://github.com/MorWhale/uihive.git
cd uihive
npm install
npm run dev -- init
npm link
uihive --help
```

## 🧪 Tests & qualité

Avant toute Pull Request, s'assurer que les vérifications passent :

```bash
npm run typecheck
npm run test
```
