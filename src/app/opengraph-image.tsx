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
            "linear-gradient(160deg, #FEFCF8 0%, #F8E8F0 50%, #FEFCF8 100%)",
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
            background: "#FEFCF8",
            borderRadius: 24,
            border: "2px solid #E6D7B8",
            boxShadow: "0 20px 60px rgba(107, 30, 60, 0.1)",
          }}
        >
          <div style={{ color: "#B8336A", fontSize: 22, marginBottom: 12 }}>
            Murugan Thunai
          </div>
          <div
            style={{
              color: "#7A6B7E",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            You are cordially invited to our
          </div>
          <div
            style={{
              color: "#6B1E3C",
              fontSize: 64,
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            Engagement
          </div>
          <div
            style={{
              color: "#6B1E3C",
              fontSize: 48,
              fontStyle: "italic",
              marginTop: 16,
            }}
          >
            Oviya & Lokesh
          </div>
          <div style={{ color: "#3A2A3E", fontSize: 24, marginTop: 24 }}>
            September 9, 2026 · 10am · Hotel Emerald, Ranipet
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
