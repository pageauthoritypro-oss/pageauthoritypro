# API Reference

Complete API documentation for Page Authority Pro.

---

## 📋 Table of Contents

- [Helper Functions](#helper-functions)
- [GROQ Queries](#groq-queries)
- [API Routes](#api-routes)
- [SEO Functions](#seo-functions)
- [TypeScript Types](#typescript-types)

---

## 🔧 Helper Functions

### Pages Helpers (`src/sanity/helpers/pages.ts`)

#### `getPage(slug: string): Promise<Page | null>`

Fetch a single page by slug with real-time updates.

**Parameters:**

- `slug` (string): The page slug

**Returns:** Promise resolving to Page object or null

**Example:**

```typescript
import { getPage } from "@/sanity/helpers/pages";

const page = await getPage("about");
if (page) {
  console.log(page.title); // Page title
}
```

---

#### `getAllPages(): Promise<Page[]>`

Fetch all published pages.

**Returns:** Promise resolving to array of Page objects

**Example:**

```typescript
import { getAllPages } from "@/sanity/helpers/pages";

const pages = await getAllPages();
pages.forEach((page) => console.log(page.title));
```

---

#### `getPagePaths(): Promise<string[]>`

Fetch all page slugs for static generation.

**Returns:** Promise resolving to array of slug strings

**Example:**

```typescript
import { getPagePaths } from "@/sanity/helpers/pages";

export async function generateStaticParams() {
  const paths = await getPagePaths();
  return paths.map((slug) => ({ slug }));
}
```

---

### Settings Helpers (`src/sanity/helpers/settings.ts`)

#### `getSiteSettings(options?: { cache?: boolean }): Promise<SiteSettings | null>`

Fetch complete site settings with optional caching.

**Parameters:**

- `options.cache` (boolean, default: `true`): Enable 5-minute cache

**Returns:** Promise resolving to SiteSettings object or null

**Example:**

```typescript
import { getSiteSettings } from "@/sanity/helpers/settings";

// With cache (recommended)
const settings = await getSiteSettings();

// Force fresh data
const freshSettings = await getSiteSettings({ cache: false });
```

---

#### `getSeoSettings(): Promise<AdvancedSeoSettings | null>`

Fetch only SEO settings from site settings.

**Returns:** Promise resolving to SEO settings or null

**Example:**

```typescript
import { getSeoSettings } from "@/sanity/helpers/settings";

const seo = await getSeoSettings();
```

---

#### `getNavigationSettings(): Promise<NavigationSettings | null>`

Fetch navigation settings (header and footer).

**Returns:** Promise resolving to navigation settings or null

**Example:**

```typescript
import { getNavigationSettings } from "@/sanity/helpers/settings";

const nav = await getNavigationSettings();
console.log(nav.headerNavigation); // Header menu items
console.log(nav.footerNavigation); // Footer menu items
```

---

#### `getAnalyticsSettings(): Promise<AnalyticsSettings | null>`

Fetch analytics configuration.

**Returns:** Promise resolving to analytics settings or null

**Example:**

```typescript
import { getAnalyticsSettings } from "@/sanity/helpers/settings";

const analytics = await getAnalyticsSettings();
if (analytics.googleAnalyticsId) {
  // Initialize GA
}
```

---

#### `clearSettingsCache(): void`

Manually clear the settings cache.

**Example:**

```typescript
import { clearSettingsCache } from "@/sanity/helpers/settings";

// After updating settings
clearSettingsCache();
```

---

#### `isMaintenanceMode(): Promise<boolean>`

Check if maintenance mode is enabled.

**Returns:** Promise resolving to boolean

**Example:**

```typescript
import { isMaintenanceMode } from '@/sanity/helpers/settings'

const isMaintenance = await isMaintenanceMode()
if (isMaintenance) {
  return <MaintenanceMessage />
}
```

---

## 📝 GROQ Queries

### Settings Queries (`src/sanity/queries/settings.ts`)

#### `SITE_SETTINGS_QUERY`

Fetch complete site settings document.

**Query:**

```groq
*[_type == "siteSettings" && _id == "siteSettings"][0] {
  _id,
  title,
  description,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  email,
  phone,
  address,
  seo { /* ... all SEO fields ... */ },
  socialMedia[] { platform, url },
  headerNavigation[] { /* ... nav fields ... */ },
  footerNavigation[] { /* ... nav fields ... */ },
  googleAnalyticsId,
  googleTagManagerId,
  facebookPixelId,
  headerScripts,
  footerScripts,
  maintenanceMode
}
```

---

#### `SEO_SETTINGS_QUERY`

Fetch only SEO settings.

---

#### `NAVIGATION_QUERY`

Fetch only navigation settings.

---

#### `ANALYTICS_QUERY`

Fetch only analytics IDs and scripts.

---

### Page Queries (`src/sanity/queries/pages.ts`)

#### `PAGE_QUERY`

Fetch a single page with all details.

**Parameters:** `$slug` (string)

**Query:**

```groq
*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  excerpt,
  publishedAt,
  "featuredImageUrl": featuredImage.asset->url,
  author-> {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    bio
  },
  seo { /* ... SEO fields ... */ }
}
```

---

#### `ALL_PAGES_QUERY`

Fetch all published pages.

---

#### `PAGE_PATHS_QUERY`

Fetch just the slugs for static generation.

**Returns:**

```json
["about", "contact", "blog"]
```

---

## 🚀 API Routes

### Settings API

#### `GET /api/settings`

Fetch site settings with optional filtering.

**Query Parameters:**

- `type` (optional): Filter type (`all` | `seo` | `navigation` | `analytics`)
- `cache` (optional): Enable caching (`true` | `false`, default: `true`)

**Response:**

```json
{
  "success": true,
  "data": {
    "title": "Site Title",
    "seo": {
      /* ... */
    },
    "socialMedia": [
      /* ... */
    ]
  }
}
```

**Examples:**

```bash
# Get all settings
GET /api/settings

# Get only SEO settings
GET /api/settings?type=seo

# Force fresh data
GET /api/settings?cache=false
```

**Status Codes:**

- `200` - Success
- `500` - Server error

---

#### `POST /api/settings/clear-cache`

Clear the settings cache.

**Response:**

```json
{
  "success": true,
  "message": "Cache cleared successfully"
}
```

**Example:**

```bash
POST /api/settings/clear-cache
```

---

### Draft Mode APIs

#### `GET /api/draft`

Enable draft mode and redirect to content.

**Query Parameters:**

- `slug` (required): Path to redirect to after enabling draft mode

**Example:**

```bash
GET /api/draft?slug=/about
```

**Behavior:**

1. Enables Next.js draft mode
2. Redirects to specified slug
3. Draft content becomes visible

---

#### `GET /api/disable-draft`

Disable draft mode and redirect.

**Query Parameters:**

- `redirect` (optional): Path to redirect to (default: `/`)

**Example:**

```bash
GET /api/disable-draft?redirect=/
```

---

#### `GET /api/draft-mode/enable`

Securely enable draft mode with preview URL secret validation.

**Query Parameters:**

- `secret` - Preview URL secret
- `slug` - Content to preview

**Note:** Used by Sanity Presentation mode.

---

#### `GET /api/draft-mode/disable`

Securely disable draft mode.

---

## 🎨 SEO Functions

### SEO Helpers (`src/sanity/helpers/seo.tsx`)

#### `generateMetadata(seo?: AdvancedSeoSettings, fallback?: object): Metadata`

Generate Next.js Metadata object from SEO settings.

**Parameters:**

- `seo` (AdvancedSeoSettings | undefined): SEO settings from content
- `fallback` (object | undefined): Fallback values
  - `title` (string | undefined)
  - `description` (string | undefined)
  - `url` (string | undefined)

**Returns:** Next.js `Metadata` object

**Example:**

```typescript
import { generateMetadata as genMeta } from "@/sanity/helpers/seo";

export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug);

  return genMeta(page?.seo, {
    title: page?.title,
    description: page?.excerpt,
  });
}
```

**Output:**

```typescript
{
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['https://...'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    images: ['https://...']
  }
}
```

---

#### `generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object`

Generate schema.org BreadcrumbList JSON-LD.

**Parameters:**

- `items` (array): Breadcrumb items with name and URL

**Returns:** JSON-LD object

**Example:**

```typescript
import { generateBreadcrumbSchema, renderJsonLd } from '@/sanity/helpers/seo'

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://example.com' },
  { name: 'Blog', url: 'https://example.com/blog' },
  { name: 'Post', url: 'https://example.com/blog/post' }
])

// In component:
return (
  <>
    {renderJsonLd(breadcrumbs)}
    {/* page content */}
  </>
)
```

---

#### `generateArticleSchema(page: Page, siteUrl: string): object | null`

Generate schema.org Article JSON-LD.

**Parameters:**

- `page` (Page): Page object with author
- `siteUrl` (string): Site base URL

**Returns:** JSON-LD object or null if no author

**Example:**

```typescript
import { generateArticleSchema, renderJsonLd } from '@/sanity/helpers/seo'

const page = await getPage('blog-post')
const articleSchema = generateArticleSchema(page, 'https://example.com')

return (
  <article>
    {articleSchema && renderJsonLd(articleSchema)}
    <h1>{page.title}</h1>
    {/* article content */}
  </article>
)
```

---

#### `renderJsonLd(data: any): JSX.Element`

Render JSON-LD script tag for schema markup.

**Parameters:**

- `data` (any): JSON-LD object

**Returns:** React script element

**Example:**

```typescript
import { renderJsonLd } from '@/sanity/helpers/seo'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Company Name'
}

return (
  <head>
    {renderJsonLd(schema)}
  </head>
)
```

**Output:**

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Company Name"
  }
</script>
```

---

## 📊 TypeScript Types

### Basic Types (`src/sanity/types/index.ts`)

#### `SiteSettings`

```typescript
interface SiteSettings {
  _id?: string;
  _rev?: string;
  title: string;
  description?: string;
  logoUrl?: string;
  faviconUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  seo?: AdvancedSeoSettings;
  socialMedia?: SocialMedia[];
  headerNavigation?: NavigationItem[];
  footerNavigation?: NavigationItem[];
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  headerScripts?: string;
  footerScripts?: string;
  maintenanceMode?: boolean;
}
```

---

#### `SocialMedia`

```typescript
interface SocialMedia {
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "tiktok"
    | "github";
  url: string;
}
```

---

#### `NavigationItem`

```typescript
interface NavigationItem {
  label: string;
  url: string;
  openInNewTab?: boolean;
  children?: NavigationItem[];
}
```

---

### Advanced Types (`src/sanity/types/advanced.ts`)

#### `AdvancedSeoSettings`

```typescript
interface AdvancedSeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImageUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterHandle?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schemaMarkup?: any;
  additionalMetaTags?: MetaTag[];
}
```

---

#### `Page`

```typescript
interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  content?: any; // Portable Text
  excerpt?: string;
  publishedAt?: string;
  featuredImageUrl?: string;
  author?: Author;
  seo?: AdvancedSeoSettings;
}
```

---

#### `Author`

```typescript
interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl?: string;
  bio?: string;
  email?: string;
  social?: SocialMedia[];
}
```

---

#### `MetaTag`

```typescript
interface MetaTag {
  name: string;
  content: string;
}
```

---

## 🔐 Environment Variables

### Required

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### Optional

```bash
# For real-time updates and draft mode
SANITY_API_TOKEN="sk..."

# For Presentation mode preview URLs
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 🧪 Response Examples

### Settings API Response

```json
{
  "success": true,
  "data": {
    "_id": "siteSettings",
    "title": "Page Authority Pro",
    "description": "Advanced SEO platform",
    "logoUrl": "https://cdn.sanity.io/images/...",
    "email": "contact@example.com",
    "seo": {
      "metaTitle": "Page Authority Pro - SEO Tools",
      "metaDescription": "Best SEO platform",
      "keywords": ["seo", "analytics"],
      "ogImageUrl": "https://...",
      "twitterCard": "summary_large_image"
    },
    "socialMedia": [
      { "platform": "twitter", "url": "https://twitter.com/..." },
      { "platform": "linkedin", "url": "https://linkedin.com/..." }
    ],
    "headerNavigation": [
      {
        "label": "Home",
        "url": "/",
        "openInNewTab": false
      },
      {
        "label": "About",
        "url": "/about",
        "openInNewTab": false,
        "children": [{ "label": "Team", "url": "/about/team" }]
      }
    ],
    "maintenanceMode": false
  }
}
```

---

## 📚 Usage Patterns

### Fetching Data in Pages

```typescript
// src/app/page.tsx
import { getSiteSettings } from '@/sanity/helpers/settings'

export default async function HomePage() {
  const settings = await getSiteSettings()

  return (
    <div>
      <h1>{settings?.title}</h1>
      <p>{settings?.description}</p>
    </div>
  )
}
```

### Generating Metadata

```typescript
// src/app/[slug]/page.tsx
import { Metadata } from "next";
import { getPage } from "@/sanity/helpers/pages";
import { generateMetadata as genMeta } from "@/sanity/helpers/seo";

export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug);
  return genMeta(page?.seo, { title: page?.title });
}
```

### Using Schema Markup

```typescript
import { generateArticleSchema, renderJsonLd } from '@/sanity/helpers/seo'

export default async function ArticlePage({ params }) {
  const page = await getPage(params.slug)
  const schema = generateArticleSchema(page, 'https://example.com')

  return (
    <>
      {schema && renderJsonLd(schema)}
      <article>{/* content */}</article>
    </>
  )
}
```

---

**Need more help?** Check the [Developer Guide](./DEVELOPER_GUIDE.md) or [Architecture docs](./ARCHITECTURE.md).
