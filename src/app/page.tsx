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
            <Button asChild>
                <Link href="/dashboard">Get Started</Link>
            </Button>
        </nav>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Mint, Showcase, and Share Your Verified Skills
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Turn your abilities into verifiable, shareable digital credentials powered by AI.
              </p>
              <div>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <Link href="/dashboard">Get Your First Badge</Link>
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

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
                title="Trust"
                description="Credentials verified by AI and secured on the blockchain, ensuring authenticity."
              />
              <FeatureCard
                icon={<Cpu className="w-10 h-10 text-primary" />}
                title="Utility"
                description="Share your skills anywhere, from your resume to social media, with a simple link."
              />
              <FeatureCard
                icon={<Bot className="w-10 h-10 text-primary" />}
                title="AI-Powered"
                description="Our AI analyzes your work to validate skills, providing objective assessments."
              />
              <FeatureCard
                icon={<Gem className="w-10 h-10 text-primary" />}
                title="NFT Credentials"
                description="Optionally mint your badges as NFTs to truly own your achievements."
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
              <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
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
      <div className="bg-background rounded-full p-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}