# High-Contrast Variants

Every palette also ships a high-contrast variant (`<id>-<mode>-hc.color-theme.json`)
targeting WCAG AAA text contrast (7:1) against the theme's editor background and
sidebar surface, while keeping the palette's hue family identifiable.

## Method

- Contrast is computed with the WCAG relative-luminance formula (sRGB
  channels gamma-expanded) and ratio `(L1 + 0.05) / (L2 + 0.05)`.
- Adjustment uses HSL (hand-rolled, no dependencies): hue and saturation are
  kept from the base palette, and only lightness changes. HSL was chosen over
  OKLCH because it round-trips exactly, keeps hue/saturation trivially
  constant, and is adequate for this monotone contrast search.
- Each text-role color (fg, muted, subtle, accent, second, chart-1..5) is
  binary-searched in lightness until its contrast against both `editor.background`
  and `sideBar.background` reaches >= 7:1. Light themes darken, dark themes
  lighten. If 7:1 is unreachable while keeping hue/saturation, the closest
  achievable ratio is kept, with a hard floor of 4.5:1; below that floor
  saturation is reduced toward gray. No run below the floor occurred.
- The button pair (accent foreground on accent background) targets >= 4.5:1;
  a saturated accent button that meets 7:1 on both backgrounds would drain
  the palette of its character.
- Non-text keys (selection backgrounds, line highlights, scrollbars, borders,
  bracket match, find match, shadows, indentation guides, tab borders) copy
  the base theme values unchanged.
- The generated files are checked at build time by `tools/validate.mjs`.

## Achieved ratios

Minimum text-pair ratio (9 pairs per mode, all vs `editor.background` or
`sideBar.background`) and the accent-fg/accent button ratio:

| Theme | Min text ratio | Button ratio |
| --- | ---: | ---: |
| Pumpkin Light | 13.20 | 5.30 |
| Pumpkin Dark | 9.50 | 7.53 |
| Coven Light | 15.32 | 7.55 |
| Coven Dark | 7.45 | 5.27 |
| Candycorn Light | 14.92 | 4.94 |
| Candycorn Dark | 12.14 | 12.03 |
| Bloody Valentine Light | 14.11 | 6.24 |
| Bloody Valentine Dark | 7.52 | 5.33 |
| Hexberry Light | 14.65 | 5.67 |
| Hexberry Dark | 8.73 | 6.47 |
| Alien Light | 14.08 | 5.48 |
| Alien Dark | 8.40 | 14.75 |
| Ghost Ship Light | 12.66 | 5.60 |
| Ghost Ship Dark | 10.14 | 12.19 |
| The Thing Light | 13.65 | 6.34 |
| The Thing Dark | 8.45 | 9.28 |
| Full Moon Light | 14.06 | 7.14 |
| Full Moon Dark | 7.51 | 6.26 |
| Goth Light | 8.28 | 8.98 |
| Goth Dark | 8.66 | 7.26 |

All 180 text pairs (9 pairs × 20 modes) reach 7:1; all 20 button pairs reach
4.5:1. The narrowest text pairs are chart colors on dark modes (e.g. Coven
Dark chart-4 at 7.45:1) and the darkest light-mode accents (Goth Light accent
at 8.28:1) — all above the 7:1 target, so there are no shortfalls to report.
