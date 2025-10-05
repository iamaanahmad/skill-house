import Link from "next/link";
import { GraduationCap, ShieldCheck, Cpu, Bot, Gem, Search } from "lucide-react";
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
                <Link href="/auth">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/auth">Get Started</Link>
            </Button>
        </nav>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Prove and Share Your Skills, Instantly and Securely
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Turn your abilities into verifiable, shareable digital credentials powered by AI and Web3 technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/dashboard/add-skill">Issue a Skill</Link>
                </Button>
                 <Button asChild size="lg" variant="secondary">
                  <Link href="/discover">Explore Credentials</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Web3 Visual Section */}
        <section className="w-full pb-12 md:pb-24 lg:pb-32">
            <div className="container px-4 md:px-6">
                 <Web3Visual />
            </div>
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
            <p className="text-xs text-muted-foreground">&copy; 2024 SkillHouse. All rights reserved.</p>
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
