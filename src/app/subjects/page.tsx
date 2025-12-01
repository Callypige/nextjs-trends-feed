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
export default function SubjectsPage() {
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
