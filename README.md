# uihive 🐝

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

## 🛠️ Commands

| Command | Description |
|---|---|
| `uihive init` | Create `uihive.json` and the local registry in the target project. |
| `uihive discover` | Scan the local network for active registries. |
| `uihive add <component>` | Copy a shared component + its dependencies into the local project. |
| `uihive publish <file>` | Extract and publish a local component to the registry. |

## 📖 Example

```bash
uihive init            # create uihive.json + .uihive/registry.json
npx tsx src/index.ts publish src/components/ui/button.tsx
uihive add button      # copy the component into your project
```

## 🗺️ Roadmap

- [x] `init`, `discover`, `add`, `publish` scaffold
- [ ] Registry sharing via shared Git repo
- [ ] Public registry site / search
- [ ] Vue & Svelte support

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) (coming soon).

## 📄 License

[MIT](LICENSE)
