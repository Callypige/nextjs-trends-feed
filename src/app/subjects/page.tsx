import { subjects } from "@/data/subjects";
import { SubjectCard } from "@/components/SubjectCard";

export const metadata = {
  title: "Regulatory Subjects | Regulatory Feed",
  description: "Browse regulatory subjects and their latest discussions",
};

/**
 * Page 1: /subjects - List of regulatory subjects
 * Displays all regulatory subjects in a grid of cards
 */
export default async function SubjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Regulatory Subjects
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Explore the latest discussions and trends on key regulatory topics
          </p>
          
          {/* Legend */}
          <div className="mt-6 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              👥 Community Sizes
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  🔥 Massive
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">≥ 1M members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  ⭐ Large
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">≥ 200k members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  📈 Growing
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">≥ 50k members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-600">
                  🌱 Niche
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">&lt; 50k members</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              👥 Member counts are from Reddit subreddit subscriber data
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              📡 Each feed shows ~30 hot posts from Reddit updated every 5 minutes
            </p>
          </div>
        </header>

        {/* Subjects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {/* Empty state - shown if no subjects */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">
              No regulatory subjects available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
