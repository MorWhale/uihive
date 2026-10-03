import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { extractDeps, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function publish(file: string) {
  if (!existsSync(file)) { console.error(t("fileNotFound", file)); process.exit(1); }
  const cfg = loadConfig();
  const manifest = loadManifest(cfg.registryPath);
  const deps = await extractDeps(file);
  const name = basename(file).replace(/\.(tsx?|jsx?)$/, "");
  const component = {
    name,
    dependencies: deps,
    files: [{ path: basename(file), content: readFileSync(file, "utf8"), type: "registry:ui" }]
  };
  const idx = manifest.components.findIndex((c: any) => c.name === name);
  if (idx >= 0) manifest.components[idx] = component; else manifest.components.push(component);
  writeFileSync(cfg.registryPath, JSON.stringify(manifest, null, 2));
  console.log(t("published", name, deps.length, cfg.registryPath));
}
