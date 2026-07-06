# Architecture Documentation

## 🏗️ System Architecture

Page Authority Pro follows a modern JAMstack architecture with server-side rendering and real-time content updates.

---

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
             │ Frontend                       │ CMS
             ↓                                ↓
┌────────────────────────────┐   ┌───────────────────────────┐
│                            │   │                           │
│      Next.js Frontend      │←──│    Sanity Studio         │
│      (App Router)          │   │    (/studio)             │
│                            │   │                           │
│  • Server Components       │   │  • Content Editor         │
│  • Client Components       │   │  • Schema Manager         │
│  • API Routes              │   │  • Presentation Mode      │
│  • Static Generation       │   │  • Real-time Preview      │
│                            │   │                           │
└────────┬───────────────────┘   └────────┬──────────────────┘
         │                                │
         │ Fetch Data                     │ Publish Content
         ↓                                ↓
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                    Sanity Cloud                              │
│                                                              │
│  • Content Lake (Dataset: production)                        │
│  • GROQ Query Engine                                         │
│  • CDN for Images                                            │
│  • Real-time Updates (Sanity Live)                           │
│  • Draft/Published Versions                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Component Architecture

### Frontend Layers

```
┌──────────────────────────────────────────────┐
│           Presentation Layer                  │
│  (src/app/, src/components/)                 │
│                                              │
│  • Next.js Pages (Server Components)         │
│  • React Components                          │
│  • Metadata Generation                       │
│  • SEO Implementation                        │
└──────────────┬───────────────────────────────┘
               │
               │ Uses
               ↓
┌──────────────────────────────────────────────┐
│           Business Logic Layer                │
│  (src/sanity/helpers/)                       │
│                                              │
│  • Data Fetching Functions                   │
│  • SEO Helpers                               │
│  • Cache Management                          │
│  • Data Transformations                      │
└──────────────┬───────────────────────────────┘
               │
               │ Executes
               ↓
┌──────────────────────────────────────────────┐
│           Data Access Layer                   │
│  (src/sanity/queries/)                       │
│                                              │
│  • GROQ Queries                              │
│  • Query Parameters                          │
│  • Data Projection                           │
└──────────────┬───────────────────────────────┘
               │
               │ Via
               ↓
┌──────────────────────────────────────────────┐
│           Infrastructure Layer                │
│  (src/sanity/lib/)                           │
│                                              │
│  • Sanity Clients                            │
│  • Live Configuration                        │
│  • Environment Setup                         │
└──────────────┬───────────────────────────────┘
               │
               │ Connects to
               ↓
┌──────────────────────────────────────────────┐
│           External Services                   │
│                                              │
│  • Sanity Cloud API                          │
│  • Sanity CDN                                │
└──────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

### Read Flow (Content Display)

```
User Request
    ↓
Next.js Page Component (Server Component)
    ↓
Helper Function (src/sanity/helpers/)
    ↓
sanityFetch() + GROQ Query
    ↓
Sanity Cloud API
    ↓
Response Data (JSON)
    ↓
Type Casting (TypeScript Types)
    ↓
Return to Page Component
    ↓
Render HTML
    ↓
Send to User
    ↓
<SanityLive /> establishes WebSocket
    ↓
Real-time Updates Stream
```

### Write Flow (Content Creation)

```
Editor in Studio
    ↓
Sanity Studio Form
    ↓
Schema Validation
    ↓
POST to Sanity API (with token)
    ↓
Save to Dataset
    ↓
Trigger Webhooks (if configured)
    ↓
Real-time Updates via Sanity Live
    ↓
Frontend Auto-updates
```

---

## 📦 Module Dependencies

```
src/app/
  ├─→ src/sanity/helpers/     (Data fetching)
  ├─→ src/sanity/types/       (Type definitions)
  └─→ src/components/         (UI components)

src/sanity/helpers/
  ├─→ src/sanity/queries/     (GROQ queries)
  ├─→ src/sanity/types/       (Type definitions)
  └─→ src/sanity/lib/         (Sanity clients)

src/sanity/queries/
  └─→ (No dependencies)       (Pure GROQ strings)

src/sanity/lib/
  └─→ src/sanity/env.ts       (Environment config)

src/sanity/schemaTypes/
  ├─→ src/sanity/schemaTypes/objects/ (Reusable objects)
  └─→ (No runtime dependencies)
```

---

## 🎯 Request Flow Examples

### 1. Homepage Request

```
1. GET /
2. src/app/page.tsx renders
3. No Sanity data needed (static content)
4. Returns HTML
```

### 2. Dynamic Page Request

```
1. GET /about
2. src/app/[slug]/page.tsx matches route
3. Calls getPage('about') from helpers/pages.ts
4. Executes PAGE_QUERY with sanityFetch
5. Sanity returns page data
6. generateMetadata() creates SEO tags
7. Component renders with data
8. HTML sent to browser
9. <SanityLive /> connects for real-time updates
```

### 3. API Request

```
1. GET /api/settings?type=seo
2. src/app/api/settings/route.ts handles request
3. Calls getSeoSettings() from helpers/settings.ts
4. Executes SEO_SETTINGS_QUERY
5. Caches result (5 minutes)
6. Returns JSON response
```

### 4. Draft Mode Request

```
1. GET /api/draft?slug=/about
2. Enables draftMode()
3. Redirects to /about
4. Page fetches draft content
5. Shows unpublished changes
6. Visual editing enabled
```

---

## 🔐 Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────┐
│              Public Access                   │
│  • Frontend pages (read-only)                │
│  • Published content                         │
│  • No authentication required                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            Studio Access                     │
│  • Sanity OAuth (managed by Sanity)          │
│  • Project members only                      │
│  • Role-based permissions                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            API Token Access                  │
│  • SANITY_API_TOKEN for:                     │
│    - Draft content reading                   │
│    - Real-time updates                       │
│    - Presentation mode                       │
│  • Stored in .env.local (not committed)      │
└─────────────────────────────────────────────┘
```

