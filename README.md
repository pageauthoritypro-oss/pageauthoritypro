# Page Authority Pro Deploy

A modern Next.js 16 application with Sanity CMS integration, featuring real-time content updates, advanced SEO, and visual editing capabilities

---

## 🚀 Features

- ⚡ **Next.js 16** with App Router and Server Components
- 🎨 **Sanity CMS** for flexible content management
- 🔄 **Real-time Updates** with Sanity Live
- 👁️ **Visual Editing** with Presentation Mode
- 🎯 **Advanced SEO** with schema.org markup
- 📱 **Responsive Design** with Tailwind CSS
- 🔒 **Type-safe** development with TypeScript
- ⚙️ **Singleton Settings** for site configuration
- 📋 **Forms** with React Hook Form & Zod validation
- 🎨 **UI Components** with shadcn/ui
- 🗂️ **State Management** with Zustand

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

- **[Setup Guide](./docs/SETUP.md)** - Get started in 5 minutes
- **[Developer Guide](./docs/DEVELOPER_GUIDE.md)** - Learn the codebase
- **[Architecture](./docs/ARCHITECTURE.md)** - Understand the system
- **[API Reference](./docs/API_REFERENCE.md)** - Function documentation

---

## 🏁 Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm package manager
- Sanity account

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials

# Start development server
pnpm dev
```

Visit:

- **Frontend**: http://localhost:3000
- **Studio**: http://localhost:3000/studio

For detailed setup instructions, see [Setup Guide](./docs/SETUP.md).

---

## 📁 Project Structure

```
page-authority-pro/
├── docs/                    # 📚 Documentation
├── src/
│   ├── app/                # 🎯 Next.js App Router
│   ├── sanity/             # 🎨 Sanity CMS
│   │   ├── helpers/       # Data fetching
│   │   ├── queries/       # GROQ queries
│   │   ├── types/         # TypeScript types
│   │   ├── lib/           # Core config
│   │   └── schemaTypes/   # Content schemas
│   └── components/         # ⚛️ React components
├── sanity.config.ts        # Sanity Studio config
└── next.config.ts          # Next.js config
```

See [Developer Guide](./docs/DEVELOPER_GUIDE.md#-folder-structure) for detailed explanation.

---

## 🛠 Tech Stack

| Technology      | Purpose           |
| --------------- | ----------------- |
| Next.js 16      | React framework   |
| React 19        | UI library        |
| TypeScript      | Type safety       |
| Sanity 5        | Headless CMS      |
| Tailwind CSS    | Styling           |
| shadcn/ui       | Component library |
| React Hook Form | Form management   |
| Zod             | Schema validation |
| Zustand         | State management  |
| pnpm            | Package manager   |

---

## 📝 Available Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Check TypeScript

# Sanity
pnpm sanity      # Run Sanity CLI commands
```

---

## 🎯 Key Features Explained

### Real-time Content Updates

Content changes in Sanity Studio appear instantly on the frontend without page refresh, powered by Sanity Live.

### Visual Editing

Use Presentation Mode to edit content while seeing a live preview of your site. Click any element to jump to its editor.

### Advanced SEO

- Open Graph tags
- Twitter Cards
- Schema.org markup (via plugin)
- Canonical URLs
- Custom meta tags
- Per-page SEO configuration

### Singleton Site Settings

Global site configuration managed through a single settings document, preventing duplicate entries.

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy! 🎉

See [Setup Guide - Deployment](./docs/SETUP.md#-deployment) for detailed instructions.

---

## 📖 Learning Resources

### For New Developers

1. **[Setup Guide](./docs/SETUP.md)** - Get the app running
2. **[Developer Guide](./docs/DEVELOPER_GUIDE.md)** - Learn the codebase
3. **[API Reference](./docs/API_REFERENCE.md)** - Function lookups

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

## 🐛 Troubleshooting

Common issues and solutions are documented in the [Setup Guide - Troubleshooting](./docs/SETUP.md#-troubleshooting) section.

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Follow the code patterns in [Developer Guide](./docs/DEVELOPER_GUIDE.md#-code-patterns)
4. Test thoroughly
5. Update documentation if needed
6. Submit a pull request

---

## 📄 License

[Your License Here]

---

## 🙏 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/) by Vercel
- [Sanity](https://www.sanity.io/) CMS
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---
