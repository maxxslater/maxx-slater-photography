import { readFile, writeFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { build } from "vite";
import { syncArticles } from "./sync-babylove.mjs";

const generatedFile = path.resolve("src/data/babylove.generated.ts");
const originalGeneratedFile = await readFile(generatedFile, "utf8");

function prerender() {
  const result = spawnSync(process.execPath, ["scripts/prerender.mjs"], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Prerender failed with exit code ${result.status}`);
  }
}

try {
  await syncArticles();
  await build();
  prerender();
} finally {
  await writeFile(generatedFile, originalGeneratedFile, "utf8");
}
