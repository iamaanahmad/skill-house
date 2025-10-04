'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AiDescriptionGenerator from './ai-description-generator';
import { useAddSkill } from '@/lib/app-data';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  skillName: z.string().min(2, 'Skill name must be at least 2 characters.'),
  evidence: z.string().url('Please enter a valid URL for your evidence.'),
  criteria: z.string().min(10, 'Criteria must be at least 10 characters.'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  icon: z.enum(["Code", "Cloud", "Database", "PenTool", "Wind", "Puzzle"]),
});

type SkillFormValues = z.infer<typeof formSchema>;

export default function SkillSubmissionForm() {
  const addSkill = useAddSkill();
  const router = useRouter();

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillName: '',
      evidence: '',
      criteria: '',
      description: '',
      level: 'Beginner',
      icon: 'Code'
    },
  });
  
  const skillName = form.watch('skillName');
  const criteria = form.watch('criteria');
  const level = form.watch('level');

  function onSubmit(data: SkillFormValues) {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: data.skillName,
      description: data.description,
      icon: data.icon,
      criteria: data.criteria,
      level: data.level,
      endorsements: 0,
    };
    addSkill(newSkill);

    toast({
      title: 'Skill Submitted!',
      description: `Your skill "${data.skillName}" has been submitted for verification.`,
    });
    form.reset();
    router.push('/dashboard/my-skills');
  }

  const handleDescriptionGenerated = (description: string) => {
    form.setValue('description', description);
    toast({
        title: 'Description Generated!',
        description: 'The AI-generated description has been added to the form.'
    })
  };
  
  const handleGenerationError = (message: string) => {
    toast({
      variant: 'destructive',
      title: 'AI Generation Failed',
      description: message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Skill Details</CardTitle>
            <CardDescription>Provide the name of the skill and evidence of your work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="skillName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Component Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="evidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/your-repo/project" {...field} />
                  </FormControl>
                  <FormDescription>Link to your project, repository, or portfolio.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Criteria & Description</CardTitle>
            <CardDescription>
              Define how this skill is measured. Then, either write a description or let our AI generate one for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Proficiency Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Code">Code</SelectItem>
                        <SelectItem value="Wind">Wind</SelectItem>
                        <SelectItem value="Puzzle">Puzzle</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Cloud">Cloud</SelectItem>
                        <SelectItem value="PenTool">PenTool</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="criteria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Criteria for Achievement</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Deployed a serverless API with authentication and database integration." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator className="my-6" />

            <div className="space-y-2">
                <FormLabel>Badge Description</FormLabel>
                 <p className="text-sm text-muted-foreground">
                    Write your own description or use the AI generator based on the fields above.
                </p>
            </div>
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <FormControl>
                            <Textarea placeholder="This badge certifies..." {...field} className="flex-grow" rows={4} />
                        </FormControl>
                        <AiDescriptionGenerator
                            skillName={skillName}
                            criteria={criteria}
                            level={level}
                            onDescriptionGenerated={handleDescriptionGenerated}
                            onError={handleGenerationError}
                        />
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full" size="lg">Submit Skill for Verification</Button>
      </form>
    </Form>
  );
}
