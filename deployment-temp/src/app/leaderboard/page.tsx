'use client';

import Link from "next/link";
import { GraduationCap, Trophy, Medal, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLeaderboard } from "@/hooks/use-appwrite";

export default function LeaderboardPage() {
  const { leaderboard, loading } = useLeaderboard();

  return (
    <div className="bg-background min-h-screen">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center font-bold text-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2">SkillHouse</span>
        </Link>
        <div className="ml-auto">
             <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Leaderboard
              </CardTitle>
              <CardDescription>
                Top contributors ranked by verified credentials and endorsements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : leaderboard.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No users on the leaderboard yet. Be the first to earn credentials!
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const getRankIcon = () => {
                      if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
                      if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />;
                      if (index === 2) return <Medal className="h-6 w-6 text-orange-600" />;
                      return null;
                    };

                    return (
                      <Link
                        key={entry.profile.$id}
                        href={`/profile/${entry.profile.username}`}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-center w-10">
                          {getRankIcon() || (
                            <span className="text-lg font-bold text-muted-foreground">
                              #{index + 1}
                            </span>
                          )}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={entry.profile.avatarUrl} alt={entry.profile.name} />
                          <AvatarFallback>{entry.profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{entry.profile.name}</p>
                          <p className="text-sm text-muted-foreground">@{entry.profile.username}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{entry.credentialCount} credentials</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {entry.endorsementCount} endorsements
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
