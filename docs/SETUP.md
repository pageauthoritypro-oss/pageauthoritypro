# Setup Guide

Complete setup instructions for Page Authority Pro.

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** 18.17 or later ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **Git** for version control
- **Sanity Account** ([Sign up free](https://www.sanity.io/))
- **Code Editor** (VS Code recommended)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd page-authority-pro
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create `.env.local` in the project root:

```bash
# Sanity configuration (REQUIRED)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"

# API Token (OPTIONAL - for live preview)
SANITY_API_TOKEN="your-token-here"

# Site URL (OPTIONAL - for Presentation mode)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Finding your Sanity Project ID:**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID

### 4. Start Development Server

```bash
pnpm dev
```

Open:

- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

🎉 **You're ready to develop!**

---

## 📦 Detailed Setup

### Creating a New Sanity Project

If you don't have a Sanity project yet:

1. **Go to Sanity Dashboard**:

   ```
   https://www.sanity.io/manage
   ```

2. **Create New Project**:
   - Click "Create Project"
   - Choose a project name
   - Select a plan (Free is fine for development)
   - Note your Project ID

3. **Create Dataset**:
   - Click on your project
   - Go to "Datasets" tab
   - Create "production" dataset
   - Set visibility to "Public" (for public websites)

---

### Getting a Sanity API Token

For real-time updates and draft mode, you need an API token:

1. **Go to API Settings**:

   ```
   https://sanity.io/manage/personal/tokens
   ```

2. **Create New Token**:
   - Click "Add API Token"
   - Name: "Page Authority Pro Dev"
   - Permissions: **Viewer** + **Editor**
   - Copy the token (you won't see it again!)

3. **Add to .env.local**:
   ```bash
   SANITY_API_TOKEN="sk_your_token_here"
   ```

⚠️ **Important**: Never commit `.env.local` to version control!

---

### Deploy Your Schema

Before adding content, deploy your schema to Sanity:

1. **Start dev server** (if not already running):

   ```bash
   pnpm dev
   ```

2. **Open Studio**:

   ```
   http://localhost:3000/studio
   ```

3. **Deploy Schema**:
   - Look for "Deploy" button in top right
   - Click to deploy your schema definitions
   - Wait for confirmation

---

## 🎨 Initial Content Setup

### 1. Create Site Settings (Required)

1. Go to Studio: http://localhost:3000/studio
2. Click **"Site Settings"** in the sidebar (with ⚙️ icon)
3. Fill in required fields:
   - Site Title
   - Description
   - Email (optional)
4. **Publish** (Ctrl/Cmd + P)

### 2. Add SEO Configuration

In Site Settings:

1. Scroll to **"Default SEO"** section
2. Add:
   - Meta Title (60 characters max)
   - Meta Description (160 characters max)
   - Keywords (comma-separated)
3. **Optional**: Add social media links
4. **Publish**

### 3. Configure Schema Markup (Recommended)

In Site Settings:

1. Scroll to **"Schema.org Markup"** field
2. Click **"Add Schema Markup"**
3. Select **"Organization"**
4. Fill in your organization details:
   - Name
   - URL
   - Logo
   - Description
5. **Publish**

### 4. Create Your First Page

1. Click **"Pages"** in sidebar
2. Click **"Create new Page"**
3. Fill in:
   - Title: "About"
   - Slug: "about"
   - Content: Add some text
4. **Optional**: Add SEO fields
5. **Publish**

### 5. View Your Page

Visit: http://localhost:3000/about

---

## 🔧 Development Tools Setup

### VS Code Extensions (Recommended)

Install these extensions for better DX:

```json
{
  "recommendations": [
    "sanity-io.vscode-sanity",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "unifiedjs.vscode-mdx"
  ]
}
```

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🌐 Deployment

### Deploying to Vercel

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Vercel auto-detects Next.js

3. **Add Environment Variables**:
   In Vercel dashboard → Settings → Environment Variables:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your-project-id
   NEXT_PUBLIC_SANITY_DATASET = production
   SANITY_API_TOKEN = your-token (optional)
   NEXT_PUBLIC_SITE_URL = https://yourdomain.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site! 🎉

### Setting up CORS in Sanity

Allow your domain to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **"API"** → **"CORS Origins"**
4. Add:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Check "Allow credentials"
6. Save

---

## 🧪 Testing Your Setup

### 1. Test Frontend

```bash
# Visit homepage
http://localhost:3000

# Should see default Next.js page or your content
```

### 2. Test Studio

```bash
# Visit Studio
http://localhost:3000/studio

# Should see Sanity login screen
# Log in with your Sanity account
```

### 3. Test Real-time Updates

1. Open page in browser: http://localhost:3000/about
2. Open Studio: http://localhost:3000/studio
3. Edit the "About" page in Studio
4. **Publish** changes
5. Watch the page update automatically! ✨

(Requires `SANITY_API_TOKEN` to be set)

### 4. Test Presentation Mode

1. Open Studio: http://localhost:3000/studio
2. Click **"Presentation"** tab
3. Select a page from sidebar
4. Edit content on the left
5. See preview on the right
6. Click any content to jump to editor

---

## 🔍 Troubleshooting

### "Missing SANITY_API_TOKEN" Warning

**Issue**: Console shows token warning

**Solution**: This is normal if you haven't set up the token yet. The app works fine without it, but you won't have:

- Real-time updates
- Draft mode
- Presentation mode

To enable these features, add `SANITY_API_TOKEN` to `.env.local` (see above).

---

### Studio Shows 404

**Issue**: `/studio` returns 404

**Solution**:

```bash
# Restart dev server
pnpm dev
```

If still not working, check `src/app/studio/[[...tool]]/page.tsx` exists.

---

### "Invalid Project ID" Error

**Issue**: Sanity can't connect

**Solutions**:

1. Double-check project ID in `.env.local`
2. Ensure variables start with `NEXT_PUBLIC_` for client-side
3. Restart dev server after changing `.env.local`
4. Clear `.next` cache:
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

### CORS Errors

**Issue**: "Origin not allowed" in console

**Solution**:

1. Add your domain to Sanity CORS settings
2. Include `http://localhost:3000` for development
3. Wait a few minutes for changes to propagate

---

### Images Not Loading

**Issue**: Sanity images return 404

**Solutions**:

1. Check image exists in Sanity Media library
2. Verify CORS settings include your domain
3. Check image URL format:
   ```typescript
   "imageUrl": image.asset->url
   ```
4. Use `urlFor()` helper for transformations

---

### TypeScript Errors

**Issue**: Type errors in IDE

**Solutions**:

1. Restart TypeScript server in VS Code:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"
2. Check `tsconfig.json` paths are correct
3. Ensure all types are exported from `src/sanity/types/`

---

### Build Fails

**Issue**: `pnpm build` errors

**Solutions**:

1. Check for TypeScript errors: `pnpm type-check`
2. Check for lint errors: `pnpm lint`
3. Clear cache:
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   pnpm build
   ```

---

## 📚 Next Steps

After setup, check out:

1. **[Developer Guide](./DEVELOPER_GUIDE.md)** - Learn the codebase
2. **[Architecture](./ARCHITECTURE.md)** - Understand the system
3. **[API Reference](./API_REFERENCE.md)** - Function documentation

---

## 🆘 Getting Help

- **Sanity Issues**: [sanity.io/help](https://www.sanity.io/help)
- **Next.js Issues**: [nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: Check the project's issue tracker

---

## ✅ Setup Checklist

- [ ] Node.js 18.17+ installed
- [ ] pnpm installed
- [ ] Sanity account created
- [ ] Sanity project created
- [ ] `.env.local` file created with credentials
- [ ] Dependencies installed (`pnpm install`)
- [ ] Dev server running (`pnpm dev`)
- [ ] Studio accessible at `/studio`
- [ ] Schema deployed in Studio
- [ ] Site Settings created and published
- [ ] First page created
- [ ] CORS configured in Sanity
- [ ] Real-time updates working (optional)

**All done? Start building! 🚀**
