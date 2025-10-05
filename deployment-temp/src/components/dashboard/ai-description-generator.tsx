'use client'

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { handleGenerateDescription, type FormState } from "@/lib/actions";
import { Skeleton } from "../ui/skeleton";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
                "Generating..."
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate
                </>
            )}
        </Button>
    )
}

interface AiDescriptionGeneratorProps {
    skillName: string;
    criteria: string;
    level: string;
    onDescriptionGenerated: (description: string) => void;
    onError: (message: string) => void;
}

export default function AiDescriptionGenerator({ skillName, criteria, level, onDescriptionGenerated, onError }: AiDescriptionGeneratorProps) {
    const initialState: FormState = { message: "" };

    const generateWithValues = async (prevState: FormState, formData: FormData): Promise<FormState> => {
        const newFormData = new FormData();
        newFormData.append('skillName', skillName);
        newFormData.append('criteria', criteria);
        newFormData.append('level', level);
        
        const result = await handleGenerateDescription(prevState, newFormData);
        
        if (result.message === "success" && result.description) {
            onDescriptionGenerated(result.description);
        } else if (result.message !== "") {
            onError(result.message);
        }

        return result;
    }

    const [state, formAction] = useActionState(generateWithValues, initialState);
    const { pending } = useFormStatus();

    return (
        <form action={formAction}>
            {pending && (
                 <div className="space-y-2 pt-4">
                    <Skeleton className="h-20 w-full" />
                </div>
            )}
            <SubmitButton />
        </form>
    )
}
