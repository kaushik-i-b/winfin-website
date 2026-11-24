import { ImageResponse } from "next/og";

export const alt = "Oppuna: a private, offline AI wellness journal for Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OppunaOgImage() {
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
          background: "#ffffff",
          color: "#172033",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 16, background: "#6d5bd0", display: "flex" }} />
        <div style={{ position: "absolute", right: 90, top: 90, width: 200, height: 200, borderRadius: 999, background: "#f2effd", display: "flex" }} />
        <div style={{ display: "flex", fontSize: 28, color: "#526075" }}>Winfin Technologies</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, letterSpacing: -2, color: "#6d5bd0" }}>Oppuna</div>
          <div style={{ marginTop: 16, fontSize: 44, maxWidth: 900, color: "#172033" }}>
            A private, offline AI wellness journal
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#526075" }}>
          On-device AI · Mood tracking · Journaling · Android
        </div>
      </div>
    ),
    size
  );
}
