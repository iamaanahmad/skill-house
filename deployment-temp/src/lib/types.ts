import type { LucideIcon } from 'lucide-react';

// Re-export Appwrite types for backwards compatibility
export type { Profile, Credential, Endorsement, FlaggedCredential } from './appwrite';

// Legacy type aliases for backwards compatibility
export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  endorsements: number;
  status?: 'pending' | 'verified' | 'rejected';
};

export type SocialLink = {
  name: string;
  url: string;
};

export type User = {
  name: string;
  username: string;
  avatarUrl: string;
  skills: number;
  streak: number;
  bio: string;
  socialLinks: SocialLink[];
};
