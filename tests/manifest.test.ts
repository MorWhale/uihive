import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chdir } from "node:process";
import { extractDeps } from "../src/core/manifest.js";
import { publish } from "../src/commands/publish.js";
import { add } from "../src/commands/add.js";

let dir: string;
let cwd: string;

beforeEach(() => {
  cwd = process.cwd();
  dir = mkdtempSync(join(tmpdir(), "uihive-"));
  chdir(dir);
  mkdirSync("src/components/ui", { recursive: true });
  mkdirSync(".uihive", { recursive: true });
  writeFileSync(
    "uihive.json",
    JSON.stringify(
      {
        registryPath: "./.uihive/registry.json",
        targetPath: "./src/components/ui",
      },
      null,
      2,
    ),
  );
  writeFileSync(
    ".uihive/registry.json",
    JSON.stringify({ name: "test", version: "1.0.0", components: [] }, null, 2),
  );
});

afterEach(() => chdir(cwd));

describe("extractDeps", () => {
  it("extracts external package names", async () => {
    writeFileSync(
      join(dir, "button.tsx"),
      'import React from "react";\nimport { cn } from "@/lib/utils";\nimport { motion } from "framer-motion";\n',
    );
    expect(await extractDeps(join(dir, "button.tsx"))).toContain("react");
    expect(await extractDeps(join(dir, "button.tsx"))).toContain(
      "framer-motion",
    );
  });
});

describe("publish/add roundtrip", () => {
  it("publishes a component and adds it back", async () => {
    const file = join(dir, "src/components/ui/hello.tsx");
    writeFileSync(
      file,
      'import React from "react";\nexport const Hello = () => <div>hi</div>;\n',
    );
    await publish(file);
    const manifest = JSON.parse(
      readFileSync(join(dir, ".uihive/registry.json"), "utf8"),
    );
    expect(manifest.components).toHaveLength(1);
    expect(manifest.components[0].name).toBe("hello");
    expect(manifest.components[0].dependencies).toContain("react");

    const destDir = join(dir, "out");
    mkdirSync(destDir, { recursive: true });
    writeFileSync(
      "uihive.json",
      JSON.stringify(
        { registryPath: "./.uihive/registry.json", targetPath: "./out" },
        null,
        2,
      ),
    );
    await add("hello");
    const copied = readFileSync(join(destDir, "hello.tsx"), "utf8");
    expect(copied).toContain("Hello");
  });
});
