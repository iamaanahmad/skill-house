import AiDescriptionGenerator from "@/components/dashboard/ai-description-generator";

export default function AddSkillPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Add a New Skill</h1>
            <p className="text-muted-foreground mb-8">
                Submit your skill for AI-powered verification and get a new credential.
            </p>
            <div className="max-w-2xl mx-auto">
                <AiDescriptionGenerator />
            </div>
        </div>
    )
}
