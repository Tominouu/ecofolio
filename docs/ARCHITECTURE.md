# Architecture Technique — Ecofolio

---

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLI (ecofolio)                            │
│  $ ecofolio init  │  $ ecofolio dev  │  $ ecofolio build        │
│  $ ecofolio deploy│  $ ecofolio theme │  $ ecofolio metrics     │
└──────────┬───────────────────────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────────────┐
│                       Serveur (Fastify)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐    │
│  │ REST API │ │WebSocket │ │File Watch│ │ Preview Server   │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘    │
└──────────┬───────────────────────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────────────┐
│                       Moteur principal                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Block   │ │  Theme   │ │   Git    │ │  Metrics │           │
│  │  Engine  │ │  Engine  │ │  Layer   │ │  Engine  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │  Static  │ │  Asset   │ │ Content  │                        │
│  │ Generator│ │ Pipeline │ │ Manager  │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
└──────────┬───────────────────────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────────────┐
│                     Système de fichiers                          │
│  portfolio/config.json      portfolio/content/                   │
│  portfolio/themes/          portfolio/assets/                    │
│  portfolio/.ecofolio/       portfolio/dist/                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## Stack technique

### Langage

| Couche | Technologie | Justification |
|--------|------------|---------------|
| Langage | TypeScript strict | Typage fort, auto-complétion, prévention d'erreurs |
| Runtime | Node.js ≥ 20 | LTS, ESM natif, performances |

### Backend (développement local)

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| Fastify | Serveur HTTP | Très performant, validation JSON Schema natif, plugins |
| `@fastify/websocket` | Live preview | WebSocket pour rafraîchissement temps réel |
| `chokidar` | File watcher | Détection de changements fichiers |
| `TypeBox` | Validation schémas | TypeScript-first, génération types depuis schémas |

### Frontend (dashboard / éditeur)

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| EJS | Templates serveur | Simple, familier, pas de JS lourd |
| HTMX | Interactions dynamiques | AJAX sans JavaScript, déclaratif |
| CSS natif | Styles | Pas de framework, contrôle total |
| CSS Custom Properties | Design tokens | Thèmes dynamiques, pas de préprocesseur |

### Génération statique

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| EJS | Templates site | Templates simples et performants |
| `htmlnano` | Minification HTML | ~20% réduction de taille |
| `lightningcss` | Traitement CSS | Ultra-rapide (Rust), autoprefixer, minification |
| `sharp` | Optimisation images | Redimensionnement, WebP/AVIF |

### Git & Déploiement

| Technologie | Rôle | Justification |
|-------------|------|---------------|
| `simple-git` | Intégration Git | API propre, pas de shell Git |
| `gh` (CLI) | GitHub Pages | Déploiement natif |
| Actions GitHub | CI/CD | Build + déploiement automatique |

---

## Architecture modulaire

```
src/
├── core/           # Types, interfaces, constantes, utilitaires
├── server/         # Fastify : routes, middleware, websocket
├── editor/         # UI de l'éditeur (EJS + HTMX + CSS)
├── preview/        # Serveur de prévisualisation
├── generator/      # Moteur de génération statique
├── blocks/         # Système de blocs + blocs natifs
├── themes/         # Moteur de thèmes
├── git/            # Couche d'abstraction Git
├── metrics/        # Moteur de métriques éco/performance
└── cli/            # Point d'entrée CLI
```

---

## Modules détaillés

### 1. Core (`src/core/`)

Types fondamentaux partagés par tous les modules.

```
src/core/
├── types/
│   ├── block.ts        # Types des blocs
│   ├── project.ts      # Types des projets
│   ├── theme.ts        # Types des thèmes
│   ├── page.ts         # Types des pages
│   ├── config.ts       # Types de configuration
│   └── metrics.ts      # Types des métriques
├── constants.ts        # Constantes globales
└── utils/
    ├── slug.ts         # Génération de slugs
    ├── id.ts           # Génération d'IDs uniques
    └── path.ts         # Utilitaires de chemin
```

### 2. Block Engine (`src/blocks/`)

Système de blocs modulaire.

```
src/blocks/
├── registry.ts         # Registre central des blocs
├── types.ts            # Interfaces Block, BlockConfig
└── native/
    ├── Text/
    │   ├── definition.ts   # Schéma, config
    │   ├── editor.ejs      # UI éditeur
    │   └── render.ejs      # Template rendu
    ├── Heading/
    ├── Image/
    ├── Gallery/
    ├── Video/
    ├── Quote/
    ├── Button/
    ├── Timeline/
    ├── Code/
    └── Divider/
```

