"use client";

import React from "react";
import { QrCode, ThumbsUp, Code, Cloud, Database, PenTool, Wind, Puzzle } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Credential } from "@/lib/appwrite";
import { databaseService } from "@/lib/appwrite";
import { useAuth } from "@/contexts/auth-context";
import { useHasEndorsed } from "@/hooks/use-appwrite";
import { QrCodeDialog } from "./qr-code-dialog";
import { toast } from "@/hooks/use-toast";

interface SkillCardProps {
  credential: Credential;
}

const icons: { [key: string]: React.ElementType } = {
    Code, Cloud, Database, PenTool, Wind, Puzzle
};

export default function SkillCard({ credential }: SkillCardProps) {
  const Icon = LucideIcons.Award; // Use a default icon
  const { user } = useAuth();
  const { hasEndorsed, loading: endorseLoading } = useHasEndorsed(credential.$id);
  const [endorsing, setEndorsing] = React.useState(false);

  const handleEndorse = async () => {
    if (!user || !credential.$id || hasEndorsed || endorsing) return;
    
    try {
      setEndorsing(true);
      await databaseService.createEndorsement(credential.$id, user.$id);
      toast({
        title: "Endorsed!",
        description: `You've endorsed ${credential.title}`,
      });
    } catch (error) {
      console.error("Error endorsing:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to endorse this credential",
      });
    } finally {
      setEndorsing(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'verified': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base font-semibold">{credential.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{credential.category}</Badge>
                      <Badge variant={getStatusColor(credential.status)}>{credential.status || 'pending'}</Badge>
                    </div>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{credential.description}</CardDescription>
        {credential.evidenceUrl && (
          <a 
            href={credential.evidenceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            View Evidence →
          </a>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleEndorse} 
          disabled={hasEndorsed || endorsing || endorseLoading}
          className="flex items-center gap-2"
        >
          <ThumbsUp className={`h-4 w-4 ${hasEndorsed ? 'fill-current' : ''}`} />
          <span>{credential.endorsementCount || 0} {hasEndorsed ? 'Endorsed' : 'Endorse'}</span>
        </Button>
        <QrCodeDialog skillId={credential.$id || ''} skillName={credential.title}>
            <Button variant="outline" size="sm">
                <QrCode className="mr-2 h-4 w-4" />
                Verify
            </Button>
        </QrCodeDialog>
      </CardFooter>
    </Card>
  );
}
