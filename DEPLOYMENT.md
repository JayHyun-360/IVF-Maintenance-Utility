# Vercel Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed Setup

- Next.js configuration optimized for Vercel
- Environment variables template created
- Prisma schema updated for PostgreSQL
- Build process verified
- Security headers configured

### 🚀 Deployment Steps

#### 1. Create Vercel Project

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Link your project to Vercel
vercel link
```

#### 2. Configure Environment Variables in Vercel Dashboard

Go to your Vercel project dashboard → Settings → Environment Variables and add:

**Required Variables:**

- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate a secure 32+ character secret
- `JWT_SECRET` - Generate a secure 32+ character secret

**Optional Variables:**

- `SMTP_HOST` - Email server host
- `SMTP_PORT` - Email server port
- `SMTP_USER` - Email username
- `SMTP_PASS` - Email password

#### 3. Database Setup

**Option A: Use Vercel Postgres (Recommended)**

1. In Vercel dashboard, go to Storage → Create Database
2. Select PostgreSQL
3. Copy the connection string to `DATABASE_URL`

**Option B: External PostgreSQL**

1. Set up PostgreSQL database (Supabase, Railway, etc.)
2. Add connection string to `DATABASE_URL`

#### 4. Deploy and Run Database Migrations

```bash
# Deploy to Vercel
vercel --prod

# After deployment, run database migrations
vercel env pull .env.production
npm run db:deploy:prod
```

#### 5. Generate Secrets

Use these commands to generate secure secrets:

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate JWT secret
openssl rand -base64 32
```

## Post-Deployment

### Verify Deployment

1. Check that all pages load correctly
2. Test authentication flow
3. Verify database connectivity
4. Test file uploads if enabled

### Monitoring

- Monitor Vercel logs for any errors
- Check database performance
- Set up alerts for critical errors

### Common Issues

#### Database Connection Errors

- Verify `DATABASE_URL` is correct
- Check database is accessible from Vercel
- Ensure SSL is configured properly

#### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies if needed

#### Build Failures

- Check all environment variables are set
- Verify dependencies are up to date
- Check Prisma client generation

## Environment Variables Reference

See `.env.production.example` for complete list of available environment variables.

## Database Migration Commands

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (production)
npm run db:deploy

# Seed database (production)
npm run db:seed

# Combined deployment command
npm run db:deploy:prod
```

## Support

For issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connection
4. Review this guide for common solutions
