import { readFileSync, writeFileSync } from "node:fs";
export const read = (p: string) => readFileSync(p, "utf8");
export const write = (p: string, data: string) => writeFileSync(p, data, "utf8");
