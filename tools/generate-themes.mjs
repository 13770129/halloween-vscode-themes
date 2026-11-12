// Generates themes/<id>-<mode>.color-theme.json for the 10 Unsloth Halloween
// palettes (10 light + 10 dark). Run with: node tools/generate-themes.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEMES_DIR = join(ROOT, "themes");

// Palette values copied verbatim from the CSS seed blocks added in
// https://github.com/unslothai/unsloth/pull/16503
// (studio/frontend/src/index.css). Keys mirror the CSS variable names, e.g.
// --th-chart-1 -> chart1, --control-accent-foreground -> controlAccentForeground.
export const PALETTES = {
  pumpkin: {
    name: "Pumpkin",
    light: {
      bg: "#fff3e3",
      surface: "#ffe7c9",
      raised: "#f7e0c1",
      hover: "#efd9b9",
      border: "#c1ac8b",
      fg: "#3a1a00",
      muted: "#6e5f3c",
      subtle: "#a6917d",
      accent: "#b84800",
      accentFg: "#ffffff",
      second: "#3a7d00",
      chart1: "#b84800",
      chart2: "#3a7d00",
      chart3: "#c48a00",
      chart4: "#7a2fe0",
      chart5: "#d1202e",
      ring: "#3a7d00",
      sidebarRing: "#3a7d00",
      controlAccent: "#3a7d00",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#588f22",
      composerShadow:
        "0 6px 28px -10px rgb(184 72 0 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#1f0f02",
      surface: "#2b1606",
      raised: "#33210d",
      hover: "#3b2b14",
      border: "#4b4022",
      fg: "#ffeedd",
      muted: "#bbbc91",
      subtle: "#847365",
      accent: "#ff7a00",
      accentFg: "#130901",
      second: "#8fe03a",
      chart1: "#ff7a00",
      chart2: "#8fe03a",
      chart3: "#ffc21a",
      chart4: "#b06bff",
      chart5: "#ff4a3d",
      ring: "#8fe03a",
      sidebarRing: "#8fe03a",
      controlAccent: "#8fe03a",
      controlAccentForeground: "#130901",
      navIconIdleBase: "#73ac2c",
      composerShadow: "0 0 40px 6px rgb(255 122 0 / 0.16)",
    },
  },
  "black-cat": {
    name: "Coven",
    light: {
      bg: "#f6f1ff",
      surface: "#ebe0ff",
      raised: "#e2d8f6",
      hover: "#dacfed",
      border: "#b4a9c5",
      fg: "#120a1c",
      muted: "#4f4759",
      subtle: "#8f8999",
      accent: "#6a1fd6",
      accentFg: "#ffffff",
      second: "#1c1028",
      chart1: "#6a1fd6",
      chart2: "#1c1028",
      chart3: "#4a3fd1",
      chart4: "#b0128a",
      chart5: "#5c5470",
      ring: "#1c1028",
      sidebarRing: "#1c1028",
      controlAccent: "#1c1028",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#3d3248",
      composerShadow:
        "0 6px 28px -10px rgb(106 31 214 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#08060b",
      surface: "#110d16",
      raised: "#1c1722",
      hover: "#27212d",
      border: "#3c3545",
      fg: "#f3eaff",
      muted: "#bdb1cb",
      subtle: "#726d79",
      accent: "#a259ff",
      accentFg: "#050407",
      second: "#dcb8ff",
      chart1: "#a259ff",
      chart2: "#dcb8ff",
      chart3: "#7a5cff",
      chart4: "#ff5cd6",
      chart5: "#b8b0c4",
      ring: "#dcb8ff",
      sidebarRing: "#dcb8ff",
      controlAccent: "#dcb8ff",
      controlAccentForeground: "#050407",
      navIconIdleBase: "#a78cc2",
      composerShadow: "0 0 40px 6px rgb(162 89 255 / 0.16)",
    },
  },
  candycorn: {
    name: "Candycorn",
    light: {
      bg: "#fffaf0",
      surface: "#fff0d6",
      raised: "#fbe7c6",
      hover: "#f6ddb6",
      border: "#c6b18f",
      fg: "#2b1a05",
      muted: "#7a5a2c",
      subtle: "#a88f6a",
      accent: "#b8520a",
      accentFg: "#ffffff",
      second: "#8f6a00",
      chart1: "#b8520a",
      chart2: "#8f6a00",
      chart3: "#d07a1a",
      chart4: "#6e5a3a",
      chart5: "#c9a000",
      ring: "#8f6a00",
      sidebarRing: "#8f6a00",
      controlAccent: "#8f6a00",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#a58224",
      composerShadow:
        "0 6px 28px -10px rgb(184 82 10 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#14100a",
      surface: "#1e170d",
      raised: "#291f11",
      hover: "#332715",
      border: "#4f3d22",
      fg: "#ffffff",
      muted: "#ffe2b8",
      subtle: "#b3936a",
      accent: "#ffc72c",
      accentFg: "#1a1002",
      second: "#ff7a1a",
      chart1: "#ffc72c",
      chart2: "#ff7a1a",
      chart3: "#ffffff",
      chart4: "#ffe2b8",
      chart5: "#e0601a",
      ring: "#ff7a1a",
      sidebarRing: "#ff7a1a",
      controlAccent: "#ff7a1a",
      controlAccentForeground: "#1a0c02",
      navIconIdleBase: "#ff9a3c",
      composerShadow: "0 0 40px 6px rgb(255 199 44 / 0.16)",
    },
  },
  "bloody-valentine": {
    name: "Bloody Valentine",
    light: {
      bg: "#fff0f2",
      surface: "#ffe0e6",
      raised: "#f9d8df",
      hover: "#f3cfd8",
      border: "#cca3ae",
      fg: "#3a0510",
      muted: "#7c4759",
      subtle: "#a6868c",
      accent: "#c4001f",
      accentFg: "#ffffff",
      second: "#b0247a",
      chart1: "#c4001f",
      chart2: "#b0247a",
      chart3: "#6e5a64",
      chart4: "#d1550e",
      chart5: "#8b2fd1",
      ring: "#b0247a",
      sidebarRing: "#b0247a",
      controlAccent: "#b0247a",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#bc438c",
      composerShadow:
        "0 6px 28px -10px rgb(196 0 31 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#1f0307",
      surface: "#2c070d",
      raised: "#371017",
      hover: "#411921",
      border: "#562b36",
      fg: "#ffe3e8",
      muted: "#cfa3b2",
      subtle: "#84686c",
      accent: "#ff1f43",
      accentFg: "#130204",
      second: "#ff8ac4",
      chart1: "#ff1f43",
      chart2: "#ff8ac4",
      chart3: "#c8b8c4",
      chart4: "#ff7a2e",
      chart5: "#c25cff",
      ring: "#ff8ac4",
      sidebarRing: "#ff8ac4",
      controlAccent: "#ff8ac4",
      controlAccentForeground: "#130204",
      navIconIdleBase: "#c76895",
      composerShadow: "0 0 40px 6px rgb(255 31 67 / 0.16)",
    },
  },
  hexberry: {
    name: "Hexberry",
    light: {
      bg: "#fff2f8",
      surface: "#ffe2f0",
      raised: "#fbd8ea",
      hover: "#f5cde2",
      border: "#cea4ba",
      fg: "#33061f",
      muted: "#7d4766",
      subtle: "#a8869a",
      accent: "#c2187a",
      accentFg: "#ffffff",
      second: "#0d7d60",
      chart1: "#c2187a",
      chart2: "#0d7d60",
      chart3: "#7a4fd1",
      chart4: "#e86aa8",
      chart5: "#a88a00",
      ring: "#0d7d60",
      sidebarRing: "#0d7d60",
      controlAccent: "#0d7d60",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#2f9c7d",
      composerShadow:
        "0 6px 28px -10px rgb(194 24 122 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#14060f",
      surface: "#1f0a18",
      raised: "#2a1022",
      hover: "#34152b",
      border: "#522245",
      fg: "#ffe6f3",
      muted: "#d79ac0",
      subtle: "#85617a",
      accent: "#ff4fae",
      accentFg: "#1a0612",
      second: "#5ef0c0",
      chart1: "#ff4fae",
      chart2: "#5ef0c0",
      chart3: "#c9a7ff",
      chart4: "#ffb3d9",
      chart5: "#f2e86d",
      ring: "#5ef0c0",
      sidebarRing: "#5ef0c0",
      controlAccent: "#5ef0c0",
      controlAccentForeground: "#071a14",
      navIconIdleBase: "#3fbf98",
      composerShadow: "0 0 40px 6px rgb(255 79 174 / 0.16)",
    },
  },
  alien: {
    name: "Alien",
    light: {
      bg: "#eefff4",
      surface: "#dafbe6",
      raised: "#d4f2df",
      hover: "#ceead8",
      border: "#a0baab",
      fg: "#032a12",
      muted: "#565f5c",
      subtle: "#849f8e",
      accent: "#007a33",
      accentFg: "#ffffff",
      second: "#b0128a",
      chart1: "#007a33",
      chart2: "#b0128a",
      chart3: "#0080b0",
      chart4: "#5f8f00",
      chart5: "#4f6f5c",
      ring: "#b0128a",
      sidebarRing: "#b0128a",
      controlAccent: "#b0128a",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#b9369a",
      composerShadow:
        "0 6px 28px -10px rgb(0 122 51 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#02130a",
      surface: "#051e10",
      raised: "#10251a",
      hover: "#1c2c24",
      border: "#323a38",
      fg: "#d6ffe6",
      muted: "#b0aab2",
      subtle: "#617d6d",
      accent: "#00ff6a",
      accentFg: "#010b06",
      second: "#ff3dc8",
      chart1: "#00ff6a",
      chart2: "#ff3dc8",
      chart3: "#1ad6ff",
      chart4: "#c8ff1a",
      chart5: "#8fb8a0",
      ring: "#ff3dc8",
      sidebarRing: "#ff3dc8",
      controlAccent: "#ff3dc8",
      controlAccentForeground: "#010b06",
      navIconIdleBase: "#c03399",
      composerShadow: "0 0 40px 6px rgb(0 255 106 / 0.16)",
    },
  },
  "ghost-ship": {
    name: "Ghost Ship",
    light: {
      bg: "#ecfffb",
      surface: "#d4f8f0",
      raised: "#cef1e7",
      hover: "#c7e9df",
      border: "#98bbb0",
      fg: "#03302a",
      muted: "#516c5c",
      subtle: "#83a29d",
      accent: "#00756a",
      accentFg: "#ffffff",
      second: "#8a6000",
      chart1: "#00756a",
      chart2: "#8a6000",
      chart3: "#1f5fc8",
      chart4: "#4f8a00",
      chart5: "#c8102e",
      ring: "#8a6000",
      sidebarRing: "#8a6000",
      controlAccent: "#8a6000",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#997826",
      composerShadow:
        "0 6px 28px -10px rgb(0 117 106 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#021716",
      surface: "#042420",
      raised: "#102e27",
      hover: "#1b382d",
      border: "#324c3a",
      fg: "#d9fff8",
      muted: "#b2c6a6",
      subtle: "#637f7c",
      accent: "#00e5c8",
      accentFg: "#010e0d",
      second: "#ffd23d",
      chart1: "#00e5c8",
      chart2: "#ffd23d",
      chart3: "#5ca8ff",
      chart4: "#a8ff3d",
      chart5: "#ff5c7a",
      ring: "#ffd23d",
      sidebarRing: "#ffd23d",
      controlAccent: "#ffd23d",
      controlAccentForeground: "#010e0d",
      navIconIdleBase: "#c0a333",
      composerShadow: "0 0 40px 6px rgb(0 229 200 / 0.16)",
    },
  },
  "the-thing": {
    name: "The Thing",
    light: {
      bg: "#eef8ff",
      surface: "#dcefff",
      raised: "#d6e7f6",
      hover: "#d0dfee",
      border: "#a2b2c0",
      fg: "#04233a",
      muted: "#585f67",
      subtle: "#8598a6",
      accent: "#0062a8",
      accentFg: "#ffffff",
      second: "#c03f00",
      chart1: "#0062a8",
      chart2: "#c03f00",
      chart3: "#4f7590",
      chart4: "#0a9e86",
      chart5: "#c8102e",
      ring: "#c03f00",
      sidebarRing: "#c03f00",
      controlAccent: "#c03f00",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#c75b26",
      composerShadow:
        "0 6px 28px -10px rgb(0 98 168 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#04121f",
      surface: "#081c2e",
      raised: "#142433",
      hover: "#1f2b39",
      border: "#363b43",
      fg: "#e0f3ff",
      muted: "#b7aba6",
      subtle: "#677784",
      accent: "#3dbcff",
      accentFg: "#020b13",
      second: "#ff6a1a",
      chart1: "#3dbcff",
      chart2: "#ff6a1a",
      chart3: "#cfeaff",
      chart4: "#2ee0c0",
      chart5: "#ff3d5a",
      ring: "#ff6a1a",
      sidebarRing: "#ff6a1a",
      controlAccent: "#ff6a1a",
      controlAccentForeground: "#020b13",
      navIconIdleBase: "#c0541b",
      composerShadow: "0 0 40px 6px rgb(61 188 255 / 0.16)",
    },
  },
  "midnight-haunt": {
    name: "Full Moon",
    light: {
      bg: "#f0f3ff",
      surface: "#dfe5ff",
      raised: "#d8def7",
      hover: "#d1d7ee",
      border: "#a8adc6",
      fg: "#0c1442",
      muted: "#56596c",
      subtle: "#898faa",
      accent: "#2f45d6",
      accentFg: "#ffffff",
      second: "#856400",
      chart1: "#2f45d6",
      chart2: "#856400",
      chart3: "#007fa8",
      chart4: "#8b2fd1",
      chart5: "#c8102e",
      ring: "#856400",
      sidebarRing: "#856400",
      controlAccent: "#856400",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#957926",
      composerShadow:
        "0 6px 28px -10px rgb(47 69 214 / 0.35), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
    },
    dark: {
      bg: "#060a24",
      surface: "#0b1236",
      raised: "#161d3d",
      hover: "#222743",
      border: "#393c50",
      fg: "#e3e8ff",
      muted: "#b9b7b5",
      subtle: "#696e87",
      accent: "#6f86ff",
      accentFg: "#040616",
      second: "#ffe066",
      chart1: "#6f86ff",
      chart2: "#ffe066",
      chart3: "#3ddcff",
      chart4: "#d67aff",
      chart5: "#ff6a8a",
      ring: "#ffe066",
      sidebarRing: "#ffe066",
      controlAccent: "#ffe066",
      controlAccentForeground: "#040616",
      navIconIdleBase: "#c1ab56",
      composerShadow: "0 0 40px 6px rgb(111 134 255 / 0.16)",
    },
  },
  gothic: {
    name: "Goth",
    light: {
      bg: "#f7f5f7",
      surface: "#ece8ed",
      raised: "#e4dfe6",
      hover: "#ddd7df",
      border: "#b4adb6",
      fg: "#1c1519",
      muted: "#5f5560",
      subtle: "#948a96",
      accent: "#5b21b6",
      accentFg: "#ffffff",
      second: "#a3173f",
      chart1: "#5b21b6",
      chart2: "#a3173f",
      chart3: "#8a8094",
      chart4: "#7c3aed",
      chart5: "#3b3440",
      ring: "#a3173f",
      sidebarRing: "#a3173f",
      controlAccent: "#a3173f",
      controlAccentForeground: "#ffffff",
      navIconIdleBase: "#b84a68",
    },
    dark: {
      bg: "#0b0a0d",
      surface: "#141217",
      raised: "#1c1920",
      hover: "#242029",
      border: "#3a3340",
      fg: "#f1ecf2",
      muted: "#b3a8b8",
      subtle: "#6f6776",
      accent: "#a78bfa",
      accentFg: "#0b0a0d",
      second: "#e0335e",
      chart1: "#a78bfa",
      chart2: "#e0335e",
      chart3: "#c9c3d1",
      chart4: "#7c5cd6",
      chart5: "#e8b4c4",
      ring: "#e0335e",
      sidebarRing: "#e0335e",
      controlAccent: "#e0335e",
      controlAccentForeground: "#0b0a0d",
      navIconIdleBase: "#b0365a",
    },
  },
};

