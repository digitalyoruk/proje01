import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Public read client used by the website. The `production` dataset is public,
 * so no token is required. We disable the Sanity CDN and instead rely on
 * Next.js' data cache + tag-based revalidation, so a publish webhook reflects
 * immediately while still serving cached content the rest of the time.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

/**
 * Server-only write client. Used by the seed script and any server action that
 * needs to mutate content. Requires SANITY_API_WRITE_TOKEN (never exposed to the
 * browser). Returns a fresh, uncached client.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN environment variable for write access."
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
