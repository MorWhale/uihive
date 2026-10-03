import { getRegistryPath, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function list() {
  const cfg = loadConfig();
  const manifest = loadManifest(getRegistryPath(cfg));
  if (!manifest.components.length) {
    console.log(t("registryEmpty"));
    return;
  }
  console.log(t("registryHeader"));
  for (const c of manifest.components) {
    const deps = (c.dependencies ?? []).join(", ") || "none";
    console.log(`- ${c.name}: ${deps}`);
  }
}
