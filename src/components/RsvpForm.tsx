"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      attending: String(data.get("attending") || ""),
      guests: Number(data.get("guests") || 1),
      message: String(data.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-invite-gold/50 bg-invite-cream/95 px-6 py-8 text-center shadow-lg">
        <p className="font-script text-4xl text-invite-burgundy">Thank you!</p>
        <p className="mt-3 font-serif text-invite-burgundy/80">
          Your RSVP has been received. We look forward to celebrating with you.
        </p>
        <button
          type="button"
          className="mt-5 text-sm underline text-invite-burgundy/70"
          onClick={() => setStatus("idle")}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-3xl border border-invite-gold/50 bg-invite-cream/95 px-5 py-7 shadow-lg sm:px-7"
    >
      <div className="text-center">
        <h2 className="font-script text-4xl text-invite-burgundy">RSVP</h2>
        <p className="mt-1 font-serif text-sm text-invite-burgundy/70">
          Kindly let us know if you can join
        </p>
      </div>

      <label className="block font-serif text-sm">
        <span className="mb-1 block text-invite-burgundy/80">Full name</span>
        <input
          name="name"
          required
          className="w-full rounded-xl border border-invite-gold/40 bg-white/70 px-3 py-2.5 outline-none focus:border-invite-gold"
          placeholder="Your name"
        />
      </label>

      <label className="block font-serif text-sm">
        <span className="mb-1 block text-invite-burgundy/80">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          className="w-full rounded-xl border border-invite-gold/40 bg-white/70 px-3 py-2.5 outline-none focus:border-invite-gold"
          placeholder="WhatsApp number"
        />
      </label>

      <fieldset className="font-serif text-sm">
        <legend className="mb-2 text-invite-burgundy/80">Will you attend?</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="attending" value="yes" defaultChecked required />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="attending" value="no" />
            No
          </label>
        </div>
      </fieldset>

      <label className="block font-serif text-sm">
        <span className="mb-1 block text-invite-burgundy/80">Number of guests</span>
        <input
          name="guests"
          type="number"
          min={1}
          max={20}
          defaultValue={1}
          required
          className="w-full rounded-xl border border-invite-gold/40 bg-white/70 px-3 py-2.5 outline-none focus:border-invite-gold"
        />
      </label>

      <label className="block font-serif text-sm">
        <span className="mb-1 block text-invite-burgundy/80">Message (optional)</span>
        <textarea
          name="message"
          rows={3}
          className="w-full resize-none rounded-xl border border-invite-gold/40 bg-white/70 px-3 py-2.5 outline-none focus:border-invite-gold"
          placeholder="A note for the couple"
        />
      </label>

      {status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-invite-burgundy px-5 py-3 font-serif text-invite-cream shadow-md transition hover:opacity-95 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
