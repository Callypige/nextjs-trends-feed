"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, ArrowRight } from "lucide-react";
import { Subject, getCommunityLevel } from "@/data/subjects";

interface SubjectCardProps {
  subject: Subject;
}

/**
 * Card component displaying a regulatory subject with its stats
 */
export function SubjectCard({ subject }: SubjectCardProps) {
  const community = getCommunityLevel(subject.communitySize);

  return (
    <Link href={`/feed/${subject.slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{subject.name}</CardTitle>
            <Badge variant={community.color}>{community.label}</Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {subject.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>~{subject.postCount.toLocaleString()} stories</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{(subject.communitySize / 1000).toFixed(0)}k members</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
            >
              View Feed
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
