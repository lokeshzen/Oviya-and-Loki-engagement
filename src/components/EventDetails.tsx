import { ParallaxSection } from "@/components/ParallaxSection";
import { Card } from "@/components/ui/Card";
import { EVENT, FAMILY } from "@/lib/event";

export function EventDetails() {
  return (
    <ParallaxSection id="details" overlay="maroon" speed={0.3}>
      <div className="container-wide">
        <FamilyInvitation />
      </div>
    </ParallaxSection>
  );
}

function FamilyInvitation() {
  return (
    <Card
      variant="default"
      className="mx-auto max-w-xl text-center"
    >
      <h2 className="font-script text-4xl leading-tight text-invite-wine sm:text-5xl">
        The Invitation
      </h2>
      <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-invite-gray">
        {FAMILY.invitationLine}
      </p>
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="font-accent text-3xl leading-tight text-invite-royal-purple sm:text-4xl">
          {EVENT.groomFormal}
        </p>
        <p className="font-label text-[0.7rem] tracking-[0.12em] text-invite-royal-pink">
          {EVENT.groomCredentials}
        </p>
        <p className="mt-2 font-body text-base leading-relaxed text-invite-gray">
          Elder son of {FAMILY.hostFather} and {FAMILY.hostMother}
        </p>
      </div>
      <p className="my-3 font-body text-sm italic text-invite-gray">and</p>
      <div className="flex flex-col items-center gap-1">
        <p className="font-accent text-3xl leading-tight text-invite-royal-purple sm:text-4xl">
          {EVENT.brideFormal}
        </p>
        <p className="font-label text-[0.7rem] tracking-[0.12em] text-invite-royal-pink">
          {EVENT.brideCredentials}
        </p>
        <p className="mt-2 font-body text-base leading-relaxed text-invite-gray">
          Daughter of {FAMILY.brideFather} and {FAMILY.brideMother}
        </p>
      </div>
    </Card>
  );
}
