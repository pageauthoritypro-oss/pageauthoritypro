"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  stickyHeader: boolean;
  transparentHeader: boolean;
  children: React.ReactNode;
}

export default function NavbarContainer({ stickyHeader, transparentHeader, children }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparentHeader) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentHeader]);

  return (
    <div
      className={cn(
        "z-50 transition-all duration-300",
        stickyHeader ? "fixed top-0 left-0 right-0" : "relative w-full",
        // Background + border — single source of truth for the whole header area
        !transparentHeader
          ? "border-b border-white/8 bg-hero-bg"
          : scrolled
            ? "border-b border-white/8 bg-hero-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      )}
    >
      {children}
    </div>
  );
}