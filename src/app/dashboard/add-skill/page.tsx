import SkillSubmissionForm from "@/components/dashboard/skill-submission-form";

export default function AddSkillPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Submit a New Skill</h1>
            <p className="text-muted-foreground mb-8">
                Complete the form below to submit your skill for AI-powered verification and get a new credential.
            </p>
            <div className="max-w-3xl mx-auto">
                <SkillSubmissionForm />
            </div>
        </div>
    )
}
