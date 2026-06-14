import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { SocialIcon } from "@/components/site/social-icons";
import type { SiteData } from "@cms/lib/types";

export function Footer({ site }: { site: SiteData }) {
  return (
    <footer className="bg-[var(--color-ink-deep)] text-white">
      <div className="container-edge py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-2xl font-semibold tracking-tight">
              {site.wordmark}
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.footerBlurb}
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
              Bağlantılar
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {site.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
              Bize Ulaşın
            </h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-white/75">
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <EnvelopeSimple className="size-4 text-[var(--color-clay)]" />
                    {site.email}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 text-[var(--color-clay)]" />
                    {site.phone}
                  </a>
                </li>
              )}
              {site.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-clay)]" />
                  {site.address}
                </li>
              )}
            </ul>
            {site.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-white/55">
                {site.socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="transition-colors hover:text-white"
                    >
                      <SocialIcon platform={s.platform} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.legal}</p>
          {site.builtBy && <p>Site by {site.builtBy}</p>}
        </div>
      </div>
    </footer>
  );
}
