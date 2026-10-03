import { writeFileSync } from "node:fs";
import { getRegistryPath, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function remove(name: string, options?: { dryRun?: boolean }) {
  const cfg = loadConfig();
  const registryPath = getRegistryPath(cfg);
  const manifest = loadManifest(registryPath);
  const idx = manifest.components.findIndex((c: any) => c.name === name);
  if (idx < 0) {
    console.error(t("notFoundInRegistry", name));
    process.exit(1);
  }
  if (options?.dryRun) {
    console.log(t("dryRunRemove", name));
    return;
  }
  manifest.components.splice(idx, 1);
  writeFileSync(registryPath, JSON.stringify(manifest, null, 2));
  console.log(t("removed", name));
}
