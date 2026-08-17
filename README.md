# Oviya & Lokesh — Engagement Invite

Animated, mobile-first engagement invitation site for WhatsApp sharing. Built with Next.js and deployable on Vercel.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`:

```bash
RSVP_WEBHOOK_URL=          # Google Apps Script web app URL (optional for local demo)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPS_URL=https://www.google.com/maps/search/?api=1&query=Hotel+Emerald+Ranipet
GMAIL_USER=                # Gmail address used to send RSVP emails
GMAIL_APP_PASSWORD=        # Gmail App Password (not your regular password)
NOTIFICATION_EMAIL=lokeszen@gmail.com
```

Without `RSVP_WEBHOOK_URL`, RSVPs are accepted and logged in the server console (demo mode).

Without `GMAIL_USER` and `GMAIL_APP_PASSWORD`, RSVP emails are skipped and logged. Email failures never block a successful RSVP.

## Google Sheet RSVP setup

1. Create a Google Sheet with headers: `Name`, `Phone`, `Attending`, `Guests`, `Message`, `Time`
2. Extensions → Apps Script, paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.name,
    data.phone,
    data.attending,
    data.guests,
    data.message || "",
    data.timestamp || new Date().toISOString(),
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
4. Paste the web app URL into `RSVP_WEBHOOK_URL` (Vercel env + local `.env.local`)

## Email RSVP notifications

Each submitted RSVP is emailed to `NOTIFICATION_EMAIL` (default `lokeszen@gmail.com`) with the guest’s name, phone, attendance, guest count, message, and time.

1. Enable 2-Step Verification on the Gmail account that will send mail
2. Google Account → Security → 2-Step Verification → App passwords
3. Create an app password for “Reception RSVP”
4. Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `NOTIFICATION_EMAIL` in `.env.local` and Vercel

Use the 16-character App Password, not the Gmail account password.

## Optional music

Add a royalty-free track at `public/music.mp3`. The music toggle appears after the envelope is opened. Without the file, the toggle hides itself.

## Deploy to Vercel

Log in once, then deploy:

```bash
npx vercel login
npx vercel --prod
```

Set env vars in the Vercel project:

- `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://your-app.vercel.app`)
- `RSVP_WEBHOOK_URL` = Apps Script URL
- `NEXT_PUBLIC_MAPS_URL` = optional precise Maps link
- `GMAIL_USER` = Gmail address that sends RSVP notifications
- `GMAIL_APP_PASSWORD` = Gmail App Password
- `NOTIFICATION_EMAIL` = inbox that receives RSVPs (e.g. `lokeszen@gmail.com`)

After deploy, send the URL in WhatsApp and confirm the Open Graph preview (title + floral card image). WhatsApp caches previews; append `?v=2` to the URL if an old preview sticks.

Open Graph image route: `/opengraph-image` (1200×630 PNG).

## Event details

Edit `src/lib/event.ts` for names, date, venue, and Maps URL.
