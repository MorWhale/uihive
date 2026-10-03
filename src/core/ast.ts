import * as swc from "@swc/core";
export async function extractImports(source: string) {
  const ast = await swc.parse(source, { syntax: "typescript", tsx: true });
  return ast.body.filter((n) => n.type === "ImportDeclaration");
}
