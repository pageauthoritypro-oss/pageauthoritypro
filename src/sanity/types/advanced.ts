import type { PortableTextBlock } from '@portabletext/react';
import {
  SocialMedia,
  NavigationItem,
  MaintenanceMode,
  CtaBtn,
  PageSection,
  SanityLogoItem,
} from "."

export interface AdvancedSeoSettings {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: {
    asset?: {
      _ref: string
    }
  }
  ogImageUrl?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterHandle?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
  schemaMarkup?: Record<string, unknown> // Schema.org JSON-LD
  additionalMetaTags?: Array<{
    name: string
    content: string
  }>
}

export interface SiteSettings {
  _id?: string
  _rev?: string
  title: string
  description?: string
  logoUrl?: string
  logoSvg?: string
  headerLogoUrl?: string
  headerLogoSvg?: string
  faviconUrl?: string
  seo?: AdvancedSeoSettings
  socialMedia?: SocialMedia[]
  headerNavigation?: NavigationItem[]
  footerLogo?: SanityLogoItem
  footerTagline?: string
  footerCta?: CtaBtn
  footerNavigation?: NavigationItem[]
  footerCopyright?: string
  footerCredits?: string
  footerDescription?: string
  googleAnalyticsId?: string
  googleTagManagerId?: string
  headerScripts?: string
  footerScripts?: string
  maintenanceMode?: MaintenanceMode
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  imageUrl?: string
  bio?: string
  email?: string
  social?: SocialMedia[]
}

export interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  enableSmoothScroll?: boolean
  sections?: PageSection[]
  seo?: AdvancedSeoSettings
}

export interface SettingsCache {
  data: SiteSettings | null
  timestamp: number
}

export interface MetaTag {
  name?: string
  property?: string
  content: string
}

export interface CaseStudyTag {
  _id: string
  _type: 'caseStudyTag'
  title: string
  slug: {
    current: string
  }
}

export interface CaseStudyMetric {
  _key?: string
  value: string
  label?: string
  isHighlighted?: boolean
  variant?: 'brand' | 'secondary' | 'destructive' | 'transparent'
}

export interface CaseStudy {
  _id: string
  _type: 'caseStudy'
  title: string
  slug: {
    current: string
  }
  image?: {
    asset?: {
      _ref: string
    }
  }
  description?: string
  excerpt?: string
  location?: {
    _ref: string
    _type: 'reference'
  }
  tags?: Array<{
    _ref: string
    _type: 'reference'
  }>
  publishedAt?: string
  author?: {
    _ref: string
    _type: 'reference'
  }
  body?: PortableTextBlock[]
  hideSidebar?: boolean
  aboutAuthorTitle?: string
  showViewAllBlogs?: boolean
  authorBottomText?: string
  bookCallCard?: BookCallCard
  sharePost?: SharePost
  seo?: AdvancedSeoSettings
  caseStudyMetrics?: CaseStudyMetric[]
}

export interface MetricWithGraphItem {
  _key?: string
  number: string
  label: string
  graphImage?: {
    asset?: {
      _ref: string
    }
  }
  graphImageUrl?: string
  graphImageSvg?: string
  variant?: 'brand' | 'secondary' | 'destructive' | 'transparent'
}

export interface GrowthMetricsSection {
  _type: 'growthMetricsSection'
  _key: string
  eyebrow?: string
  header: {
    heading?: Array<{ text: string; highlight?: boolean; variant?: string }>
    description?: string
    cta_btn?: Array<{
      cta_text: string
      url: string
      variant?: string
      target?: string
    }>
    cta_button_position?: 'top' | 'center' | 'bottom'
  }
  metrics: MetricWithGraphItem[]
}

export interface ServicesSection {
  _type: 'servicesSection'
  _key: string
  eyebrow?: string
  header: {
    heading?: Array<{ text: string; highlight?: boolean; variant?: string }>
    description?: string
    cta_btn?: Array<{
      cta_text: string
      url: string
      variant?: string
      target?: string
    }>
    cta_button_position?: 'top' | 'center' | 'bottom'
  }
  services: Array<{
    _key: string
    title: string
    description?: string
    icon: string
  }>
  columns?: number
}

export interface CardWithLink {
  _key: string
  title: string
  description?: string
  icon?: SanityLogoItem
  badge?: string
  link?: {
    label?: string
    url?: string
    target?: '_self' | '_blank'
  }
}

export interface SeoFeaturesSection {
  _type: 'seoFeaturesSection'
  _key: string
  eyebrow?: string
  header: {
    heading?: Array<{ text: string; highlight?: boolean; variant?: string }>
    description?: string
    cta_btn?: Array<{
      cta_text: string
      url: string
      variant?: string
      target?: string
    }>
    cta_button_position?: 'top' | 'center' | 'bottom'
  }
  cards: CardWithLink[]
  columns?: number
}

export interface BlogCategory {
  _id: string
  _type: 'blogCategory'
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface BookCallCard {
  _type: 'bookCallCard'
  icon?: SanityLogoItem
  heading: string
  description?: string
  ctas?: CtaBtn[]
}

export interface SharePost {
  _type: 'sharePost'
  heading: string
  platforms?: Array<'twitter' | 'facebook' | 'linkedin' | 'copyLink'>
}

export interface ChecklistCheckpoint {
  _key: string
  icon: 'checkCircle' | 'check' | 'cancel'
  text: string
}

export interface ChecklistBlock {
  _type: 'checklistBlock'
  _key: string
  checklist: ChecklistCheckpoint[]
}

export interface IconCardItem {
  _key: string
  icon: string
  title: string
  subtitle?: string
}

export interface IconCardList {
  _type: 'iconCardList'
  _key: string
  cards: IconCardItem[]
}

export interface MetricCard {
  _key: string
  value: string
  label: string
}

export interface ResultsBlock {
  _type: 'resultsBlock'
  _key: string
  metrics: MetricCard[]
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  author: string
  designation: string
  rating: number
  quote: string
  avatar?: {
    asset?: {
      _ref: string
    }
  }
}

export interface TestimonialReference {
  _ref: string
  _type: 'reference'
  _id?: string
  author?: string
  designation?: string
  rating?: number
  quote?: string
  avatar?: {
    asset?: {
      _ref: string
    }
  }
}

export interface TestimonialBlock {
  _type: 'testimonialBlock'
  _key: string
  title: string
  testimonials: TestimonialReference[]
}

export interface Location {
  _id: string
  _type: 'location'
  name: string
  slug: {
    current: string
  }
  area: string
}


export interface DetailedCheckpointItem {
  _key: string
  icon: 'checkCircle' | 'check' | 'cancel'
  text: string
}

export interface DetailedCardItem {
  _key: string
  badgeNumber?: string
  title: string
  description?: string
  checklistTitle?: string
  checkpoints: DetailedCheckpointItem[]
}

export interface DetailedCardsGrid {
  _type: 'detailedCardsGrid'
  _key: string
  cards: DetailedCardItem[]
}

export interface Blog {
  _id: string
  _type: 'blog'
  title: string
  slug: {
    current: string
  }
  description: string
  excerpt?: string
  image?: {
    asset?: {
      _ref: string
    }
  }
  category: {
    _ref: string
    _type: 'reference'
  }
  publishedAt: string
  author: {
    _ref: string
    _type: 'reference'
  }
  body?: PortableTextBlock[]
  hideSidebar?: boolean
  aboutAuthorTitle?: string
  showViewAllBlogs?: boolean
  authorBottomText?: string
  bookCallCard?: BookCallCard
  sharePost?: SharePost
  seo?: AdvancedSeoSettings
}




