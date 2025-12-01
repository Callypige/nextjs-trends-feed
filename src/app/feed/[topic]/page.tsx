import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getSubjectBySlug, getTweetsForSubject, subjects } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TweetCard } from "@/components/TweetCard";
import { GoogleTrendsEmbed } from "@/components/GoogleTrendsEmbed";

interface FeedPageProps {
  params: Promise<{ topic: string }>;
}

/**
 * Generate static params for all subjects
 */
export async function generateStaticParams() {
  return subjects.map((subject) => ({
    topic: subject.slug,
  }));
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: FeedPageProps) {
  const { topic } = await params;
  const subject = getSubjectBySlug(topic);
  
  if (!subject) {
    return {
      title: "Subject Not Found",
    };
  }

  return {
    title: `${subject.name} Feed | Regulatory Feed`,
    description: `Latest tweets and trends about ${subject.name}`,
  };
}

/**
 * Page 2: /feed/[topic] - Feed page for a specific subject
 * Shows Google Trends embed and list of related tweets
 */
export default async function FeedPage({ params }: FeedPageProps) {
  const { topic } = await params;
  const subject = getSubjectBySlug(topic);

  if (!subject) {
    notFound();
  }

  const tweets = getTweetsForSubject(topic);

  // Get other subject names for Google Trends comparison
  const compareTopics = subjects
    .filter((s) => s.slug !== topic)
    .slice(0, 2)
    .map((s) => s.name);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <Link href="/subjects">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>

        {/* Page header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {subject.name}
            </h1>
            <Badge variant="secondary" className="text-sm">
              <MessageCircle className="h-3 w-3 mr-1" />
              {subject.tweetCount.toLocaleString()} tweets
            </Badge>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            {subject.description}
          </p>
        </header>

        {/* Google Trends section */}
        <section className="mb-8">
          <GoogleTrendsEmbed topic={subject.name} compareTopics={compareTopics} />
        </section>

        {/* Tweets section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Popular Tweets
          </h2>
          
          {tweets.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
              <MessageCircle className="h-12 w-12 mx-auto text-zinc-400 mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400">
                No tweets available for this topic yet.
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                Check back later for updates.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
