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

function wrapTitle(title: string, maxLen = 120) {
  const t = title.trim().slice(0, maxLen);
  return t || "Proje 01 Blog";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = wrapTitle(searchParams.get("title") ?? "Proje 01 Blog");
  const category = (searchParams.get("category") ?? "").slice(0, 40);
  const { fontSize, maxLines, charsPerLine } = ogTitleLayout(title);
  const lines = splitOgTitleLines(title, maxLines, charsPerLine);
  const font = await loadOgFont();

  return new ImageResponse(
    (
      <OgShell>
        {category ? <OgEyebrow>{category}</OgEyebrow> : null}
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
