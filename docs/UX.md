# UX/UI Design — Ecofolio

---

## Philosophie

Ecofolio n'est pas un CMS. C'est un **studio de portfolio**.

La différence est fondamentale :

| CMS traditionnel | Ecofolio Studio |
|-----------------|-----------------|
| Interface d'administration | Espace de création |
| Menus latéraux | Canvas + Preview |
| Formulaires | Édition directe |
| Pages de configuration | Panneaux contextuels |
| Boutons "Enregistrer" | Auto-save permanent |
| Tableaux de bord gris | Design premium, espace |

**Principe fondateur :** L'utilisateur doit toujours voir son portfolio.
L'interface d'édition ne doit jamais cacher l'œuvre.

---

## Parcours utilisateur

### Découverte → Premier portfolio (30 min)

```
Découvre Ecofolio
       │
       ▼
  landing page / README
  "Enfin un CMS qui ne ressemble pas à un CMS"
       │
       ▼
  npm create ecofolio
       │
       ▼
  Assistant de démarrage (3 étapes)
  ┌────────────────────────────────┐
  │  1/3  👤  Ton nom             │
  │        ┌────────────────┐     │
  │        │ Jane Doe       │     │
  │        └────────────────┘     │
  │                                │
  │  2/3  🎨  Choisis ton thème   │
  │        ┌────┐ ┌────┐ ┌────┐  │
  │        │Mini│ │Crea│ │Dev │  │
  │        └────┘ └────┘ └────┘  │
  │                                │
  │  3/3  🚀  Prêt à déployer ?   │
  │        [Plus tard] [Déployer] │
  └────────────────────────────────┘
       │
       ▼
  Dashboard avec projet exemple
       │
       ▼
  Édition du projet exemple
  → Modification du héros
  → Aperçu en temps réel
  → Premier "Waouh"
```

### Cycle d'édition quotidien

```
Ouvre Ecofolio
       │
       ▼
  Dashboard
  → Vue d'ensemble des projets
       │
       ▼
  Clique sur un projet
       │
       ▼
  Éditeur (split screen)
  ┌─────────────────┬──────────────┐
  │  Canvas         │  Preview     │
  │  [Bloquer]      │  [Portfolio] │
  │  [Bloquer]      │  [en direct] │
  │  [+ Ajouter]    │              │
  └─────────────────┴──────────────┘
       │
       ▼
  Modifie un bloc
  → Sauvegarde automatique
  → Preview se met à jour
       │
       ▼
  Ajoute un nouveau projet
  → Sélectionne un bloc
  → Upload une image
  → Change l'ordre
       │
       ▼
  Publie
  → Commit + Push + Deploy
  → Un clic
```

---

## Écrans détaillés

### 1. Onboarding / Assistant de démarrage

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ✦ Ecofolio                          Étape 1/3             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │    Bienvenue dans Ecofolio                          │   │
│  │    Crée ton portfolio en 3 minutes.                 │   │
│  │                                                     │   │
│  │    ┌──────────────────────────────────────────┐     │   │
│  │    │  👤  Ton nom                              │     │   │
│  │    │  ┌────────────────────────────────┐      │     │   │
│  │    │  │ Jane Doe                       │      │     │   │
│  │    │  └────────────────────────────────┘      │     │   │
│  │    │                                          │     │   │
│  │    │  📧  Email (optionnel)                    │     │   │
│  │    │  ┌────────────────────────────────┐      │     │   │
│  │    │  │ jane@example.com               │      │     │   │
│  │    │  └────────────────────────────────┘      │     │   │
│  │    │                                          │     │   │
│  │    │  💼  Titre / Tagline                      │     │   │
│  │    │  ┌────────────────────────────────┐      │     │   │
│  │    │  │ Designer & Developer           │      │     │   │
│  │    │  └────────────────────────────────┘      │     │   │
│  │    └──────────────────────────────────────────┘     │   │
│  │                                                     │   │
│  │              [Continuer]                            │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│           Appuyez sur Entrée pour continuer                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  ✦ Ecofolio                              ⚡ Live ●  ○ ○   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍  Rechercher un projet...              + Nouveau │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ● Publiés (4)    ○ Drafts (2)    ○ En cours (1)           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ 🖼                │  │ 🖼                │               │
│  │  Projet Éco App  │  │  Portfolio CMS   │               │
│  │  UX Design       │  │  Web Dev         │               │
│  │  2025            │  │  2025            │               │
│  │                  │  │                  │               │
│  │  ● Publié        │  │  ● Publié        │               │
│  │  ⚡ 12KB · 0.3g  │  │  ⚡ 8KB · 0.2g   │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ 🖼                │  │                  │               │
│  │  Brand Identity  │  │   +              │               │
│  │  Design          │  │                  │               │
│  │  2025            │  │   Nouveau        │               │
│  │                  │  │   Projet         │               │
│  │  ○ Brouillon     │  │                  │               │
│  │  ⚡ 15KB · 0.4g  │  │                  │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📊 Aperçu global                                    │   │
│  │                                                     │   │
│  │  7 projets      ⚡ 2.1g CO₂    94/100 Perf          │   │
│  │  12 pages       🌱 Bon         96/100 Acc           │   │
│  │  45 images      ● Publié       92/100 SEO           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. Éditeur (Split Screen)

