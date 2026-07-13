import { groq } from 'next-sanity'
import { CTA_BTN_FIELDS, SEO_FIELDS, LINK_FIELDS } from './fragments'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "globalConfiguration" && _id == "globalConfiguration"][0] {
    _id,
    _rev,
    title,
    description,
    "logoUrl": logo.asset->url,
    "logoSvg": logo.iconSvg,
    "headerLogoUrl": headerLogo.asset->url,
    "headerLogoSvg": headerLogo.iconSvg,
    "faviconUrl": favicon.asset->url,
    seo { ${SEO_FIELDS} },
    socialMedia[] {
      platform,
      url
    },
    headerNavigation[] {
      ${LINK_FIELDS},
      children[] {
        ${LINK_FIELDS}
      }
    },
    headerCta[] {
      ${CTA_BTN_FIELDS}
    },
    stickyHeader,
    transparentHeader,
    topBanner {
      enabled,
      text,
      link,
      variant
    },
    "footerLogo": footerLogo {
      alt,
      "url": asset->url,
      iconSvg
    },
    footerTagline,
    footerCta[] {
      ${CTA_BTN_FIELDS}
    },
    footerNavigation[] {
      ${LINK_FIELDS},
      children[] {
        ${LINK_FIELDS},
        logo {
          alt,
          "url": asset->url,
          iconSvg
        }
      }
    },
    footerCopyright,
    footerCredits,
    "footerDescription": bottomDescription,
    googleAnalyticsId,
    googleTagManagerId,
    headerScripts,
    footerScripts,
    maintenanceMode {
      enabled,
      message
    }
  }
`

/**
 * Query to fetch only SEO-related settings
 */
export const SEO_SETTINGS_QUERY = groq`
  *[_type == "globalConfiguration" && _id == "globalConfiguration"][0] {
    title,
    description,
    seo { ${SEO_FIELDS} }
  }
`

/**
 * Query to fetch only navigation settings
 */
export const NAVIGATION_QUERY = groq`
  *[_type == "globalConfiguration" && _id == "globalConfiguration"][0] {
    headerNavigation[] {
      ${LINK_FIELDS},
      children[] {
        ${LINK_FIELDS}
      }
    },
    footerNavigation[] {
      ${LINK_FIELDS},
      children[] {
        ${LINK_FIELDS},
        logo {
          alt,
          "url": asset->url,
          iconSvg
        }
      }
    }
  }
`

/**
 * Query to fetch only analytics settings
 */
export const ANALYTICS_QUERY = groq`
  *[_type == "globalConfiguration" && _id == "globalConfiguration"][0] {
    googleAnalyticsId,
    googleTagManagerId
  }
`
