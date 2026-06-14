import Image from "next/image";
import type { LandingData } from "@cms/lib/types";

export function Clients({
  title,
  logos,
}: {
  title: string;
  logos: LandingData["clients"]["logos"];
}) {
  if (!logos.length) return null;

  return (
    <section className="bg-[var(--color-bg)] py-[65px] md:py-[150px]">
      <div className="container-edge flex flex-col gap-8 md:flex-row md:items-center md:gap-[50px]">
        <h5 className="w-full shrink-0 font-display text-xl font-medium leading-snug text-[var(--color-ink)] md:w-[20%] md:text-[23px]">
          {title}
        </h5>

        <div className="flex w-full flex-wrap items-center gap-x-[10px] gap-y-4 md:w-[80%] md:flex-nowrap">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="flex w-1/2 items-center justify-center md:w-auto md:flex-1 md:justify-start"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={190}
                height={80}
                sizes="(max-width: 768px) 45vw, 190px"
                className="h-auto w-full max-w-[190px] opacity-20 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
