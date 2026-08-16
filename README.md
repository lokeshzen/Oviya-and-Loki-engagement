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
```

Without `RSVP_WEBHOOK_URL`, RSVPs are accepted and logged in the server console (demo mode).

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

After deploy, send the URL in WhatsApp and confirm the Open Graph preview (title + floral card image). WhatsApp caches previews; append `?v=2` to the URL if an old preview sticks.

Open Graph image route: `/opengraph-image` (1200×630 PNG).

## Event details

Edit `src/lib/event.ts` for names, date, venue, and Maps URL.
