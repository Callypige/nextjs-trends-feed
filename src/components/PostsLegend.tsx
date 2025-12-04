"use client";

import { useState } from "react";
import { Heart, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Collapsible legend explaining post card elements
 */
export function PostsLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          📖 Understanding Post Cards
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-1 text-xs"
        >
          {isExpanded ? (
            <>
              Réduire
              <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Voir les détails
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-3 text-sm">
          <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <Heart className="h-4 w-4 mt-0.5 shrink-0" />
              <span><strong>Upvotes:</strong> Number of Reddit users who upvoted the post</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span><strong>Comments:</strong> Number of discussion replies on the post</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-flex items-center rounded-md bg-orange-50 dark:bg-orange-950 px-1.5 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300 ring-1 ring-inset ring-orange-600/20 shrink-0 mt-0.5">
                r/subreddit
              </span>
              <span><strong>Subreddit badge:</strong> Click to visit the source community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20 shrink-0 mt-0.5">
                flair
              </span>
              <span><strong>Flair:</strong> Category tag assigned by subreddit moderators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">🔗</span>
              <span><strong>Domain:</strong> External link source (articles, videos, etc.)</span>
            </li>
          </ul>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            💡 Click on post titles or &quot;View on Reddit&quot; to read the full discussion
          </p>
        </div>
      )}
    </div>
  );
}
