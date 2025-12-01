"use client";

interface GoogleTrendsEmbedProps {
  topic: string;
  compareTopics?: string[];
}

/**
 * Embeds a Google Trends widget for the given topic
 * Uses an iframe to display the trends data
 */
export function GoogleTrendsEmbed({ topic, compareTopics = [] }: GoogleTrendsEmbedProps) {
  // Build the query parameter with the main topic and comparison topics
  const allTopics = [topic, ...compareTopics].map(t => encodeURIComponent(t)).join(",");
  
  // Google Trends embed URL with 7-day timeframe
  const trendsUrl = `https://trends.google.com/trends/explore?date=now%207-d&q=${allTopics}&hl=en-US`;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
        Google Trends
      </h2>
      <div className="relative w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Responsive iframe container */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={trendsUrl}
            className="absolute top-0 left-0 w-full h-full"
            title={`Google Trends for ${topic}`}
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Fallback link */}
        <div className="p-3 text-center border-t border-zinc-200 dark:border-zinc-800">
          <a
            href={trendsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
          >
            Open in Google Trends →
          </a>
        </div>
      </div>
    </div>
  );
}
