import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_HEIGHT, OG_WIDTH } from "./og-constants";

export { OG_HEIGHT, OG_WIDTH };
export const OG_SIZE = { width: OG_WIDTH, height: OG_HEIGHT };

export const OG_PAD_X = 72;
export const OG_CONTENT_WIDTH = OG_WIDTH - OG_PAD_X * 2;

export const OG_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=31536000, immutable",
};

let fontCache: Buffer | null = null;

export async function loadOgFont() {
  if (fontCache) return fontCache;
  fontCache = await readFile(
    join(process.cwd(), "public/fonts/InterTight-SemiBold.woff")
  );
  return fontCache;
}

export function splitOgTitleLines(
  title: string,
  maxLines: number,
  charsPerLine: number
) {
  const words = title.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > charsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }

  if (lines.length < maxLines && current) lines.push(current);
  return lines.slice(0, maxLines);
}

export function ogTitleLayout(title: string) {
  const len = title.length;

  if (len <= 36) {
    return { fontSize: 58, maxLines: 2, charsPerLine: 22 };
  }
  if (len <= 56) {
    return { fontSize: 48, maxLines: 3, charsPerLine: 26 };
  }
  if (len <= 80) {
    return { fontSize: 40, maxLines: 3, charsPerLine: 30 };
  }
  return { fontSize: 34, maxLines: 4, charsPerLine: 34 };
}
