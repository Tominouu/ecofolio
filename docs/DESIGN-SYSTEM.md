# Design System — Ecofolio

---

## Philosophie visuelle

Ecofolio doit être reconnaissable au premier regard.

```
Mot-clés : minimal, élégant, aéré, précis
Émotion : confiance, créativité, modernité
Métaphore : un studio de création, pas un bureau administratif
```

**Règles d'or :**
- Moins d'éléments = plus d'impact
- Chaque pixel a une raison d'être
- L'espace négatif est un outil de design
- La typographie est le vrai UI framework
- Les couleurs sont utilisées avec intention

---

## Palette de couleurs

### Tokens de base

```css
:root {
  /* Neutres */
  --color-neutral-50:  #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;

  /* Accent (indigo/violet — modifiable par le thème) */
  --color-accent-50:  #eef2ff;
  --color-accent-100: #e0e7ff;
  --color-accent-200: #c7d2fe;
  --color-accent-300: #a5b4fc;
  --color-accent-400: #818cf8;
  --color-accent-500: #6366f1;
  --color-accent-600: #4f46e5;
  --color-accent-700: #4338ca;
  --color-accent-800: #3730a3;
  --color-accent-900: #312e81;

  /* Sémantique */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error:   #ef4444;
  --color-info:    #3b82f6;

  /* Surface (mode clair) */
  --surface-primary:   #ffffff;
  --surface-secondary: #fafafa;
  --surface-tertiary:  #f5f5f5;
  --surface-hover:     #f0f0f0;

  /* Texte */
  --text-primary:   #0a0a0a;
  --text-secondary: #525252;
  --text-tertiary:  #a3a3a3;
  --text-inverse:   #ffffff;

  /* Bordure */
  --border-primary:   #e5e5e5;
  --border-secondary: #f0f0f0;
  --border-accent:    #6366f1;
}
```

### Mode sombre

```css
[data-theme="dark"] {
  --surface-primary:   #171717;
  --surface-secondary: #1f1f1f;
  --surface-tertiary:  #262626;
  --surface-hover:     #333333;

  --text-primary:   #fafafa;
  --text-secondary: #a3a3a3;
  --text-tertiary:  #525252;
  --text-inverse:   #0a0a0a;

  --border-primary:   #333333;
  --border-secondary: #262626;
}
```

---

## Typographie

### Police principale : Inter (système)

```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

Inter est choisie pour :
- Excellente lisibilité à toutes les tailles
- Version variable (poids sur demande)
- Rendu natif sur macOS, iOS, Windows
- Pas de requête externe (auto-hébergée dans le bundle)

### Hiérarchie typographique

```css
--text-xs:   0.75rem;   /* 12px — légendes, métadonnées */
--text-sm:   0.875rem;  /* 14px — corps petit */
--text-base: 1rem;      /* 16px — corps de texte */
--text-lg:   1.125rem;  /* 18px — intro */
--text-xl:   1.25rem;   /* 20px — sous-titre */
--text-2xl:  1.5rem;    /* 24px — titre H3 */
--text-3xl:  1.875rem;  /* 30px — titre H2 */
--text-4xl:  2.25rem;   /* 36px — titre H1 */
--text-5xl:  3rem;      /* 48px — hero */
--text-6xl:  3.75rem;   /* 60px — hero large */

--leading-tight:  1.15;   /* Titres */
--leading-normal: 1.5;    /* Corps */
--leading-relaxed: 1.625; /* Texte long */

--tracking-tight:  -0.025em;
--tracking-normal: 0;
--tracking-wide:   0.05em;
```

---

## Espacements

Système à paliers cohérents basé sur 4px.

```css
--space-0:   0px;
--space-1:   0.25rem;  /*  4px */
--space-2:   0.5rem;   /*  8px */
--space-3:   0.75rem;  /* 12px */
--space-4:   1rem;     /* 16px */
--space-5:   1.25rem;  /* 20px */
--space-6:   1.5rem;   /* 24px */
--space-8:   2rem;     /* 32px */
--space-10:  2.5rem;   /* 40px */
--space-12:  3rem;     /* 48px */
--space-16:  4rem;     /* 64px */
--space-20:  5rem;     /* 80px */
--space-24:  6rem;     /* 96px */
```

---

## Bordures et rayons

```css
--radius-sm:   0.25rem;  /*  4px */
--radius-md:   0.5rem;   /*  8px */
--radius-lg:   0.75rem;  /* 12px */
--radius-xl:   1rem;     /* 16px */
--radius-full: 9999px;   /* Pill */

--border-width: 1px;
```

---

## Ombres

```css
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md:   0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-lg:   0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-xl:   0 8px 32px rgba(0, 0, 0, 0.10);
--shadow-focus: 0 0 0 2px rgba(99, 102, 241, 0.3);
```

Mode sombre :
```css
[data-theme="dark"] {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.4);
  /* etc. */
}
```

---

## Transitions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

Toutes les animations doivent :
- Durer entre 150ms et 300ms (sauf cas exceptionnel)
- Utiliser `transform` et `opacity` uniquement (GPU compositing)
- Être désactivées si `prefers-reduced-motion: reduce`

---

## Composants d'interface

### 1. Boutons

```
┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐
│  Primary         │  │  Secondary       │  │  Ghost        │
│  bg-accent-600   │  │  bg-transparent  │  │  bg-transp.   │
│  text-white      │  │  border-primary  │  │  text-primary │
│  hover:bg-700    │  │  hover:bg-hover  │  │  hover:bg-100 │
└──────────────────┘  └──────────────────┘  └───────────────┘

           ┌────────────────────────────────┐
           │  Icon + Label                  │
           │  gap-2, items-center           │
           │  ◉ Nouveau projet              │
           └────────────────────────────────┘

           ┌──┐
           │ ✕ │  Icon button (ghost, 32x32)
           └──┘
