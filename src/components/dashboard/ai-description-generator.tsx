'use client'

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { handleGenerateDescription, type FormState } from "@/lib/actions";
import { Skeleton } from "../ui/skeleton";

interface AiDescriptionGeneratorProps {
    skillName: string;
    criteria: string;
    level: string;
    onDescriptionGenerated: (description: string) => void;
    onError: (message: string) => void;
}

export default function AiDescriptionGenerator({ skillName, criteria, level, onDescriptionGenerated, onError }: AiDescriptionGeneratorProps) {
    const [pending, setPending] = useState(false);

    const handleGenerate = async () => {
        setPending(true);
        try {
            const formData = new FormData();
            formData.append('skillName', skillName);
            formData.append('criteria', criteria);
            formData.append('level', level);
            
            const initialState: FormState = { message: "" };
            const result = await handleGenerateDescription(initialState, formData);
            
            if (result.message === "success" && result.description) {
                onDescriptionGenerated(result.description);
            } else if (result.message !== "") {
                onError(result.message);
            }
        } catch (error) {
            onError('Failed to generate description. Please try again.');
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="space-y-2">
            {pending && (
                 <div className="space-y-2 pt-4">
                    <Skeleton className="h-20 w-full" />
                </div>
            )}
            <Button 
                type="button" 
                onClick={handleGenerate} 
                disabled={pending || !skillName || !criteria} 
                className="w-full sm:w-auto"
            >
                {pending ? (
                    "Generating..."
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" /> Generate
                    </>
                )}
            </Button>
        </div>
    )
}
