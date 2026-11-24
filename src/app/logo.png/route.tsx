import { ImageResponse } from "next/og";

/** 512×512 raster logo for structured data (Organization.logo). */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#315efb" }}>
        <svg width="400" height="400" viewBox="0 0 32 32" fill="none">
          <path d="M7.5 11l4.2 10.5L16 13.2l4.3 8.3L24.5 11" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
