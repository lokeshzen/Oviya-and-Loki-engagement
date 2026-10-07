"use client";

import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { WELCOME } from "@/lib/event";

export function Welcome() {
  return (
    <ParallaxSection id="welcome" overlay="cream" speed={0.3}>
      <div className="container-narrow">
        <ScrollReveal direction="up">
          <Card variant="default" className="text-center">
            <h2 className="font-script text-4xl leading-tight text-invite-wine sm:text-5xl">
              {WELCOME.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-md font-body text-lg leading-relaxed text-invite-gray">
              {WELCOME.body}
            </p>
          </Card>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
