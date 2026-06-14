import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "left",
  tone = "dark",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-[0.18em]",
            tone === "light" ? "text-white/60" : "text-[var(--color-clay)]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-[var(--color-ink)]"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
