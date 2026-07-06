# Developer Guide - Page Authority Pro

Welcome to the Page Authority Pro project! This guide will help you understand the project structure, coding patterns, and development workflow.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Development Workflow](#development-workflow)
- [Code Patterns](#code-patterns)
- [Data Flow](#data-flow)
- [Best Practices](#best-practices)
- [Common Tasks](#common-tasks)

---

## 🎯 Project Overview

Page Authority Pro is a Next.js 16 application with Sanity CMS integration for content management. The project features:

- Server-side rendering with Next.js App Router
- Real-time content updates with Sanity Live
- Visual editing with Sanity Presentation Mode
- Advanced SEO with schema.org markup
- Type-safe development with TypeScript

---

## 🛠 Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------||
| **Next.js** | 16.2.6 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |
| **pnpm** | Latest | Package manager |

### CMS & Data

| Technology | Version | Purpose |
|------------|---------|---------||
| **Sanity** | 5.28.0 | Headless CMS |
| **next-sanity** | 12.4.5 | Sanity integration for Next.js |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------||
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Accessible component system |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------||
| **React Hook Form** | 7.76.1 | Performant form management |
| **Zod** | 4.4.3 | TypeScript-first schema validation |

### State Management

| Technology | Version | Purpose |
|------------|---------|---------||
| **Zustand** | 5.0.14 | Lightweight state management |

---

## 📁 Folder Structure

```
page-authority-pro/
├── docs/                           # 📚 Documentation
│   ├── DEVELOPER_GUIDE.md         # This file
│   ├── ARCHITECTURE.md            # System architecture
│   ├── API_REFERENCE.md           # API documentation
│   └── SETUP.md                   # Setup instructions
│
├── src/
│   ├── app/                       # 🎯 Next.js App Router
│   │   ├── [slug]/               # Dynamic page routes
│   │   │   └── page.tsx          # Individual page rendering
│   │   ├── api/                  # API endpoints
│   │   │   ├── draft/           # Draft mode (simple)
│   │   │   ├── draft-mode/      # Draft mode (secure)
│   │   │   └── settings/        # Settings API
│   │   ├── studio/              # Sanity Studio route
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles
│   │
│   ├── sanity/                   # 🎨 Sanity CMS Integration
│   │   ├── helpers/             # Data fetching & utilities
│   │   │   ├── pages.ts        # Page data fetching
│   │   │   ├── settings.ts     # Settings data fetching
│   │   │   └── seo.tsx         # SEO metadata generation
│   │   ├── queries/            # GROQ queries
│   │   │   ├── pages.ts       # Page queries
│   │   │   └── settings.ts    # Settings queries
│   │   ├── types/             # TypeScript types
│   │   │   ├── index.ts       # Basic types
│   │   │   └── advanced.ts    # Advanced types with SEO
│   │   ├── lib/               # Core configuration
│   │   │   ├── client.ts      # Sanity clients (read & write)
│   │   │   ├── live.ts        # Sanity Live configuration
│   │   │   └── image.ts       # Image URL builder
│   │   ├── schemaTypes/       # Content schemas
│   │   │   ├── objects/       # Reusable schema objects
│   │   │   │   ├── advancedSeo.ts
│   │   │   │   ├── navigation.ts
│   │   │   │   ├── seo.ts
│   │   │   │   └── social.ts
│   │   │   ├── author.ts
│   │   │   ├── page.ts
│   │   │   ├── siteSettings.ts
│   │   │   └── index.ts
│   │   ├── env.ts            # Environment variables
│   │   └── structure.ts      # Studio sidebar structure
│   │
│   ├── components/            # ⚛️ React Components
│   │   ├── ui/               # shadcn/ui components
│   │   └── MaintenanceMode.tsx
│   ├── lib/                   # 🔧 Utilities
│   │   └── utils.ts          # Helper utilities (shadcn)
│   └── stores/                # 📦 Zustand stores (create as needed)
│
├── components.json            # shadcn/ui configuration
├── sanity.config.ts           # Sanity Studio configuration
├── sanity.cli.ts             # Sanity CLI configuration
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── .env.local                # Environment variables
```

---

## 🔄 Development Workflow

### 1. Starting the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access the application
http://localhost:3000       # Frontend
http://localhost:3000/studio # Sanity Studio
```

### 2. Working with Content

1. **Create/Edit Content**: Go to `/studio`
2. **Preview Changes**: Use Presentation Mode in Studio
3. **See Live Updates**: Changes appear in real-time on frontend

### 3. Development Cycle

```
1. Create/Update Schema (src/sanity/schemaTypes/)
   ↓
2. Deploy Schema (Studio will prompt)
   ↓
3. Create GROQ Query (src/sanity/queries/)
   ↓
4. Create TypeScript Types (src/sanity/types/)
   ↓
5. Create Helper Function (src/sanity/helpers/)
   ↓
6. Use in Page Component (src/app/)
```

---

## 💻 Code Patterns

### 1. Data Fetching Pattern

**Always use `sanityFetch` for real-time updates:**

```typescript
// ✅ CORRECT - Use sanityFetch
import { sanityFetch } from "@/sanity/lib/live";

export async function getPage(slug: string) {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });
  return data as Page | null;
}
```

```typescript
// ❌ WRONG - Don't use client.fetch directly
import { client } from "@/sanity/lib/client";

export async function getPage(slug: string) {
  return await client.fetch(PAGE_QUERY, { slug });
}
```

### 2. Schema Definition Pattern

**Keep schemas modular and under 300 lines:**

```typescript
// src/sanity/schemaTypes/page.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      type: "advancedSeo", // Reference reusable object
    }),
  ],
});
```

### 3. GROQ Query Pattern

**Keep queries in separate files by domain:**

```typescript
// src/sanity/queries/pages.ts
import { groq } from "next-sanity";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "featuredImageUrl": featuredImage.asset->url,
    seo {
      metaTitle,
      metaDescription,
      // ... other SEO fields
    }
  }
