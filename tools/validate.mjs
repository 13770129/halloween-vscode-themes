// Validates the generated theme extension: 20 theme files matching palette
// data, and a package.json contributing exactly those 20 paths.
// Run with: node tools/validate.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PALETTES } from "./generate-themes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEMES_DIR = join(ROOT, "themes");

const errors = [];
const ok = (msg) => console.log("ok - " + msg);

const themeFiles = readdirSync(THEMES_DIR).filter((f) =>
  f.endsWith(".color-theme.json"),
);
if (themeFiles.length !== 20) {
  errors.push(`expected 20 theme files, found ${themeFiles.length}`);
} else {
  ok(`found ${themeFiles.length} theme files`);
}

for (const file of themeFiles) {
  const match = /^(.+)-(light|dark)\.color-theme\.json$/.exec(file);
  if (!match) {
    errors.push(`${file}: unexpected filename shape`);
    continue;
  }
  const [, id, mode] = match;
  let theme;
  try {
    theme = JSON.parse(readFileSync(join(THEMES_DIR, file), "utf8"));
  } catch (e) {
    errors.push(`${file}: invalid JSON: ${e.message}`);
    continue;
  }
  const palette = PALETTES[id];
  if (!palette) {
    errors.push(`${file}: unknown palette id ${id}`);
    continue;
  }
  if (theme.colors?.["editor.background"] !== palette[mode].bg) {
    errors.push(
      `${file}: editor.background ${theme.colors?.["editor.background"]} != expected ${palette[mode].bg}`,
    );
  }
  if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length === 0) {
    errors.push(`${file}: tokenColors missing or empty`);
  }
  if (typeof theme.name !== "string" || theme.name.trim() === "") {
    errors.push(`${file}: name missing`);
  }
}
if (errors.length === 0) ok("all theme files parse and match palette data");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const themes = pkg.contributes?.themes;
if (!Array.isArray(themes) || themes.length !== 20) {
  errors.push(
    `package.json contributes.themes should have 20 entries, found ${
      Array.isArray(themes) ? themes.length : "none"
    }`,
  );
} else {
  const paths = themes.map((t) => t.path);
  if (new Set(paths).size !== 20) {
    errors.push("package.json themes paths are not unique");
  }
  for (const p of paths) {
    if (!existsSync(join(ROOT, p))) {
      errors.push(`package.json references missing theme file: ${p}`);
    }
  }
  if (errors.length === 0) ok("package.json lists 20 unique existing theme files");
}

if (errors.length > 0) {
  console.error("\nFAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("\nAll checks passed.");
