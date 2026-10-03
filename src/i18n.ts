const messages: Record<
  "en" | "fr",
  Record<string, string | ((...args: any[]) => string)>
> = {
  en: {
    created: "Created uihive.json and .uihive/registry.json",
    configExists: "uihive.json already exists.",
    runInit: "Run `uihive init` first.",
    noRegistry: (p) => `No registry at ${p}`,
    fileNotFound: (p) => `File not found: ${p}`,
    notFoundInRegistry: (name) => `Component "${name}" not found in registry.`,
    published: (name, deps, dest) =>
      `Published "${name}" (${deps} deps) to ${dest}`,
    wrote: (dest) => `Wrote ${dest}`,
    added: (name, deps) => `Added "${name}". Dependencies: ${deps}`,
    scanning: "Scanning for _uihive._tcp...",
    todoAdd: (name) => `TODO: add component "${name}" from registry.`,
    todoPublish: (file) => `TODO: publish "${file}" to registry.`,
    registryEmpty: "Registry has no components.",
    registryHeader: "Components in registry:",
    info: (name, version, deps, files) =>
      `${name} (v${version}) — ${deps} dep(s), ${files} file(s)`,
    dryRunAdd: (target, deps) =>
      `[dry-run] Would write to ${target}. Deps: ${deps}`,
    dryRunPublish: (name, dest, deps) =>
      `[dry-run] Would publish "${name}" to ${dest} (${deps} deps)`,
    serveStart: (port) =>
      `Advertising _uihive._tcp on port ${port}. Press Ctrl+C to stop.`,
    invalidManifest: (msg) => `Invalid registry.json: ${msg}`,
    removed: (name) => `Removed "${name}".`,
    dryRunRemove: (name) => `[dry-run] Would remove "${name}".`,
    searchNoResults: (q) => `No results for "${q}".`,
    searchHeader: (q) => `Results for "${q}":`,
    templateUnknown: (t) =>
      `Unknown template "${t}" (expected minimal|team|private).`,
    backupCreated: (p) => `Backup written to ${p}`,
  },
  fr: {
    created: "Créé uihive.json et .uihive/registry.json",
    configExists: "uihive.json existe déjà.",
    runInit: "Lancez d'abord `uihive init`.",
    noRegistry: (p) => `Aucun registry à ${p}`,
    fileNotFound: (p) => `Fichier introuvable : ${p}`,
    notFoundInRegistry: (name) =>
      `Composant "${name}" introuvable dans le registry.`,
    published: (name, deps, dest) =>
      `Publié "${name}" (${deps} dépendances) dans ${dest}`,
    wrote: (dest) => `Écrit ${dest}`,
    added: (name, deps) => `Ajouté "${name}". Dépendances : ${deps}`,
    scanning: "Recherche des registries _uihive._tcp...",
    todoAdd: (name) =>
      `TODO: ajouter le composant "${name}" depuis le registry.`,
    todoPublish: (file) => `TODO: publier "${file}" dans le registry.`,
    registryEmpty: "Le registry est vide.",
    registryHeader: "Composants dans le registry :",
    info: (name, version, deps, files) =>
      `${name} (v${version}) — ${deps} dépendance(s), ${files} fichier(s)`,
    dryRunAdd: (target, deps) =>
      `[dry-run] Écrirait dans ${target}. Dépendances : ${deps}`,
    dryRunPublish: (name, dest, deps) =>
      `[dry-run] Publierait "${name}" dans ${dest} (${deps} dépendances)`,
    serveStart: (port) =>
      `Annonce de _uihive._tcp sur le port ${port}. Ctrl+C pour arrêter.`,
    invalidManifest: (msg) => `registry.json invalide : ${msg}`,
    removed: (name) => `Supprimé "${name}".`,
    dryRunRemove: (name) => `[dry-run] Supprimerait "${name}".`,
    searchNoResults: (q) => `Aucun résultat pour "${q}".`,
    searchHeader: (q) => `Résultats pour "${q}" :`,
    templateUnknown: (t) =>
      `Template inconnu "${t}" (attendu minimal|team|private).`,
    backupCreated: (p) => `Sauvegarde écrite dans ${p}`,
  },
};

export type Lang = "en" | "fr";

export function lang(): Lang {
  const explicit = (process.env.UIHIVE_LANG || "").toLowerCase();
  if (explicit === "fr" || explicit.startsWith("fr")) return "fr";
  const env = (
    process.env.LANG ||
    process.env.LC_ALL ||
    process.env.LC_MESSAGES ||
    ""
  ).toLowerCase();
  return env.startsWith("fr") ? "fr" : "en";
}

export function t(key: string, ...args: any[]): string {
  const m = messages[lang()][key];
  return typeof m === "function" ? m(...args) : (m ?? key);
}
