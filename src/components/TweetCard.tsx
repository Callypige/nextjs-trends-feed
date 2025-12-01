"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Repeat2 } from "lucide-react";
import { Tweet, formatRelativeTime } from "@/data/subjects";
import { getInitials, getColorFromString } from "@/lib/utils";

interface TweetCardProps {
  tweet: Tweet;
}

/**
 * Validates that a URL is a valid X/Twitter URL
 */
function isValidTwitterUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "x.com" || parsed.hostname === "twitter.com";
  } catch {
    return false;
  }
}

/**
 * Card component displaying a tweet with author info and engagement stats
 */
export function TweetCard({ tweet }: TweetCardProps) {
  // Validate URL before rendering the link
  const isValidUrl = isValidTwitterUrl(tweet.tweetUrl);

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getColorFromString(tweet.authorUsername)}`}
            >
              {getInitials(tweet.authorName)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {tweet.authorName}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                @{tweet.authorUsername}
              </span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                · {formatRelativeTime(tweet.createdAt)}
              </span>
            </div>

            {/* Tweet content */}
            <p className="mt-2 text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap wrap-break-word">
              {tweet.content}
            </p>

            {/* Engagement stats and action */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{tweet.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Repeat2 className="h-4 w-4" />
                  <span>{tweet.retweets.toLocaleString()}</span>
                </div>
              </div>
              {isValidUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1"
                >
                  <a
                    href={tweet.tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on X
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
