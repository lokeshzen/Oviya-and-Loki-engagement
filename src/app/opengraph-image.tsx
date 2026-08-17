import { ImageResponse } from "next/og";

export const alt = "Oviya & Lokesh — Engagement Invitation";
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
            "linear-gradient(160deg, #FAF7F2 0%, #F5E6E0 50%, #FAF7F2 100%)",
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
            height: 480,
            background: "#FFFFFF",
            borderRadius: 24,
            border: "2px solid #E8D5A3",
            boxShadow: "0 20px 60px rgba(45, 45, 45, 0.08)",
          }}
        >
          <div style={{ color: "#D4A574", fontSize: 22, marginBottom: 12 }}>
            Murugan Thunai
          </div>
          <div
            style={{
              color: "#6B6560",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            You are cordially invited to our
          </div>
          <div
            style={{
              color: "#7A1F2B",
              fontSize: 64,
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            Engagement
          </div>
          <div
            style={{
              color: "#7A1F2B",
              fontSize: 48,
              fontStyle: "italic",
              marginTop: 16,
            }}
          >
            Oviya & Lokesh
          </div>
          <div style={{ color: "#2D2D2D", fontSize: 24, marginTop: 24 }}>
            September 9, 2026 · 10am · Hotel Emerald, Ranipet
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