Chaque bloc expose :

```typescript
interface BlockDefinition {
  id: string;                    // Identifiant unique
  name: string;                  // Nom affiché
  icon: string;                  // Icône
  category: 'content' | 'media' | 'advanced';
  schema: JSONSchema;           // Validation des données
  defaults: Record<string, any>; // Valeurs par défaut
  preview: (data: any) => string; // HTML de preview miniature
  render: (data: any) => string;  // HTML final
  editorView: string;            // Chemin du template EJS éditeur
  allowedChildren?: string[];    // Blocs enfants autorisés
}
```

### 3. Theme Engine (`src/themes/`)

Système de thèmes basé sur des variables CSS.

```
src/themes/
├── engine.ts           # Chargement, résolution, compilation
├── validator.ts        # Validation de thème
└── types.ts            # ThemeConfig interface
```

Un thème est un dossier :

```
themes/minimal/
├── theme.json          # Métadonnées et configuration
├── preview.jpg         # Aperçu du thème
├── tokens.css          # Variables CSS (couleurs, espacements, fonts)
└── templates/
    ├── base.ejs        # Layout principal
    ├── index.ejs       # Page d'accueil
    ├── project.ejs     # Page projet
    ├── about.ejs       # Page à propos
    └── partials/
        ├── header.ejs
        ├── footer.ejs
        ├── gallery.ejs
        └── pagination.ejs
```

### 4. Static Generator (`src/generator/`)

Pipeline de génération statique.

```
src/generator/
├── index.ts            # Point d'entrée : orchestre la génération
├── loader.ts           # Charge les données depuis les fichiers
├── renderer.ts         # Rendu EJS des pages
├── pipeline.ts         # Pipeline build (ordre des opérations)
├── minifier.ts         # Minification HTML/CSS/JS
├── assets.ts           # Traitement des assets
├── sitemap.ts          # Génération sitemap.xml
└── types.ts
```

Pipeline de build :

```
1. Load configuration      → config.json + settings
2. Load content            → content/*.json
3. Load theme              → themes/current/
4. Resolve variables       → thème + customization
5. Render pages            → EJS templates + data
6. Process assets          → copy, optimize, resize
7. Generate extras         → sitemap.xml, 404.html, CNAME
8. Minify                  → HTML, CSS, JS
9. Write dist/             → dossier de sortie
10. Report                 → métriques
```

### 5. Git Layer (`src/git/`)

Abstraction complète des opérations Git.

```typescript
interface GitService {
  init(): Promise<void>;
  status(): Promise<GitStatus>;
  commit(message: string): Promise<string>;
  log(limit?: number): Promise<Commit[]>;
  diff(hash?: string): Promise<string>;
  rollback(hash: string): Promise<void>;
  branch(name: string): Promise<void>;
  checkout(branch: string): Promise<void>;
  push(remote?: string, branch?: string): Promise<void>;
  pull(remote?: string, branch?: string): Promise<void>;
  hasUncommitted(): Promise<boolean>;
}
```

Stratégie d'auto-commit :
- Commits automatiques aux changements (± 5s de debounce)
- Messages générés : `"feat: update project Eco App"`
- L'utilisateur peut désactiver et commiter manuellement
- Historique visible dans le dashboard

### 6. Metrics Engine (`src/metrics/`)

Analyse du site généré.

```typescript
interface MetricsService {
  analyze(distPath: string): Promise<SiteMetrics>;
  estimateCarbon(bytes: number, visits: number): CarbonEstimate;
  checkAccessibility(html: string): AccessibilityReport;
}

interface SiteMetrics {
  totalSize: number;          // Poids total en bytes
  pageCount: number;          // Nombre de pages
  requestCount: number;       // Requêtes estimées
  htmlSize: number;
  cssSize: number;
  jsSize: number;
  imageSize: number;
  accessibilityScore: number; // 0-100
  performanceScore: number;   // Estimé
  seoScore: number;           // Basique
  carbonPerVisit: number;     // g CO₂
  carbonYearly: number;       // g CO₂ (estimation 10k visites/an)
}
```

---

## Serveur API (Fastify)

### Routes

