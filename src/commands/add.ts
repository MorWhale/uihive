import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getRegistryPath, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function add(component: string, options?: { dryRun?: boolean }) {
  const cfg = loadConfig();
  const manifest = loadManifest(getRegistryPath(cfg));
  const entry = manifest.components.find((c: any) => c.name === component);
  if (!entry) {
    console.error(t("notFoundInRegistry", component));
    process.exit(1);
  }
  const targetDir = cfg.targetPath ?? "./src/components/ui";
  if (options?.dryRun) {
    console.log(
      t(
        "dryRunAdd",
        targetDir,
        (entry.dependencies ?? []).join(", ") || "none",
      ),
    );
    return;
  }
  mkdirSync(targetDir, { recursive: true });
  for (const f of entry.files) {
    const dest = join(targetDir, f.path);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, f.content ?? "");
    console.log(t("wrote", dest));
  }
  console.log(
    t("added", component, (entry.dependencies ?? []).join(", ") || "none"),
  );
}
