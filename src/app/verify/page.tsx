
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VerifyLandingPage() {
  return (
    <div className="bg-background min-h-screen">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center font-bold text-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2">SkillHouse</span>
        </Link>
        <div className="ml-auto">
             <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-md mx-auto text-center">
             <h1 className="text-3xl font-bold tracking-tight mb-2">Verify a Credential</h1>
            <p className="text-muted-foreground mb-8">
               Enter a credential ID or scan a QR code to verify its authenticity.
            </p>
          <Card>
            <CardHeader>
              <CardTitle>Enter Credential ID</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Enter credential ID..."/>
                <Button className="w-full">Verify</Button>
            </CardContent>
          </Card>
           <p className="text-muted-foreground my-4">or</p>
            <Button variant="secondary" className="w-full">Scan QR Code</Button>
        </div>
      </main>
    </div>
  );
}

