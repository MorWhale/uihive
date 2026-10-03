# uihive 🐝

![CI](https://github.com/MorWhale/uihive/actions/workflows/ci.yml/badge.svg)

> 🇬🇧 [English](README.md)

**uihive** est un **registre de composants UI open source** compatible avec le format de registry [shadcn/ui](https://ui.shadcn.com). Utilise-le comme **registry public** (communauté/open source) ou **privé/équipe** — sans serveur central.

- **Registry public** : découvrez, installez et partagez des composants React / Tailwind / Radix via `npx uihive`.
- **Registry privé** : hébergez votre registry interne sur un dépôt Git partagé ou votre réseau local via mDNS — zero-config.
- **Compatible shadcn** : manifest `registry.json` standard, import/export depuis shadcn.

## 💡 Pourquoi uihive ?

- **Compatibilité standard** : fonctionne avec l'écosystème shadcn/ui.
- **P2P & Intranet** : découverte automatique des registries d'équipe sur le même réseau Wi-Fi/VPN via mDNS (`_uihive._tcp.local`, port `4090`).
- **Zero-config** : pas de serveur web à déployer ou maintenir.
- **Ownership total** : le code source est injecté directement dans votre projet (`copy-paste` par CLI).

## 📦 Installation

```bash
npm install -g uihive
# ou exécution directe
npx uihive@latest init
```

## 🌍 Langue

Définissez `UIHIVE_LANG=fr` (ou une variable `LANG=fr_*`) pour exécuter la CLI en français ; anglais par défaut.

## 🛠️ Commandes

| Commande | Description |
|---|---|
| `uihive init` | Crée `uihive.json` et le registry local dans le projet cible. |
| `uihive discover` | Scanne le réseau local pour trouver les registries actifs. |
| `uihive add <component>` | Copie le composant partagé + ses dépendances dans le projet local. |
| `uihive publish <file>` | Extrait et publie un composant local vers le registry. |

## 📖 Exemple

```bash
uihive init            # crée uihive.json + .uihive/registry.json
npx tsx src/index.ts publish src/components/ui/button.tsx
uihive add button      # copie le composant dans votre projet
```

## 🗂️ Structure du projet

| Chemin | Rôle |
|---|---|
| `src/index.ts` | Point d'entrée CLI (Commander) : enregistre les commandes et parse les arguments. |
| `src/commands/` | Implémentations `init`, `discover`, `add`, `publish`. |
| `src/core/` | Parsing AST (`@swc/core`) et gestion du manifest `registry.json`. |
| `src/network/` | Découverte mDNS (`bonjour-service`) : annonce `_uihive._tcp` sur le port `4090`. |
| `src/utils/` | Helpers partagés (I/O fichiers, chemins). |
| `Docs/` | Notes personnelles — gitignored, non publiées. |
| `ARCHITECTURE.md` | Vue d'ensemble : flux de publication, format registry, découverte mDNS. |
| `CONTRIBUTING.md` | Setup dev, structure du projet et tests qualité. |

## 🏷️ Versioning & tags

Les releases sont taguées `vX.Y.Z`, synchronisées avec la version `package.json`, ex. `v0.0.1`.

## 🗺️ Roadmap

- [x] Scaffold `init`, `discover`, `add`, `publish`
- [ ] Partage de registry via repo Git partagé
- [ ] Site public de registry / recherche
- [ ] Support Vue & Svelte

## 📚 Documentation

- [Architecture](ARCHITECTURE.fr.md) — flux de publication, format registry, découverte mDNS.
- [Contributing](CONTRIBUTING.fr.md) — stack technique, setup local et vérifications qualité.

## 🤝 Contributing

Issues et PR bienvenues. Voir d'abord [CONTRIBUTING.fr.md](CONTRIBUTING.fr.md).

## 👥 Crédits

- [@hdmed](https://github.com/hdmed) — owner du projet
- [@GiftsWarez](https://github.com/GiftsWarez) — bot d'automatisation

## 📄 Licence

[MIT](LICENSE)
