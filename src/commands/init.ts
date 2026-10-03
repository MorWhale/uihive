import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { t } from "../i18n.js";

export const CONFIG = "uihive.json";

export async function init() {
  if (existsSync(CONFIG)) {
    console.log(t("configExists"));
    return;
  }
  mkdirSync(".uihive", { recursive: true });
  writeFileSync(CONFIG, JSON.stringify({
    $schema: "https://uihive.dev/schema.json",
    name: "my-team-ui",
    registryPath: "./.uihive/registry.json",
    targetPath: "./src/components/ui"
  }, null, 2));
  if (!existsSync(".uihive/registry.json")) {
    writeFileSync(".uihive/registry.json", JSON.stringify({ $schema: "https://uihive.dev/schema.json", name: "my-team-ui", version: "1.0.0", components: [] }, null, 2));
  }
  console.log(t("created"));
}
