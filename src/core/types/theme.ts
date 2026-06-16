export interface ThemeMeta {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  preview: string;
}

export interface ThemeConfig {
  id: string;
  tokens: Record<string, string>;
}

export interface Theme {
  meta: ThemeMeta;
  tokens: Record<string, string>;
  templates: Record<string, string>;
}

export interface ThemeTokens {
  colorPrimary: string;
  borderRadius: string;
  fontBody: string;
  fontHeading: string;
  maxWidth: string;
  [key: string]: string;
}
