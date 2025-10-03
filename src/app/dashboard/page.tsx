import { skills } from "@/lib/placeholder-data";
import AiDescriptionGenerator from "@/components/dashboard/ai-description-generator";
import SkillCard from "@/components/dashboard/skill-card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
         <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <AiDescriptionGenerator />
      </div>
    </div>
  );
}