`;
```

### 4. Type Definition Pattern

**Define types matching your GROQ queries:**

```typescript
// src/sanity/types/advanced.ts
export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImageUrl?: string;
  seo?: AdvancedSeoSettings;
}
```

### 5. Page Component Pattern

**Server components with metadata generation:**

```typescript
// src/app/[slug]/page.tsx
import { Metadata } from 'next'
import { getPage } from '@/sanity/helpers/pages'
import { generateMetadata as genMeta } from '@/sanity/helpers/seo'

// Generate metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug)
  return genMeta(page?.seo, { title: page?.title })
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const paths = await getPagePaths()
  return paths.map((slug) => ({ slug }))
}

// Page component
export default async function Page({ params }) {
  const page = await getPage(params.slug)
  if (!page) notFound()

  return (
    <article>
      <h1>{page.title}</h1>
      {/* Render page content */}
    </article>
  )
}
```

### 6. Form Pattern with React Hook Form & Zod

**Use React Hook Form with Zod validation for type-safe forms:**

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

// Define validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" type="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <textarea {...register('message')} placeholder="Message" />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### 7. State Management Pattern with Zustand

**Use Zustand for client-side global state:**

```typescript
// src/stores/useAppStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
  toggleMenu: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    }),
    {
      name: 'app-storage', // localStorage key
    }
  )
)

// Usage in components:
'use client'

import { useAppStore } from '@/stores/useAppStore'

export function Navigation() {
  const { isMenuOpen, toggleMenu } = useAppStore()

  return (
    <nav>
      <button onClick={toggleMenu}>
        {isMenuOpen ? 'Close' : 'Open'} Menu
      </button>
      {isMenuOpen && <MobileMenu />}
    </nav>
  )
}
```

### 8. shadcn/ui Component Pattern

**Use shadcn/ui for consistent, accessible UI components:**

