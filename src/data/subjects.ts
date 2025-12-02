/**
 * Types and mock data for regulatory subjects and tweets
 */

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  tweetCount: number;
  popularityScore: number;
}

export interface Tweet {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
  tweetUrl: string;
  likes: number;
  retweets: number;
}

/**
 * Mock regulatory subjects data (raw, without computed fields)
 */
const subjectsData = [
  {
    id: "1",
    name: "AI Act",
    slug: "ai-act",
    description: "European Union's Artificial Intelligence Act - The first comprehensive AI regulation framework",
    tweetCount: 1247,
  },
  {
    id: "2",
    name: "Data Act",
    slug: "data-act",
    description: "EU Data Act - Rules on fair access to and use of data",
    tweetCount: 834,
  },
  {
    id: "3",
    name: "Digital Markets Act",
    slug: "digital-markets-act",
    description: "DMA - Regulation ensuring fair and contestable digital markets",
    tweetCount: 956,
  },
  {
    id: "4",
    name: "GDPR",
    slug: "gdpr",
    description: "General Data Protection Regulation - Data privacy and protection in the EU",
    tweetCount: 2145,
  },
  {
    id: "5",
    name: "Digital Services Act",
    slug: "digital-services-act",
    description: "DSA - Rules for digital services and online platforms",
    tweetCount: 678,
  },
];

/**
 * Calculate popularity score based on tweet count
 * Score is a percentage relative to the subject with most tweets
 */
function calculatePopularityScore(tweetCount: number, maxTweetCount: number): number {
  return Math.round((tweetCount / maxTweetCount) * 100);
}

/**
 * Subjects with computed popularity scores based on tweet count
 */
export const subjects: Subject[] = (() => {
  const maxTweetCount = Math.max(...subjectsData.map(s => s.tweetCount));
  return subjectsData.map(subject => ({
    ...subject,
    popularityScore: calculatePopularityScore(subject.tweetCount, maxTweetCount),
  }));
})();

/**
 * Mock tweets data for each subject
 */
