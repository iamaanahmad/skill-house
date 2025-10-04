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
import { type Skill } from "@/lib/types";
import { useEndorseSkill } from "@/lib/app-data";
import { QrCodeDialog } from "./qr-code-dialog";

interface SkillCardProps {
  skill: Skill;
}

const icons: { [key: string]: React.ElementType } = {
    Code, Cloud, Database, PenTool, Wind, Puzzle
};

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = icons[skill.icon] || LucideIcons.HelpCircle;
  const endorseSkill = useEndorseSkill();

  const handleEndorse = () => {
    endorseSkill(skill.id);
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
                    <CardTitle className="text-base font-semibold">{skill.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{skill.level}</Badge>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{skill.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={handleEndorse} className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span>{skill.endorsements} Endorse</span>
        </Button>
        <QrCodeDialog skillId={skill.id} skillName={skill.name}>
            <Button variant="outline" size="sm">
                <QrCode className="mr-2 h-4 w-4" />
                Verify
            </Button>
        </QrCodeDialog>
      </CardFooter>
    </Card>
  );
}
