'use client';

import Link from "next/link";
import { GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function PublicHeader() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <Link href="/" className="flex items-center justify-center font-bold text-lg">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="ml-2">SkillHouse</span>
      </Link>
      <nav className="ml-8 hidden md:flex gap-6">
        <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">
          Discover
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
          Leaderboard
        </Link>
      </nav>
      <div className="ml-auto flex gap-2">
        {loading ? (
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
        ) : isAuthenticated ? (
          <Button asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        ) : (
          <>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
