"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Home page - redirects to subjects list
 * Using client-side redirect for better Vercel compatibility
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/subjects");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-100 mx-auto mb-4"></div>
        <p className="text-zinc-600 dark:text-zinc-400">Redirecting to subjects...</p>
      </div>
    </div>
  );
}
