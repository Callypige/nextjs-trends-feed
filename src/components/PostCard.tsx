"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Post, formatRelativeTime } from "@/data/subjects";
import { getInitials, getColorFromString } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

/**
 * Determines the platform from URL
 */
function getPlatform(url: string): "reddit" | "other" {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("reddit.com")) return "reddit";
    return "other";
  } catch {
    return "other";
  }
}

/**
 * Card component displaying a Reddit post with author info and engagement stats
 */
export function PostCard({ post }: PostCardProps) {
  const platform = getPlatform(post.postUrl);
  const hasValidUrl = platform === "reddit";

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getColorFromString(post.authorUsername)}`}
            >
              {getInitials(post.authorName)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {post.authorName}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                @{post.authorUsername}
              </span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                · {formatRelativeTime(post.createdAt)}
              </span>
            </div>

            {/* Post title/content - Always clickable */}
            <a 
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-zinc-900 dark:text-zinc-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {post.content}
            </a>

            {/* Selftext preview for Reddit posts */}
            {post.selftext && post.selftext.length > 0 && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {post.selftext}
              </p>
            )}

            {/* Domain badge for external links */}
            {post.domain && post.domain !== `self.${post.subreddit}` && (
              <div className="mt-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  🔗 {post.domain}
                </span>
              </div>
            )}

            {/* Subreddit and flair badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {post.subreddit && (
                <a
                  href={`https://reddit.com/r/${post.subreddit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-orange-50 dark:bg-orange-950 px-2 py-1 text-xs font-medium text-orange-700 dark:text-orange-300 ring-1 ring-inset ring-orange-600/20 hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors"
                >
                  r/{post.subreddit}
                </a>
              )}
              {post.flair && (
                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
                  {post.flair}
                </span>
              )}
            </div>

            {/* Engagement stats and action */}
            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1" title="Upvotes">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1" title="Comments">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments.toLocaleString()}</span>
                </div>
              </div>
              {hasValidUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1"
                >
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Reddit
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