### Environment Variables

```
NEXT_PUBLIC_* → Exposed to browser
SANITY_* → Server-side only (secure)
```

---

## 🚀 Deployment Architecture

### Production Setup

```
┌────────────────────────────────────────────┐
│          Vercel / Your Hosting              │
│                                            │
│  • Static pages (SSG)                       │
│  • Server functions (SSR)                   │
│  • API routes                              │
│  • Edge functions (optional)                │
└────────────┬───────────────────────────────┘
             │
             │ Fetches from
             ↓
┌────────────────────────────────────────────┐
│          Sanity Cloud                       │
│                                            │
│  • Production dataset                       │
│  • Image CDN                               │
│  • API endpoints                           │
│  • WebSocket for live updates              │
└────────────────────────────────────────────┘
```

### Build Process

```
1. pnpm install (Install dependencies)
2. next build (Build Next.js app)
   ├─ Static pages generated (SSG)
   ├─ Server functions bundled
   └─ Client JavaScript bundled
3. Deploy to hosting platform
4. Set environment variables
5. Connect to Sanity Cloud
```

---

## 📊 Caching Strategy

### Multi-Level Caching

```
┌─────────────────────────────────────────────┐
│         Browser Cache (Client)               │
│  • Static assets (images, JS, CSS)           │
│  • Next.js automatic caching                 │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│         Application Cache (Server)           │
│  • Settings: 5 minutes                       │
│  • Custom: In-memory caching                 │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│         Next.js Cache                        │
│  • fetch() requests                          │
│  • generateStaticParams results             │
│  • revalidate: 0 for live data              │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│         Sanity CDN                           │
│  • Images                                    │
│  • Global edge cache                         │
└─────────────────────────────────────────────┘
```

---

## 🔄 Real-Time Updates Architecture

```
Frontend (Browser)
    │
    │ 1. Initial Page Load
    ↓
<SanityLive /> Component Mounts
    │
    │ 2. Establishes WebSocket Connection
    ↓
Sanity Live API
    │
    │ 3. Listens for Content Changes
    ↓
Editor Publishes Content in Studio
    │
    │ 4. Change Event Broadcast
    ↓
WebSocket sends update to connected clients
    │
    │ 5. Frontend receives update
    ↓
React re-renders with new data
    │
    │ 6. UI updates without page refresh
    ↓
User sees updated content
```

---

## 🧩 Schema Architecture

### Schema Organization

```
schemaTypes/
├── documents/           (Top-level content types)
│   ├── page.ts         (Pages)
│   ├── author.ts       (Authors)
│   └── siteSettings.ts (Singleton)
│
└── objects/            (Reusable field groups)
    ├── seo.ts          (Basic SEO)
    ├── advancedSeo.ts  (Advanced SEO)
    ├── social.ts       (Social media)
    └── navigation.ts   (Nav items)
```

### Schema Relationships

```
siteSettings (singleton)
  ├─→ advancedSeo (object)
  ├─→ navigation[] (array of objects)
  └─→ social[] (array of objects)

page (document)
  ├─→ advancedSeo (object)
  └─→ author (reference to author document)

author (document)
  └─→ social[] (array of objects)
```

---

## 🎨 Styling Architecture

```
Global Styles (globals.css)
    │
    ├─→ Tailwind Base Layers
    ├─→ Tailwind Components
    └─→ Tailwind Utilities
         │
         └─→ Custom Utility Classes

Component-Level Styles
    │
    └─→ Inline Tailwind Classes
         │
         └─→ Responsive & State Variants
```

---

## 📝 Type System Architecture

```
TypeScript Types (src/sanity/types/)
    │
    ├─→ index.ts (Basic types)
    │   ├─ SiteSettings
    │   ├─ SeoSettings
    │   └─ NavigationItem
    │
    └─→ advanced.ts (Extended types)
        ├─ AdvancedSeoSettings
        ├─ Page
        ├─ Author
        └─ MetaTag

GROQ Queries → Match TypeScript Interfaces
    │
    └─→ Type Safety enforced at compile time
```

---

## 🔧 Configuration Files

```
Root Configuration:
├─ next.config.ts        → Next.js settings
├─ sanity.config.ts      → Studio configuration
├─ sanity.cli.ts         → CLI settings
├─ tsconfig.json         → TypeScript config
├─ tailwind.config.ts    → Tailwind settings
├─ postcss.config.mjs    → PostCSS config
└─ .env.local            → Environment variables

Source Configuration:
└─ src/sanity/
   ├─ env.ts             → Centralized env vars
   ├─ structure.ts       → Studio sidebar
   └─ lib/
      ├─ client.ts       → Sanity clients
      └─ live.ts         → Live configuration
```

---

This architecture provides:

- ✅ **Scalability**: Modular structure for growth
- ✅ **Maintainability**: Clear separation of concerns
- ✅ **Performance**: Multi-level caching
- ✅ **Type Safety**: End-to-end TypeScript
- ✅ **Real-time**: Live content updates
- ✅ **SEO**: Server-side rendering + metadata
