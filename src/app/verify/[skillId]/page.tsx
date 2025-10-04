
'use client';

import { useParams } from 'next/navigation';
import { useSkills, useUser } from '@/lib/app-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, GraduationCap, HardDrive, Link as LinkIcon, ListChecks, User } from 'lucide-react';
import Link from 'next/link';

export default function VerifySkillPage() {
  const { skillId } = useParams();
  const skills = useSkills();
  const issuer = useUser(); // In a real app, issuer would be fetched based on the skill.
  
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Credential Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The skill credential you are looking for does not exist or has been removed.
            </p>
            <Button asChild className="w-full">
              <Link href="/discover">Explore Skills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center font-bold text-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2">SkillHouse</span>
        </Link>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-6">
              <div className="flex items-center gap-4">
                 <div className="p-1 bg-primary/10 rounded-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                </div>
                <div>
                    <Badge variant="default">Verified Credential</Badge>
                    <CardTitle className="mt-2 text-2xl md:text-3xl">{skill.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Details</h3>
                    <div className="flex items-start gap-3">
                        <ListChecks className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                            <p className="font-medium">Criteria</p>
                            <p className="text-muted-foreground">{skill.criteria}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                            <p className="font-medium">Proficiency Level</p>
                            <p className="text-muted-foreground">{skill.level}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <HardDrive className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                            <p className="font-medium">Evidence</p>
                            <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                                View Submitted Project <LinkIcon className="h-4 w-4"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Issued To</h3>
                    <div className="flex items-center gap-3 rounded-md border p-3">
                         <Avatar>
                            <AvatarImage src={issuer.avatarUrl} alt={issuer.name} />
                            <AvatarFallback>{issuer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{issuer.name}</p>
                            <Link href={`/profile/${issuer.username}`} className="text-muted-foreground text-xs hover:underline">
                                @{issuer.username}
                            </Link>
                        </div>
                    </div>
                </div>
              </div>

              <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

