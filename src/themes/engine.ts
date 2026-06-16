import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { THEMES_DIR } from '../core/constants.js';
import type { Theme, ThemeMeta } from '../core/types/theme.js';

export class ThemeEngine {
  async listThemes(): Promise<string[]> {
    if (!existsSync(THEMES_DIR)) return [];
    const entries = await readdir(THEMES_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  }

  async loadTheme(id: string): Promise<Theme> {
    const themeDir = resolve(THEMES_DIR, id);

    const metaRaw = await readFile(resolve(themeDir, 'theme.json'), 'utf-8');
    const meta: ThemeMeta = JSON.parse(metaRaw);

    let tokens: Record<string, string> = {};
    try {
      const tokensRaw = await readFile(resolve(themeDir, 'tokens.css'), 'utf-8');
      tokens = this.parseTokens(tokensRaw);
    } catch {
      tokens = this.getDefaultTokens();
    }

    return { meta, tokens, templates: {} };
  }

  private parseTokens(css: string): Record<string, string> {
    const tokens: Record<string, string> = {};
    const regex = /--([\w-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
      tokens[match[1]] = match[2].trim();
    }
    return tokens;
  }

  private getDefaultTokens(): Record<string, string> {
    return {
      'color-primary': '#6366f1',
      'color-primary-light': '#eef2ff',
      'max-width': '72rem',
      'font-body': 'system-ui, sans-serif',
      'font-heading': 'system-ui, sans-serif',
      'border-radius': '0.5rem',
      'color-bg': '#ffffff',
      'color-text': '#0a0a0a',
      'color-text-secondary': '#525252',
    };
  }

  resolveTokens(themeTokens: Record<string, string>, customTokens: Record<string, string>): string {
    const merged = { ...this.getDefaultTokens(), ...themeTokens, ...customTokens };
    return Object.entries(merged)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n');
  }
}
