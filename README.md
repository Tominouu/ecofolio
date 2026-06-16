# ✦ Ecofolio

> **Un studio de portfolio, pas un CMS.**
> Créez un portfolio professionnel, statique, rapide et éco-responsable — sans serveur, sans base de données, sans effort.

## Quick Start

**1. Cloner et installer les dépendances**

```bash
git clone https://github.com/Tominouu/ecofolio.git
cd ecofolio
npm install
```

**2. Créer un alias permanent** (à faire une seule fois)

```bash
echo 'alias ecofolio="npx tsx '$PWD'/src/cli/index.ts"' >> ~/.zshrc
source ~/.zshrc
```

**3. Créer un portfolio**

```bash
ecofolio init ~/mon-portfolio
cd ~/mon-portfolio
ecofolio dev
```

Ouvre `http://localhost:3000` — l'éditeur est prêt.

> L'alias permet d'utiliser `ecofolio` depuis n'importe quel dossier.
> Sans alias : `npx tsx ~/Documents/dev/ecofolio/src/cli/index.ts <commande>`

## Commandes

| Commande | Description |
|----------|-------------|
| `ecofolio init [dir]` | Crée un nouveau portfolio |
| `ecofolio dev` | Lance l'éditeur (localhost:3000) |
| `ecofolio build` | Génère le site statique dans `dist/` |
| `ecofolio deploy` | Build + push vers GitHub Pages |

## Fonctionnalités

### Studio d'édition (local)
- Split-screen : canvas + preview temps réel
- 11 types de blocs : Texte, Titre, Image, Galerie, Vidéo, Citation, Timeline, Code, Bouton, Séparateur, Custom HTML
- Drag & drop, édition inline dans l'inspecteur
- Palette de blocs (Cmd+K)
- Upload d'images avec optimisation Sharp (WebP)
- Médiathèque intégrée
- Thèmes visuels : Minimal, Creative, Developer, Designer
- Métriques éco : poids, CO₂, score (A-F)

### Site statique (production)
- HTML sémantique, zéro JS, zéro backend
- CSS optimisé, images WebP
- Déploiement GitHub Pages, Netlify, Scalingo

### Git natif
- Auto-commit à chaque modification
- Historique et rollback
- Push en 1 clic `ecofolio deploy`

## Architecture

```
mon-portfolio/
├── config.json           # Configuration
├── content/              # Contenu (JSON)
│   ├── index.json
│   ├── about.json
│   └── projects/
├── assets/               # Images, fichiers
├── themes/               # Thèmes
└── dist/                 # Site généré
```

Stack : TypeScript + Fastify + EJS + HTMX + Sharp + simple-git.

## Licence

MIT
