import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "@swc/core";
import { t } from "../i18n.js";

export interface Manifest { $schema?: string; name: string; version: string; components: any[]; }

export function loadConfig() {
  try { return JSON.parse(readFileSync("uihive.json", "utf8")); } catch { console.error(t("runInit")); process.exit(1); }
}
export function loadManifest(registryPath: string): Manifest {
  try { return JSON.parse(readFileSync(registryPath, "utf8")); } catch { console.error(t("noRegistry", registryPath)); process.exit(1); }
}
export async function extractDeps(file: string): Promise<string[]> {
  const source = readFileSync(file, "utf8");
  const ast = await parse(source, { syntax: "typescript", tsx: true });
  const deps = new Set<string>();
  for (const node of ast.body) {
    if (node.type === "ImportDeclaration") {
      const src = (node as any).source.value as string;
      if (!src.startsWith(".") && !src.startsWith("/")) deps.add(src.startsWith("@") ? src.split("/").slice(0, 2).join("/") : src.split("/")[0]);
    }
  }
  return [...deps];
}
