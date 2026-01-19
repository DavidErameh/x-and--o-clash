# Environment Setup Guide

## Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase Project credentials

## Local Development

1. Clone the repository.
2. Run `pnpm install` to install dependencies.
3. Copy `.env.development` to `.env.local` and populate secrets.
4. Run `npm run dev` to start the development proxy.

## Production Config

- **Deployment Platform**: Vercel
- **Environment Variables**:
  - `WHOP_API_KEY`: Secret key from Whop Developer Dashboard.
  - `WHOP_WEBHOOK_SECRET`: Secret for verifying webhooks.
  - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key.
  - `NEXTAUTH_SECRET`: Random 32-char string for session encryption.
  - `NODE_ENV`: Set to `production`.

## Database Setup

Run migrations located in `src/lib/migrations.sql` via Supabase SQL Editor to verify schema is up to date.
