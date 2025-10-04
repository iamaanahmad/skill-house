'use client';

import { useSkills } from "@/lib/app-data";
import SkillCard from "@/components/dashboard/skill-card";

export default function MySkillsPage() {
  const skills = useSkills();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Credentials</h1>
        <p className="text-muted-foreground">
          Here are the skill badges you've earned and can share.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
