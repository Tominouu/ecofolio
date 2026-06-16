import type { ThemeConfig } from './theme.js';

export interface SiteConfig {
  title: string;
  tagline?: string;
  url?: string;
  email?: string;
  language: string;
  locale: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface BuildConfig {
  minify: boolean;
  optimizeImages: boolean;
  inlineCss: boolean;
  cssTarget: string;
}

export interface PagesConfig {
  home: boolean;
  about: boolean;
  contact: boolean;
}

export interface Config {
  version: string;
  site: SiteConfig;
  theme: ThemeConfig;
  pages: PagesConfig;
  social: SocialLink[];
  build: BuildConfig;
}

export function createDefaultConfig(): Config {
  return {
    version: '1.0',
    site: {
      title: 'Mon Portfolio',
      tagline: 'Designer & Developer',
      language: 'fr',
      locale: 'fr_FR',
    },
    theme: {
      id: 'minimal',
      tokens: {
        colorPrimary: '#6366f1',
        borderRadius: '0.5rem',
        fontBody: 'Inter',
        fontHeading: 'Inter',
        maxWidth: '72rem',
      },
    },
    pages: {
      home: true,
      about: true,
      contact: true,
    },
    social: [],
    build: {
      minify: true,
      optimizeImages: true,
      inlineCss: true,
      cssTarget: 'es2020',
    },
  };
}
