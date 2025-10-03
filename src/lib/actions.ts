"use server";

import { z } from "zod";
import { generateBadgeDescription, type GenerateBadgeDescriptionInput } from "@/ai/flows/generate-badge-description";

const schema = z.object({
    skillName: z.string().min(2, { message: "Skill name must be at least 2 characters." }),
    criteria: z.string().min(10, { message: "Criteria must be at least 10 characters." }),
    level: z.string().optional(),
});

export type FormState = {
    message: string;
    description?: string;
};

export async function handleGenerateDescription(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = schema.safeParse({
        skillName: formData.get("skillName"),
        criteria: formData.get("criteria"),
        level: formData.get("level"),
    });

    if (!validatedFields.success) {
        return {
            message: "Validation Error: Please check your inputs.",
        };
    }

    try {
        const input: GenerateBadgeDescriptionInput = validatedFields.data;
        const result = await generateBadgeDescription(input);
        
        if (result && result.description) {
             return {
                message: "success",
                description: result.description,
            };
        }
        return { message: "AI generation failed. Please try again." };
    } catch (error) {
        console.error(error);
        return { message: "An unexpected error occurred. Please try again." };
    }
}