```typescript
// Import shadcn components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter text..." />
        <Button variant="default">Submit</Button>
        <Button variant="outline">Cancel</Button>
      </CardContent>
    </Card>
  )
}

// Add new components with CLI:
// pnpm dlx shadcn@latest add button card input dialog
```

### 9. Data Validation Pattern with Zod

**Use Zod for runtime validation and type inference:**

```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.enum(["general", "support", "sales"]),
  message: z.string().min(10).max(500),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
});

// Infer TypeScript type from schema
export type ContactInput = z.infer<typeof contactSchema>;

// Use in API route for validation
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validatedData = contactSchema.parse(body);

    // Process validated data
    // ... send email, save to DB, etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

---

## 🔄 Data Flow

### Content Creation to Display

```
1. Editor creates content in Studio (/studio)
   ↓
2. Content saved to Sanity dataset
   ↓
3. Frontend queries with sanityFetch
   ↓
4. Data transformed by helper functions
   ↓
5. Components render with typed data
   ↓
6. Real-time updates via SanityLive component
```

### SEO Metadata Flow

```
1. Editor fills SEO fields in Studio
   ↓
2. Page queries include seo object
   ↓
3. generateMetadata() uses SEO helper
   ↓
4. Next.js generates meta tags
   ↓
5. Schema markup rendered in <head>
```

---

## ✅ Best Practices

### 1. File Organization

- **Keep files under 350 lines** - Split into smaller modules if needed
- **Group by domain** - Related code stays together (queries/, helpers/, types/)
- **Use index files** - Export from index.ts for cleaner imports

### 2. Type Safety

```typescript
// ✅ Always type your data
const page: Page | null = await getPage(slug);

// ✅ Use type casting when needed
const data = result.data as Page | null;

// ❌ Avoid 'any'
const data: any = await fetch();
```

### 3. Error Handling

```typescript
// ✅ Handle errors gracefully
try {
  const data = await sanityFetch({ query });
  return data as Type | null;
} catch (error) {
  console.error("Error fetching data:", error);
  return null;
}
```

### 4. Environment Variables

```typescript
// ✅ Use centralized env file
// src/sanity/env.ts
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// ✅ Always have fallbacks for optional vars
const token = process.env.SANITY_API_TOKEN || undefined;
```

### 5. Caching Strategy

```typescript
// ✅ Cache expensive operations
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cache: { data: any; timestamp: number } | null = null;

if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
  return cache.data;
}
```

### 6. Forms & Validation

```typescript
// ✅ Always validate user input with Zod
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

// ✅ Use React Hook Form for performance
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});

// ❌ Don't validate manually
if (!email.includes("@")) {
  /* ... */
}
```

### 7. State Management

```typescript
// ✅ Use Zustand for global client state
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// ✅ Use React state for local component state
const [isOpen, setIsOpen] = useState(false);

// ❌ Don't use Zustand for everything
// Avoid global state for simple local UI state
```

### 8. UI Components

```typescript
// ✅ Use shadcn/ui components
import { Button } from '@/components/ui/button'

// ✅ Compose components for consistency
<Button variant="default" size="lg">Click me</Button>

// ✅ Add new components via CLI
// pnpm dlx shadcn@latest add dialog alert

// ❌ Don't create custom buttons from scratch
// Use shadcn variants instead
```

---

## 🎯 Common Tasks

### Adding a New Content Type

1. **Create Schema**:

```bash
src/sanity/schemaTypes/newType.ts
```

2. **Export in Index**:

```typescript
// src/sanity/schemaTypes/index.ts
import newType from "./newType";

export const schema = {
  types: [
    // ... existing types
    newType,
  ],
};
```

3. **Create Types**:

```bash
src/sanity/types/advanced.ts  # Add interface
```

4. **Create Query**:

```bash
src/sanity/queries/newType.ts
```

5. **Create Helper**:

```bash
src/sanity/helpers/newType.ts
```

### Adding a New Page Route

1. **Create Route Folder**:

```bash
src/app/new-route/page.tsx
```

2. **Fetch Data**:

```typescript
import { sanityFetch } from '@/sanity/lib/live'

