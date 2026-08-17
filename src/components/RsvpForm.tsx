"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { FieldWrapper, Input, Textarea } from "@/components/ui/Input";
import { fadeUp } from "@/lib/animations";
import { EVENT } from "@/lib/event";
import { PALACE_IMAGES } from "@/lib/palace-assets";

type Status = "idle" | "loading" | "success" | "error";
type Step = 1 | 2 | 3;

type FormData = {
  name: string;
  phone: string;
  attending: "yes" | "no" | "";
  guests: number;
  message: string;
};

const initialForm: FormData = {
  name: "",
  phone: "",
  attending: "yes",
  guests: 1,
  message: "",
};

export function RsvpForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep(current: Step): boolean {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (current === 1) {
      if (!form.name.trim()) errors.name = "Please enter your name";
      if (!form.phone.trim()) errors.phone = "Please enter your phone number";
    }

    if (current === 2) {
      if (!form.attending) errors.attending = "Please choose an option";
      if (form.attending === "yes" && (form.guests < 1 || form.guests > 20)) {
        errors.guests = "Guest count must be 1–20";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1) as Step);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1) as Step);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          attending: form.attending,
          guests: form.attending === "yes" ? form.guests : 1,
          message: form.message.trim(),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  function reset() {
    setForm(initialForm);
    setStep(1);
    setStatus("idle");
    setError("");
    setFieldErrors({});
  }

  if (status === "success") {
    return (
      <ParallaxSection
        id="rsvp"
        backgroundSrc={PALACE_IMAGES.garden}
        backgroundAlt="Royal garden pathway with traditional lamp lighting"
        overlay="blush"
        speed={0.35}
        decorativeBorder
        borderSrc={PALACE_IMAGES.border}
      >
        <div className="container-narrow">
          <ScrollReveal direction="scale">
            <Card variant="elevated" className="text-center backdrop-blur-sm">
              <p className="font-accent text-5xl text-invite-burgundy">
                Thank you!
              </p>
              <p className="mt-4 font-body text-invite-gray">
                {form.attending === "yes"
                  ? `We look forward to celebrating with you, ${form.name.split(" ")[0]}.`
                  : `Thank you for letting us know, ${form.name.split(" ")[0]}. We'll miss you!`}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-6"
                onClick={reset}
              >
                Submit another response
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </ParallaxSection>
    );
  }

  return (
    <ParallaxSection
      id="rsvp"
      backgroundSrc={PALACE_IMAGES.garden}
      backgroundAlt="Royal garden pathway with traditional lamp lighting"
      overlay="blush"
      speed={0.35}
      decorativeBorder
      borderSrc={PALACE_IMAGES.border}
    >
      <div className="container-narrow">
        <ScrollReveal direction="right">
          <SectionHeading
            eyebrow="RSVP"
            title="Kindly Respond"
            description="Please let us know if you can join us for the celebration."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} direction="scale" className="mt-8">
          <Card variant="elevated" className="backdrop-blur-sm">
            <CardHeader className="mb-4">
              <div className="mb-4 flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      s <= step ? "bg-invite-burgundy" : "bg-invite-gold/30"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <CardTitle>
                {step === 1 && "Your Details"}
                {step === 2 && "Will You Attend?"}
                {step === 3 && "Final Touches"}
              </CardTitle>
              <CardDescription>
                Step {step} of 3 · {EVENT.bride} & {EVENT.groom}
              </CardDescription>
            </CardHeader>

            <form onSubmit={onSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeUp}
                    className="space-y-4"
                  >
                    <FieldWrapper label="Full name" error={fieldErrors.name}>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Phone" error={fieldErrors.phone}>
                      <Input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="WhatsApp number"
                        autoComplete="tel"
                        required
                      />
                    </FieldWrapper>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeUp}
                    className="space-y-4"
                  >
                    <fieldset>
                      <legend className="mb-3 font-body text-sm text-invite-gray">
                        Will you attend?
                      </legend>
                      <div className="grid grid-cols-2 gap-3">
                        {(["yes", "no"] as const).map((value) => (
                          <label
                            key={value}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 font-body text-sm transition ${
                              form.attending === value
                                ? "border-invite-burgundy bg-invite-blush text-invite-burgundy"
                                : "border-invite-gold/30 bg-white text-invite-gray hover:border-invite-gold/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value={value}
                              checked={form.attending === value}
                              onChange={() => updateField("attending", value)}
                              className="sr-only"
                            />
                            {value === "yes" ? "Joyfully Yes" : "Regretfully No"}
                          </label>
                        ))}
                      </div>
                      {fieldErrors.attending && (
                        <p className="mt-2 text-xs text-red-700" role="alert">
                          {fieldErrors.attending}
                        </p>
                      )}
                    </fieldset>

                    {form.attending === "yes" && (
                      <FieldWrapper
                        label="Number of guests (including you)"
                        error={fieldErrors.guests}
                      >
                        <Input
                          name="guests"
                          type="number"
                          min={1}
                          max={20}
                          value={form.guests}
                          onChange={(e) =>
                            updateField("guests", Number(e.target.value))
                          }
                          required
                        />
                      </FieldWrapper>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeUp}
                    className="space-y-4"
                  >
                    <FieldWrapper label="Message for the couple (optional)">
                      <Textarea
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder="Share your wishes…"
                        maxLength={500}
                      />
                    </FieldWrapper>

                    <div className="rounded-xl bg-invite-cream/80 px-4 py-3 font-body text-sm text-invite-gray">
                      <p>
                        <span className="font-medium text-invite-burgundy">
                          {form.name}
                        </span>{" "}
                        · {form.phone}
                      </p>
                      <p className="mt-1">
                        {form.attending === "yes"
                          ? `Attending with ${form.guests} guest${form.guests > 1 ? "s" : ""}`
                          : "Unable to attend"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {status === "error" && (
                <p className="mt-4 text-center text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={goBack}
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={goNext}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    loading={status === "loading"}
                  >
                    Send RSVP
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
