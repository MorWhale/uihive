import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { t } from "../i18n.js";

export const CONFIG = "uihive.json";

export async function init(options?: { template?: string }) {
  if (existsSync(CONFIG)) {
    console.log(t("configExists"));
    return;
  }
  const template = options?.template ?? "minimal";
  const presets: Record<
    string,
    { name: string; registryPath: string; targetPath: string }
  > = {
    minimal: {
      name: "my-ui",
      registryPath: "./.uihive/registry.json",
      targetPath: "./src/components/ui",
    },
    team: {
      name: "team-ui",
      registryPath: "./.uihive/registry.json",
      targetPath: "./src/components/ui",
    },
    private: {
      name: "private-ui",
      registryPath: "./.private-ui/registry.json",
      targetPath: "./src/components/ui",
    },
  };
  const preset = presets[template];
  if (!preset) {
    console.error(t("templateUnknown", template));
    process.exit(1);
  }
  mkdirSync(".uihive", { recursive: true });
  if (template === "private") mkdirSync(".private-ui", { recursive: true });
  writeFileSync(
    CONFIG,
    JSON.stringify(
      {
        $schema: "https://uihive.dev/schema.json",
        name: preset.name,
        registryPath: preset.registryPath,
        targetPath: preset.targetPath,
      },
      null,
      2,
    ),
  );
  const registryFile = preset.registryPath;
  if (!existsSync(registryFile)) {
    const dir = registryFile.split("/").slice(0, -1).join("/");
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      registryFile,
      JSON.stringify(
        {
          $schema: "https://uihive.dev/schema.json",
          name: preset.name,
          version: "1.0.0",
          components: [],
        },
        null,
        2,
      ),
    );
  }
  console.log(t("created"));
}
