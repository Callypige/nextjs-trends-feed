# Tech Trends Feed

Application Next.js pour suivre les discussions des communautés tech sur Reddit (React, Python, TypeScript, Next.js, FastAPI, Django).

## 🚀 Installation rapide

**Prérequis** : Node.js 18+ et npm 8+

```bash
# 1. Cloner le repo
git clone https://github.com/Callypige/nextjs-trends-feed.git
cd nextjs-trends-feed

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm run dev
```

➡️ Ouvrir [http://localhost:3000](http://localhost:3000)

## 🐳 Docker (optionnel)

```bash
# Avec Docker Compose
docker-compose up -d

# OU avec Docker CLI
docker build -t tech-trends-feed .
docker run -p 3000:3000 tech-trends-feed
```

## 📋 Fonctionnalités

- **Page /subjects** : Liste des technologies avec taille de communauté et nombre de posts
- **Page /feed/[topic]** : ~30 posts Reddit + analytics d'activité pour chaque techno
- **Données réelles** : Intégration Reddit API (JSON public, pas d'auth requise)
- **Pagination** : Navigation par pages (5 posts/page)
- **Tri automatique** : Posts triés par engagement (upvotes + comments)
- **Analytics** : Dashboard rétractable avec métriques d'activité Reddit
- **Légende interactive** : Explications sur les éléments des cartes (rétractable)
- **UI moderne** : shadcn/ui + Tailwind CSS + Dark mode

## 🛠️ Choix techniques

**Framework**
- **Next.js 16 (App Router)** : SSG avec generateStaticParams, routing file-based, Turbopack
- **TypeScript** : Sécurité des types

**UI/UX**
- **shadcn/ui** : Composants accessibles et customisables
- **Tailwind CSS 4** : Styling rapide et cohérent
- **Lucide React** : Icônes modernes

**Architecture**
- **Server Components** : Rendu côté serveur par défaut pour SEO et performance
- **Client Components** : Pour l'interactivité (pagination, panels rétractables)
- **Static Generation** : Pages pré-rendues au build avec revalidation
- **Composants réutilisables** : SubjectCard, PostCard, PaginatedPostList, PostsLegend

**Données**
- **Reddit JSON API** : Endpoints publics (r/reactjs, r/python, r/typescript, etc.)
- **Cache Next.js** : Revalidation toutes les 5 minutes pour les posts
- **Vraies stats** : Nombre de membres des subreddits, upvotes, commentaires

## 📂 Structure du projet

```
src/
├── app/
│   ├── subjects/page.tsx          # Page liste des technologies
│   ├── feed/[topic]/page.tsx      # Page feed d'une techno
│   └── api/
│       └── stories/route.ts       # API route pour fetch Reddit
├── components/
│   ├── ui/                        # Composants shadcn/ui
│   ├── SubjectCard.tsx            # Card d'une technologie
│   ├── PostCard.tsx               # Card d'un post Reddit
│   ├── PaginatedPostList.tsx      # Liste paginée de posts
│   ├── PostsLegend.tsx            # Légende explicative (rétractable)
│   └── GoogleTrendsEmbed.tsx      # Analytics Reddit (remplace Google Trends)
├── data/
│   └── subjects.ts                # Config des sujets + fetch logic
└── lib/
    └── utils.ts                   # Fonctions utilitaires
```

## 🎯 Technologies couvertes

| Technologie | Subreddit | Membres |
|-------------|-----------|---------|
| Python      | r/python  | 1.5M    |
| React       | r/reactjs | 428k    |
| TypeScript  | r/typescript | 178k |
| Django      | r/django  | 156k    |
| Next.js     | r/nextjs  | 87k     |
| FastAPI     | r/FastAPI | 15k     |

## 🔄 Flux de données

1. **Build time** : `generateStaticParams()` génère les routes statiques
2. **Request time** : Fetch Reddit via `/api/stories?topic=react`
3. **Cache** : Next.js cache avec revalidation (5min pour posts)
4. **Transformation** : Reddit posts → format Post unifié
5. **Tri** : Par engagement (upvotes + comments)
6. **Affichage** : Top 30 posts avec pagination côté client

## ⚠️ Limitations & améliorations possibles

**Limitations actuelles**
- Reddit API publique limitée (pas de recherche avancée)
- Pas de filtres personnalisés
- Pas de sauvegarde favoris

**Améliorations futures**
- Authentification Reddit OAuth pour plus de données
- Filtres par flair, date, score minimum
- Infinite scroll au lieu de pagination
- Notifications pour nouveaux posts
- Export des données en CSV/JSON
- Comparaison multi-technologies
- Graphiques d'évolution temporelle

## 📄 License

MIT
