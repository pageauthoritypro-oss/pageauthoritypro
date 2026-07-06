# Code Examples

Real-world examples demonstrating how to use the project's tech stack.

---

## 📋 Table of Contents

- [Form with Validation](#form-with-validation)
- [Global State Management](#global-state-management)
- [UI Component Composition](#ui-component-composition)
- [Complete Feature Example](#complete-feature-example)

---

## 📝 Form with Validation

### Contact Form Example

This example shows a complete contact form with validation, error handling, and submission.

**Step 1: Define Validation Schema**

```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.enum(["general", "support", "feedback"], {
    required_error: "Please select a subject",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters"),
  newsletter: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Step 2: Create Form Component**

```typescript
// src/components/ContactForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

export function ContactForm() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      newsletter: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      toast({
        title: 'Success!',
        description: 'Your message has been sent.',
      })

      reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Select onValueChange={(value) => setValue('subject', value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Your message..."
          rows={5}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          {...register('newsletter')}
        />
        <Label htmlFor="newsletter" className="font-normal">
          Subscribe to newsletter
        </Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

**Step 3: Create API Route**

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body);

    // TODO: Send email, save to database, etc.
    console.log("Contact form submission:", validatedData);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
```

---

## 🗂️ Global State Management

### Shopping Cart Store Example

```typescript
// src/stores/useCartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item,
              ),
            };
          }

          return { items: [...state.items, newItem] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

**Using the Cart Store:**

```typescript
// src/components/CartButton.tsx
'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'

export function CartButton() {
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()

  return (
    <Button variant="outline" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}

// src/components/ProductCard.tsx
'use client'

import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="text-lg font-bold">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

## 🎨 UI Component Composition

### Modal Dialog with Form

```typescript
// src/components/AddItemDialog.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
})

type ItemFormData = z.infer<typeof itemSchema>

export function AddItemDialog() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  })

  const onSubmit = async (data: ItemFormData) => {
    // Handle submission
    console.log(data)
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Fill in the details for the new item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register('description')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 🚀 Complete Feature Example

### User Settings Page

This example combines all technologies: Sanity data, forms, validation, state, and UI components.

```typescript
// src/app/settings/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bio: z.string().max(200).optional(),
})

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  darkMode: z.boolean(),
  language: z.enum(['en', 'es', 'fr']),
})

type ProfileData = z.infer<typeof profileSchema>
type PreferencesData = z.infer<typeof preferencesSchema>

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('profile')

  // Profile form
  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: '',
    },
  })

  // Preferences form
  const preferencesForm = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      darkMode: false,
      language: 'en',
    },
  })

  const onProfileSubmit = async (data: ProfileData) => {
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      })
    }
  }

  const onPreferencesSubmit = async (data: PreferencesData) => {
    try {
      await fetch('/api/user/preferences', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      toast({
        title: 'Preferences updated',
        description: 'Your preferences have been saved.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update preferences.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...profileForm.register('name')} />
                  {profileForm.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...profileForm.register('email')} />
                  {profileForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" {...profileForm.register('bio')} />
                </div>

                <Button type="submit">Save Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    {...preferencesForm.register('emailNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark theme
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    {...preferencesForm.register('darkMode')}
                  />
                </div>

                <Button type="submit">Save Preferences</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## 📚 More Examples

For more examples, check:

- [Developer Guide - Code Patterns](./DEVELOPER_GUIDE.md#-code-patterns)
- [API Reference - Usage Patterns](./API_REFERENCE.md)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

**Need help?** See the [Developer Guide](./DEVELOPER_GUIDE.md) for detailed explanations.
