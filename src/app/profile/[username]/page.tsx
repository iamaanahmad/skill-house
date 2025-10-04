import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Share2, GraduationCap } from "lucide-react";
import { user, skills } from "@/lib/placeholder-data";
import SkillCard from "@/components/dashboard/skill-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, you would fetch user data based on params.username
  // For now, we'll use the placeholder data.
  const profileUser = user;

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={profileUser.avatarUrl} alt={profileUser.name} />
                <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{profileUser.name}</h1>
              <p className="text-muted-foreground">@{profileUser.username}</p>
              <p className="mt-4 text-sm">{profileUser.bio}</p>
              <div className="flex justify-center gap-4 mt-4">
                {profileUser.socialLinks.map((link) => (
                  <Link key={link.name} href={link.url} className="text-muted-foreground hover:text-foreground">
                    {link.name === 'github' && <Github className="h-6 w-6" />}
                    {link.name === 'linkedin' && <Linkedin className="h-6 w-6" />}
                    {link.name === 'twitter' && <Twitter className="h-6 w-6" />}
                  </Link>
                ))}
              </div>
            </div>
             <div className="p-6 border rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Share Profile</h2>
                <Button className="w-full">
                    <Share2 className="mr-2 h-4 w-4"/>
                    Copy Shareable Link
                </Button>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="md:col-span-2">
             <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-bold mb-1">Credentials</h2>
                 <p className="text-muted-foreground mb-6">A collection of verified skills and achievements.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
