import { ImageResponse } from "next/og";
import {
  loadOgFont,
  OG_CACHE_HEADERS,
  OG_SIZE,
  ogTitleLayout,
  splitOgTitleLines,
} from "@/lib/og-shared";
import { OgEyebrow, OgShell, OgTitleLines } from "@/lib/og-template";

export const runtime = "nodejs";

function wrap(value: string | null, max: number, fallback: string) {
  const t = (value ?? "").trim().slice(0, max);
  return t || fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = wrap(searchParams.get("title"), 80, "Proje 01");
  const eyebrow = wrap(searchParams.get("eyebrow"), 40, "PROJE 01");
  const { fontSize, maxLines, charsPerLine } = ogTitleLayout(title);
  const lines = splitOgTitleLines(title, maxLines, charsPerLine);
  const font = await loadOgFont();

  return new ImageResponse(
    (
      <OgShell>
        <OgEyebrow>{eyebrow}</OgEyebrow>
        <OgTitleLines lines={lines} fontSize={fontSize} />
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