```
┌─────────────────────────────────────────────────────────────┐
│  ◀ Projets    ● Éco App                    ⚡ Publish    ○ │
│                                                             │
├───────────────────────┬─────────────────────────────────────┤
│  Canvas               │  Preview (iframe)                   │
│                       │                                     │
│  ┌─────────────────┐  │  ┌──────────────────────────────┐  │
│  │ 🖼 Hero           │  │  │  Mon Portfolio              │  │
│  │                   │  │  │                              │  │
│  │ [  Image d'hero  ]│  │  │ ┌─────────────────────────┐ │  │
│  │                   │  │  │ │                         │ │  │
│  │ Titre dynamique   │  │  │ │     HERO IMAGE          │ │  │
│  │ Sous-titre        │  │  │ │                         │ │  │
│  │                   │  │  │ └─────────────────────────┘ │  │
│  │ ✎ Modifier ⋮     │  │  │                              │  │
│  └─────────────────┘  │  │  │  # Éco App                  │  │
│                       │  │  │  Designing for change       │  │
│  ┌─────────────────┐  │  │  │                              │  │
│  │ 📷 Galerie       │  │  │  │ ┌───┐ ┌───┐ ┌───┐        │  │
│  │                   │  │  │  │   │ │   │ │   │        │  │
│  │ [📷] [📷] [📷]   │  │  │  └───┘ └───┘ └───┘        │  │
│  │ [📷] [📷] [📷]   │  │  │  │                              │  │
│  │                   │  │  │  │  Description text...       │  │
│  │ ✎ Modifier ⋮     │  │  │  │                              │  │
│  └─────────────────┘  │  │  │                              │  │
│                       │  │  └──────────────────────────────┘  │
│  ┌─────────────────┐  │  │                                     │
│  │ + Ajouter bloc  │  │  │    📱  💻                          │
│  └─────────────────┘  │  │                                     │
│                       │  │                                     │
├───────────────────────┴─────────────────────────────────────┤
│  💾 Sauvegardé     📦 45 KB    ♻️ 0.8g CO₂    ✅ A    96/100 │
└─────────────────────────────────────────────────────────────┘
```

### 4. Inspecteur (panneau contextuel)

```
┌────────────────────────────────┐
│  Block : Hero                   │
│  ────────────────────────────  │
│                                 │
│  Image                          │
│  ┌────────────────────────┐    │
│  │   [Changer l'image]    │    │
│  └────────────────────────┘    │
│                                 │
│  Titre                          │
│  ┌────────────────────────┐    │
│  │ Éco App Project        │    │
│  └────────────────────────┘    │
│                                 │
│  Sous-titre                     │
│  ┌────────────────────────┐    │
│  │ A mobile app for...    │    │
│  └────────────────────────┘    │
│                                 │
│  Style                          │
│  ○ Gauche  ○ Centre  ● Pleine  │
│                                 │
│  ────────────────────────────  │
│                                 │
│  [Dupliquer]  [Supprimer]      │
│                                 │
└────────────────────────────────┘
```

### 5. Ajout de bloc (palette)

```
┌─────────────────────────────┐
│  Ajouter un bloc             │
│  ─────────────────────────── │
│                              │
│  Contenu                     │
│  ┌─────────────────────────┐│
│  │ T Texte                  ││
│  │ H Titre                  ││
│  │ “ Citation               ││
│  └─────────────────────────┘│
│                              │
│  Média                       │
│  ┌─────────────────────────┐│
│  │ 🖼 Image                 ││
│  │ 📷 Galerie               ││
│  │ ▶ Vidéo                  ││
│  └─────────────────────────┘│
│                              │
│  Avancé                      │
│  ┌─────────────────────────┐│
│  │ </> Code                 ││
│  │ —— Diviseur              ││
│  │ ⏱ Timeline               ││
│  │ 🔘 Bouton                ││
│  └─────────────────────────┘│
│                              │
└─────────────────────────────┘
```

### 6. Paramètres du Portfolio

