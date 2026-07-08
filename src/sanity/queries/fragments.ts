export const CTA_BTN_FIELDS = `
  cta_text,
  linkType,
  "url": select(linkType == "internal" => "/" + internalPage->slug.current, url),
  variant,
  target,
  "icon": icon { "url": asset->url, alt, iconSvg }
`;

export const LINK_FIELDS = `
  label,
  linkType,
  "url": select(linkType == "internal" => "/" + internalPage->slug.current, url),
  target,
  openInNewTab
`;

export const SEO_FIELDS = `
  metaTitle,
  metaDescription,
  keywords,
  "ogImageUrl": ogImage.asset->url,
  ogTitle,
  ogDescription,
  twitterCard,
  twitterHandle,
  canonicalUrl,
  noIndex,
  noFollow,
  schemaMarkup,
  additionalMetaTags
`;
