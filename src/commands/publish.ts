import { copyFileSync, existsSync, writeFileSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import {
  extractDeps,
  getRegistryPath,
  loadConfig,
  loadManifest,
} from "../core/manifest.js";
import { t } from "../i18n.js";

export async function publish(file: string, options?: { dryRun?: boolean }) {
  if (!existsSync(file)) {
    console.error(t("fileNotFound", file));
    process.exit(1);
  }
  const cfg = loadConfig();
  const manifest = loadManifest(getRegistryPath(cfg));
  const deps = await extractDeps(file);
  const name = basename(file).replace(/\.(tsx?|jsx?)$/, "");
  if (options?.dryRun) {
    console.log(t("dryRunPublish", name, getRegistryPath(cfg), deps.length));
    return;
  }
  const component = {
    name,
    version: "0.1.0",
    dependencies: deps,
    files: [
      {
        path: basename(file),
        content: readFileSync(file, "utf8"),
        type: "registry:ui",
      },
    ],
  };
  const idx = manifest.components.findIndex((c: any) => c.name === name);
  if (idx >= 0) manifest.components[idx] = component;
  else manifest.components.push(component);
  const registryPath = getRegistryPath(cfg);
  if (existsSync(registryPath)) {
    copyFileSync(registryPath, registryPath + ".bak");
    console.log(t("backupCreated", registryPath + ".bak"));
  }
  writeFileSync(registryPath, JSON.stringify(manifest, null, 2));
  console.log(t("published", name, deps.length, registryPath));
}