export default async function NewPage() {
  const { data } = await sanityFetch({ query: YOUR_QUERY })
  return <div>{/* render */}</div>
}
```

3. **Add Metadata**:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return { title: "Page Title" };
}
```

### Adding an API Endpoint

1. **Create Route Handler**:

```bash
src/app/api/endpoint/route.ts
```

2. **Export HTTP Methods**:

```typescript
export async function GET(request: NextRequest) {
  const data = await fetchSomeData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // process data
  return NextResponse.json({ success: true });
}
```

### Updating SEO

1. **Edit in Studio**: Go to page → SEO section
2. **Or use Schema Markup Plugin**: For structured data
3. **Preview**: Use generateMetadata() helper

### Creating a Form with Validation

1. **Create Validation Schema**:

```bash
src/lib/validations/myForm.ts
```

```typescript
import { z } from "zod";

export const myFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

2. **Create Form Component**:

```bash
src/components/MyForm.tsx
```

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { myFormSchema, type MyFormData } from '@/lib/validations/myForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<MyFormData>({
    resolver: zodResolver(myFormSchema),
  })

  const onSubmit = async (data: MyFormData) => {
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <Input {...register('email')} type="email" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <Button type="submit">Submit</Button>
    </form>
  )
}
```

3. **Create API Handler**:

```bash
src/app/api/submit/route.ts
```

```typescript
import { NextRequest, NextResponse } from "next/server";
import { myFormSchema } from "@/lib/validations/myForm";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = myFormSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.errors }, { status: 400 });
  }

  // Process validated data
  return NextResponse.json({ success: true });
}
```

### Adding a shadcn/ui Component

1. **Browse Available Components**:

```bash
# Visit: https://ui.shadcn.com/docs/components
```

2. **Add Component via CLI**:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
```

3. **Use in Your Code**:

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Button variant="default">Click me</Button>
        <Button variant="outline">Cancel</Button>
      </CardContent>
    </Card>
  )
}
```

### Creating a Global Store with Zustand

1. **Create Store**:

```bash
src/stores/useCartStore.ts
```

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
```

2. **Use in Components**:

```typescript
'use client'

import { useCartStore } from '@/stores/useCartStore'

export function Cart() {
  const { items, addItem, removeItem } = useCartStore()

  return (
    <div>
      <h2>Cart ({items.length})</h2>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

---

## 🐛 Debugging Tips

### Common Issues

**1. TypeScript Errors with sanityFetch**

```typescript
// Solution: Use type casting
const { data } = await sanityFetch({ query });
const typedData = data as YourType | null;
```

**2. Live Updates Not Working**

- Check `SANITY_API_TOKEN` is set in `.env.local`
- Verify `<SanityLive />` component is in layout
- Ensure using `sanityFetch` not `client.fetch`

**3. Draft Mode Issues**

- Token needs Editor permissions
- Preview URL secret must match
- Check `/api/draft` endpoint exists

**4. Schema Changes Not Appearing**

- Deploy schema in Studio (top right)
- Restart dev server if needed
- Clear browser cache

---

## 📚 Additional Resources

- [Next.js 16 Docs](https://nextjs.org/docs) - Framework documentation
- [Sanity Docs](https://www.sanity.io/docs) - CMS documentation
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet) - Query language
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Follow the code patterns documented here
3. Keep files modular and under 350 lines
4. Add TypeScript types for all data
5. Test in both dev and production modes
6. Update documentation if needed

---

## 💡 Pro Tips

- Use `pnpm dev --turbo` for faster development
- Install the Sanity VS Code extension for schema autocomplete
- Use Chrome DevTools to inspect server components
- Check Network tab for slow queries
- Monitor bundle size with `pnpm build`

---

**Happy Coding! 🚀**
