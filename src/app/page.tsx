import Link from "next/link";
import { GraduationCap, ShieldCheck, Cpu, Bot, Gem, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Web3Visual from "@/components/home/web3-visual";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-lg">SkillHouse</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="ghost" asChild>
                <Link href="/discover">
                    <Search className="h-5 w-5 mr-2" />
                    Discover
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/leaderboard">
                    <Trophy className="h-5 w-5 mr-2" />
                    Leaderboard
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/auth">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/auth">Get Started</Link>
            </Button>
        </nav>
      </header>
      
      <main className="flex-1">
        {/* Hero Section with Integrated 3D Visual */}
        <section className="w-full py-12 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Hero Text */}
              <div className="flex flex-col space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit mx-auto lg:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Powered by AI & Blockchain
                </div>
                
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                    Prove and Share Your Skills
                  </span>
                  <br />
                  <span className="text-foreground">Instantly and Securely</span>
                </h1>
                
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  Turn your abilities into verifiable, shareable digital credentials powered by AI and Web3 technology.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0">
                  <Button asChild size="lg" className="group">
                    <Link href="/dashboard/add-skill">
                      Issue a Skill
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/discover">Explore Credentials</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-border">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-muted-foreground">Skills Verified</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">&lt;100ms</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>

              {/* Right: 3D Web3 Visual */}
              <div className="relative">
                <Web3Visual />
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                A simple, three-step process to turn your expertise into verifiable credentials.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3">
              <HowItWorksStep
                step="1"
                title="Submit Evidence"
                description="Provide a link to your work—like a GitHub repo, design file, or project document—and define the criteria for your skill."
              />
               <HowItWorksStep
                step="2"
                title="AI Verification"
                description="Our AI analyzes your submission against your criteria, providing an objective and unbiased verification of your skill."
              />
               <HowItWorksStep
                step="3"
                title="Mint & Share"
                description="Receive a digital badge for your skill. You can share it with a link, or mint it as an NFT to truly own your achievement."
              />
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose SkillHouse?</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                We provide the tools you need to build a trusted, portable, and modern professional identity.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<ShieldCheck className="w-10 h-10 text-primary" />}
                title="Trust & Verifiability"
                description="Credentials verified by AI and secured on the blockchain, ensuring authenticity that anyone can check."
              />
              <FeatureCard
                icon={<Cpu className="w-10 h-10 text-primary" />}
                title="Portability & Utility"
                description="Share your skills anywhere, from your resume to social media, with a simple link or QR code."
              />
              <FeatureCard
                icon={<Bot className="w-10 h-10 text-primary" />}
                title="Objective AI Analysis"
                description="Our AI analyzes your work to validate skills, providing objective and consistent assessments."
              />
              <FeatureCard
                icon={<Gem className="w-10 h-10 text-primary" />}
                title="Digital Ownership"
                description="Optionally mint your skill badges as NFTs to truly own your achievements on the blockchain."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <div className="container flex flex-col items-center justify-center text-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">&copy; 2025 SkillHouse. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
               <Link href="/about" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                About & FAQ
              </Link>
              <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms
              </Link>
              <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
              </Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="bg-background rounded-full p-4 shadow-md border">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function HowItWorksStep({ step, title, description }: { step: string; title: string; description: string; }) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background shadow-lg">
        {step}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
