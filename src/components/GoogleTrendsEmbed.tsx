"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, BarChart3, LineChart } from "lucide-react";

interface GoogleTrendsEmbedProps {
  topic: string;
  compareTopics?: string[];
}

/**
 * Google Trends section with direct link
 * Note: Google Trends blocks iframe embedding (X-Frame-Options)
 * This component provides a visual card with a direct link to Google Trends
 */
export function GoogleTrendsEmbed({ topic, compareTopics = [] }: GoogleTrendsEmbedProps) {
  // Build the query parameter with the main topic and comparison topics
  const allTopics = [topic, ...compareTopics].map(t => encodeURIComponent(t)).join(",");
  
  // Google Trends URL with 7-day timeframe
  const trendsUrl = `https://trends.google.com/trends/explore?date=now%207-d&q=${allTopics}&hl=en-US`;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
        Google Trends Analytics
      </h2>
      <Card className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon display */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <LineChart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                View Trends Data for "{topic}"
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                Explore search interest over time, regional popularity, and related queries
                {compareTopics.length > 0 && (
                  <span className="block mt-1">
                    Comparing with: <strong>{compareTopics.join(", ")}</strong>
                  </span>
                )}
              </p>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              asChild
              className="gap-2 mt-2"
            >
              <a
                href={trendsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TrendingUp className="h-5 w-5" />
                Open Google Trends Dashboard
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {/* Info note */}
            <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-sm">
              📊 View last 7 days of search trends, geographic distribution, and trending related topics
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
