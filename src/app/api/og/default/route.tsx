import { ImageResponse } from "next/og";
import {
  loadOgFont,
  OG_CACHE_HEADERS,
  OG_SIZE,
} from "@/lib/og-shared";
import { OgEyebrow, OgShell, OgTitleLines } from "@/lib/og-template";

export const runtime = "nodejs";

export async function GET() {
  const font = await loadOgFont();

  return new ImageResponse(
    (
      <OgShell footerRight="İzmir · Manisa">
        <OgEyebrow>PROJE 01</OgEyebrow>
        <OgTitleLines
          fontSize={52}
          lines={[
            "Mimarlık, iç mimarlık",
            "ve anahtar teslim tadilat",
          ]}
        />
      </OgShell>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Inter Tight",
          data: font,
          weight: 600,
          style: "normal",
        },
      ],
      headers: OG_CACHE_HEADERS,
    }
  );
}
