'use client';

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Award,
  BookOpen,
  PlusSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useCredentials } from "@/hooks/use-appwrite";

export default function DashboardPage() {
  const { profile } = useAuth();
  const { credentials } = useCredentials();
  
  const verifiedCount = credentials.filter(c => c.status === 'verified').length;
  const totalEndorsements = credentials.reduce((sum, c) => sum + (c.endorsementCount || 0), 0);
  const streak = 12; // TODO: Calculate from credential dates
  const rank = 42; // TODO: Get from leaderboard
  
  if (!profile) return null;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.fullName}!</h1>
        <p className="text-muted-foreground">
          Here's a summary of your achievements and progress.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Credentials Earned" value={verifiedCount.toString()} icon={<Award className="h-6 w-6 text-primary" />} />
        <StatCard title="Current Streak" value={`${streak} Days`} icon={<Activity className="h-6 w-6 text-orange-500" />} />
        <StatCard title="Leaderboard Rank" value={`#${rank}`} icon={<TrendingUp className="h-6 w-6 text-green-500" />} />
        <StatCard title="Total Endorsements" value={totalEndorsements.toString()} icon={<Users className="h-6 w-6 text-purple-500" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Ready to add a new skill or view your collection? </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/dashboard/add-skill">
                    <Button className="w-full" size="lg">
                        <PlusSquare className="mr-2 h-5 w-5" />
                        Add a New Skill
                    </Button>
                </Link>
                <Link href="/dashboard/my-skills">
                    <Button className="w-full" size="lg" variant="secondary">
                        <BookOpen className="mr-2 h-5 w-5" />
                        View My Credentials
                    </Button>
                </Link>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
             <CardDescription>Complete your profile to get more endorsements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={75} />
            <p className="text-sm text-muted-foreground">
              You're almost there! Just a few more details to stand out.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
