'use server';

/**
 * @fileOverview An AI agent to generate badge descriptions.
 *
 * - generateBadgeDescription - A function that generates a badge description.
 * - GenerateBadgeDescriptionInput - The input type for the generateBadgeDescription function.
 * - GenerateBadgeDescriptionOutput - The return type for the generateBadgeDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBadgeDescriptionInputSchema = z.object({
  skillName: z.string().describe('The name of the skill for the badge.'),
  criteria: z.string().describe('The criteria for earning the badge.'),
  level: z.string().describe('The level of proficiency associated with the badge (e.g., Beginner, Intermediate, Advanced).').optional(),
});
export type GenerateBadgeDescriptionInput = z.infer<typeof GenerateBadgeDescriptionInputSchema>;

const GenerateBadgeDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description for the badge.'),
});
export type GenerateBadgeDescriptionOutput = z.infer<typeof GenerateBadgeDescriptionOutputSchema>;

export async function generateBadgeDescription(input: GenerateBadgeDescriptionInput): Promise<GenerateBadgeDescriptionOutput> {
  return generateBadgeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBadgeDescriptionPrompt',
  input: {schema: GenerateBadgeDescriptionInputSchema},
  output: {schema: GenerateBadgeDescriptionOutputSchema},
  prompt: `You are an expert in creating engaging and informative badge descriptions.

  Based on the skill name, criteria, and level, create a compelling description for the badge.

  Skill Name: {{{skillName}}}
  Criteria: {{{criteria}}}
  Level: {{{level}}}

  Description:`, 
});

const generateBadgeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateBadgeDescriptionFlow',
    inputSchema: GenerateBadgeDescriptionInputSchema,
    outputSchema: GenerateBadgeDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