// --- WCAG contrast helpers (no dependencies) ---

export function parseHex(hex) {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 6) h += "ff";
  if (h.length !== 8 || !/^[0-9a-f]{8}$/i.test(h)) {
    throw new Error(`invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: parseInt(h.slice(6, 8), 16) / 255,
  };
}

function channelToLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex) {
  const { r, g, b } = parseHex(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function rgbToHsl(hex) {
  const { r, g, b } = parseHex(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h /= 6;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }) {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (v) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// High-contrast adjustment: binary-search HSL lightness (keeping hue and
// saturation) until the color reaches `threshold` against every target
// background. Light themes darken, dark themes lighten. If the threshold is
// unreachable, the best achievable ratio is kept; below 4.5:1 the
// saturation is lowered toward gray as a last resort.
function adjustLightness(hex, targets, dir, threshold) {
  const hsl = rgbToHsl(hex);
  const make = (l, s = hsl.s) => hslToHex({ h: hsl.h, s, l });
  const minRatio = (c) => Math.min(...targets.map((t) => contrastRatio(c, t)));
  const best = { hex, ratio: minRatio(hex), note: null };
  if (best.ratio >= threshold) return best;
  let lLo = dir < 0 ? 0 : hsl.l;
  let lHi = dir < 0 ? hsl.l : 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lLo + lHi) / 2;
    const c = make(mid);
    const r = minRatio(c);
    if (r > best.ratio) {
      best.hex = c;
      best.ratio = r;
    }
    if (r >= threshold) {
      if (dir < 0) lHi = mid;
      else lLo = mid;
    } else {
      if (dir < 0) lLo = mid;
      else lHi = mid;
    }
  }
  for (const l of [0, 1]) {
    const c = make(l);
    const r = minRatio(c);
    if (r > best.ratio) {
      best.hex = c;
      best.ratio = r;
    }
  }
  if (best.ratio >= threshold) return best;
  if (best.ratio >= 4.5) {
    best.note = threshold === 7.0 ? `max ${best.ratio.toFixed(2)}:1 < 7:1` : null;
    return best;
  }
  let s = hsl.s;
  while (s > 0.02) {
    s = Math.max(0, s - 0.15);
    for (const l of [0, 1]) {
      const c = make(l, s);
      const r = minRatio(c);
      if (r > best.ratio) {
        best.hex = c;
        best.ratio = r;
        best.note = `saturation reduced to ${s.toFixed(2)}`;
      }
    }
    if (best.ratio >= 4.5) break;
  }
  return best;
}

function adjustForContrast(hex, targets, mode) {
  const dir = mode === "light" ? -1 : 1;
  return adjustLightness(hex, targets, dir, 7.0);
}

function adjustForButtonPair(hex, targets) {
  const down = adjustLightness(hex, targets, -1, 4.5);
  const up = adjustLightness(hex, targets, 1, 4.5);
  return up.ratio > down.ratio ? up : down;
}

const TEXT_ROLE_COLORS = [
  "fg",
  "muted",
  "subtle",
  "accent",
  "second",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
];

const MODE_LABELS = { light: "Light", dark: "Dark" };

// Pairs checked for high-contrast themes: [label, foreground key, background key].
export const HC_PAIRS = [
  ["fg", "editor.foreground", "editor.background"],
  ["muted", "editorLineNumber.activeForeground", "editor.background"],
  ["subtle", "editorLineNumber.foreground", "editor.background"],
  ["accent", "editorCursor.foreground", "editor.background"],
  ["second", "terminal.ansiCyan", "editor.background"],
  ["chart-3", "terminal.ansiYellow", "editor.background"],
  ["chart-4", "terminal.ansiMagenta", "editor.background"],
  ["chart-2", "terminal.ansiGreen", "editor.background"],
  ["accent-fg", "button.foreground", "button.background"],
  ["fg/surface", "editor.foreground", "sideBar.background"],
];

function buildColors(m) {
  const withAlpha = (hex, alpha) => hex + alpha;
  return {
    "editor.background": m.bg,
    "editor.foreground": m.fg,
    "editorLineNumber.foreground": m.subtle,
    "editorLineNumber.activeForeground": m.muted,
    "editorCursor.foreground": m.accent,
    "editor.selectionBackground": withAlpha(m.accent, "3d"),
    "editor.inactiveSelectionBackground": withAlpha(m.accent, "1a"),
    "editor.lineHighlightBackground": withAlpha(m.hover, "80"),
    "editorIndentGuide.background1": m.border,
    "editorIndentGuide.activeBackground1": m.muted,
    "editorWhitespace.foreground": m.border,
    "editorBracketMatch.background": withAlpha(m.accent, "33"),
    "editorBracketMatch.border": m.accent,
    "editorBracketHighlight.foreground1": m.accent,
    "editorBracketHighlight.foreground2": m.second,
    "editorBracketHighlight.foreground3": m.chart3,
    "editorError.foreground": m.chart5,
    "editorWarning.foreground": m.chart4,
    "editorInfo.foreground": m.chart3,
    "editorGutter.background": m.bg,
    "editorWidget.background": m.surface,
    "editorWidget.border": m.border,
    "editorSuggestWidget.background": m.surface,
    "editorSuggestWidget.selectedBackground": m.hover,
    "editorSuggestWidget.border": m.border,
    "editorHoverWidget.background": m.surface,
    "editorHoverWidget.border": m.border,
    "editorLink.activeForeground": m.second,
    "editor.findMatchBackground": withAlpha(m.accent, "66"),
    "editor.findMatchHighlightBackground": withAlpha(m.second, "40"),
    "editor.findRangeHighlightBackground": withAlpha(m.hover, "80"),
    "sideBar.background": m.surface,
    "sideBar.foreground": m.fg,
    "sideBar.border": m.border,
    "sideBarSectionHeader.background": m.raised,
    "sideBarSectionHeader.foreground": m.muted,
    "activityBar.background": m.surface,
    "activityBar.foreground": m.muted,
    "activityBar.inactiveForeground": m.subtle,
    "activityBar.activeBorder": m.accent,
    "activityBar.border": m.border,
    "activityBarBadge.background": m.accent,
    "activityBarBadge.foreground": m.accentFg,
    "titleBar.activeBackground": m.surface,
    "titleBar.activeForeground": m.fg,
    "titleBar.inactiveBackground": m.bg,
    "titleBar.inactiveForeground": m.muted,
    "titleBar.border": m.border,
    "statusBar.background": m.raised,
    "statusBar.foreground": m.muted,
    "statusBar.noFolderBackground": m.raised,
    "statusBar.debuggingBackground": m.accent,
    "statusBar.debuggingForeground": m.accentFg,
    "statusBar.border": m.border,
    "panel.background": m.bg,
    "panel.border": m.border,
    "panelTitle.activeForeground": m.accent,
    "panelTitle.inactiveForeground": m.muted,
    "panelInput.border": m.border,
    "terminal.background": m.bg,
    "terminal.foreground": m.fg,
    "terminal.border": m.border,
    "terminalCursor.foreground": m.accent,
    "terminal.ansiBlack": m.border,
    "terminal.ansiBrightBlack": m.muted,
    "terminal.ansiRed": m.chart5,
    "terminal.ansiBrightRed": m.chart5,
    "terminal.ansiGreen": m.chart2,
    "terminal.ansiBrightGreen": m.chart2,
    "terminal.ansiYellow": m.chart3,
    "terminal.ansiBrightYellow": m.chart3,
    "terminal.ansiBlue": m.chart1,
    "terminal.ansiBrightBlue": m.chart1,
    "terminal.ansiMagenta": m.chart4,
    "terminal.ansiBrightMagenta": m.chart4,
    "terminal.ansiCyan": m.second,
    "terminal.ansiBrightCyan": m.second,
    "terminal.ansiWhite": m.fg,
    "terminal.ansiBrightWhite": m.fg,
    "list.activeSelectionBackground": m.hover,
    "list.activeSelectionForeground": m.fg,
    "list.inactiveSelectionBackground": m.raised,
    "list.hoverBackground": withAlpha(m.hover, "b3"),
    "list.focusBackground": m.hover,
    "list.highlightForeground": m.accent,
    "list.errorForeground": m.chart5,
    "list.warningForeground": m.chart4,
    "button.background": m.accent,
    "button.foreground": m.accentFg,
    "button.hoverBackground": withAlpha(m.accent, "cc"),
    "button.secondaryBackground": m.raised,
    "button.secondaryForeground": m.fg,
    "button.secondaryHoverBackground": m.hover,
    "checkbox.background": m.raised,
    "checkbox.border": m.border,
    "dropdown.background": m.surface,
    "dropdown.border": m.border,
    "input.background": m.raised,
    "input.border": m.border,
    "input.foreground": m.fg,
    "input.placeholderForeground": m.subtle,
    "focusBorder": m.ring,
    "textLink.foreground": m.accent,
    "textLink.activeForeground": m.accent,
    "textCodeBlock.background": m.surface,
    "textSeparator.foreground": m.border,
    "badge.background": m.second,
    "badge.foreground": m.accentFg,
    "progressBar.background": m.accent,
    "notifications.background": m.surface,
    "notifications.foreground": m.fg,
    "notifications.border": m.border,
    "notificationCenterHeader.background": m.raised,
    "notificationCenterHeader.foreground": m.muted,
    "scrollbar.shadow": "#00000033",
    "scrollbarSlider.background": withAlpha(m.muted, "40"),
    "scrollbarSlider.hoverBackground": withAlpha(m.muted, "59"),
    "scrollbarSlider.activeBackground": withAlpha(m.muted, "80"),
    "minimap.background": m.bg,
    "editorGroupHeader.tabsBackground": m.surface,
    "editorGroup.border": m.border,
    "tab.activeBackground": m.bg,
    "tab.activeForeground": m.fg,
    "tab.inactiveBackground": m.surface,
    "tab.inactiveForeground": m.muted,
    "tab.border": m.border,
    "tab.activeBorderTop": m.accent,
    "breadcrumb.foreground": m.muted,
    "breadcrumb.focusForeground": m.accent,
    "breadcrumbPicker.background": m.surface,
    "quickInput.background": m.surface,
    "quickInputList.focusBackground": m.hover,
    "settings.headerForeground": m.accent,
    "keybindingLabel.background": m.raised,
    "gitDecoration.addedResourceForeground": m.chart2,
    "gitDecoration.modifiedResourceForeground": m.chart3,
    "gitDecoration.deletedResourceForeground": m.chart5,
    "gitDecoration.untrackedResourceForeground": m.second,
    "gitDecoration.conflictingResourceForeground": m.chart4,
    "gitDecoration.ignoredResourceForeground": m.subtle,
    "welcomePage.background": m.bg,
    "debugToolBar.background": m.raised,
  };
}

function buildTokenColors(m) {
  return [
    { scope: "", settings: { foreground: m.fg } },
    { scope: ["comment"], settings: { foreground: m.subtle, fontStyle: "italic" } },
    { scope: "string", settings: { foreground: m.second } },
    { scope: "constant.character.escape", settings: { foreground: m.chart4 } },
    { scope: "string.regexp", settings: { foreground: m.chart5 } },
    { scope: "keyword", settings: { foreground: m.accent } },
    { scope: "storage", settings: { foreground: m.accent } },
    { scope: "keyword.operator", settings: { foreground: m.muted } },
    { scope: "constant.numeric", settings: { foreground: m.chart2 } },
    { scope: "constant.language", settings: { foreground: m.chart5 } },
    { scope: "variable", settings: { foreground: m.fg } },
    { scope: "variable.other.constant", settings: { foreground: m.chart2 } },
    { scope: "variable.parameter", settings: { foreground: m.muted } },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: m.chart3 },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: m.chart4 },
    },
    { scope: "entity.name.tag", settings: { foreground: m.accent } },
    { scope: "entity.other.attribute-name", settings: { foreground: m.chart4 } },
    { scope: "markup.heading", settings: { foreground: m.accent, fontStyle: "bold" } },
    { scope: "markup.quote", settings: { foreground: m.subtle, fontStyle: "italic" } },
    { scope: "markup.underline.link", settings: { foreground: m.second, fontStyle: "underline" } },
  ];
}

// High-contrast variant of buildColors: text-role keys take the adjusted
// palette, every non-text key (selections, borders, scrollbars, tabs,
// shadows, guides, ...) keeps the base value unchanged.
function buildColorsHC(m, base) {
  const colors = buildColors(base);
  colors["editor.foreground"] = m.fg;
  colors["editorLineNumber.foreground"] = m.subtle;
  colors["editorLineNumber.activeForeground"] = m.muted;
  colors["editorCursor.foreground"] = m.accent;
  colors["editorBracketHighlight.foreground1"] = m.accent;
  colors["editorBracketHighlight.foreground2"] = m.second;
  colors["editorBracketHighlight.foreground3"] = m.chart3;
  colors["editorError.foreground"] = m.chart5;
  colors["editorWarning.foreground"] = m.chart4;
  colors["editorInfo.foreground"] = m.chart3;
  colors["editorLink.activeForeground"] = m.second;
  colors["sideBar.foreground"] = m.fg;
  colors["sideBarSectionHeader.foreground"] = m.muted;
  colors["activityBar.foreground"] = m.muted;
  colors["activityBar.inactiveForeground"] = m.subtle;
  colors["activityBarBadge.foreground"] = m.accentFg;
  colors["titleBar.activeForeground"] = m.fg;
  colors["titleBar.inactiveForeground"] = m.muted;
  colors["statusBar.foreground"] = m.muted;
  colors["statusBar.debuggingForeground"] = m.accentFg;
  colors["panelTitle.activeForeground"] = m.accent;
  colors["panelTitle.inactiveForeground"] = m.muted;
  colors["terminal.foreground"] = m.fg;
  colors["terminalCursor.foreground"] = m.accent;
  colors["terminal.ansiBrightBlack"] = m.muted;
  colors["terminal.ansiRed"] = m.chart5;
  colors["terminal.ansiBrightRed"] = m.chart5;
  colors["terminal.ansiGreen"] = m.chart2;
  colors["terminal.ansiBrightGreen"] = m.chart2;
  colors["terminal.ansiYellow"] = m.chart3;
  colors["terminal.ansiBrightYellow"] = m.chart3;
  colors["terminal.ansiBlue"] = m.chart1;
  colors["terminal.ansiBrightBlue"] = m.chart1;
  colors["terminal.ansiMagenta"] = m.chart4;
  colors["terminal.ansiBrightMagenta"] = m.chart4;
  colors["terminal.ansiCyan"] = m.second;
  colors["terminal.ansiBrightCyan"] = m.second;
  colors["terminal.ansiWhite"] = m.fg;
  colors["terminal.ansiBrightWhite"] = m.fg;
  colors["list.activeSelectionForeground"] = m.fg;
  colors["list.highlightForeground"] = m.accent;
  colors["list.errorForeground"] = m.chart5;
  colors["list.warningForeground"] = m.chart4;
  colors["button.foreground"] = m.accentFg;
  colors["button.secondaryForeground"] = m.fg;
  colors["input.foreground"] = m.fg;
  colors["input.placeholderForeground"] = m.subtle;
  colors["textLink.foreground"] = m.accent;
  colors["textLink.activeForeground"] = m.accent;
  colors["badge.foreground"] = m.accentFg;
  colors["notifications.foreground"] = m.fg;
  colors["notificationCenterHeader.foreground"] = m.muted;
  colors["tab.activeForeground"] = m.fg;
  colors["tab.inactiveForeground"] = m.muted;
  colors["breadcrumb.foreground"] = m.muted;
  colors["breadcrumb.focusForeground"] = m.accent;
  colors["settings.headerForeground"] = m.accent;
  colors["gitDecoration.addedResourceForeground"] = m.chart2;
  colors["gitDecoration.modifiedResourceForeground"] = m.chart3;
  colors["gitDecoration.deletedResourceForeground"] = m.chart5;
  colors["gitDecoration.untrackedResourceForeground"] = m.second;
  colors["gitDecoration.conflictingResourceForeground"] = m.chart4;
  colors["gitDecoration.ignoredResourceForeground"] = m.subtle;
  return colors;
}

mkdirSync(THEMES_DIR, { recursive: true });

for (const [id, palette] of Object.entries(PALETTES)) {
  for (const mode of ["light", "dark"]) {
    const theme = {
      name: `${palette.name} ${MODE_LABELS[mode]}`,
      type: mode,
      colors: buildColors(palette[mode]),
      tokenColors: buildTokenColors(palette[mode]),
    };
    const file = join(THEMES_DIR, `${id}-${mode}.color-theme.json`);
    writeFileSync(file, JSON.stringify(theme, null, 2) + "\n");
  }
}

// High-contrast variants: adjust text-role colors only, keep everything else.
const hcNotes = [];
const hcTable = [];
for (const [id, palette] of Object.entries(PALETTES)) {
  for (const mode of ["light", "dark"]) {
    const m = palette[mode];
    const targets = [m.bg, m.surface];
    const adj = { ...m };
    for (const prop of TEXT_ROLE_COLORS) {
      const res = adjustForContrast(m[prop], targets, mode);
      adj[prop] = res.hex;
      if (res.note) hcNotes.push(`${id} ${mode} ${prop}: ${res.note}`);
    }
    const btn = adjustForButtonPair(m.accentFg, [m.accent, m.second]);
    adj.accentFg = btn.hex;
    if (btn.note) hcNotes.push(`${id} ${mode} accent-fg: ${btn.note}`);
    const theme = {
      name: `${palette.name} ${MODE_LABELS[mode]} (High Contrast)`,
      type: mode,
      // hc-light/hc-black puts the variant under the picker's High Contrast section
      uiTheme: mode === "dark" ? "hc-black" : "hc-light",
      colors: buildColorsHC(adj, m),
      tokenColors: buildTokenColors(adj),
    };
    const file = join(THEMES_DIR, `${id}-${mode}-hc.color-theme.json`);
    writeFileSync(file, JSON.stringify(theme, null, 2) + "\n");
    const ratios = HC_PAIRS.map(
      ([label, fgKey, bgKey]) =>
        `${label}=${contrastRatio(theme.colors[fgKey], theme.colors[bgKey]).toFixed(2)}`,
    );
    hcTable.push(`${id}-${mode}: ${ratios.join(" ")}`);
  }
}

console.log("\nHigh contrast summary:");
for (const row of hcTable) console.log(row);
for (const note of hcNotes) console.log(`note: ${note}`);
console.log(
  "\nWrote 20 base theme files and 20 high-contrast theme files to themes/.",
);
