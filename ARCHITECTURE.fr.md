# Architecture

> 🇬🇧 [English](ARCHITECTURE.md)

## 1. Flux de publication (`uihive publish <path>`)

```
[ Fichier Source (.tsx) ]
        │
        ▼
[ Parser AST (@swc/core) ] ──► (Extraction des imports, dépendances & styles)
        │
        ▼
[ Validation Fichier ] ──────► (Vérification de la conformité du code)
        │
        ▼
[ Dépôt Partagé / P2P ] ─────► (Mise à jour de registry.json & copie du fichier)
```

## 2. Structure d'un registry local (`registry.json`)

`registry.json` réside dans le dossier partagé (Git local, dossier réseau ou nœud P2P) :

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
          "content": "// code source...",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

## 3. Module de découverte réseau (mDNS / Zeroconf)

- **Service Name :** `_uihive._tcp.local`
- **Port par défaut :** `4090`
- **Mécanisme :** émission de paquets multicast DNS pour lister les nœuds actifs de l'équipe sur le même sous-réseau.