```
┌─────────────────────────────────────────────────────────────┐
│  ◀ Dashboard    Paramètres                                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Général                                              │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Titre du site     ┌──────────────────────┐     │  │  │
│  │  │                   │ Jane Doe Portfolio   │     │  │  │
│  │  │                   └──────────────────────┘     │  │  │
│  │  │ Tagline           ┌──────────────────────┐     │  │  │
│  │  │                   │ Designer & Developer │     │  │  │
│  │  │                   └──────────────────────┘     │  │  │
│  │  │ Email             ┌──────────────────────┐     │  │  │
│  │  │                   │ jane@example.com     │     │  │  │
│  │  │                   └──────────────────────┘     │  │  │
│  │  │ Langue            ● Français  ○ English        │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Thème                                                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Minimal    Creative   Developer   Designer    │  │  │
│  │  │  ┌──────┐   ┌──────┐   ┌──────┐    ┌──────┐  │  │  │
│  │  │  │ ●●   │   │      │   │      │    │      │  │  │  │
│  │  │  │      │   │      │   │      │    │      │  │  │  │
│  │  │  └──────┘   └──────┘   └──────┘    └──────┘  │  │  │
│  │  │                                                │  │  │
│  │  │  Couleur primaire    ● ────────────────────    │  │  │
│  │  │  Typographie         ├── Inter ─────────────┤  │  │  │
│  │  │  Bordure             ├── Medium ────────────┤  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Pages                                                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  ☑ Home     ☑ About     ☐ Contact              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Déploiement                                          │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  GitHub Pages  ○ Cloudflare  ○ Netlify          │  │  │
│  │  │                                                │  │  │
│  │  │  Dépôt : jane/portfolio                        │  │  │
│  │  │  Branche : main → gh-pages                     │  │  │
│  │  │  Dernier déploiement : 12/06/2026 ✅           │  │  │
│  │  │                                                │  │  │
│  │  │           [Déployer maintenant]                │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7. Métriques (dashboard intégré)

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Impact environnemental                                   │
│                                                             │
│  Poids total du site       45.2 KB                          │
│  Pages                     7 pages                          │
│  Images optimisées         12 (WebP)                        │
│  Requêtes au chargement    3                                │
│                                                             │
│  ♻️ Estimation carbone                                      │
│  0.8g CO₂ par visite       8.2 kg CO₂ / an (10k visites)   │
│  🌱 Classification : A (Très bon)                           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Scores                                                │   │
│  │  │████████████████████████│ 96%  Performance          │   │
│  │  │████████████████████████│ 98%  Accessibilité        │   │
│  │  │████████████████████████│ 95%  SEO                  │   │
│  │  │████████████████████████│ 100%  Best Practices      │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│                                                             │   │
│  ├── Améliorations suggérées                                │   │
│  │  ✔ Images déjà optimisées                               │   │
│  │  ✔ CSS minimal                                           │   │
│  │  ⚠ Ajouter des meta descriptions                        │   │
│  └─────────────────────────────────────────────────────────┤   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Interactions

### Palette de commandes (Cmd+K)

```
┌──────────────────────────────────┐
│  ⟩  Chercher une action...       │
│                                  │
│  Pages                           │
│  ├─ Ajouter un projet            │
│  ├─ Modifier l'accueil           │
│  └─ Modifier le thème            │
│                                  │
│  Projets                         │
│  ├─ Dupliquer "Éco App"          │
│  ├─ Supprimer "Brand Identity"   │
│  └─ Réordonner les projets       │
│                                  │
│  Déploiement                     │
│  ├─ Publier le site              │
│  └─ Voir l'historique            │
│                                  │
│  Git                             │
│  ├─ Voir l'historique            │
│  ├─ Créer une branche            │
│  └─ Rollback                     │
│                                  │
└──────────────────────────────────┘
```

### Drag & drop

- Les blocs se réordonnent par drag & drop
- Les images se glissent depuis le Finder
- Les projets se réordonnent dans le dashboard

### Édition inline

- Double-clic sur un texte dans le canvas = édition directe
- Les changements sont reflétés dans l'inspecteur
- Cmd+S ou auto-save

### Transitions

- Ouverture/fermeture de panneaux : 200ms ease-out
- Drag & drop : suivi fluide 60fps
- Preview update : fade 150ms
- Déploiement : progression dans une barre subtile en bas

---

## Responsive

| Viewport | Layout |
|----------|--------|
| ≥ 1200px | Split screen complet |
| 768-1199px | Canvas seul, preview en overlay |
| < 768px | Canvas seul, preview en plein écran |

---

## États

Chaque composant doit gérer :

| État | Comportement |
|------|-------------|
| Empty | État vide avec illustration + CTA |
| Loading | Skeleton shimmer (pas de spinner) |
| Error | Message discret + bouton "Réessayer" |
| Success | Confirmation subtile (checkmark + fade) |
| Saving | Indicateur "Enregistré..." / "Modifications non sauvegardées" |
| Offline | Badge "Hors ligne" avec fonctionnalités limitées |
