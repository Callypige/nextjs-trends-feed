/**
 * Types and data for tech subjects and Hacker News stories
 */

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  communitySize: number;
}

export interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
  postUrl: string;
  likes: number;
  comments: number;
  selftext?: string;
  subreddit?: string;
  domain?: string;
  flair?: string;
}

export interface HNStory {
  id: string;
  title: string;
  url?: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  selftext?: string;
  subreddit?: string;
  domain?: string;
  flair?: string;
}

/**
 * Mock tech subjects data (raw, without computed fields)
 */
const subjectsData = [
  {
    id: "1",
    name: "React",
    slug: "react",
    description: "JavaScript library for building user interfaces",
    postCount: 5200,
    communitySize: 428000, // r/reactjs subscribers
  },
  {
    id: "2",
    name: "Next.js",
    slug: "nextjs",
    description: "React framework for production with hybrid rendering",
    postCount: 2100,
    communitySize: 87000, // r/nextjs subscribers
  },
  {
    id: "3",
    name: "TypeScript",
    slug: "typescript",
    description: "Typed superset of JavaScript for scalable applications",
    postCount: 3800,
    communitySize: 178000, // r/typescript subscribers
  },
  {
    id: "4",
    name: "Python",
    slug: "python",
    description: "Popular programming language for web development, data science, and automation",
    postCount: 8500,
    communitySize: 1500000, // r/python subscribers
  },
  {
    id: "5",
    name: "FastAPI",
    slug: "fastapi",
    description: "Modern Python web framework for building APIs",
    postCount: 1200,
    communitySize: 15000, // r/FastAPI subscribers
  },
  {
    id: "6",
    name: "Django",
    slug: "django",
    description: "High-level Python web framework for rapid development",
    postCount: 2800,
    communitySize: 156000, // r/django subscribers
  },
];

/**
 * Subjects with community data from Reddit
 */
export const subjects: Subject[] = subjectsData;

/**
 * Get subject by slug
 */
export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

/**
 * Convert HN story to Post format
 */
function hnStoryToPost(story: HNStory): Post {
  return {
    id: story.id.toString(),
    authorName: story.by,
    authorUsername: story.by,
    authorAvatar: '',
    content: story.title,
    createdAt: new Date(story.time * 1000),
    postUrl: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
    likes: story.score,
    comments: story.descendants || 0,
    selftext: story.selftext,
    subreddit: story.subreddit,
    domain: story.domain,
    flair: story.flair,
  };
}

/**
 * Fetch real stories from Reddit API via our Next.js API route
 */
export async function getPostsForSubject(slug: string): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/stories?topic=${slug}`,
      { next: { revalidate: 600 } } // Cache 10 minutes
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }
    
    const stories: HNStory[] = await response.json();
    const posts = stories.map(hnStoryToPost);
    return sortPostsByEngagement(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Sort posts by engagement (likes + comments) in descending order
 */
export function sortPostsByEngagement(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const engagementA = a.likes + a.comments;
    const engagementB = b.likes + b.comments;
    return engagementB - engagementA;
  });
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Get community size category based on members
 */
export function getCommunityLevel(size: number): {
  label: string;
  color: "default" | "secondary" | "destructive" | "outline";
} {
  if (size >= 1000000) return { label: "🔥 Massive", color: "destructive" };
  if (size >= 200000) return { label: "⭐ Large", color: "default" };
  if (size >= 50000) return { label: "📈 Growing", color: "secondary" };
  return { label: "🌱 Niche", color: "outline" };
}
