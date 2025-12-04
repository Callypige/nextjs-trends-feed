import { NextResponse } from 'next/server';

// Map topics to Reddit subreddits
const SUBREDDITS: Record<string, string> = {
  'react': 'reactjs',
  'nextjs': 'nextjs',
  'typescript': 'typescript',
  'python': 'python',
  'fastapi': 'FastAPI',
  'django': 'django',
};

interface SubredditAbout {
  data: {
    subscribers: number;
    active_user_count: number;
  };
}

export async function GET() {
  try {
    const counts: Record<string, number> = {};

    // Fetch subscriber counts for each subreddit
    await Promise.all(
      Object.entries(SUBREDDITS).map(async ([slug, subreddit]) => {
        try {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit}/about.json`,
            {
              headers: {
                'User-Agent': 'TechTrendsFeed/1.0',
              },
              next: { revalidate: 3600 } // Cache 1h
            }
          );

          if (response.ok) {
            const data: SubredditAbout = await response.json();
            // Use active users as a proxy for activity
            counts[slug] = data.data.active_user_count || data.data.subscribers;
          } else {
            counts[slug] = 0;
          }
        } catch (error) {
          console.error(`Failed to fetch count for ${subreddit}:`, error);
          counts[slug] = 0;
        }
      })
    );

    return NextResponse.json(counts);
  } catch (error) {
    console.error('Failed to fetch counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counts' },
      { status: 500 }
    );
  }
}
