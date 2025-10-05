import { create } from 'zustand';
import { defaultSkills, defaultUser } from './placeholder-data';
import type { Skill, User } from './types';

interface AppState {
  user: User;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  endorseSkill: (skillId: string) => void;
}

const useAppDataStore = create<AppState>((set) => ({
  user: defaultUser,
  skills: defaultSkills,
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  endorseSkill: (skillId) =>
    set((state) => ({
      skills: state.skills.map((skill) =>
        skill.id === skillId ? { ...skill, endorsements: skill.endorsements + 1 } : skill
      ),
    })),
}));

export const useUser = () => useAppDataStore((state) => state.user);
export const useSkills = () => useAppDataStore((state) => state.skills);
export const useAddSkill = () => useAppDataStore((state) => state.addSkill);
export const useEndorseSkill = () => useAppDataStore((state) => state.endorseSkill);
