import React from "react";
import type { AdvancedSeoSettings, Page } from "@/sanity/types/advanced";
import type { Metadata } from "next";

/**
 * Generate Next.js metadata from advanced SEO settings
 */
export function generateMetadata(
  seo?: AdvancedSeoSettings,
  siteSeo?: AdvancedSeoSettings,
): Metadata {
  const title = seo?.metaTitle || siteSeo?.metaTitle;
  const description = seo?.metaDescription || siteSeo?.metaDescription;
  const ogTitle = seo?.ogTitle || title || siteSeo?.ogTitle;
  const ogDescription = seo?.ogDescription || description || siteSeo?.ogDescription;
  const ogImage = seo?.ogImageUrl || siteSeo?.ogImageUrl;
  const twitterHandle = seo?.twitterHandle || siteSeo?.twitterHandle;

  const metadata: Metadata = {
    ...(title && { title }),
    ...(description && { description }),
    ...(seo?.keywords?.length && { keywords: seo.keywords }),
    robots: {
      index: seo?.noIndex != null ? !seo.noIndex : true,
      follow: seo?.noFollow != null ? !seo.noFollow : true,
    },
  };

  if (seo?.canonicalUrl) {
    metadata.alternates = { canonical: seo.canonicalUrl };
  }

  metadata.openGraph = {
    ...(ogTitle && { title: ogTitle }),
    ...(ogDescription && { description: ogDescription }),
    ...(ogImage && { images: [ogImage] }),
    type: "website",
  };

  metadata.twitter = {
    card: seo?.twitterCard || siteSeo?.twitterCard || "summary_large_image",
    ...(ogTitle && { title: ogTitle }),
    ...(ogDescription && { description: ogDescription }),
    ...(ogImage && { images: [ogImage] }),
    ...(twitterHandle && { creator: twitterHandle }),
  };

  if (seo?.additionalMetaTags?.length) {
    metadata.other = {};
    seo.additionalMetaTags.forEach((tag) => {
      if (metadata.other) metadata.other[tag.name] = tag.content;
    });
  }

  return metadata;
}

/**
 * Generate breadcrumb schema.org JSON-LD
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}



/**
 * Render JSON-LD script tag
 */
export function renderJsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
