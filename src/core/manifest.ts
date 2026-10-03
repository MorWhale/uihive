import { readFileSync } from "node:fs";
import { parse } from "@swc/core";
import { t } from "../i18n.js";

export interface Manifest {
  $schema?: string;
  name: string;
  version: string;
  components: any[];
}

export function getRegistryPath(cfg: any): string {
  return process.env.UIHIVE_REGISTRY ?? cfg.registryPath;
}

export function loadConfig() {
  try {
    return JSON.parse(readFileSync("uihive.json", "utf8"));
  } catch {
    console.error(t("runInit"));
    process.exit(1);
  }
}
export function validateManifest(m: Manifest): void {
  const errs: string[] = [];
  if (!m || typeof m !== "object") errs.push("not an object");
  if (!m.name || typeof m.name !== "string")
    errs.push('"name" must be a string');
  if (!m.version || typeof m.version !== "string")
    errs.push('"version" must be a string');
  if (!Array.isArray(m.components)) errs.push('"components" must be an array');
  (m.components ?? []).forEach((c: any, i: number) => {
    if (!c.name || typeof c.name !== "string")
      errs.push(`components[${i}].name must be a string`);
    if (!Array.isArray(c.files))
      errs.push(`components[${i}].files must be an array`);
  });
  if (errs.length) throw new Error(t("invalidManifest", errs.join("; ")));
}

export function loadManifest(registryPath: string): Manifest {
  let m: Manifest;
  try {
    m = JSON.parse(readFileSync(registryPath, "utf8"));
  } catch {
    console.error(t("noRegistry", registryPath));
    process.exit(1);
  }
  try {
    validateManifest(m);
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
  return m;
}
export async function extractDeps(file: string): Promise<string[]> {
  const source = readFileSync(file, "utf8");
  const ast = await parse(source, { syntax: "typescript", tsx: true });
  const deps = new Set<string>();
  for (const node of ast.body) {
    if (node.type === "ImportDeclaration") {
      const src = (node as any).source.value as string;
      if (!src.startsWith(".") && !src.startsWith("/"))
        deps.add(
          src.startsWith("@")
            ? src.split("/").slice(0, 2).join("/")
            : src.split("/")[0],
        );
    }
  }
  return [...deps];
}