```
Méthode  Route                          Description
───────  ────────────────────────────   ─────────────────────
GET      /api/projects                  Liste des projets
POST     /api/projects                  Créer un projet
GET      /api/projects/:slug            Détail d'un projet
PUT      /api/projects/:slug            Modifier un projet
DELETE   /api/projects/:slug            Supprimer un projet
POST     /api/projects/:slug/duplicate  Dupliquer un projet

GET      /api/projects/:slug/blocks     Blocs d'un projet
POST     /api/projects/:slug/blocks     Ajouter un bloc
PUT      /api/projects/:slug/blocks/:id  Modifier un bloc
DELETE   /api/projects/:slug/blocks/:id  Supprimer un bloc
PUT      /api/projects/:slug/blocks/reorder  Réordonner

GET      /api/assets                    Assets du portfolio
POST     /api/assets                    Uploader un asset
DELETE   /api/assets/:id                Supprimer

GET      /api/settings                  Paramètres
PUT      /api/settings                  Modifier paramètres

GET      /api/theme                     Thème actuel
PUT      /api/theme                     Modifier thème
GET      /api/themes                    Lister thèmes disponibles

POST     /api/git/commit                Commit manuel
GET      /api/git/history               Historique commits
POST     /api/git/rollback/:sha         Rollback

POST     /api/deploy                    Déclencher déploiement
GET      /api/deploy/status             Statut déploiement

GET      /api/preview                   HTML de preview
WS       /api/preview/live              WebSocket live preview

GET      /api/metrics                   Métriques globales
```

Chaque route est :
- Déclarée avec un schéma TypeBox
- Validée automatiquement
- Documentée via OpenAPI

### Middleware

- `error-handler` — Gestion d'erreurs unifiée
- `logger` — Logging structuré (pino)
- `cors` — CORS pour preview
- `auth` — Optionnel (pour version cloud future)

---

## Échanges temps réel

### WebSocket (preview live)

```
Client → Serveur : { type: 'subscribe', channel: 'preview' }
Serveur → Client : { type: 'connected', sessionId: '...' }
Serveur → Client : { type: 'rebuild:start' }
Serveur → Client : { type: 'rebuild:done', html: '...' }
Client → Serveur : { type: 'unsubscribe' }
```

Lorsqu'un fichier change (chokidar) :
1. Le serveur détecte le changement
2. Rebuild partiel (ou full si nécessaire)
3. Envoie le HTML mis à jour via WebSocket
4. Le client met à jour l'iframe de preview

---

## Flux de données

### Création d'un projet

```
Utilisateur                 API                  FS                  Git
    │                        │                   │                   │
    ├── POST /api/projects ──►                   │                   │
    │                        ├── write content/  │                   │
    │                        ├── write .ecofolio │                   │
    │                        ├─────────────────► │                   │
    │                        │                   ├── commit ────────►│
    │                        │                   │◄── ok            │
    │                        │◄── ok             │                   │
    │◄── 201 + project       │                   │                   │
```

### Sauvegarde d'un bloc

```
Utilisateur               API                  FS                  Preview
    │                       │                   │                   │
    ├── PUT blocks/:id ────►                   │                   │
    │                       ├── write fichier   │                   │
    │                       ├─────────────────► │                   │
    │                       │                   ├── detect change   │
    │                       │                   ├──────────────────►│
    │                       │                   │                   ├── rebuild
    │                       │                   │                   ├── push WS
    │                       │◄── ok             │                   │
    │◄── 200                │                   │                   │
    │◄────────────────────────────────────────────────── HTML ──────│
```

### Déploiement

```
Utilisateur            API              Git              GitHub
    │                    │               │                 │
    ├── POST /deploy ───►               │                 │
    │                    ├── commit ────►│                 │
    │                    │               ├── push ────────►│
    │                    │               │                 ├── build
    │                    │               │                 ├── deploy
    │                    │◄── status     │                 │
    │◄── URL             │               │                 │
    │                    │               │                 │
    │                    ├── GitHub Actions (optionnel)     │
    │                    │               ├── .github/workflows/deploy.yml
```

---

## Organisation des fichiers

### Projet Ecofolio (le code source)

