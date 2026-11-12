# Unsloth Halloween Themes

VS Code color themes porting the 10 Halloween palettes added to Unsloth Studio.
The palette values are taken verbatim from the CSS seed blocks in
[unslothai/unsloth#16503](https://github.com/unslothai/unsloth/pull/16503).

## Palettes

Each palette ships a light and a dark theme:

| ID | Display name |
| --- | --- |
| pumpkin | Pumpkin |
| black-cat | Coven |
| candycorn | Candycorn |
| bloody-valentine | Bloody Valentine |
| hexberry | Hexberry |
| alien | Alien |
| ghost-ship | Ghost Ship |
| the-thing | The Thing |
| midnight-haunt | Full Moon |
| gothic | Goth |

Each theme covers editor chrome, syntax tokens, terminal ANSI colors, git
decorations, and common widgets.

## Preview

Open `demo/sample.py` in VS Code and cycle through the themes (Ctrl+K Ctrl+T)
to preview syntax token colors.

## Install

### From a VSIX file

1. Package the extension, e.g. `npx @vscode/vsce package`.
2. In VS Code open the Extensions view (`Ctrl+Shift+X`), click the `...` menu,
   and choose **Install from VSIX…**.

### By copying the folder

1. Copy this folder (as `unsloth-halloween-themes`) into:
   - Linux/macOS: `~/.vscode/extensions/`
   - Windows: `%USERPROFILE%\.vscode\extensions`
2. Reload the window: Command Palette → **Developer: Reload Window** (or restart
   VS Code).

## Notes

The Studio composer glow effect from the original PR is CSS-only and is not
portable to VS Code, so it is intentionally dropped here.

## Files

- `tools/generate-themes.mjs` — generates `themes/*.color-theme.json` from the
  palette data.
- `tools/validate.mjs` — checks the generated extension assets.
- `demo/sample.py` — syntax-highlighting preview file.
