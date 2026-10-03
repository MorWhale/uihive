# Architecture

> 🇫🇷 [Français](ARCHITECTURE.fr.md)

## 1. Publish flow (`uihive publish <path>`)

```
[ Source file (.tsx) ]
        │
        ▼
[ AST parser (@swc/core) ] ──► (extract imports, dependencies & styles)
        │
        ▼
[ File validation ] ────────► (compliance checks)
        │
        ▼
[ Shared repo / P2P ] ──────► (update registry.json & copy file)
```

## 2. Local registry structure (`registry.json`)

`registry.json` lives in the shared folder (local Git, network share or P2P node):

```json
{
  "$schema": "https://uihive.dev/schema.json",
  "name": "Core-UI",
  "version": "1.0.0",
  "components": [
    {
      "name": "card-user",
      "dependencies": ["lucide-react", "framer-motion"],
      "registryDependencies": ["button", "avatar"],
      "files": [
        {
          "path": "card-user.tsx",
          "content": "// source code...",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

## 3. Network discovery module (mDNS / Zeroconf)

- **Service name:** `_uihive._tcp.local`
- **Default port:** `4090`
- **Mechanism:** multicast DNS packets to list active team nodes on the same subnet.