```
ecofolio/
├── package.json
├── tsconfig.json
├── .gitignore
├── LICENSE
├── README.md
├── src/
│   ├── index.ts                  # Point d'entrée CLI
│   ├── core/
│   ├── server/
│   ├── editor/
│   ├── preview/
│   ├── generator/
│   ├── blocks/
│   ├── themes/
│   ├── git/
│   ├── metrics/
│   └── cli/
├── themes/
│   ├── minimal/
│   ├── creative/
│   ├── developer/
│   └── designer/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── VISION.md
│   ├── UX.md
│   ├── DATA-MODEL.md
│   ├── DESIGN-SYSTEM.md
│   ├── ROADMAP.md
│   └── decisions/
├── examples/
│   ├── basic/
│   └── advanced/
└── .github/
    ├── workflows/
    │   ├── ci.yml
    │   └── deploy.yml
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

### Portfolio (projet utilisateur)

```
mon-portfolio/
├── config.json                   # Configuration globale
├── content/
│   ├── index.json                # Page d'accueil
│   ├── about.json                # Page à propos
│   ├── contact.json              # Page contact
│   ├── settings.json             # Paramètres site
│   └── projects/
│       ├── eco-app.json          # Projet 1
│       ├── portfolio-site.json   # Projet 2
│       └── brand-identity.json   # Projet 3
├── assets/
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── project-1-thumb.jpg
│   │   └── gallery/
│   └── files/
│       └── resume.pdf
├── themes/
│   └── current -> ../../ecofolio/themes/minimal
├── .ecofolio/
│   ├── state.json               # État de l'éditeur
│   ├── cache/
│   │   └── preview.html         # Dernier HTML de preview
│   └── history.json             # Historique des actions
├── dist/                        # Site généré
│   ├── index.html
│   ├── projects/
│   │   ├── eco-app/
│   │   └── portfolio-site/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── images/
│   ├── 404.html
│   ├── sitemap.xml
│   └── .nojekyll
├── .gitignore
└── .github/
    └── workflows/
        └── ecofolio-deploy.yml   # Workflow de déploiement
```

---

## Décisions architecturales (ADR)

### ADR-001 : Fichiers JSON plutôt que Markdown

**Contexte :** Le contenu doit être structuré (blocs avec données typées). Markdown ne permet pas de représenter facilement des structures complexes (galeries, timeline, données de blocs).

**Décision :** Utiliser JSON pour le contenu structuré. Les champs texte supportent le Markdown.

**Conséquence :** Pas de frontmatter, parsing simple, validation par schéma native.

---

### ADR-002 : EJS plutôt que JSX/MDX

**Contexte :** Les templates du site généré doivent être simples, sans build, sans JS runtime.

**Décision :** EJS côté serveur pour le rendu, à la fois pour le dashboard et le site généré.

**Conséquence :** Même moteur de template partout. Pas de JS dans le HTML final.

---

### ADR-003 : HTMX plutôt qu'un framework JS

**Contexte :** L'éditeur a besoin d'interactivité, mais le JS doit rester minimal.

**Décision :** HTMX pour les interactions dynamiques, complété par du vanilla JS pour les animations.

**Conséquence :** Pas de bundle JS lourd. Architecture hypermedia. Les interactions sont des échanges HTML.

---

### ADR-004 : Pas de base de données

**Contexte :** Le système doit être simple à déployer, à contribuer, et à comprendre.

**Décision :** Tout stockage est fichier. JSON + FS. Les performances sont suffisantes pour un usage local.

**Conséquence :** Pas de dépendance DB. Sauvegarde = copier les fichiers. Git = historique natif.

---

### ADR-005 : Preview par iframe + WebSocket

**Contexte :** L'aperçu doit être temps réel et refléter exactement le site généré.

**Décision :** Iframe pointant vers le preview server local. WebSocket pour signaler les rebuilds.

**Conséquence :** La preview montre le vrai rendu du static generator. Pas de rendu client-side bidon.

---

### ADR-006 : Validation centralisée par schéma

**Contexte :** Les données transitent par API, fichiers, et éditeur. Besoin de cohérence.

**Décision :** Tout schéma de donnée est défini une fois (TypeBox) et utilisé pour validation API + fichiers.

**Conséquence :** Pas de duplication de validation. TypeScript généré automatiquement depuis les schémas.

---

## Contraintes de performance

- Le serveur doit démarrer en < 500ms
- Un rebuild de preview doit prendre < 200ms (projet simple)
- Le site généré doit faire < 100KB (sans images)
- L'interface dashboard doit charger en < 1s
- Pas de CSS/JS externe (Google Fonts chargé localement)
- Les images sont automatiquement optimisées à l'import
