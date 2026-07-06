import NavbarClient from "@/components/layout/NavbarClient";
import NavbarContainer from "@/components/layout/NavbarContainer";
import TopBanner from "@/components/layout/TopBanner";
import type { SiteSettings } from "@/sanity/types";

export type NavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  children?: { label: string; href: string; openInNewTab?: boolean }[];
};

export type NavCta = {
  text: string;
  href: string;
  variant: "primary" | "secondary";
  target?: "_self" | "_blank";
};

interface NavbarProps {
  settings?: SiteSettings | null;
}

export default function Navbar({ settings }: NavbarProps) {
  const links: NavLink[] = settings?.headerNavigation?.length
    ? settings.headerNavigation.map((item) => ({
        label: item.label,
        href: item.url,
        openInNewTab: item.openInNewTab,
        children: item.children?.map((c) => ({
          label: c.label,
          href: c.url,
          openInNewTab: c.openInNewTab,
        })),
      }))
    : [];

  const ctas: NavCta[] = settings?.headerCta?.length
    ? settings.headerCta.map((b) => ({
        text: b.cta_text,
        href: b.url,
        variant: b.variant === "secondary" ? "secondary" : "primary",
        target: b.target === "_blank" ? "_blank" : "_self",
      }))
    : [];

  const logo = {
    url: settings?.headerLogoUrl ?? settings?.logoUrl,
    iconSvg: settings?.headerLogoSvg ?? settings?.logoSvg,
    alt: settings?.title,
  };
  const stickyHeader = settings?.stickyHeader ?? true;
  const transparentHeader = settings?.transparentHeader ?? false;
  const topBanner = settings?.topBanner;

  return (
    <NavbarContainer stickyHeader={stickyHeader} transparentHeader={transparentHeader}>
      {topBanner?.enabled && topBanner.text && (
        <TopBanner text={topBanner.text} link={topBanner.link} variant={topBanner.variant} />
      )}
      <NavbarClient links={links} ctas={ctas} logo={logo} />
    </NavbarContainer>
  );
}
