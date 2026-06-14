import {
  BehanceLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  PinterestLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramLogo,
  behance: BehanceLogo,
  twitter: XLogo,
  pinterest: PinterestLogo,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  whatsapp: WhatsappLogo,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  const Icon = ICONS[platform] ?? InstagramLogo;
  return <Icon className={className} />;
}
