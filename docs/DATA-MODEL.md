# Modèle de Données — Ecofolio

---

## Principes

- **Tout est fichier** — Pas de base de données
- **JSON partout** — Structuré, validable, lisible
- **Clés en camelCase** — Cohérence TypeScript
- **Versionné** — Chaque fichier a un champ `$schema` ou `version`
- **Sans redondance** — Chaque donnée vit à un seul endroit

---

## 1. Configuration globale — `config.json`

Fichier racine du portfolio. Définit l'identité et le comportement global.

```jsonc
{
  "$schema": "ecofolio/config",
  "version": "1.0",

  "site": {
    "title": "Jane Doe",
    "tagline": "Designer & Developer",
    "url": "https://janedoe.github.io",
    "email": "jane@example.com",
    "language": "fr",
    "locale": "fr_FR"
  },

  "theme": {
    "id": "minimal",
    "tokens": {
      "colorPrimary": "#6366f1",
      "borderRadius": "0.5rem",
      "fontBody": "Inter",
      "fontHeading": "Inter",
      "maxWidth": "72rem"
    }
  },

  "pages": {
    "home": true,
    "about": true,
    "contact": true
  },

  "social": [
    { "platform": "github", "url": "https://github.com/janedoe" },
    { "platform": "linkedin", "url": "https://linkedin.com/in/janedoe" },
    { "platform": "twitter", "url": "https://twitter.com/janedoe" }
  ],

  "build": {
    "minify": true,
    "optimizeImages": true,
    "inlineCss": true,
    "cssTarget": "es2020"
  }
}
```

---

## 2. Projet — `content/projects/<slug>.json`

Représente un projet du portfolio.

```jsonc
{
  "$schema": "ecofolio/project",
  "version": "1.0",

  "slug": "eco-app",
  "title": "Éco App",
  "subtitle": "Concevoir pour le changement",
  "date": "2025-12-01",
  "tags": ["UX Design", "Mobile", "Environnement"],
  "featured": true,
  "status": "published",

  "cover": "assets/images/eco-app-cover.jpg",
  "thumbnail": "assets/images/eco-app-thumb.jpg",

  "seo": {
    "title": "Éco App — Jane Doe",
    "description": "UX design d'une application mobile pour le suivi environnemental",
    "ogImage": "assets/images/eco-app-og.jpg"
  },

  "blocks": [
    {
      "id": "blk_a1b2c3d4",
      "type": "hero",
      "data": {
        "image": "assets/images/hero-eco.jpg",
        "title": "Éco App",
        "subtitle": "A mobile experience for environmental awareness",
        "layout": "full"
      }
    },
    {
      "id": "blk_e5f6g7h8",
      "type": "gallery",
      "data": {
        "images": [
          { "src": "assets/images/eco-1.jpg", "alt": "Home screen" },
          { "src": "assets/images/eco-2.jpg", "alt": "Dashboard" },
          { "src": "assets/images/eco-3.jpg", "alt": "Profile" }
        ],
        "layout": "grid",
        "columns": 3
      }
    },
    {
      "id": "blk_i9j0k1l2",
      "type": "text",
      "data": {
        "content": "## Contexte\n\nThis project was born from a simple observation...\n\n## Approche\n\nWe used a human-centered design methodology..."
      }
    }
  ]
}
```

---

## 3. Page — `content/<page>.json`

Pages statiques du portfolio (about, contact).

```jsonc
{
  "$schema": "ecofolio/page",
  "version": "1.0",

  "slug": "about",
  "title": "À propos",
  "navTitle": "About",

  "seo": {
    "title": "À propos — Jane Doe",
    "description": "En savoir plus sur Jane Doe"
  },

  "blocks": [
    {
      "id": "blk_m3n4o5p6",
      "type": "text",
      "data": {
        "content": "## Qui je suis\n\nDesigner passionnée..."
      }
    },
    {
      "id": "blk_q7r8s9t0",
      "type": "timeline",
      "data": {
        "items": [
          { "year": "2025", "title": "Freelance", "description": "..." },
          { "year": "2023", "title": "DUT MMI", "description": "..." }
        ]
      }
    }
  ]
}
```

---

## 4. Index (home) — `content/index.json`

Page d'accueil. Structure identique à une page standard.

```jsonc
{
  "$schema": "ecofolio/page",
  "version": "1.0",

  "slug": "index",
  "title": "Accueil",

  "blocks": [
    {
      "id": "blk_hero",
      "type": "hero",
      "data": {
        "image": "assets/images/hero.jpg",
        "title": "Jane Doe",
        "subtitle": "Designer & Developer",
        "layout": "center"
      }
    },
    {
      "id": "blk_featured",
      "type": "featured-projects",
      "data": {
        "count": 3,
        "filter": "featured"
      }
    }
  ]
}
```

