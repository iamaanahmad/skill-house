import { skills } from "@/lib/placeholder-data";
import SkillCard from "@/components/dashboard/skill-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscoverPage() {
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Discover Skills & Professionals</h1>
                <p className="text-muted-foreground text-center mt-2">
                    Explore the credentials and talent across the SkillHouse network.
                </p>
            </div>
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by skill, name, or tag..."
                        className="w-full pl-10 py-6 text-base"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
