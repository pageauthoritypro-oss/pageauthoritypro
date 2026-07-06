"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

export function StudioRouteGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <>{children}</>;
}

/**
 * The draft-mode cookie persists across browser tabs once enabled from Studio's
 * Presentation Tool, so a plain top-level visit to the site would otherwise still
 * render the click-to-edit overlays. Only mount VisualEditing when the page is
 * actually embedded inside the Presentation Tool's iframe.
 */
export function VisualEditingGate() {
  const [isIframed, setIsIframed] = useState(false);

  useEffect(() => {
    setIsIframed(window.self !== window.top);
  }, []);

  if (!isIframed) return null;

  return <VisualEditing />;
}
