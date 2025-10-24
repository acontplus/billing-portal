# AcontPlus Billing Portal

A modern, production-ready Next.js 16 billing portal for AcontPlus customers to securely access and manage their Ecuadorian electronic invoicing documents (SRI).

## 🚀 Features

- 🔐 **Secure Authentication** - Complete registration and login system with Supabase
- 📄 **Document Management** - View, download, and manage billing documents (PDF/XML)
- 🌓 **Dark/Light Mode** - Theme toggle with system preference support
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Built with shadcn/ui and Radix UI components
- 🔒 **Protected Routes** - Middleware-based authentication protection
- 📊 **Dashboard** - Overview of document counts and quick actions
- 📝 **Access Logging** - Document access tracking for compliance
- ⚡ **Performance** - Next.js 16 with App Router and Turbopack
- 🛡️ **Type Safety** - Full TypeScript coverage with Zod validation

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with OKLCH color system
- **UI Components**: shadcn/ui and Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 📋 Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm
- Supabase account and project

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/acontplus/billing-portal.git
cd billing-portal
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Gateway
NEXT_PUBLIC_API_GATEWAY_URL=

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

Set up your Supabase database using the SQL scripts in [SETUP.md](./SETUP.md):

- Profiles table with RLS policies
- Document access logs table
- Customer preferences table

### 4. Development

```bash
# Start development server
npm run dev

# Format code
npm run format

# Lint code
npm run lint:fix

# Type check
npm run type-check
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
billing-portal/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Dashboard page
│   ├── documents/           # Documents management
│   ├── login/              # Authentication
│   ├── register/           # User registration
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── layout/             # Layout components
│   │   └── header.tsx      # Navigation header
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   ├── input.tsx       # Input component
│   │   ├── label.tsx       # Label component
│   │   └── table.tsx       # Table component
│   ├── theme-provider.tsx  # Theme context
│   └── theme-toggle.tsx    # Theme switcher
├── lib/                     # Utilities
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript definitions
│   └── index.ts            # Type definitions
├── middleware.ts           # Auth middleware
├── .env.example            # Environment template
├── .env.local              # Local environment (ignored)
├── .env.production         # Production environment (ignored)
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore rules
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Dependencies and scripts
├── SETUP.md                # Detailed setup guide
└── PROJECT_SUMMARY.md      # Implementation summary
```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Supabase
- `npm run supabase:start` - Start local Supabase
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:status` - Check Supabase status
- `npm run supabase:reset` - Reset database and apply migrations
- `npm run supabase:migration:new` - Create new migration
- `npm run supabase:db:push` - Push changes to remote database
- `npm run supabase:db:pull` - Pull schema from remote database
- `npm run supabase:generate:types` - Generate TypeScript types
- `npm run supabase:seed` - Reset database with seed data

### Git Hooks
- `npm run prepare` - Setup Husky git hooks
- `npm run pre-commit` - Run pre-commit checks (lint-staged)

## 🔐 Authentication System

### Registration Features
- Email and password authentication
- Complete profile creation with validation:
  - Personal information (name, display name, date of birth)
  - ERP customer ID mapping
  - Optional address fields
  - Colombian ZIP code format validation

### Security Features
- Protected routes with middleware
- Row Level Security (RLS) on all database tables
- Secure session management
- Automatic redirects for authenticated users

## 📊 Dashboard & Documents

### Dashboard
- Total SRI document count
- User profile information
- Quick action cards
- Server-side rendering for security

### Documents Page
- Tabular view of billing documents
- Document details: type, number, date, amount, status
- PDF and XML download functionality
- Document access logging
- Loading states and error handling

## 🎨 UI/UX Features

### Theme System
- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Accessible components

## 🔌 API Integration

The portal integrates with the AcontPlus Gateway API:

- **Base URL**: `gateway.acontplus.com/fact-elect`
- **Documents List**: `GET /documents?customer_id={id}`
- **PDF Download**: `GET /documents/{id}/pdf`
- **XML Download**: `GET /documents/{id}/xml`

## 🛡️ Security & Compliance

- Row Level Security (RLS) enabled on all Supabase tables
- Protected routes with authentication middleware
- Secure session management with HTTP-only cookies
- Environment variables for sensitive configuration
- Document access logging for audit trails
- Input validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXT_PUBLIC_API_GATEWAY_URL=
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Other Platforms
- **Netlify**: Works with Next.js adapter
- **Railway**: Direct deployment support
- **DigitalOcean App Platform**: Container deployment
- **AWS Amplify**: Static site hosting

## 🧪 Development Workflow

### Code Quality Automation
- **Pre-commit hooks**: Automatically format and lint code
- **ESLint**: Catch errors and enforce coding standards
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety and better developer experience
- **Husky**: Git hooks management
- **lint-staged**: Run linters on staged files only

### Git Workflow
1. Make changes
2. Stage files (`git add .`)
3. Commit (`git commit -m "message"`)
   - Pre-commit hook runs automatically
   - Code is formatted and linted
   - TypeScript is type-checked
4. Push to repository

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Comprehensive setup guide with database schemas
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Implementation details and features
- **[.env.example](./.env.example)** - Environment variables template

## 🤝 Contributing

This is a private project for AcontPlus. For contributions:

1. Follow the existing code style
2. Run `npm run lint:fix` and `npm run format` before committing
3. Ensure all TypeScript types are properly defined
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

Copyright © 2025 AcontPlus. All rights reserved.

## 🆘 Support

For technical support or questions:
- Contact the AcontPlus development team
- Check the [SETUP.md](./SETUP.md) for troubleshooting
- Review the [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for implementation details

---

Built with ❤️ by the AcontPlus team using Next.js 16, TypeScript, and Supabase.
