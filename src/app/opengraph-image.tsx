import { ImageResponse } from "next/og";
import { EVENT, RECEPTION } from "@/lib/event";

export const alt = `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title} Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg, #FEFCF8 0%, #F6EDE0 50%, #FEFCF8 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 900,
            height: 500,
            background: "#FEFCF8",
            borderRadius: 24,
            border: "2px solid #C4A05A",
            boxShadow: "0 20px 60px rgba(62, 36, 28, 0.12)",
          }}
        >
          <div
            style={{
              color: "#4A5A6E",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            You are cordially invited to our
          </div>
          <div
            style={{
              color: "#3E241C",
              fontSize: 64,
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            {EVENT.title}
          </div>
          <div
            style={{
              color: "#8E2436",
              fontSize: 48,
              fontStyle: "italic",
              marginTop: 16,
            }}
          >
            {`${EVENT.bride} & ${EVENT.groom}`}
          </div>
          <div style={{ color: "#3E241C", fontSize: 22, marginTop: 24 }}>
            {`Reception · ${RECEPTION.dateLabel} · ${RECEPTION.timeLabel}`}
          </div>
          <div style={{ color: "#3E241C", fontSize: 22, marginTop: 8 }}>
            {`Wedding · ${EVENT.dateLabel} · ${EVENT.timeLabel}`}
          </div>
          <div style={{ color: "#4A5A6E", fontSize: 20, marginTop: 12 }}>
            {EVENT.venueHall}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
