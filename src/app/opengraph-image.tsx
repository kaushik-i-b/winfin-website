import { ImageResponse } from "next/og";

export const alt = "Saakshi by Winfin Technologies — Every recovery call. Evidence your team can review.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#101827",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 40, height: 40, borderRadius: 9, background: "#315efb", display: "flex" }} />
          Winfin Technologies
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#8fa8ff", marginBottom: 20 }}>Saakshi · AI call review for lending and collections</div>
          <div style={{ fontSize: 72, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>
            Every recovery call. Evidence your team can review.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#b8c2d3" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#315efb", display: "flex" }} />
          In development · Pilot enquiries welcome
        </div>
      </div>
    ),
    size
  );
}
