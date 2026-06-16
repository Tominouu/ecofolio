# Vision Produit — Ecofolio

> **Un CMS portfolio qui ne ressemble pas à un CMS.**

---

## Résumé en une phrase

Ecofolio est un outil open source qui permet aux étudiants et créatifs de construire un portfolio professionnel, statique, rapide et éco-responsable, sans toucher à une base de données ni à un serveur.

---

## Problème

Créer un portfolio aujourd'hui impose un choix frustrant :

| Option | Problème |
|--------|----------|
| WordPress | Trop lourd, trop complexe, nécessite un serveur |
| Carrd / Squarespace | Pas open source, payant, pas de contrôle |
| Hugo / Jekyll | Courbe d'apprentissage raide, pas visuel |
| Code from scratch | Trop long, difficile pour un étudiant |

**Aucun outil existant ne combine :**
- Simplicité d'utilisation (visuel)
- Performance (site statique)
- Contrôle (open source, Git)
- Sobriété (écologie)
- Design (expérience premium)

---

## Solution : Ecofolio

Ecofolio est un **studio de portfolio** — pas un CMS.

L'utilisateur ne "gère pas un site". Il **construit son portfolio** dans un environnement visuel.

```
┌─────────────────────────────────────────────────────────┐
│                    Ecofolio Studio                       │
├─────────────────────────────────────────────────────────┤
│  Canvas (édition directe)      │  Preview (temps réel)  │
│                                │                        │
│  [Hero]                        │  Mon Portfolio         │
│  [Projets]     ←→              │  Projets...            │
│  [Contact]                     │  Contact...            │
│                                │                        │
└─────────────────────────────────────────────────────────┘
```

---

## Public cible

| Persona | Utilisation | Attentes |
|---------|-------------|----------|
| **Lucas** – Étudiant MMI 2e année | Portfolio de projets pédagogiques | Rapide, beau, gratuit, zéro serveur |
| **Sarah** – UX/Diplômée | Recherche alternance/emploi | Design premium, accessible, pro |
| **Mathis** – Développeur junior | Montrer ses projets code | Déploiement GitHub Pages, custom CSS/JS |
| **Clara** – Graphiste freelance | Attirer des clients | Galerie visuelle, thèmes élégants |

---

## Principes fondamentaux

### 1. Open source

Licence MIT. Communauté. Pas de verrouillage. Transparence totale.

### 2. Performance first

Site statique. Pas de base de données. HTML, CSS et un minimum de JS. Score Lighthouse ≥ 95 par défaut.

### 3. Sobriété numérique

Mesures intégrées : poids des pages, CO₂ estimé, score éco. L'utilisateur comprend l'impact de ses choix.

### 4. Accessibilité

WCAG 2.2 niveau AA minimum. Structure sémantique. Navigation clavier. Contrastes suffisants.

### 5. Design first

L'UX n'est pas une couche — c'est le produit. Interface inspirée de Linear, Figma, Notion.

### 6. Git first

Chaque portfolio est un dépôt Git. L'utilisateur ne voit jamais Git, mais Git est partout.

### 7. Static first

Le résultat final est un dossier `dist/` hébergeable partout. Zéro backend en production.

---

## Positionnement

```
                    Premium
                       │
                       │   Ecofolio ●
                       │
   Généraliste ───────┼─────── Spécialiste portfolio
                       │
                       │
                    WordPress
                    (lourd, complexe)
```

Ecofolio est **volontairement spécialisé**. Pas de blog, pas d'e-commerce, pas de forum.
Uniquement des portfolios. Mais faits parfaitement.

---

## Différenciateurs clés

1. **Éditeur canvas** — On édite son portfolio, pas un formulaire d'administration
2. **Aperçu temps réel natif** — Split screen permanent
3. **Blocs sémantiques** — Chaque bloc produit du HTML propre, pas du `<div>` spaghetti
4. **Injection de code** — L'utilisateur peut ajouter HTML/CSS/JS pour apprendre
5. **Métriques éco intégrées** — Dashboard avec poids CO₂, accessibilité, performance
6. **Pas de backend** — Tout est fichier. Tout est Git. Tout est statique.

---

## Non-features (ce qu'on ne fera PAS)

- ❌ Base de données
- ❌ Backend en production
- ❌ Authentification complexe
- ❌ Éditeur de pages générique
- ❌ Plugins extensibles (V1)
- ❌ Blog
- ❌ E-commerce
- ❌ Multi-utilisateurs
- ❌ Dashboard analytique tiers

Chaque feature doit servir le portfolio.

---

## Succès mesurable

**Pour l'utilisateur :**
- Créer un portfolio en < 30 minutes
- Score Lighthouse > 95 par défaut
- Déployé en 1 clic
- Page < 100KB (sans images)

**Pour le projet :**
- Adopté dans ≥ 5 départements MMI
- 100+ étoiles GitHub (V1)
- Contributions externes actives
- ≥ 4 thèmes disponibles

---

## Ton et personnalité

Ecofolio est :
- **Élégant** — pas clinique, pas froid
- **Bienveillant** — conçu pour des étudiants, pas des experts
- **Exigeant** — sur la qualité du résultat produit
- **Inspirant** — donne envie de créer
