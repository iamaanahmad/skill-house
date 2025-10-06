'use client';

import { use } from 'react';
import Link from "next/link";
import { Github, Linkedin, Twitter, Share2 } from "lucide-react";
import { PublicHeader } from "@/components/public-header";
import { useProfile, useCredentials } from "@/hooks/use-appwrite";
import SkillCard from "@/components/dashboard/skill-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { profile, loading: profileLoading } = useProfile(username);
  const { credentials, loading: credentialsLoading } = useCredentials(profile?.userId);

  const handleShareProfile = () => {
    const url = `${window.location.origin}/profile/${username}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Profile link copied to clipboard.",
    });
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-background min-h-screen">
        <PublicHeader />
        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground mb-6">The user @{username} does not exist.</p>
            <Button asChild>
              <Link href="/discover">Explore Other Profiles</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const socialLinks = profile.socialLinks || [];
  const parsedSocialLinks = socialLinks.map(link => {
    try {
      return typeof link === 'string' ? JSON.parse(link) : link;
    } catch {
      return { name: 'link', url: link };
    }
  });

  return (
    <div className="bg-background min-h-screen">
      <PublicHeader />

      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                <AvatarFallback>{profile.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{profile.fullName}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              <p className="mt-4 text-sm">{profile.bio || 'No bio available.'}</p>
              <div className="flex justify-center gap-4 mt-4">
                {parsedSocialLinks.map((link: any, index: number) => (
                  <Link key={index} href={link.url || '#'} className="text-muted-foreground hover:text-foreground">
                    {link.name === 'github' && <Github className="h-6 w-6" />}
                    {link.name === 'linkedin' && <Linkedin className="h-6 w-6" />}
                    {link.name === 'twitter' && <Twitter className="h-6 w-6" />}
                  </Link>
                ))}
              </div>
            </div>
             <div className="p-6 border rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Share Profile</h2>
                <Button className="w-full" onClick={handleShareProfile}>
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
                {credentialsLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : credentials.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No credentials yet.</p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {credentials.map((credential) => (
                        <SkillCard key={credential.$id} credential={credential} />
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