---

## 5. Définitions des blocs

Chaque type de bloc a son propre schéma de données.

### 5.1 Text

```jsonc
{
  "type": "text",
  "data": {
    "content": "## Markdown content\n\nParagraph with **bold** and *italic*.",
    "format": "markdown"      // "markdown" | "html"
  }
}
```

### 5.2 Heading

```jsonc
{
  "type": "heading",
  "data": {
    "level": 2,               // 1-6
    "content": "Titre de section",
    "align": "left"           // "left" | "center" | "right"
  }
}
```

### 5.3 Image

```jsonc
{
  "type": "image",
  "data": {
    "src": "assets/images/photo.jpg",
    "alt": "Description accessible",
    "caption": "Légende optionnelle",
    "width": 1200,
    "height": 800,
    "format": "webp",         // Format de sortie
    "loading": "lazy"         // "lazy" | "eager"
  }
}
```

### 5.4 Gallery

```jsonc
{
  "type": "gallery",
  "data": {
    "images": [
      { "src": "assets/images/img1.jpg", "alt": "...", "caption": "..." },
      { "src": "assets/images/img2.jpg", "alt": "...", "caption": "..." }
    ],
    "layout": "grid",         // "grid" | "masonry" | "carousel"
    "columns": 2,             // 1-4
    "lightbox": true
  }
}
```

### 5.5 Video

```jsonc
{
  "type": "video",
  "data": {
    "src": "https://www.youtube.com/embed/...",
    "provider": "youtube",    // "youtube" | "vimeo" | "local"
    "caption": "Vidéo de démonstration",
    "poster": "assets/images/video-poster.jpg"
  }
}
```

### 5.6 Quote

```jsonc
{
  "type": "quote",
  "data": {
    "content": "Le design n'est pas seulement ce à quoi cela ressemble.",
    "author": "Steve Jobs",
    "role": "CEO, Apple",
    "avatar": "assets/images/avatar.jpg",
    "style": "large"          // "default" | "large" | "bordered"
  }
}
```

### 5.7 Button

```jsonc
{
  "type": "button",
  "data": {
    "text": "Voir le projet",
    "url": "https://example.com",
    "style": "primary",       // "primary" | "secondary" | "outline" | "ghost"
    "icon": "arrow-right",    // Optionnel
    "target": "_blank"
  }
}
```

### 5.8 Timeline

```jsonc
{
  "type": "timeline",
  "data": {
    "items": [
      { "year": "2025", "title": "Titre", "description": "Description en markdown", "icon": "star" },
      { "year": "2024", "title": "Titre", "description": "...", "icon": "code" }
    ],
    "layout": "alternating"   // "left" | "alternating"
  }
}
```

### 5.9 Code

```jsonc
{
  "type": "code",
  "data": {
    "code": "const greeting = 'Hello World';",
    "language": "typescript",
    "showLineNumbers": true,
    "caption": "Example de code",
    "theme": "github-dark"    // Thème de coloration syntaxique
  }
}
```

### 5.10 Divider

```jsonc
{
  "type": "divider",
  "data": {
    "style": "solid",         // "solid" | "dashed" | "dotted"
    "size": "medium",         // "small" | "medium" | "large"
    "withIcon": false
  }
}
```

### 5.11 Custom HTML

```jsonc
{
  "type": "custom-html",
  "data": {
    "html": "<button class=\"custom-btn\">Click me</button>",
    "css": ".custom-btn { border-radius: 999px; }",
    "js": "document.querySelector('.custom-btn').addEventListener('click', () => alert('Hi!'));",
    "title": "Custom Button"
  }
}
```

---

## 6. Paramètres éditeur — `.ecofolio/state.json`

État local de l'éditeur. Non versionné dans Git.

```jsonc
{
  "editor": {
    "theme": "dark",
    "fontSize": 14,
    "splitView": true,
    "splitRatio": 50,
    "previewDevice": "desktop",
    "lastProject": "eco-app",
    "showGrid": false
  },
  "ui": {
    "sidebarCollapsed": false,
    "inspectorOpen": true,
    "blockPaletteOpen": false
  }
}
```

---

## 7. Cache preview — `.ecofolio/cache/preview.html`

HTML complet de la dernière preview. Évite un rebuild au redémarrage.

```
Fichier : .ecofolio/cache/preview.html
Format : HTML complet (avec doctype, head, body)
```

---

## 8. Historique Git — `.ecofolio/history.json`

Cache local de l'historique Git pour affichage rapide.

```jsonc
{
  "commits": [
    {
      "hash": "a1b2c3d4",
      "message": "feat: update project Éco App gallery",
      "date": "2025-12-01T14:30:00Z",
      "author": "Jane Doe",
      "files": ["content/projects/eco-app.json"]
    }
  ]
}
```

