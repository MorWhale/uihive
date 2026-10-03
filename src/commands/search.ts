import { getRegistryPath, loadConfig, loadManifest } from "../core/manifest.js";
import { t } from "../i18n.js";

export async function search(query: string) {
  const cfg = loadConfig();
  const manifest = loadManifest(getRegistryPath(cfg));
  const q = query.toLowerCase();
  const hits = manifest.components.filter(
    (c: any) =>
      c.name.toLowerCase().includes(q) ||
      (c.dependencies ?? []).some((d: string) => d.toLowerCase().includes(q)) ||
      (c.registryDependencies ?? []).some((d: string) =>
        d.toLowerCase().includes(q),
      ),
  );
  if (!hits.length) {
    console.log(t("searchNoResults", query));
    return;
  }
  console.log(t("searchHeader", query));
  for (const c of hits) console.log(`- ${c.name}`);
}
