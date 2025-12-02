# Regulatory Feed

Application Next.js pour suivre les discussions réglementaires sur les réseaux sociaux (Reddit) sur les technologies emergeantes (Python, Javascript, FastAPI).

## 🚀 Installation rapide

**Prérequis** : Node.js 18+ et npm 8+

```bash
# 1. Cloner le repo
git clone https://github.com/Callypige/nextjs-regulatory-feed.git
cd nextjs-regulatory-feed

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
docker build -t regulatory-feed .
docker run -p 3000:3000 regulatory-feed
```

## 📋 Fonctionnalités

- **Page /subjects** : Liste des sujets réglementaires Reddit 
- **Page /feed/[topic]** : Flux de Redditpopulaires 
- **Pagination** : Navigation par pages (5 reddits/page)
- **Tri automatique** : Tweets triés par engagement (likes + retweets)
- **UI moderne** : shadcn/ui + Tailwind CSS + Dark mode

## 🛠️ Choix techniques

**Framework**
- **Next.js 16 (App Router)** : SSG, routing file-based, performances optimales
- **TypeScript** : Sécurité des types

**UI/UX**
- **shadcn/ui** : Composants accessibles et customisables
- **Tailwind CSS 4** : Styling rapide et cohérent
- **Lucide React** : Icônes modernes

**Architecture**
- **Server Components** : Rendu côté serveur par défaut
- **Client Components** : Uniquement pour l'interactivité (pagination)
- **Static Generation** : Pages pré-rendues au build
- **Composants réutilisables** : SubjectCard, TweetCard, PaginatedTweetList

**Données**
- Mock data TypeScript pour la démo (pas d'API externe requise)

## 📂 Structure du projet

```
src/
├── app/
│   ├── subjects/page.tsx          # Page liste des sujets
│   └── feed/[topic]/page.tsx      # Page détail d'un sujet
├── components/
│   ├── ui/                        # Composants shadcn/ui
│   ├── SubjectCard.tsx            # Card d'un sujet
│   ├── TweetCard.tsx              # Card d'un tweet
│   ├── PaginatedTweetList.tsx     # Liste paginée de tweets
│   └── GoogleTrendsEmbed.tsx      # Lien Google Trends
├── data/
│   └── subjects.ts                # Données mockées
└── lib/
    └── utils.ts                   # Fonctions utilitaires
```

## ⚠️ Limitations & améliorations possibles

**Limitations actuelles**
- Données mockées (pas d'API réelle Twitter/X)
- Google Trends en lien externe (Google bloque l'iframe embedding)
- Pas de persistence des données

**Améliorations futures**
- Intégration API Twitter/X v2
- Backend avec cache et base de données
- Recherche et filtres avancés
- Infinite scroll
- Authentification utilisateur
- WebSocket pour mises à jour en temps réel

## 📄 License

MIT
