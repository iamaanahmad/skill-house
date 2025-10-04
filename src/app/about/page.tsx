import Link from "next/link";
import { GraduationCap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight">About SkillHouse</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Our mission is to empower individuals by making skills verifiable, portable, and valuable.
              </p>
            </div>

            <div className="space-y-6 rounded-lg border p-6">
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                In today's dynamic job market, traditional resumes and credentials often fail to capture the full spectrum of an individual's capabilities. SkillHouse was born from the idea that skills, not just job titles, are the true currency of professional value. We envision a world where anyone can get objective recognition for their abilities, backed by cutting-edge technology, and share their achievements with confidence.
              </p>
               <p className="text-muted-foreground">
                We leverage AI for objective, unbiased skill verification and give users the option to mint their credentials as NFTs, placing ownership and control firmly in their hands. We are committed to ethical AI and building a trustworthy ecosystem for professional development.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">How does the AI verification work?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Our AI analyzes the evidence you submit (like a code repository, design portfolio, or project documentation) against the defined criteria for a skill. It looks for patterns, quality, completeness, and other signals to provide an objective assessment. This removes human bias and provides a consistent standard of verification.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">What is an NFT credential?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    An NFT (Non-Fungible Token) is a unique digital asset secured on a blockchain. When you mint a skill badge as an NFT, you create a permanent, tamper-proof record of your achievement that you truly own. You can hold it in a digital wallet, trade it, or display it anywhere on the web, independent of our platform.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">Is my data private?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Yes. You control what you share. Your submitted evidence is used solely for verification and is not made public unless you choose to link it in your profile. Your public profile only displays the information and credentials you want to showcase.
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg">How can organizations use SkillHouse?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Organizations can use SkillHouse to instantly verify candidate skills, reducing hiring risk and time. They can also use our platform for internal upskilling, creating custom credentials for their teams and tracking employee development in a modern, verifiable way.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
