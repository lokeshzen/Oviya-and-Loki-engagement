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
            "linear-gradient(160deg, #f4cfd8 0%, #f9e4ea 50%, #f4cfd8 100%)",
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
            background: "#fbf6ee",
            borderRadius: "200px 200px 24px 24px",
            border: "3px solid #c9a227",
            boxShadow: "0 20px 60px rgba(122, 31, 43, 0.15)",
          }}
        >
          <div style={{ color: "#c9a227", fontSize: 28, marginBottom: 12 }}>
            * Murugan Thunai *
          </div>
          <div
            style={{
              color: "#7a1f2b",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            You are cordially invited to our
          </div>
          <div
            style={{
              color: "#7a1f2b",
              fontSize: 72,
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            Engagement
          </div>
          <div
            style={{
              color: "#7a1f2b",
              fontSize: 56,
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            Oviya ♥ Lokesh
          </div>
          <div style={{ color: "#7a1f2b", fontSize: 24, marginTop: 24 }}>
            September 9, 2026 · 10am · Hotel Emerald, Ranipet
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
