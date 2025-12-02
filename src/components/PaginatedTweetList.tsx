"use client";

import { useState } from "react";
import { Tweet } from "@/data/subjects";
import { TweetCard } from "@/components/TweetCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedTweetListProps {
  tweets: Tweet[];
  tweetsPerPage?: number;
}

/**
 * Client component that displays a paginated list of tweets
 */
export function PaginatedTweetList({ tweets, tweetsPerPage = 5 }: PaginatedTweetListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort tweets by engagement (likes + retweets) descending
  const sortedTweets = [...tweets].sort((a, b) => {
    const engagementA = a.likes + a.retweets;
    const engagementB = b.likes + b.retweets;
    return engagementB - engagementA;
  });

  const totalPages = Math.ceil(sortedTweets.length / tweetsPerPage);
  const startIndex = (currentPage - 1) * tweetsPerPage;
  const endIndex = startIndex + tweetsPerPage;
  const currentTweets = sortedTweets.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tweet cards with scroll container */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {currentTweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="min-w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Showing {startIndex + 1}-{Math.min(endIndex, sortedTweets.length)} of {sortedTweets.length} tweets
        </p>
      )}
    </div>
  );
}
