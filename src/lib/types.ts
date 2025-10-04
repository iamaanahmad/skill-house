import type { LucideIcon } from 'lucide-react';

export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  endorsements: number;
};

export type SocialLink = {
  name: string;
  url: string;
};

export type User = {
  name:string;
  username: string;
  avatarUrl: string;
  skills: number;
  streak: number;
  bio: string;
  socialLinks: SocialLink[];
};
