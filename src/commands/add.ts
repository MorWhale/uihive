import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function add(component: string) {
  const cfg = loadConfig();
  const manifest = loadManifest(cfg.registryPath);
  const entry = manifest.components.find((c: any) => c.name === component);
  if (!entry) { console.error(t("notFoundInRegistry", component)); process.exit(1); }
  const targetDir = cfg.targetPath ?? "./src/components/ui";
  mkdirSync(targetDir, { recursive: true });
  for (const f of entry.files) {
    const dest = join(targetDir, f.path);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, f.content ?? "");
    console.log(t("wrote", dest));
  }
  console.log(t("added", component, (entry.dependencies ?? []).join(", ") || "none"));
}
