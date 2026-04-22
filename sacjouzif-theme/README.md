# SACJOUZIF — Shopify Theme

Theme luxe complet pour **SACJOUZIF** — sacs femme.

## Structure des fichiers

```
sacjouzif-theme/
├── assets/
│   ├── theme.css          ← Tout le CSS + animations
│   └── theme.js           ← Cursor, loader, cart, scroll reveal, etc.
├── config/
│   └── settings_schema.json
├── layout/
│   └── theme.liquid        ← Layout principal
├── locales/
│   └── fr.default.json
├── sections/
│   ├── header.liquid
│   ├── cart-drawer.liquid
│   ├── hero.liquid          ← Hero + marquee animé
│   ├── featured-products.liquid
│   ├── story.liquid
│   ├── categories.liquid
│   ├── testimonials.liquid
│   ├── newsletter.liquid
│   └── footer.liquid
├── snippets/
│   ├── product-card.liquid
│   └── product-card-placeholder.liquid
└── templates/
    └── index.json           ← Page d'accueil
```

## Installation

### Méthode 1 — Shopify CLI (recommandée)
```bash
# 1. Installe Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 2. Connecte ton store
shopify auth login --store TON-STORE.myshopify.com

# 3. Upload le theme
shopify theme push --path ./sacjouzif-theme

# 4. Preview en live
shopify theme dev --path ./sacjouzif-theme
```

### Méthode 2 — Upload ZIP
1. Zippe le dossier `sacjouzif-theme/`
2. Va dans **Shopify Admin → Boutique en ligne → Thèmes**
3. Clique **"Ajouter un thème" → "Télécharger un fichier zip"**
4. Upload le ZIP → **"Publier"**

## Configuration dans le Theme Editor

### Menu principal
1. **Boutique en ligne → Navigation**
2. Crée un menu nommé **"main-menu"**
3. Ajoute: Collection, Catégories, Notre Histoire, Contact

### Sections homepage (drag & drop)
Dans le **Theme Editor**, tu peux réorganiser:
- Hero (titre, image, boutons)
- Produits phares (connecter ta collection)
- Notre Histoire (textes + image)
- Catégories (images + liens)
- Témoignages (ajouter/modifier)
- Newsletter

### Images recommandées
| Section | Dimensions |
|---------|-----------|
| Hero (droite) | 900×1200px |
| Story | 600×700px |
| Catégories | 800×800px |
| Produits | 600×800px |

## Animations incluses

| Animation | Description |
|-----------|-------------|
| Loader | Logo animé + barre de progression au chargement |
| Custom cursor | Curseur doré avec ring qui suit |
| Hero title | Slide-up staggeré ligne par ligne |
| Marquee | Défilement infini |
| Parallax | Formes géométriques bougent avec la souris |
| Scroll reveal | Éléments apparaissent en scrollant |
| Counter | Chiffres comptent lors de l'apparition |
| Product hover | Overlay + bouton ATC |
| Cart drawer | Slide depuis la droite |

## Personnalisation couleurs

Dans `assets/theme.css`, modifier les variables CSS:
```css
:root {
  --gold:   #C9A96E;  /* Or principal */
  --dark:   #1A1208;  /* Fond sombre */
  --cream:  #F5EFE6;  /* Crème */
  --ivory:  #FAF6F0;  /* Ivoire (fond) */
}
```