---

## Schémas TypeScript (types)

```typescript
// ============ CORE TYPES ============

interface Config {
  version: string;
  site: SiteConfig;
  theme: ThemeConfig;
  pages: PagesConfig;
  social: SocialLink[];
  build: BuildConfig;
}

interface SiteConfig {
  title: string;
  tagline?: string;
  url?: string;
  email?: string;
  language: string;
  locale: string;
}

interface ThemeConfig {
  id: string;
  tokens: Record<string, string>;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface BuildConfig {
  minify: boolean;
  optimizeImages: boolean;
  inlineCss: boolean;
  cssTarget: string;
}

// ============ PROJECT / PAGE ============

interface BaseContent {
  slug: string;
  title: string;
  seo?: SEOConfig;
  blocks: Block[];
}

interface Project extends BaseContent {
  subtitle?: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  cover?: string;
  thumbnail?: string;
}

interface Page extends BaseContent {
  navTitle?: string;
}

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
}

// ============ BLOCKS ============

interface Block {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

interface TextBlockData { content: string; format: 'markdown' | 'html'; }
interface HeadingBlockData { level: 1 | 2 | 3 | 4 | 5 | 6; content: string; align: 'left' | 'center' | 'right'; }
interface ImageBlockData { src: string; alt: string; caption?: string; width?: number; height?: number; format?: string; loading?: 'lazy' | 'eager'; }
interface GalleryBlockData { images: GalleryImage[]; layout: 'grid' | 'masonry' | 'carousel'; columns: number; lightbox: boolean; }
interface VideoBlockData { src: string; provider: 'youtube' | 'vimeo' | 'local'; caption?: string; poster?: string; }
interface QuoteBlockData { content: string; author: string; role?: string; avatar?: string; style?: 'default' | 'large' | 'bordered'; }
interface ButtonBlockData { text: string; url: string; style: 'primary' | 'secondary' | 'outline' | 'ghost'; icon?: string; target?: string; }
interface TimelineBlockData { items: TimelineItem[]; layout: 'left' | 'alternating'; }
interface CodeBlockData { code: string; language: string; showLineNumbers: boolean; caption?: string; theme?: string; }
interface DividerBlockData { style: 'solid' | 'dashed' | 'dotted'; size: 'small' | 'medium' | 'large'; withIcon: boolean; }
interface CustomHtmlBlockData { html: string; css?: string; js?: string; title?: string; }

interface GalleryImage { src: string; alt: string; caption?: string; }
interface TimelineItem { year: string; title: string; description: string; icon?: string; }

// ============ METRICS ============

interface SiteMetrics {
  totalSizeBytes: number;
  pageCount: number;
  htmlSizeBytes: number;
  cssSizeBytes: number;
  jsSizeBytes: number;
  imageSizeBytes: number;
  imageCount: number;
  requestCount: number;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticesScore: number;
  carbonPerVisitGrams: number;
  carbonYearlyGrams: number;
  ecoRating: 'A' | 'B' | 'C' | 'D' | 'E';
  suggestions: Suggestion[];
}

interface Suggestion {
  type: 'improvement' | 'warning' | 'error';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

// ============ GIT ============

interface GitCommit {
  hash: string;
  message: string;
  date: string;
  author: string;
  files: string[];
}

interface GitStatus {
  staged: string[];
  unstaged: string[];
  untracked: string[];
  ahead: number;
  behind: number;
}
```

---

## Relations entre données

```
config.json
    │
    ├── theme.id ─────────────────► themes/<id>/theme.json
    │
    └── pages.* ─────┐
                     ▼
              content/
              ├── index.json
              ├── about.json        ← si pages.about === true
              ├── contact.json      ← si pages.contact === true
              └── projects/
                  ├── <slug>.json   ← un fichier par projet
                  └── ...

Chaque bloc .data.image / .src ──► assets/images/<file>
```

---

## Validation

Tous les fichiers sont validés au chargement avec TypeBox (JSON Schema).

```typescript
import { Type } from '@sinclair/typebox';

const ProjectSchema = Type.Object({
  slug: Type.String({ pattern: '^[a-z0-9-]+$' }),
  title: Type.String({ minLength: 1 }),
  date: Type.String({ format: 'date' }),
  tags: Type.Array(Type.String()),
  featured: Type.Boolean(),
  status: Type.Union([
    Type.Literal('published'),
    Type.Literal('draft'),
    Type.Literal('archived')
  ]),
  blocks: Type.Array(BlockSchema)
});
```

Une erreur de validation affiche un message clair dans l'éditeur et empêche la corruption des données.
