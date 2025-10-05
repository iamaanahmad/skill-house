'use client';

import { useCredentials } from "@/hooks/use-appwrite";
import SkillCard from "@/components/dashboard/skill-card";

export default function MySkillsPage() {
  const { credentials, loading } = useCredentials();

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Credentials</h1>
          <p className="text-muted-foreground">
            Loading your credentials...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Credentials</h1>
        <p className="text-muted-foreground">
          Here are the skill badges you've earned and can share.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {credentials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't created any credentials yet.</p>
            <a href="/dashboard/add-skill" className="text-primary hover:underline">
              Add your first skill →
            </a>
          </div>
        ) : (
          credentials.map((credential) => (
            <SkillCard key={credential.$id} credential={credential} />
          ))
        )}
      </div>
    </div>
  );
}
