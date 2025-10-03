import type { LucideIcon } from 'lucide-react';

export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  criteria: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  endorsements: number;
};

export type User = {
  name: string;
  avatarUrl: string;
  skills: number;
  streak: number;
};
