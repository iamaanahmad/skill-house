import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const flaggedCredentials = [
  {
    id: "fc-1",
    skillName: "AI Prompt Engineering",
    userName: "John Doe",
    reason: "Suspicious Evidence URL",
    date: "2024-07-28",
  },
  {
    id: "fc-2",
    skillName: "Blockchain Development",
    userName: "Jane Smith",
    reason: "Plagiarism Detected in Criteria",
    date: "2024-07-27",
  },
];

export default function FlaggedCredentialsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Flagged Credentials</h1>
        <p className="text-muted-foreground">
          Review and take action on credentials that have been flagged for violating platform rules.
        </p>
      </div>
      <div className="space-y-6">
        {flaggedCredentials.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.skillName}</CardTitle>
                  <CardDescription>Submitted by: {item.userName}</CardDescription>
                </div>
                <Badge variant="destructive">{item.reason}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Flagged on: {item.date}</p>
            </CardContent>
            <CardFooter className="gap-4">
              <Button>Approve</Button>
              <Button variant="destructive">Reject</Button>
              <Button variant="outline">View Submission</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
