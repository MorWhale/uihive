import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { extractDeps, loadConfig, loadManifest } from "../core/manifest.js";

export async function publish(file: string) {
  if (!existsSync(file)) { console.error(`File not found: ${file}`); process.exit(1); }
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
  console.log(`Published "${name}" (${deps.length} deps) to ${cfg.registryPath}`);
}
