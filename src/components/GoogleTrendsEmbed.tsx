"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Post } from "@/data/subjects";

interface GoogleTrendsEmbedProps {
  topic: string;
  compareTopics?: string[];
  posts?: Post[];
}

/**
 * Reddit Activity Analytics - Alternative to Google Trends
 * Shows engagement trends from Reddit data
 */
export function GoogleTrendsEmbed({ topic, posts = [] }: GoogleTrendsEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (posts.length === 0) {
    return null;
  }

  // Calculate metrics
  const totalEngagement = posts.reduce((sum, t) => sum + t.likes + t.comments, 0);
  const avgScore = Math.round(totalEngagement / posts.length);
  const topPost = posts.reduce((max, t) => (t.likes > max.likes ? t : max), posts[0]);
  
  // Get engagement distribution for mini chart
  const top10 = posts.slice(0, 10);
  const maxEngagement = Math.max(...top10.map(t => t.likes + t.comments));
  
  // Calculate trend (compare first half vs second half)
  const firstHalf = posts.slice(0, Math.floor(posts.length / 2));
  const secondHalf = posts.slice(Math.floor(posts.length / 2));
  const firstAvg = firstHalf.reduce((sum, t) => sum + t.likes, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, t) => sum + t.likes, 0) / secondHalf.length;
  const trend = secondAvg > firstAvg ? "up" : secondAvg < firstAvg ? "down" : "stable";
  const trendPercent = Math.abs(Math.round(((secondAvg - firstAvg) / firstAvg) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Reddit Activity Analytics
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Replier
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Déplier
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <Card className="border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <CardHeader className="bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 pb-4">
          <CardTitle className="text-xl">{topic}</CardTitle>
          <div className="flex gap-4 mt-2">
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {posts.length}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">Hot Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {avgScore.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">Avg Score</div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {trend === "up" && <TrendingUp className="h-5 w-5 text-green-600" />}
                {trend === "down" && <TrendingDown className="h-5 w-5 text-red-600" />}
                {trend === "stable" && <Minus className="h-5 w-5 text-zinc-600" />}
                <span className={`text-2xl font-bold ${
                  trend === "up" ? "text-green-600" : 
                  trend === "down" ? "text-red-600" : 
                  "text-zinc-600"
                }`}>
                  {trendPercent}%
                </span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">Trend</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Engagement chart */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">
              Engagement des 10 posts les plus populaires
            </h3>
            <div className="space-y-2">
              {top10.map((post, i) => {
                const engagement = post.likes + post.comments;
                const percentage = (engagement / maxEngagement) * 100;
                return (
                  <div key={post.id} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 w-6">
                        #{i + 1}
                      </span>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                        {post.content.slice(0, 40)}...
                      </span>
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                        {engagement.toLocaleString()}
                      </span>
                    </div>
                    <div className="ml-8 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 transition-all duration-300 group-hover:from-orange-600 group-hover:to-orange-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top post highlight */}
          <div className="p-4 bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-2 mb-2">
              <Badge variant="secondary" className="bg-orange-600 text-white">
                🔥 Hottest Post
              </Badge>
            </div>
            <a
              href={topPost.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-orange-600 dark:hover:text-orange-400 line-clamp-2 block"
            >
              {topPost.content}
            </a>
            <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span>👍 {topPost.likes.toLocaleString()} upvotes</span>
              <span>💬 {topPost.comments.toLocaleString()} comments</span>
              <span>by u/{topPost.authorUsername}</span>
            </div>
          </div>

          <p className="text-xs text-center text-zinc-500 dark:text-zinc-500 mt-4">
            📊 Real-time data from r/{topPost.subreddit} • Updated every 5 minutes
          </p>
        </CardContent>
      </Card>
      )}
    </div>
  );
}