export const tweetsBySubject: Record<string, Tweet[]> = {
  "ai-act": [
    {
      id: "t1",
      authorName: "EU Commission",
      authorUsername: "EU_Commission",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=EU",
      content: "🚀 The #AIAct is now in force! This landmark regulation sets the global standard for trustworthy AI. It ensures that AI systems in the EU are safe, transparent, and respect fundamental rights. #EUTech #AIRegulation",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/EU_Commission/status/1",
      likes: 2453,
      retweets: 892,
    },
    {
      id: "t2",
      authorName: "TechPolicy Expert",
      authorUsername: "tech_policy_pro",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TPE",
      content: "Breaking down the #AIAct high-risk categories: 1) Critical infrastructure 2) Education 3) Employment 4) Essential services 5) Law enforcement. Companies have 2 years to comply. Here's what you need to know 🧵",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/tech_policy_pro/status/2",
      likes: 1834,
      retweets: 567,
    },
    {
      id: "t3",
      authorName: "AI Researcher",
      authorUsername: "ai_researcher",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AIR",
      content: "The #AIAct's approach to foundation models is interesting. General-purpose AI systems will need to: ✅ Provide technical documentation ✅ Comply with copyright ✅ Publish training data summaries. Big implications for LLM developers.",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/ai_researcher/status/3",
      likes: 987,
      retweets: 234,
    },
    {
      id: "t4",
      authorName: "Startup Founder",
      authorUsername: "startup_ceo",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SF",
      content: "Just finished reviewing #AIAct compliance requirements for our startup. The sandbox provisions for SMEs are actually quite supportive. Regulatory sandboxes will be key for innovation. 💡",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/startup_ceo/status/4",
      likes: 456,
      retweets: 89,
    },
    {
      id: "t5",
      authorName: "Legal Tech News",
      authorUsername: "legaltech_news",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=LTN",
      content: "THREAD: #AIAct penalties can reach €35M or 7% of global turnover. Here are the prohibited practices that will result in maximum fines: 🚫 Social scoring 🚫 Real-time biometric ID (with exceptions) 🚫 Subliminal manipulation",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/legaltech_news/status/5",
      likes: 1245,
      retweets: 678,
    },
  ],
  "data-act": [
    {
      id: "t6",
      authorName: "Data Rights EU",
      authorUsername: "data_rights_eu",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DRE",
      content: "The #DataAct gives users the right to access and share data generated by their connected devices. This is huge for IoT innovation! 📱🏠🚗",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/data_rights_eu/status/6",
      likes: 892,
      retweets: 234,
    },
    {
      id: "t7",
      authorName: "Cloud Provider CEO",
      authorUsername: "cloud_ceo",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CPC",
      content: "Important update on #DataAct: Cloud providers must now facilitate easy switching between services. No more vendor lock-in! We're committed to full compliance. #CloudComputing",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/cloud_ceo/status/7",
      likes: 567,
      retweets: 145,
    },
    {
      id: "t8",
      authorName: "Industrial IoT",
      authorUsername: "industrial_iot",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=IIoT",
      content: "#DataAct implications for manufacturing: ✅ Machine data sharing ✅ B2B data contracts ✅ Interoperability requirements. This will transform Industry 4.0 🏭",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/industrial_iot/status/8",
      likes: 345,
      retweets: 78,
    },
  ],
  "digital-markets-act": [
    {
      id: "t9",
      authorName: "Competition Watch",
      authorUsername: "comp_watch",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CW",
      content: "🔥 Big Tech faces #DMA compliance deadline! Gatekeepers must allow third-party app stores, enable interoperability, and stop self-preferencing. Historic moment for digital competition.",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/comp_watch/status/9",
      likes: 1567,
      retweets: 456,
    },
    {
      id: "t10",
      authorName: "App Developer",
      authorUsername: "indie_dev",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=ID",
      content: "Finally! The #DMA means I can distribute my app outside the App Store in the EU. This is what fair competition looks like. 🎉 #DevLife #IndieApps",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/indie_dev/status/10",
      likes: 2345,
      retweets: 567,
    },
    {
      id: "t11",
      authorName: "Digital Policy",
      authorUsername: "digital_policy",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DP",
      content: "#DMA enforcement is real: First non-compliance investigations have been opened. Fines can reach 10% of global turnover, up to 20% for repeat offenders. The EU means business. 💼⚖️",
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/digital_policy/status/11",
      likes: 789,
      retweets: 234,
    },
    {
      id: "t12",
      authorName: "Messaging App",
      authorUsername: "secure_msg",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SM",
      content: "Interoperability under #DMA is coming! We're working on protocols to enable cross-platform messaging while maintaining end-to-end encryption. Privacy first. 🔐",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/secure_msg/status/12",
      likes: 1234,
      retweets: 345,
    },
  ],
  "gdpr": [
    {
      id: "t13",
      authorName: "Privacy Advocate",
      authorUsername: "privacy_first",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=PF",
      content: "6 years of #GDPR and it's still the gold standard for data protection. Recent enforcement actions show regulators are getting more serious. €1.2B in fines this year alone! 📊",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/privacy_first/status/13",
      likes: 1678,
      retweets: 456,
    },
    {
      id: "t14",
      authorName: "DPO Network",
      authorUsername: "dpo_network",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DPO",
      content: "Hot take: Most companies still don't understand legitimate interest under #GDPR. It's not a free pass to process any data you want. Balancing test is key! ⚖️",
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/dpo_network/status/14",
      likes: 567,
      retweets: 123,
    },
    {
      id: "t15",
      authorName: "Tech Lawyer",
      authorUsername: "tech_lawyer",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TL",
      content: "New #GDPR guidance on AI training data just dropped. Key points: ✅ Anonymization standards ✅ Consent requirements ✅ Data minimization in ML. Must read for AI companies! 📖",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/tech_lawyer/status/15",
      likes: 890,
      retweets: 234,
    },
  ],
  "digital-services-act": [
    {
      id: "t16",
      authorName: "Platform Moderation",
      authorUsername: "mod_expert",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=ME",
      content: "#DSA transparency reports are revealing! Major platforms now must disclose content moderation stats, ad targeting practices, and algorithmic systems. Accountability era begins. 📊",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/mod_expert/status/16",
      likes: 678,
      retweets: 189,
    },
    {
      id: "t17",
      authorName: "Digital Rights Org",
      authorUsername: "digital_rights",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DRO",
      content: "The #DSA gives users the right to understand why content is recommended to them AND to opt out of profiling-based recommendations. This is huge for algorithmic accountability! 🎯",
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/digital_rights/status/17",
      likes: 1234,
      retweets: 345,
    },
    {
      id: "t18",
      authorName: "EU Digital",
      authorUsername: "eu_digital",
      authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=EUD",
      content: "#DSA compliance is not optional. Very large online platforms (VLOPs) with 45M+ EU users face strict obligations. Systemic risk assessments are now mandatory. 🇪🇺",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tweetUrl: "https://x.com/eu_digital/status/18",
      likes: 456,
      retweets: 112,
    },
  ],
};

/**
 * Get subject by slug
 */
export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

/**
 * Get tweets for a subject, sorted by engagement (likes + retweets)
 */
export function getTweetsForSubject(slug: string): Tweet[] {
  const tweets = tweetsBySubject[slug] || [];
  return sortTweetsByEngagement(tweets);
}

/**
 * Sort tweets by engagement (likes + retweets) in descending order
 */
export function sortTweetsByEngagement(tweets: Tweet[]): Tweet[] {
  return [...tweets].sort((a, b) => {
    const engagementA = a.likes + a.retweets;
    const engagementB = b.likes + b.retweets;
    return engagementB - engagementA;
  });
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Calculate popularity level based on score
 */
export function getPopularityLevel(score: number): {
  label: string;
  color: "default" | "secondary" | "destructive" | "outline";
} {
  if (score >= 90) return { label: "Trending", color: "destructive" };
  if (score >= 75) return { label: "Popular", color: "default" };
  if (score >= 50) return { label: "Growing", color: "secondary" };
  return { label: "Emerging", color: "outline" };
}
