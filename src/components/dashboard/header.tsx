"use client";
import React from "react";
import { Bell, Flame, Search, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { type User } from "@/lib/types";
import Link from "next/link";

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="hidden md:block">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>SkillHouse</span>
        </Link>
      </div>
      <div className="flex-1">
        <div className="relative md:w-64 ml-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills..."
            className="pl-8 sm:w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 border-r pr-4">
            <div className="flex items-center gap-2 text-sm font-medium">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span>{user.skills}</span>
                <span className="sr-only">Skills</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>{user.streak}</span>
                <span className="sr-only">Day Streak</span>
            </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
    </header>
  );
}
