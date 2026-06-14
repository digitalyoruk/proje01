/**
 * Create (or verify) the Sanity → Next.js ISR revalidation webhook.
 *
 * Run: npm run setup:webhook
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_API_WRITE_TOKEN  (needs webhook manage permission)
 *   SANITY_REVALIDATE_SECRET
 *   SITE_URL (production domain, e.g. https://proje01.com)
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    /* ignore */
  }
}
loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const secret = process.env.SANITY_REVALIDATE_SECRET;
const siteUrl = (process.env.SITE_URL || "https://proje01.com").replace(
  /\/$/,
  ""
);

if (!projectId || !token || !secret) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN, or SANITY_REVALIDATE_SECRET in .env.local"
  );
  process.exit(1);
}

const apiBase = `https://${projectId}.api.sanity.io/v2021-06-07/hooks/projects/${projectId}`;
const targetUrl = `${siteUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`;
const hookName = "Next.js ISR Revalidate";

type Hook = { id: string; name: string; url: string };

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

async function run() {
  console.log("Project:", projectId);
  console.log("Dataset:", dataset);
  console.log("Target:", targetUrl);

  const hooks = await api<Hook[]>("");
  const existing = hooks.find(
    (h) => h.name === hookName || h.url.includes("/api/revalidate")
  );

  if (existing) {
    console.log("\nWebhook already exists:", existing.name, `(${existing.id})`);
    if (existing.url !== targetUrl) {
      await api(`/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify({ url: targetUrl }),
      });
      console.log("Updated webhook URL.");
    } else {
      console.log("URL is already correct.");
    }
    return;
  }

  const created = await api<Hook>("", {
    method: "POST",
    body: JSON.stringify({
      type: "document",
      name: hookName,
      url: targetUrl,
      dataset,
      httpMethod: "POST",
      apiVersion: "v2021-06-07",
      includeDrafts: false,
      rule: {
        on: ["create", "update", "delete"],
        projection: "{_type}",
      },
    }),
  });

  console.log("\nCreated webhook:", created.name, `(${created.id})`);
}

run().catch((err) => {
  console.error("\nWebhook setup failed:", err.message);
  console.error(
    "\nIf the token lacks webhook permission, create it manually in Sanity:"
  );
  console.error(`  https://www.sanity.io/manage/project/${projectId}/api/webhooks`);
  console.error(`  URL: ${targetUrl}`);
  console.error("  Trigger: create / update / delete on all documents");
  console.error('  Projection: { _type }');
  process.exit(1);
});
