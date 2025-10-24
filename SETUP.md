# AcontPlus Billing Portal

A production-ready Next.js 16 billing portal for AcontPlus customers to access and manage their Ecuadorian electronic invoicing documents (SRI).

## Features

- 🔐 **Secure Authentication** - Supabase-based authentication with registration and login
- 📄 **Document Management** - View, download, and manage billing documents
- 🌓 **Dark/Light Mode** - Theme toggle with system preference support
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Built with shadcn/ui and Radix UI components
- 🔒 **Protected Routes** - Middleware-based authentication protection
- 📊 **Dashboard** - Overview of document counts and quick actions
- 💾 **Download Options** - PDF and XML file downloads
- 📝 **Access Logging** - Document access tracking for compliance

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with OKLCH color system
- **UI Components**: shadcn/ui and Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns

## Prerequisites

- Node.js 20.x or later
- npm or yarn
- Supabase account and project

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/acontplus/billing-portal.git
cd billing-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the following variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Gateway
NEXT_PUBLIC_API_GATEWAY_URL=https://gateway.acontplus.com/fact-elect

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up Supabase database

Create the following tables in your Supabase project:

#### Profiles Table

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT,
  date_of_birth DATE,
  erp_customer_id TEXT NOT NULL,
  street TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### Document Access Logs Table

```sql
CREATE TABLE document_access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  document_id TEXT NOT NULL,
  access_type TEXT NOT NULL CHECK (access_type IN ('view', 'download_pdf', 'download_xml')),
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE document_access_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own logs"
  ON document_access_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs"
  ON document_access_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Customer Preferences Table

```sql
CREATE TABLE customer_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  preference_key TEXT NOT NULL,
  preference_value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, preference_key)
);

-- Enable Row Level Security
ALTER TABLE customer_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own preferences"
  ON customer_preferences FOR ALL
  USING (auth.uid() = user_id);
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
billing-portal/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── documents/           # Documents page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── layout/             # Layout components
│   │   └── header.tsx      # Header with navigation
│   ├── ui/                 # shadcn/ui components
│   ├── theme-provider.tsx  # Theme provider
│   └── theme-toggle.tsx    # Theme toggle button
├── lib/                     # Utility functions
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   └── utils.ts            # Utility functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # Type definitions
├── middleware.ts           # Authentication middleware
└── package.json            # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Detail

### Authentication System

The authentication system includes:

- **Registration**: Users can register with:
  - Email and password
  - First name and last name (required, max 150 characters)
  - Display name (optional, max 150 characters)
  - Date of birth (optional)
  - ID Card / ERP Customer ID (required, max 25 characters)
  - Address fields: Street, City, State, ZIP Code (optional)
  - ZIP Code validation for Colombian format (6 digits)

- **Login**: Secure login with email and password
- **Protected Routes**: Dashboard and documents pages require authentication
- **Auto-redirect**: Authenticated users are redirected from auth pages to dashboard

### Dashboard

The dashboard displays:
- Total count of SRI documents
- User profile information
- Quick action links to view documents

### Documents Page

The documents page provides:
- Table view of all billing documents
- Document information: type, number, date, amount, status
- Download buttons for PDF and XML formats
- Loading states and error handling
- Document access logging

### Theme Support

- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth theme transitions

## API Integration

The portal integrates with the AcontPlus Gateway API:

- **Endpoint**: `gateway.acontplus.com/fact-elect`
- **Documents list**: `GET /documents?customer_id={id}`
- **PDF download**: `GET /documents/{id}/pdf`
- **XML download**: `GET /documents/{id}/xml`

## Security

- Row Level Security (RLS) enabled on all Supabase tables
- Protected routes with middleware
- Secure session management
- Environment variables for sensitive data
- Document access logging for compliance

## Customization

### Colors

The application uses a custom OKLCH color system defined in `app/globals.css`. To customize colors, modify the color definitions in the `@theme` block.

### Components

UI components are based on shadcn/ui and can be customized in the `components/ui/` directory.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Environment Variables

Make sure to set all required environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_GATEWAY_URL`
- `NEXT_PUBLIC_APP_URL`

## Contributing

This is a private project for AcontPlus. Please contact the maintainers for contribution guidelines.

## License

Copyright © 2025 AcontPlus. All rights reserved.

## Support

For support, please contact the AcontPlus development team.
