import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { TAGS } from "@cms/lib/fetch";

/**
 * Sanity webhook -> ISR revalidation.
 *
 * Configure a webhook in Sanity (manage -> API -> Webhooks) pointing at
 *   https://<domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 * with a projection that includes `_type`, e.g. `{ _type }`.
 *
 * On any document change we revalidate the matching cache tag(s); singletons
 * and collections that feed the landing page also bust the landing tag.
 */
const ALL_TAGS = Object.values(TAGS);

const DEPENDENTS: Record<string, string[]> = {
  service: [TAGS.service, TAGS.landing, TAGS.settings],
  project: [TAGS.project, TAGS.landing],
  testimonial: [TAGS.testimonial, TAGS.landing],
  partnerLogo: [TAGS.partnerLogo, TAGS.landing],
  teamMember: [TAGS.team],
  faq: [TAGS.faq],
  blogPost: [TAGS.blogPost],
  siteSettings: [TAGS.settings, TAGS.landing],
  landingPage: [TAGS.landing],
};

export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "Server not configured" },
      { status: 500 }
    );
  }
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  let type: string | undefined;
  try {
    const body = await req.json();
    type = body?._type;
  } catch {
    /* no body / not JSON */
  }

  const tags =
    type && DEPENDENTS[type]
      ? DEPENDENTS[type]
      : type?.endsWith("Page")
        ? [TAGS.pages]
        : ALL_TAGS;

  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({
    revalidated: true,
    type: type ?? "unknown",
    tags,
    now: Date.now(),
  });
}
