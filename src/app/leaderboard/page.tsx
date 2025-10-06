'use client';

import Link from "next/link";
import { Trophy, Medal, Award } from "lucide-react";
import { PublicHeader } from "@/components/public-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLeaderboard } from "@/hooks/use-appwrite";

// Dummy leaderboard data
const dummyLeaderboard = [
  {
    profile: {
      $id: '1',
      username: 'sarah_dev',
      fullName: 'Sarah Johnson',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    credentialCount: 24,
    endorsementCount: 156
  },
  {
    profile: {
      $id: '2',
      username: 'alex_code',
      fullName: 'Alex Chen',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    credentialCount: 18,
    endorsementCount: 132
  },
  {
    profile: {
      $id: '3',
      username: 'maria_tech',
      fullName: 'Maria Rodriguez',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    credentialCount: 15,
    endorsementCount: 98
  },
  {
    profile: {
      $id: '4',
      username: 'james_dev',
      fullName: 'James Wilson',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    },
    credentialCount: 12,
    endorsementCount: 87
  },
  {
    profile: {
      $id: '5',
      username: 'emily_design',
      fullName: 'Emily Davis',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    credentialCount: 11,
    endorsementCount: 76
  },
  {
    profile: {
      $id: '6',
      username: 'david_full',
      fullName: 'David Martinez',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    credentialCount: 9,
    endorsementCount: 64
  },
  {
    profile: {
      $id: '7',
      username: 'lisa_ux',
      fullName: 'Lisa Anderson',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    credentialCount: 8,
    endorsementCount: 52
  },
  {
    profile: {
      $id: '8',
      username: 'michael_ai',
      fullName: 'Michael Brown',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    credentialCount: 7,
    endorsementCount: 45
  },
  {
    profile: {
      $id: '9',
      username: 'sofia_web3',
      fullName: 'Sofia Taylor',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
    },
    credentialCount: 6,
    endorsementCount: 38
  },
  {
    profile: {
      $id: '10',
      username: 'ryan_backend',
      fullName: 'Ryan Thompson',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan'
    },
    credentialCount: 5,
    endorsementCount: 31
  }
];

export default function LeaderboardPage() {
  const { leaderboard, loading } = useLeaderboard();
  
  // Combine real and dummy data
  const displayLeaderboard = leaderboard.length > 0 
    ? [...leaderboard, ...dummyLeaderboard].slice(0, 10) 
    : dummyLeaderboard;
  const showingMockData = leaderboard.length === 0;

  return (
    <div className="bg-background min-h-screen">
      <PublicHeader />
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
              ) : (
                <div className="space-y-2">
                  {displayLeaderboard.map((entry, index) => {
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
                          <AvatarImage src={entry.profile.avatarUrl} alt={entry.profile.fullName} />
                          <AvatarFallback>{entry.profile.fullName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{entry.profile.fullName}</p>
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
              {showingMockData && !loading && (
                <p className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t">
                  Showing sample data. Real leaderboard will appear as users earn credentials.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
