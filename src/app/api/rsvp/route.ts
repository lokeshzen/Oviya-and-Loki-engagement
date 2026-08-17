import { NextRequest, NextResponse } from "next/server";
import { sendRsvpNotification, type RsvpPayload } from "@/lib/email";

type RsvpBody = {
  name?: string;
  phone?: string;
  attending?: string;
  guests?: number;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: RsvpBody;
  try {
    body = (await req.json()) as RsvpBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const attending = String(body.attending || "").toLowerCase();
  const guests = Number(body.guests || 0);
  const message = String(body.message || "").trim();

  if (!name || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter your name" }, { status: 400 });
  }
  if (!phone || phone.length > 30) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone" }, { status: 400 });
  }
  if (attending !== "yes" && attending !== "no") {
    return NextResponse.json({ ok: false, error: "Please choose attendance" }, { status: 400 });
  }
  if (!Number.isFinite(guests) || guests < 1 || guests > 20) {
    return NextResponse.json({ ok: false, error: "Guest count must be 1–20" }, { status: 400 });
  }
  if (message.length > 500) {
    return NextResponse.json({ ok: false, error: "Message is too long" }, { status: 400 });
  }

  const webhook = process.env.RSVP_WEBHOOK_URL;
  const payload: RsvpPayload = {
    name,
    phone,
    attending,
    guests,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    await sendRsvpNotification(payload);
  } catch (err) {
    console.error("Email notification failed", err);
  }

  if (!webhook) {
    // Local / demo mode: accept without Sheet
    console.info("[rsvp]", payload);
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "RSVP recorded locally (set RSVP_WEBHOOK_URL for Google Sheets)",
    });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Webhook failed", res.status, text);
      return NextResponse.json(
        { ok: false, error: "Could not save RSVP. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach RSVP service" },
      { status: 502 }
    );
  }
}