```

### 2. Inputs

```
┌────────────────────────────────────────────────────┐
│  Label                                              │
│  ┌──────────────────────────────────────────────┐  │
│  │ Placeholder text                              │  │
│  └──────────────────────────────────────────────┘  │
│  Helper text                                        │
└────────────────────────────────────────────────────┘

États : default, focus (ring accent), error (border error),
        disabled (opacity 50%), filled
```

### 3. Cards (projets)

```
┌─────────────────────────────────────┐
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │      Thumbnail (16:9)         │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
│  Titre du projet                    │
│  Tags · Année                       │
│                                     │
│  ● Publié     ⚡ 12KB · 0.3g       │
│                                     │
└─────────────────────────────────────┘
```

### 4. Bloc canvas (éditeur)

```
┌─────────────────────────────────────────────┐
│  ⠿ Hero Block                                │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │                                      │   │
│  │  Contenu du bloc (rendu)             │   │
│  │                                      │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ✎ Modifier    ⠇ Réordonner    ⌫ Supprimer  │
└─────────────────────────────────────────────┘

États :
- idle : bordure subtile au hover
- selected : bordure accent + ombre
- dragging : opacité réduite, ombre large
- empty : message "Ajoutez du contenu"
```

### 5. Barre d'outils flottante

Apparaît lors de la sélection de texte dans l'éditeur.

```
┌─────────────────────────────────────────────┐
│  B  I  U  ̲S  │  H1  H2  H3  │  🔗  "  •  │
└─────────────────────────────────────────────┘

Position : au-dessus de la sélection
Disparition : au clic ailleurs
```

### 6. Badges / Tags

```
┌──────────┐  ┌──────────┐  ┌────────────┐
│ Published │  │ Draft    │  │ ★ Featured │
│ bg-green  │  │ bg-amber │  │ bg-accent  │
└──────────┘  └──────────┘  └────────────┘

Tailles : sm (12px), md (14px)
```

### 7. Skeleton (loading)

```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-tertiary) 25%,
    var(--surface-hover) 50%,
    var(--surface-tertiary) 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}
```

### 8. Toast / notifications

```
┌────────────────────────────────────────────┐
│  ✅  Modifications enregistrées     ✕     │
│  ────────────────────────────────────────  │
│  Animation : slide-in top, fade-out 3s     │
└────────────────────────────────────────────┘

Types : success, error, warning, info
Position : en haut à droite du viewport
Durée : 3s (sauf erreur : persistante)
```

---

## Icônes

Utiliser un set d'icônes minimal et cohérent :

- **Lucide** — Design cohérent, license ISC, tree-shaking
- 24x24px, stroke-width: 1.5
- Chargement inline (SVG dans le HTML)

Pas d'icônes décoratives. Chaque icône a une fonction.

---

## Grille

```css
--grid-columns: 12;
--grid-gap: var(--space-6);
--grid-max-width: 72rem;   /* 1152px */

/* Breakpoints */
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
```

---

## Éditeur (styles spécifiques)

### Canvas

```css
--canvas-bg: var(--surface-primary);
--canvas-width: min(100%, 48rem);   /* Largeur max pour lisibilité */
--canvas-padding: var(--space-16);
--canvas-gap: var(--space-8);
```

### Zone de drop

```css
.drop-zone {
  border: 2px dashed var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  text-align: center;
  transition: all var(--duration-normal) var(--ease-out);
}

.drop-zone.drag-over {
  border-color: var(--color-accent-500);
  background: var(--color-accent-50);
}
```

---

## Accessibilité visuelle

```css
/* Focus visible */
:focus-visible {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Motion reduced */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Contrast ratio minimum : 4.5:1 pour le texte normal */
/* 3:1 pour le texte large (≥18px bold ou ≥24px) */
```

---

## Exemple de composition

```html
<!-- Page dashboard -->
<div class="dashboard">
  <header class="dashboard-header">
    <h1 class="text-xl font-semibold text-primary">Mes projets</h1>
    <button class="btn btn-primary">
      <svg class="icon"><use href="#plus"/></svg>
      Nouveau projet
    </button>
  </header>

  <div class="project-grid">
    <article class="card" tabindex="0">
      <figure class="card-thumb">
        <img src="..." alt="..." loading="lazy" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Éco App</h2>
        <p class="card-meta">UX Design · 2025</p>
        <div class="card-stats">
          <span class="badge badge-success">Publié</span>
          <span class="text-sm text-tertiary">⚡ 12KB</span>
        </div>
      </div>
    </article>
  </div>
</div>
```

Avec cette approche, chaque page du dashboard et du site généré reste légère, cohérente et accessible.
