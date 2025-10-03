import Link from "next/link";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
      </svg>
    )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z" />
            <path d="M12 15.5a3.5 3.5 0 0 1-3.5-3.5V10H12v2h-1.5v.5a1.5 1.5 0 0 0 1.5 1.5Z" />
            <path d="M21.27 12.06c-.13-1.05-.33-2.07-.6-3.06" />
            <path d="M9.54 18.43a8.95 8.95 0 0 0 7.37-3.9" />
            <path d="M2.73 11.94c.13 1.05.33 2.07.6 3.06" />
            <path d="M14.46 5.57a8.95 8.95 0 0 0-7.37 3.9" />
        </svg>
    )
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary"/>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SkillHouse</h1>
        </div>

        <Tabs defaultValue="signin" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email-signin" type="email" placeholder="m@example.com" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password-signin" type="password" required className="pl-10"/>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/dashboard">Sign In</Link>
                </Button>
                 <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
                    <Button variant="outline"><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
          <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Start your skill-building journey today.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email-signup" type="email" placeholder="m@example.com" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password-signup" type="password" required className="pl-10"/>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/dashboard">Sign Up</Link>
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
                    <Button variant="outline"><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
