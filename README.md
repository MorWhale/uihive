# uihive 🐝

![CI](https://github.com/MorWhale/uihive/actions/workflows/ci.yml/badge.svg)

> 🇫🇷 [Français](README.fr.md)

**uihive** is an **open-source UI component registry** compatible with the [shadcn/ui](https://ui.shadcn.com) registry format. Use it as a **public registry** (community / open source) or as a **private team registry** — no central server required.

- **Public registry**: discover, install and share React / Tailwind / Radix components via `npx uihive`.
- **Private registry**: host your internal registry on a shared Git repo or your local network via mDNS — zero config.
- **shadcn-compatible**: standard `registry.json` manifest, import / export from shadcn.

## 💡 Why uihive?

- **Standard compatibility**: works with the shadcn/ui ecosystem out of the box.
- **P2P & Intranet**: automatic discovery of team registries on the same Wi-Fi / VPN network via mDNS (`_uihive._tcp.local`, port `4090`).
- **Zero-config**: no web server to deploy or maintain.
- **Full ownership**: source code is injected directly into your project (`copy-paste` via CLI).

## 📦 Installation

```bash
npm install -g uihive
# or run directly
npx uihive@latest init
```

## 🌍 Language

Set `UIHIVE_LANG=fr` (or a `fr_*` `LANG`) to run the CLI in French; defaults to English.

## 🛠️ Commands

| Command                                           | Description                                                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `uihive init`                                     | Create `uihive.json` and the local registry in the target project.                                       |
| `uihive discover`                                 | Scan the local network for active registries.                                                            |
| `uihive add <component>`                          | Copy a shared component + its dependencies into the local project. `--dry-run` prints what would happen. |
| `uihive publish <file>`                           | Extract and publish a local component to the registry. `--dry-run` prints what would be published.       |
| `uihive list`                                     | List components in the registry.                                                                         |
| `uihive info <component>`                         | Show details about a component.                                                                          |
| `uihive serve`                                    | Advertise the local registry via mDNS.                                                                   |
| `uihive remove <component>`                       | Remove a component from the registry. `--dry-run` prints what would be removed.                          |
| `uihive search <query>`                           | Search components by name or dependency.                                                                 |
| global `--lang <en\|fr>`                          | Override UI language.                                                                                    |
| global `--registry <path>`                        | Override the `registry.json` path.                                                                       |
| `uihive init --template <minimal\|team\|private>` | Choose a preset for `name`/registry layout.                                                              |

## 📖 Example

```bash
uihive init            # create uihive.json + .uihive/registry.json
npx tsx src/index.ts publish src/components/ui/button.tsx
uihive add button      # copy the component into your project
```

## 🗂️ Project layout

| Path              | Role                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| `src/index.ts`    | CLI entry point (Commander): registers commands and parses arguments.        |
| `src/commands/`   | `init`, `discover`, `add`, `publish` implementations.                        |
| `src/core/`       | AST parsing (`@swc/core`) and `registry.json` manifest handling.             |
| `src/network/`    | mDNS discovery (`bonjour-service`): advertise `_uihive._tcp` on port `4090`. |
| `src/utils/`      | Small shared helpers (file I/O, paths).                                      |
| `Docs/`           | Personal working notes — gitignored, not published.                          |
| `ARCHITECTURE.md` | Design overview: publish flow, registry format, mDNS discovery.              |
| `CONTRIBUTING.md` | Dev setup, project layout and quality checks.                                |

## 🏷️ Versioning & tags

Releases are tagged `vX.Y.Z` matching `package.json` version, e.g. `v0.0.1`.

## 🗺️ Roadmap

- [x] `init`, `discover`, `add`, `publish` scaffold
- [ ] Registry sharing via shared Git repo
- [ ] Public registry site / search
- [ ] Vue & Svelte support

## 📚 Documentation

- [Architecture](ARCHITECTURE.md) / [Français](ARCHITECTURE.fr.md) — publish flow, registry manifest format and mDNS discovery.
- [Contributing](CONTRIBUTING.md) / [Français](CONTRIBUTING.fr.md) — tech stack, local setup and quality checks.

## 🤝 Contributing

Issues and pull requests are welcome. Check [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 👥 Credits

- [@hdmed](https://github.com/hdmed) — project owner
- [@GiftsWarez](https://github.com/GiftsWarez) — automation bot

## 📄 License

[MIT](LICENSE)
