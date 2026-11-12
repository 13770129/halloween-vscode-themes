// Validates the generated theme extension: 20 base theme files matching
// palette data, 20 high-contrast theme files meeting WCAG thresholds, and a
// package.json contributing exactly those 40 paths.
// Run with: node tools/validate.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PALETTES, contrastRatio, HC_PAIRS } from "./generate-themes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEMES_DIR = join(ROOT, "themes");

const errors = [];
const ok = (msg) => console.log("ok - " + msg);

const themeFiles = readdirSync(THEMES_DIR).filter((f) =>
  f.endsWith(".color-theme.json"),
);
if (themeFiles.length !== 40) {
  errors.push(`expected 40 theme files, found ${themeFiles.length}`);
} else {
  ok(`found ${themeFiles.length} theme files`);
}

const baseFiles = themeFiles.filter((f) => !f.endsWith("-hc.color-theme.json"));
const hcFiles = themeFiles.filter((f) => f.endsWith("-hc.color-theme.json"));
if (baseFiles.length !== 20 || hcFiles.length !== 20) {
  errors.push(
    `expected 20 base and 20 HC files, found ${baseFiles.length}/${hcFiles.length}`,
  );
} else {
  ok(`found ${baseFiles.length} base and ${hcFiles.length} HC theme files`);
}

for (const file of baseFiles) {
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
if (errors.length === 0) ok("base theme files parse and match palette data");

// High-contrast checks: recompute WCAG ratios for the text token pairs.
const TEXT_MIN = 4.5;
const BUTTON_MIN = 3.0;
let totalPairs = 0;
let hit7 = 0;
for (const file of hcFiles) {
  const match = /^(.+)-(light|dark)-hc\.color-theme\.json$/.exec(file);
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
  if (theme.type !== mode) {
    errors.push(`${file}: type ${theme.type} != expected ${mode}`);
  }
  if (!theme.name.endsWith("(High Contrast)")) {
    errors.push(`${file}: name missing High Contrast suffix`);
  }
  const pairResults = [];
  for (const [label, fgKey, bgKey] of HC_PAIRS) {
    const fg = theme.colors[fgKey];
    const bg = theme.colors[bgKey];
    if (!fg || !bg) {
      errors.push(`${file}: missing colors for pair ${label}`);
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    totalPairs++;
    if (ratio >= 7) hit7++;
    const min = label === "accent-fg" ? BUTTON_MIN : TEXT_MIN;
    if (ratio < min) {
      errors.push(
        `${file}: ${label} ratio ${ratio.toFixed(2)} < ${min}`,
      );
    }
    pairResults.push(`${label}=${ratio.toFixed(2)}`);
  }
  if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length === 0) {
    errors.push(`${file}: tokenColors missing or empty`);
  }
  console.log(`hc ${file}: ${pairResults.join(" ")}`);
}
console.log(`HC summary: ${hit7}/${totalPairs} pairs reached 7:1`);

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const themes = pkg.contributes?.themes;
if (!Array.isArray(themes) || themes.length !== 40) {
  errors.push(
    `package.json contributes.themes should have 40 entries, found ${
      Array.isArray(themes) ? themes.length : "none"
    }`,
  );
} else {
  const paths = themes.map((t) => t.path);
  if (new Set(paths).size !== 40) {
    errors.push("package.json themes paths are not unique");
  }
  for (const p of paths) {
    if (!existsSync(join(ROOT, p))) {
      errors.push(`package.json references missing theme file: ${p}`);
    }
  }
  if (errors.length === 0) ok("package.json lists 40 unique existing theme files");
}

if (errors.length > 0) {
  console.error("\nFAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("\nAll checks passed.");
