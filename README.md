# ✦ Ecofolio

> **Un studio de portfolio, pas un CMS.**  
> Créez un portfolio professionnel, statique, rapide et éco-responsable — sans serveur, sans base de données, sans effort.

```
                      ⚡ Performance first
                      🌱 Éco-responsable
                      ♿ Accessible (WCAG 2.2)
                      🎨 Design figma-like
                      📦 Static site
                      🔗 Git native
```

---

## Pourquoi Ecofolio ?

Les étudiants et créatifs ont besoin d'un portfolio, pas d'un site WordPress.

| Problème | Solution Ecofolio |
|----------|------------------|
| CMS trop lourds | Zéro backend en production |
| Pas de contrôle du code | Git natif, fichiers ouverts |
| Sites lents | Générateur statique < 100KB |
| Interfaces complexes | Studio visuel type Figma |
| Écologie ignorée | Métriques CO₂ intégrées |

---

## Quick Start

```bash
# Créer un portfolio
npm create ecofolio@latest

# Lancer l'éditeur
cd mon-portfolio
npx ecofolio dev

# Générer le site statique
npx ecofolio build

# Déployer sur GitHub Pages
npx ecofolio deploy
```

Ouvrez `http://localhost:3000` et commencez à éditer.

---

## Fonctionnalités

### Éditeur visuel
- Split screen : canvas + preview temps réel
- Blocs : Texte, Titre, Image, Galerie, Vidéo, Citation, Timeline, Code
- Drag & drop, édition inline
- Ajout de code HTML/CSS/JS personnalisé

### Génération statique
- HTML propre et sémantique
- CSS optimisé (Lightning CSS)
- Images WebP/AVIF (Sharp)
- Score Lighthouse ≥ 95 par défaut

### Git natif
- Auto-commit à chaque modification
- Historique et rollback visuels
- Push en 1 clic

### Déploiement
- **GitHub Pages** (natif)
- Cloudflare Pages
- Netlify

### Éco-métriques
- Poids des pages
- Estimation CO₂ par visite
- Score accessibilité, performance, SEO
- Badge éco-rating (A → E)

---

## Pour les étudiants MMI

Ecofolio est conçu **par et pour** les étudiants MMI.

- Interface en français (disponible en anglais)
- Documentation claire
- Pas besoin de savoir coder
- Mais possibilité d'injecter du code pour apprendre
- Idéal pour les projets de fin d'études

---

## Architecture

```
mon-portfolio/
├── config.json              # Configuration
├── content/                 # Contenu (JSON)
│   ├── index.json           # Accueil
│   ├── about.json           # À propos
│   ├── contact.json         # Contact
│   └── projects/            # Projets
├── assets/                  # Images, fichiers
├── themes/                  # Thème actif
├── .ecofolio/               # Cache, état éditeur
└── dist/                    # Site généré
```

Stack : TypeScript + Fastify + EJS + HTMX + CSS natif.

---

## Roadmap

| Version | Contenu | Statut |
|---------|---------|--------|
| v0.1 | Fondation : CLI, serveur, éditeur basique, preview | 📝 Planifié |
| v0.2 | Tous les blocs, upload, drag & drop, édition inline | 📝 Planifié |
| v0.3 | Git intégration, déploiement GitHub Pages | 📝 Planifié |
| v0.4 | Métriques éco, custom code, onboarding | 📝 Planifié |
| v1.0 | Tests, accessibilité, documentation, release | 📝 Planifié |

Voir [ROADMAP.md](docs/ROADMAP.md) pour le détail.

---

## Contribuer

Ecofolio est open source (MIT). Les contributions sont les bienvenues !

```bash
git clone https://github.com/Tominouu/ecofolio.git
cd ecofolio
npm install
npm run dev
```

Voir [CONTRIBUTING.md](docs/CONTRIBUTING.md).

---

## Licence

MIT — voir [LICENSE](LICENSE).

---

## 💚

Fait avec passion pour les étudiants, les créatifs et la planète.
