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
import { useAuth } from '@/contexts/auth-context';
import { databaseService } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { Switch } from '../ui/switch';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(2, 'Skill title must be at least 2 characters.'),
  category: z.string().min(2, 'Category must be at least 2 characters.'),
  evidenceUrl: z.string().url('Please enter a valid URL for your evidence.').optional().or(z.literal('')),
  evidenceType: z.enum(['github', 'portfolio', 'certificate', 'project', 'other']),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  isPublic: z.boolean().default(true),
  requestVerification: z.boolean().default(false),
});

type SkillFormValues = z.infer<typeof formSchema>;

export default function SkillSubmissionForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: 'Technical',
      evidenceUrl: '',
      evidenceType: 'github',
      description: '',
      isPublic: true,
      requestVerification: false,
    },
  });
  
  const title = form.watch('title');
  const category = form.watch('category');

  async function onSubmit(data: SkillFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to submit a skill.',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Create the credential in Appwrite
      await databaseService.createCredential({
        userId: user.$id,
        title: data.title,
        category: data.category,
        description: data.description,
        evidenceUrl: data.evidenceUrl || '',
        evidenceType: data.evidenceType,
        status: data.requestVerification ? 'pending' : 'verified',
        endorsementCount: 0,
        isPublic: data.isPublic,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: 'Skill Submitted!',
        description: `Your skill "${data.title}" has been submitted successfully.`,
      });
      
      form.reset();
      router.push('/dashboard/my-skills');
    } catch (error) {
      console.error('Error submitting skill:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Failed to submit your skill. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Component Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Web Development, Design, Data Science" {...field} />
                  </FormControl>
                  <FormDescription>What category does this skill belong to?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="evidenceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/your-repo/project" {...field} />
                  </FormControl>
                  <FormDescription>Link to your project, repository, or portfolio.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="evidenceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select evidence type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="github">GitHub Repository</SelectItem>
                      <SelectItem value="portfolio">Portfolio Project</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="project">Live Project</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>
              Describe your skill or let our AI generate a description for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <FormLabel>Skill Description</FormLabel>
                 <p className="text-sm text-muted-foreground">
                    Write your own description or use the AI generator.
                </p>
            </div>
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <FormControl>
                            <Textarea placeholder="This skill demonstrates..." {...field} className="flex-grow" rows={4} />
                        </FormControl>
                        <AiDescriptionGenerator
                            skillName={title}
                            criteria={category}
                            level="Intermediate"
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
        
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure how your credential will be shared and verified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Make Public</FormLabel>
                                <FormDescription>
                                Allow others to view this credential in the discover section.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="requestVerification"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Request Verification</FormLabel>
                                <FormDescription>
                                Submit this skill for verification before marking as verified.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
        
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Skill for Verification'}
        </Button>
      </form>
    </Form>
  );
}
