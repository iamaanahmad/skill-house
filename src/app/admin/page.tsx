import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, Shield, CheckCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the SkillHouse platform.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Users" value="1,254" icon={<User className="h-6 w-6 text-primary" />} />
        <StatCard title="Verifications Pending" value="82" icon={<CheckCircle className="h-6 w-6 text-orange-500" />} />
        <StatCard title="Flagged Credentials" value="12" icon={<Shield className="h-6 w-6 text-destructive" />} />
      </div>
       <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>More detailed analytics will be displayed here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Charts and graphs will go here.</p>
          </CardContent>
        </Card>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
