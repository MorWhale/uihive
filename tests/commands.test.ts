import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chdir } from "node:process";
import { list } from "../src/commands/list.js";
import { info } from "../src/commands/info.js";
import { add } from "../src/commands/add.js";
import { publish } from "../src/commands/publish.js";
import { lang, t } from "../src/i18n.js";

let dir: string;
let cwd: string;

beforeEach(() => {
  cwd = process.cwd();
  dir = mkdtempSync(join(tmpdir(), "uihive-"));
  chdir(dir);
  mkdirSync(".uihive", { recursive: true });
  writeFileSync(
    "uihive.json",
    JSON.stringify(
      { registryPath: "./.uihive/registry.json", targetPath: "./out" },
      null,
      2,
    ),
  );
  writeFileSync(
    ".uihive/registry.json",
    JSON.stringify({ name: "t", version: "1.0.0", components: [] }, null, 2),
  );
});

afterEach(() => {
  chdir(cwd);
  vi.restoreAllMocks();
  delete process.env.UIHIVE_LANG;
});

describe("list/info/add(dry-run)", () => {
  it("lists and infos components, dry-run does not write", async () => {
    writeFileSync(join(dir, "hello.tsx"), 'import React from "react";\n');
    await publish(join(dir, "hello.tsx"));
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await list();
    expect(log.mock.calls.flat().join(" ")).toContain("hello");
    await info("hello");
    expect(log.mock.calls.flat().join(" ")).toContain("hello");
    await add("hello", { dryRun: true });
    expect(existsSync(join(dir, "out/hello.tsx"))).toBe(false);
  });
});

describe("i18n", () => {
  it("switches language via UIHIVE_LANG", () => {
    delete process.env.LANG;
    delete process.env.LC_ALL;
    delete process.env.LC_MESSAGES;
    process.env.UIHIVE_LANG = "fr";
    expect(lang()).toBe("fr");
    expect(t("registryEmpty")).toMatch(/registry/i);
    process.env.UIHIVE_LANG = "en";
    expect(lang()).toBe("en");
    expect(t("registryEmpty")).toMatch(/registry/i);
  });
});
