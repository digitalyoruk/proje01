import { getBlogSlugs, getProjectSlugs, getServiceSlugs } from "@cms/lib/fetch";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const [serviceSlugs, projectSlugs, blogSlugs] = await Promise.all([
    getServiceSlugs(),
    getProjectSlugs(),
    getBlogSlugs(),
  ]);

  const lines = [
    "# Proje 01",
    "",
    "> Mimarlık, iç mimarlık ve anahtar teslim tadilat çözümleri. İzmir ve Manisa.",
    "",
    "## Hakkında",
    "Proje 01; konut, ofis ve ticari mekanlar için tasarım, tadilat ve anahtar teslim renovasyon hizmetleri sunan bir tasarım stüdyosudur.",
    "",
    "## Ana sayfalar",
    `- ${SITE_URL}/`,
    `- ${SITE_URL}/hizmetler`,
    `- ${SITE_URL}/projeler`,
    `- ${SITE_URL}/blog`,
    `- ${SITE_URL}/hakkinda`,
    `- ${SITE_URL}/ekibimiz`,
    `- ${SITE_URL}/memnuniyet`,
    `- ${SITE_URL}/sik-sorulan-sorular`,
    `- ${SITE_URL}/iletisim`,
    "",
    "## Hizmetler",
    ...serviceSlugs.map((slug) => `- ${SITE_URL}/hizmetler/${slug}`),
    "",
    "## Projeler",
    ...projectSlugs.map((slug) => `- ${SITE_URL}/projeler/${slug}`),
    "",
    "## Blog",
    ...blogSlugs.map((slug) => `- ${SITE_URL}/blog/${slug}`),
    "",
    "## İletişim",
    "- E-posta: info@proje01.com",
    "- Adres: Kültür Mahallesi, Şehit Nevres Bulvarı, No: 3 Kat: 5 Daire: 53, 35220 Konak/İzmir",
    "- Hizmet bölgeleri: İzmir, Manisa",
    "",
    "## Teknik",
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- Robots: ${SITE_URL}/robots.txt`,
    "- CMS içerikleri Sanity üzerinden yönetilir; /studio yalnızca editörler içindir.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
