import type { ReactNode } from "react";
import { OG_CONTENT_WIDTH, OG_PAD_X } from "./og-shared";

type OgShellProps = {
  children: ReactNode;
  footerRight?: string;
};

export function OgShell({ children, footerRight }: OgShellProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `56px ${OG_PAD_X}px 52px`,
        background:
          "linear-gradient(148deg, #0A0A0A 0%, #121414 52%, #1c1511 100%)",
        position: "relative",
        fontFamily: "Inter Tight",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -120,
          right: -100,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(181,83,41,0.32) 0%, transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "#B55329",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 1,
          flex: 1,
          justifyContent: "center",
          width: OG_CONTENT_WIDTH,
        }}
      >
        {children}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
          width: OG_CONTENT_WIDTH,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.02em",
          }}
        >
          proje01
        </div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(172,175,178,0.9)",
          }}
        >
          {footerRight ?? "Tadilat · Mimarlık · Tasarım"}
        </div>
      </div>
    </div>
  );
}

export function OgEyebrow({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: 16,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#B55329",
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

export function OgTitleLines({
  lines,
  fontSize,
}: {
  lines: string[];
  fontSize: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        width: OG_CONTENT_WIDTH,
      }}
    >
      {lines.map((line) => (
        <div
          key={line}
          style={{
            fontSize,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            width: OG_CONTENT_WIDTH,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
