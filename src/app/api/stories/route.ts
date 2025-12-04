import { NextResponse } from 'next/server';

// Map topics to Reddit subreddits and search queries
const TOPICS = {
  'react': { subreddit: 'reactjs', query: 'React' },
  'nextjs': { subreddit: 'nextjs', query: 'Next.js' },
  'typescript': { subreddit: 'typescript', query: 'TypeScript' },
  'python': { subreddit: 'python', query: 'Python' },
  'fastapi': { subreddit: 'FastAPI', query: 'FastAPI' },
  'django': { subreddit: 'django', query: 'Django' },
};

interface RedditPost {
  data: {
    id: string;
    title: string;
    author: string;
    url: string;
    permalink: string;
    created_utc: number;
    score: number;
    num_comments: number;
    selftext?: string;
    subreddit: string;
    domain?: string;
    link_flair_text?: string;
  };
}

interface RedditResponse {
  data: {
    children: RedditPost[];
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');

  try {
    if (!topic || !(topic in TOPICS)) {
      return NextResponse.json(
        { error: 'Invalid topic' },
        { status: 400 }
      );
    }

    const { subreddit } = TOPICS[topic as keyof typeof TOPICS];

    // Fetch hot posts from subreddit (no API key needed for public data)
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TechTrendsFeed/1.0',
      },
      next: { revalidate: 300 } // Cache 5 min
    });

    console.log(`Reddit response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Reddit API error: ${response.status} - ${errorText}`);
      throw new Error(`Reddit API returned ${response.status}`);
    }

    const data: RedditResponse = await response.json();
    console.log(`Received ${data.data.children.length} posts from r/${subreddit}`);
    
    // Transform Reddit posts to our format
    const posts = data.data.children.map(post => ({
      id: post.data.id,
      title: post.data.title,
      url: post.data.url.startsWith('http') 
        ? post.data.url 
        : `https://reddit.com${post.data.permalink}`,
      by: post.data.author,
      time: post.data.created_utc,
      score: post.data.score,
      descendants: post.data.num_comments,
      selftext: post.data.selftext || '',
      subreddit: post.data.subreddit, // Use actual subreddit from post data
      domain: post.data.domain,
      flair: post.data.link_flair_text,
    }));

    // Sort by score and return top 30
    const sorted = posts.sort((a, b) => b.score - a.score);
    return NextResponse.json(sorted.slice(0, 30));

  } catch (error) {
    console.error('Failed to fetch Reddit posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}
