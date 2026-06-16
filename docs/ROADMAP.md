# Roadmap — Ecofolio

---

## Philosophie de développement

- **MVP réalisable par un étudiant MMI en un semestre**
- Chaque version doit être **utilisable immédiatement**
- Priorité à l'**expérience de base** avant les fonctionnalités avancées
- **Itérations courtes** (cycles de 2 semaines)

---

## V0.1 — Fondation (Semaines 1-4)

### Objectif
Avoir un outil fonctionnel en local : créer un projet, éditer des blocs, voir une preview, générer un site statique.

### Tâches

| # | Tâche | Module | Complexité | Priorité |
|---|-------|--------|-----------|----------|
| 1.1 | Setup du projet TypeScript + ESLint + Prettier | Infrastructure | 1/5 | 🔴 Critique |
| 1.2 | Structure de dossiers et base du CLI | Core | 1/5 | 🔴 Critique |
| 1.3 | Core types et interfaces | Core | 2/5 | 🔴 Critique |
| 1.4 | Content Manager : lecture/écriture fichiers JSON | Core | 3/5 | 🔴 Critique |
| 1.5 | Serveur Fastify basique + WebSocket | Server | 3/5 | 🔴 Critique |
| 1.6 | Routes CRUD projets (API) | Server | 3/5 | 🔴 Critique |
| 1.7 | Dashboard : liste des projets (EJS + HTMX) | Editor | 3/5 | 🔴 Critique |
| 1.8 | Éditeur split-screen basique | Editor | 4/5 | 🔴 Critique |
| 1.9 | Affichage des blocs dans le canvas | Editor | 3/5 | 🔴 Critique |
| 1.10 | Preview via iframe + rebuild au changement | Preview | 4/5 | 🔴 Critique |
| 1.11 | Block Engine : registration + rendu | Blocks | 3/5 | 🔴 Critique |
| 1.12 | Bloc Text + Bloc Heading | Blocks | 2/5 | 🔴 Critique |
| 1.13 | Générateur statique basique (index.html) | Generator | 4/5 | 🔴 Critique |
| 1.14 | Thème Minimal basique (templates EJS) | Themes | 3/5 | 🔴 Critique |
| 1.15 | `ecofolio dev` command | CLI | 2/5 | 🔴 Critique |
| 1.16 | `ecofolio build` command | CLI | 2/5 | 🟡 Haute |
| 1.17 | Design tokens CSS + mode clair/sombre | UI | 2/5 | 🟡 Haute |
| 1.18 | Composants UI de base (boutons, inputs, cards) | UI | 2/5 | 🟡 Haute |

**Livrable V0.1 :** `ecofolio dev` ouvre un navigateur avec dashboard, éditeur, preview.

---

## V0.2 — Blocs & Édition (Semaines 5-8)

### Objectif
Éditeur complet avec tous les blocs natifs, upload d'images, drag & drop, édition inline.

| # | Tâche | Module | Complexité | Priorité |
|---|-------|--------|-----------|----------|
| 2.1 | Bloc Image + upload (sharp) | Blocks | 3/5 | 🔴 Critique |
| 2.2 | Bloc Galerie | Blocks | 3/5 | 🔴 Critique |
| 2.3 | Bloc Vidéo | Blocks | 2/5 | 🔴 Critique |
| 2.4 | Bloc Citation | Blocks | 1/5 | 🔴 Critique |
| 2.5 | Bloc Bouton | Blocks | 2/5 | 🔴 Critique |
| 2.6 | Bloc Timeline | Blocks | 3/5 | 🔴 Critique |
| 2.7 | Bloc Code (highlighting) | Blocks | 3/5 | 🔴 Critique |
| 2.8 | Bloc Divider | Blocks | 1/5 | 🔴 Critique |
| 2.9 | Palette d'ajout de blocs | Editor | 3/5 | 🟡 Haute |
| 2.10 | Drag & drop réordonnancement | Editor | 4/5 | 🟡 Haute |
| 2.11 | Inspecteur contextuel (panneau latéral) | Editor | 3/5 | 🟡 Haute |
| 2.12 | Édition inline (double-clic sur texte) | Editor | 4/5 | 🔵 Moyenne |
| 2.13 | Upload assets + gestion fichiers | Server | 3/5 | 🔴 Critique |
| 2.14 | Routes API blocs (CRUD + reorder) | Server | 2/5 | 🔴 Critique |
| 2.15 | Générateur statique : pages multiples | Generator | 3/5 | 🔴 Critique |
| 2.16 | Générateur statique : assets pipeline | Generator | 3/5 | 🔴 Critique |
| 2.17 | Thème Creative | Themes | 3/5 | 🟡 Haute |
| 2.18 | Thème Developer | Themes | 3/5 | 🟡 Haute |

