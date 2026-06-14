import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { getSiteData } from "@cms/lib/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteData();
  return (
    <>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </>
  );
}
