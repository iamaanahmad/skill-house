import type { User, Skill } from "@/lib/types";
import { Code, Cloud, Database, PenTool, Wind, Puzzle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

export const user: User = {
  name: "Alex Doe",
  avatarUrl: userAvatar?.imageUrl || "https://picsum.photos/seed/123/100/100",
  skills: 6,
  streak: 12,
};

export const skills: Skill[] = [
  {
    id: "react-mastery",
    name: "React Mastery",
    description: "Awarded for demonstrating exceptional proficiency in React development.",
    icon: Code,
    criteria: "Build and deploy three complex React applications with state management.",
    level: "Advanced",
    endorsements: 12,
  },
  {
    id: "tailwind-wizard",
    name: "Tailwind CSS Wizard",
    description: "Recognizes the ability to craft beautiful UIs with Tailwind CSS.",
    icon: Wind,
    criteria: "Complete a large-scale project using Tailwind CSS utility-first classes.",
    level: "Advanced",
    endorsements: 8,
  },
  {
    id: "nextjs-ninja",
    name: "Next.js Ninja",
    description: "For mastering server-side rendering and static site generation with Next.js.",
    icon: Puzzle,
    criteria: "Develop a full-stack application with Next.js App Router and Server Actions.",
    level: "Intermediate",
    endorsements: 15,
  },
  {
    id: "db-architect",
    name: "Database Architect",
    description: "Proficiency in designing and managing complex database schemas.",
    icon: Database,
    criteria: "Design a normalized relational database for a sample enterprise application.",
    level: "Intermediate",
    endorsements: 5,
  },
  {
    id: "cloud-native",
    name: "Cloud Native",
    description: "Expertise in deploying and managing applications on cloud platforms.",
    icon: Cloud,
    criteria: "Containerize and deploy an application using Docker and Kubernetes.",
    level: "Beginner",
    endorsements: 3,
  },
  {
    id: "ux-designer",
    name: "UX Designer",
    description: "A keen eye for user experience and interface design principles.",
    icon: PenTool,
    criteria: "Create wireframes and a high-fidelity prototype for a mobile app.",
    level: "Beginner",
    endorsements: 7,
  },
];
