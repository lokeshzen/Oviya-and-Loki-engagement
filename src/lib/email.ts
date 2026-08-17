import nodemailer from "nodemailer";
import { EVENT } from "@/lib/event";

export type RsvpPayload = {
  name: string;
  phone: string;
  attending: string;
  guests: number;
  message: string;
  timestamp: string;
};

function formatSubmittedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attendingLabel(attending: string): string {
  return attending === "yes" ? "Attending" : "Not attending";
}

function guestSummary(payload: RsvpPayload): string {
  if (payload.attending !== "yes") return "Unable to attend";
  const count = payload.guests;
  return `${count} guest${count === 1 ? "" : "s"} (including themselves)`;
}

export function buildRsvpEmail(payload: RsvpPayload): { subject: string; text: string; html: string } {
  const status = attendingLabel(payload.attending);
  const submittedAt = formatSubmittedAt(payload.timestamp);
  const message = payload.message.trim() || "—";
  const subject = `New RSVP: ${payload.name} — ${status}`;

  const text = [
    `New RSVP for ${EVENT.bride} & ${EVENT.groom}'s ${EVENT.title}`,
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Attendance: ${status}`,
    `Guests: ${guestSummary(payload)}`,
    `Message: ${message}`,
    `Submitted: ${submittedAt}`,
  ].join("\n");

  const html = `
    <div style="margin:0;padding:24px;background:#FEFCF8;font-family:Georgia,'Times New Roman',serif;color:#3A2A3E;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E6D7B8;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:24px 28px;background:#F8E8F0;border-bottom:1px solid #E6D7B8;">
            <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#B8336A;">New RSVP</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;color:#6B1E3C;">
              ${escapeHtml(EVENT.bride)} &amp; ${escapeHtml(EVENT.groom)}
            </h1>
            <p style="margin:6px 0 0;font-size:14px;color:#7A6B7E;">
              ${escapeHtml(EVENT.title)} · ${escapeHtml(EVENT.dateLabel)}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <p style="margin:0 0 16px;font-size:16px;">
              <strong style="color:#6B1E3C;">${escapeHtml(payload.name)}</strong>
              has submitted their details.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
              <tr>
                <td style="padding:8px 0;color:#7A6B7E;width:120px;vertical-align:top;">Phone</td>
                <td style="padding:8px 0;color:#3A2A3E;">${escapeHtml(payload.phone)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#7A6B7E;vertical-align:top;">Attendance</td>
                <td style="padding:8px 0;color:#3A2A3E;">${escapeHtml(status)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#7A6B7E;vertical-align:top;">Guests</td>
                <td style="padding:8px 0;color:#3A2A3E;">${escapeHtml(guestSummary(payload))}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#7A6B7E;vertical-align:top;">Message</td>
                <td style="padding:8px 0;color:#3A2A3E;white-space:pre-wrap;">${escapeHtml(message)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#7A6B7E;vertical-align:top;">Submitted</td>
                <td style="padding:8px 0;color:#3A2A3E;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  return { subject, text, html };
}

export async function sendRsvpNotification(payload: RsvpPayload): Promise<void> {
  const host = process.env.BREVO_SMTP_HOST?.trim();
  const port = parseInt(process.env.BREVO_SMTP_PORT || "587", 10);
  const user = process.env.BREVO_SMTP_USER?.trim();
  const pass = process.env.BREVO_SMTP_PASSWORD?.trim();
  const to = process.env.NOTIFICATION_EMAIL?.trim() || "lokeszen@gmail.com";

  if (!host || !user || !pass) {
    console.info("[email] skipped — set BREVO_SMTP_HOST, BREVO_SMTP_USER, and BREVO_SMTP_PASSWORD to send RSVP emails");
    return;
  }

  const transporter = nodemailer.createTransporter({
    host,
    port,
    secure: false, // Use STARTTLS
    auth: {
      user,
      pass,
    },
  });

  const { subject, text, html } = buildRsvpEmail(payload);

  await transporter.sendMail({
    from: `"${EVENT.bride} & ${EVENT.groom} RSVP" <${user}>`,
    to,
    subject,
    text,
    html,
  });
}
