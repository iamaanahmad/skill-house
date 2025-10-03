'use client'

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Copy, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { handleGenerateDescription, type FormState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                "Generating..."
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate with AI
                </>
            )}
        </Button>
    )
}

export default function AiDescriptionGenerator() {
    const initialState: FormState = { message: "" };
    const [state, formAction] = useFormState(handleGenerateDescription, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.message !== "success" && state.message !== "") {
            toast({
                variant: "destructive",
                title: "Error",
                description: state.message,
            })
        }
    }, [state, toast]);

    useEffect(() => {
        if (state.message === "success") {
            formRef.current?.reset();
        }
    }, [state.message]);
    
    const handleCopy = () => {
        if (state.description) {
            navigator.clipboard.writeText(state.description);
            toast({
                title: "Copied!",
                description: "Description copied to clipboard.",
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Badge Generator</CardTitle>
                <CardDescription>
                    Automatically generate a badge description using AI.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action={formAction} ref={formRef} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="skillName">Skill Name</Label>
                        <Input
                            id="skillName"
                            name="skillName"
                            placeholder="e.g., React Pro"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="criteria">Criteria</Label>
                        <Textarea
                            id="criteria"
                            name="criteria"
                            placeholder="e.g., Build a full-stack Next.js app"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="level">Proficiency Level</Label>
                        <Select name="level">
                            <SelectTrigger id="level">
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <SubmitButton />
                </form>
                {pending && (
                     <div className="space-y-2 pt-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                )}
                {state.description && !pending && (
                    <div className="space-y-2 pt-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="generated-description">Generated Description</Label>
                            <Button variant="ghost" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <Textarea
                            id="generated-description"
                            readOnly
                            value={state.description}
                            className="bg-muted"
                            rows={5}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
