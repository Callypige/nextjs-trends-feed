# Regulatory Feed

A Next.js web application for tracking regulatory discussions and trends across key topics like AI Act, Data Act, Digital Markets Act, GDPR, and more.

## Features

- **📋 Subjects List** (`/subjects`): Browse regulatory subjects with tweet counts and popularity scores
- **📰 Topic Feed** (`/feed/[topic]`): View popular tweets and Google Trends for a specific subject
- **📊 Google Trends Integration**: Embedded trends dashboard for each regulatory topic
- **🎨 Modern UI**: Built with shadcn/ui components for a clean, accessible interface
- **🌙 Dark Mode**: Automatic theme switching based on system preferences

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Callypige/nextjs-regulatory-feed.git
cd nextjs-regulatory-feed
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

### Docker Deployment

#### Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop the container:
```bash
docker-compose down
```

#### Using Docker CLI

1. Build the image:
```bash
docker build -t nextjs-regulatory-feed .
```

2. Run the container:
```bash
docker run -p 3000:3000 --name regulatory-feed nextjs-regulatory-feed
```

3. Stop and remove:
```bash
docker stop regulatory-feed
docker rm regulatory-feed
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Technical Choices

### Framework & Language
- **Next.js 16 (App Router)**: Chosen for its excellent SEO, server-side rendering, and modern React features
- **TypeScript**: Ensures type safety and better developer experience

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS for rapid, consistent styling
- **shadcn/ui components**: High-quality, accessible UI components (Card, Button, Badge)
- **Lucide React**: Modern, consistent icon library

### Architecture
- **App Router**: Leverages Next.js 14+ file-based routing with layouts
- **Static Generation (SSG)**: Pre-renders pages at build time for optimal performance
- **Component-Based**: Reusable components for subjects, tweets, and trends

### Data Management
- **Mock Data**: Currently uses in-memory mock data for demonstration
- **Type-Safe Models**: TypeScript interfaces for Subject and Tweet entities

### Deployment
- **Docker**: Multi-stage build for optimized production images
- **Docker Compose**: Simplified orchestration and deployment
- **Standalone Output**: Next.js standalone mode for minimal Docker image size

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (redirects to /subjects)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── subjects/
│   │   └── page.tsx          # Subjects list page
│   └── feed/
│       └── [topic]/
│           └── page.tsx      # Dynamic feed page
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   └── badge.tsx
│   ├── SubjectCard.tsx       # Subject card component
│   ├── TweetCard.tsx         # Tweet card component
│   └── GoogleTrendsEmbed.tsx # Trends iframe embed
├── data/
│   └── subjects.ts           # Mock data and utilities
└── lib/
    └── utils.ts              # Utility functions (cn helper)
```

## Limitations & Future Improvements

### Current Limitations
- **Mock Data**: Uses static mock data; no real API integration
- **Google Trends Embedding**: Google blocks iframe embedding via X-Frame-Options headers. Solution implemented: visual card with direct link to Google Trends (opens in new tab). This is a technical limitation imposed by Google, not a code issue.
- **No Backend**: Pure frontend application without data persistence
- **Avatar Images**: Using generated initials instead of external images for better performance and reliability

### Potential Improvements
- **Real Twitter/X API Integration**: Fetch real tweets using Twitter API v2
- **Backend Service**: Add API routes for data management and caching
- **Search Functionality**: Allow users to search tweets and subjects
- **Infinite Scroll**: Implement lazy loading for tweets
- **User Authentication**: Enable personalized feeds and saved topics
- **Real-time Updates**: WebSocket integration for live tweet updates
- **Analytics Dashboard**: Enhanced trends visualization with charts

## License

MIT