**Livrable V0.2 :** Éditeur complet avec tous les blocs, upload, drag & drop.

---

## V0.3 — Git & Déploiement (Semaines 9-10)

### Objectif
Intégration Git complète et déploiement GitHub Pages en 1 clic.

| # | Tâche | Module | Complexité | Priorité |
|---|-------|--------|-----------|----------|
| 3.1 | Git init automatique | Git | 2/5 | 🔴 Critique |
| 3.2 | Auto-commit (debounce, messages auto) | Git | 3/5 | 🔴 Critique |
| 3.3 | Historique des commits (UI) | Git + Editor | 3/5 | 🔴 Critique |
| 3.4 | Rollback (sélection d'un commit) | Git | 3/5 | 🔴 Critique |
| 3.5 | Branches (création, switch) | Git | 3/5 | 🔵 Moyenne |
| 3.6 | Push vers GitHub | Git | 3/5 | 🔴 Critique |
| 3.7 | Workflow GitHub Actions de déploiement | Deploy | 2/5 | 🔴 Critique |
| 3.8 | Statut déploiement (UI) | Deploy + Editor | 2/5 | 🟡 Haute |
| 3.9 | Page de configuration déploiement | Editor | 2/5 | 🔴 Critique |
| 3.10 | Thème Designer | Themes | 3/5 | 🟡 Haute |

**Livrable V0.3 :** Portfolio modifié → auto-commit → push → GitHub Pages automatique.

---

## V0.4 — Métriques & Finalisation (Semaines 11-12)

### Objectif
Métriques éco, accessibilité, finalisation UX, documentation.

| # | Tâche | Module | Complexité | Priorité |
|---|-------|--------|-----------|----------|
| 4.1 | Moteur de métriques : poids pages, requêtes | Metrics | 3/5 | 🔴 Critique |
| 4.2 | Estimation carbone (CO₂) | Metrics | 3/5 | 🔴 Critique |
| 4.3 | Scores performance, accessibilité, SEO | Metrics | 4/5 | 🔴 Critique |
| 4.4 | Dashboard métriques (UI) | Editor | 3/5 | 🟡 Haute |
| 4.5 | Badge éco-rating dans l'éditeur | Editor | 2/5 | 🟡 Haute |
| 4.6 | Bloc Custom HTML/CSS/JS | Blocks | 3/5 | 🔴 Critique |
| 4.7 | Assistant onboarding (3 écrans) | Editor | 3/5 | 🟡 Haute |
| 4.8 | Palette de commandes (Cmd+K) | Editor | 4/5 | 🔵 Moyenne |
| 4.9 | Responsive : adaptation mobile éditeur | Editor | 3/5 | 🟡 Haute |
| 4.10 | Documentation utilisateur | Docs | 3/5 | 🟡 Haute |
| 4.11 | Landing page du projet | Docs | 2/5 | 🔵 Moyenne |
| 4.12 | SEO du site généré (meta, sitemap, Open Graph) | Generator | 2/5 | 🟡 Haute |

**Livrable V0.4 :** Version beta complète, utilisable par des étudiants.

---

## V1.0 — Release (Semaine 13-14)

### Objectif
Version stable, prête pour production.

| # | Tâche | Module | Complexité | Priorité |
|---|-------|--------|-----------|----------|
| 5.1 | Tests unitaires (core, generator, git) | Tests | 4/5 | 🔴 Critique |
| 5.2 | Tests d'intégration (API) | Tests | 4/5 | 🟡 Haute |
| 5.3 | Tests E2E (parcours utilisateur) | Tests | 5/5 | 🔵 Moyenne |
| 5.4 | Audit accessibilité WCAG 2.2 | QA | 3/5 | 🔴 Critique |
| 5.5 | Optimisation performance serveur | Perf | 3/5 | 🟡 Haute |
| 5.6 | Gestion des erreurs + messages clairs | Server | 3/5 | 🟡 Haute |
| 5.7 | Validation des données utilisateur (TypeBox) | Core | 2/5 | 🔴 Critique |
| 5.8 | `ecofolio init` : assistant création | CLI | 3/5 | 🟡 Haute |
| 5.9 | npm publish | Release | 1/5 | 🔴 Critique |
| 5.10 | Documentation contributeur | Docs | 2/5 | 🟡 Haute |
| 5.11 | Exemple de portfolio complet | Examples | 2/5 | 🟡 Haute |

**Livrable V1.0 :** `npm create ecofolio` → portfolio prêt en 5 minutes.

---

## Post-V1.0 (Futur)

| Feature | Complexité | Notes |
|---------|-----------|-------|
| Support Cloudflare Pages | 2/5 | API similaire, peu d'effort |
| Support Netlify | 2/5 | Idem |
| Mode hors-ligne (PWA) | 4/5 | Service worker, cache |
| Export PDF du portfolio | 3/5 | Puppeteer |
| Bloc Formulaire de contact | 2/5 | Formulaire statique → service externe |
| Import/Export JSON | 2/5 | Sauvegarde portable |
| Analyse Lighthouse intégrée | 4/5 | Lighthouse CI |
| Plugins communautaires | 5/5 | SDK + registry |
| Multi-langue du portfolio | 4/5 | i18n du contenu |
| Mode collaboratif | 5/5 | WebSocket + OT/CRDT |

---

## Estimation complexité par module

| Module | V0.1 | V0.2 | V0.3 | V0.4 | V1.0 | Total (jours) |
|--------|------|------|------|------|------|--------------|
| Core | 3 | 0 | 0 | 0 | 1 | 4 |
| Server | 3 | 2 | 0 | 0 | 2 | 7 |
| Editor | 3 | 5 | 2 | 4 | 0 | 14 |
| Preview | 2 | 0 | 0 | 0 | 0 | 2 |
| Blocks | 2 | 5 | 0 | 2 | 0 | 9 |
| Themes | 2 | 3 | 1 | 0 | 0 | 6 |
| Git | 0 | 0 | 5 | 0 | 0 | 5 |
| Deploy | 0 | 0 | 3 | 0 | 0 | 3 |
| Metrics | 0 | 0 | 0 | 4 | 0 | 4 |
| Generator | 3 | 3 | 0 | 1 | 0 | 7 |
| CLI | 2 | 0 | 0 | 0 | 1 | 3 |
| Tests | 0 | 0 | 0 | 0 | 5 | 5 |
| Docs | 0 | 0 | 0 | 2 | 2 | 4 |
| **Total** | **20** | **18** | **11** | **13** | **11** | **73** |

**Estimation totale : ~73 jours/homme pour la V1.0 complète.**

Pour un étudiant MMI à temps partiel (20h/semaine) : ~7 mois.
Pour un étudiant à temps plein (35h/semaine) : ~4 mois.

---

## Dépendances entre tâches

```
1.1 Setup projet
  ├── 1.2 CLI base
  ├── 1.3 Core types
  │   ├── 1.4 Content Manager
  │   └── 1.5 Serveur Fastify
  │       ├── 1.6 API routes
  │       ├── 1.7 Dashboard
  │       └── 1.10 Preview
  │           └── 1.8 Éditeur split
  │               ├── 1.9 Blocs canvas
  │               └── 2.10 Drag & drop
  1.11 Block Engine
    ├── 1.12-2.8 Blocs natifs
    └── 2.9 Palette
  1.13 Generator
    └── 1.14 Theme Minimal
  2.12 Édition inline
  2.13 Upload assets
  3.1-3.6 Git Layer
    └── 3.7-3.8 Déploiement
  4.1-4.4 Métriques
  4.6 Custom HTML
  5.1-5.3 Tests
```

---

## Critères de qualité

### Avant chaque release :

- [ ] `npm run build` réussit sans erreur
- [ ] `npm run test` passe (tests unitaires)
- [ ] Pas de TODO ou FIXME dans le code (sauf tickets)
- [ ] Lighthouse score ≥ 90 (mode production)
- [ ] Navigation clavier fonctionnelle (Tab, Enter, Escape)
- [ ] Contraste minimum WCAG AA vérifié
- [ ] Mode sombre fonctionnel
- [ ] 404 si page non trouvée
- [ ] Messages d'erreur compréhensibles

### Définition de "Fini" pour une tâche :

1. Code écrit et reviewé
2. Tests passent
3. Documentation mise à jour
4. Pas de régression visuelle
5. Fonctionnel en mode clair + sombre
