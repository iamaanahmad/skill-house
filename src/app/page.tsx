import Link from "next/link";
import Image from "next/image";
import { GraduationCap, ShieldCheck, Cpu, Bot, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function HomePage() {
  const demoVideo = PlaceHolderImages.find(p => p.id === 'demo-video-1');

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="sr-only">SkillHouse</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
              <div className="space-y-4">
                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Mint, Showcase, and Share Your Verified Skills
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                  SkillHouse helps you turn your abilities into verifiable, shareable digital credentials powered by
                  AI and blockchain technology.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <Link href="/dashboard">Get Your Badge</Link>
                </Button>
              </div>
               <Image
                src={demoVideo?.imageUrl || "https://picsum.photos/seed/300/600/400"}
                width={600}
                height={400}
                alt="Demo Video"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                data-ai-hint="abstract animation"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose SkillHouse?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide the tools you need to build a trusted, portable, and modern professional identity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16 mt-12">
              <div className="grid gap-2 text-center">
                 <div className="flex justify-center items-center">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Trust</h3>
                <p className="text-sm text-muted-foreground">
                  Credentials verified by AI and secured on the blockchain, ensuring authenticity.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center">
                    <Cpu className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Utility</h3>
                <p className="text-sm text-muted-foreground">
                  Share your skills anywhere, from your resume to social media, with a simple link or QR code.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center">
                    <Bot className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold">AI-Powered Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your work to validate skills, providing objective and reliable assessments.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center">
                    <Gem className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold">NFT Credentials</h3>
                <p className="text-sm text-muted-foreground">
                   Optionally mint your badges as NFTs to truly own your achievements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SkillHouse. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
