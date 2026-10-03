import { getRegistryPath, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function info(component: string) {
  const cfg = loadConfig();
  const manifest = loadManifest(getRegistryPath(cfg));
  const c = manifest.components.find((x: any) => x.name === component);
  if (!c) {
    console.error(t("notFoundInRegistry", component));
    process.exit(1);
  }
  console.log(
    t(
      "info",
      c.name,
      c.version ?? manifest.version,
      (c.dependencies ?? []).length,
      c.files.length,
    ),
  );
}
