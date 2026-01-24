# Vercel Project Setup - Step by Step Guide

## 🚀 Complete Vercel Setup for IVF Maintenance Utility

### Prerequisites

- GitHub repository with your code
- Vercel account (free tier is sufficient)
- PostgreSQL database (Vercel Postgres recommended)

---

## Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment"

# Push to GitHub
git push origin main
```

### 1.2 Verify Repository Structure

Ensure your repository contains:

- ✅ `package.json`
- ✅ `next.config.ts`
- ✅ `vercel.json`
- ✅ `prisma/schema.prisma`
- ✅ `.env.production.example`

---

## Step 2: Create Vercel Account

### 2.1 Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose **Continue with GitHub** (recommended)
4. Authorize Vercel to access your GitHub account
5. Complete your profile setup

### 2.2 Verify Email

- Check your email for verification link
- Click to verify your account

---

## Step 3: Create New Vercel Project

### 3.1 Start New Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories

### 3.2 Import Repository

1. Find **"ivf-maintenance-utility"** in the list
2. Click **"Import"**

### 3.3 Configure Project Settings

You'll see the configuration page with these sections:

#### **Build & Development Settings**

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

_Keep defaults - they're already configured in `vercel.json`_

#### **Environment Variables**

Click **"Add Environment Variables"** and add:

| Variable Name     | Value            | Environment                      |
| ----------------- | ---------------- | -------------------------------- |
| `NEXTAUTH_SECRET` | [Generate below] | Production, Preview, Development |
| `JWT_SECRET`      | [Generate below] | Production, Preview, Development |

### 3.4 Generate Secure Secrets

Open your terminal and run:

```bash
# Generate NextAuth Secret
openssl rand -base64 32
# Copy output for NEXTAUTH_SECRET

# Generate JWT Secret
openssl rand -base64 32
# Copy output for JWT_SECRET
```

### 3.5 Deploy Initial Version

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a URL like `ivf-maintenance-utility.vercel.app`

---

## Step 4: Set Up Database

### Option A: Vercel Postgres (Recommended)

#### 4.1 Create Database

1. In Vercel dashboard, go to **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose region (same as your project)
5. Click **"Create"**

#### 4.2 Configure Database

1. Give your database a name (e.g., `ivf-maintenance-db`)
2. Copy the **Connection String** (starts with `postgresql://`)
3. Save the connection string for next step

#### 4.3 Add Database URL to Project

1. Go to your project → **"Settings"** → **"Environment Variables"**
2. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: [Paste your PostgreSQL connection string]
   - **Environment**: Production, Preview, Development
3. Click **"Save"**

#### 4.4 Run Database Migrations

1. Go to your project → **"Deployments"** tab
2. Click **"Redeploy"** or push a new commit to trigger deployment
3. After deployment, run migrations in Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations and seed
npm run db:deploy:prod
```

### Option B: External PostgreSQL

#### 4.1 Set Up External Database

1. Create account on [Supabase](https://supabase.com), [Railway](https://railway.app), or [Neon](https://neon.tech)
2. Create new PostgreSQL project
3. Get connection string

#### 4.2 Configure in Vercel

Follow steps 4.3 above with your external connection string

---

## Step 5: Configure Project Settings

### 5.1 Update Project Domain

1. Go to project → **"Settings"** → **"Domains"**
2. Your default domain is already configured
3. (Optional) Add custom domain if you have one

### 5.2 Set Environment Variables

Ensure all required variables are set:

#### Required Variables

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `NEXTAUTH_SECRET` - 32+ character secret
- ✅ `JWT_SECRET` - 32+ character secret

#### Optional Variables

- `SMTP_HOST` - For email notifications
- `SMTP_PORT` - Email server port
- `SMTP_USER` - Email username
- `SMTP_PASS` - Email password

### 5.3 Configure Build Settings

Go to **"Settings"** → **"Build & Development"**:

- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

---

## Step 6: Final Deployment & Testing

### 6.1 Redeploy with All Configurations

1. Go to **"Deployments"** tab
2. Click **"Redeploy"**
3. Wait for deployment to complete

### 6.2 Test Your Application

Visit your Vercel URL and test:

- ✅ Homepage loads correctly
- ✅ Login pages work
- ✅ Authentication flow
- ✅ Database connectivity
- ✅ Admin dashboard access

### 6.3 Check Vercel Logs

1. Go to **"Deployments"** → Click latest deployment
2. Click **"Logs"** tab
3. Check for any errors or warnings

---

## Step 7: Post-Deployment Configuration

### 7.1 Set Up Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your custom domain
4. Configure DNS records as instructed

### 7.2 Configure Monitoring

1. Go to **"Analytics"** tab
2. Enable web analytics
3. Set up error monitoring if desired

### 7.3 Team Collaboration (Optional)

1. Go to **"Settings"** → **"Team"**
2. Invite team members
3. Set appropriate permissions

---

## Step 8: Ongoing Maintenance

### 8.1 Deploy Updates

```bash
# Make changes locally
git add .
git commit -m "Update description"
git push origin main

# Vercel auto-deploys on push
```

### 8.2 Database Updates

```bash
# After schema changes
npm run db:deploy:prod
```

### 8.3 Monitor Performance

- Check Vercel Analytics regularly
- Monitor database usage
- Review deployment logs

---

## 🚨 Troubleshooting Common Issues

### Build Failures

**Problem**: Deployment fails during build
**Solution**:

1. Check environment variables are set
2. Verify `package.json` scripts
3. Check deployment logs for specific errors

### Database Connection Errors

**Problem**: Cannot connect to database
**Solution**:

1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Ensure SSL is properly configured

### Authentication Issues

**Problem**: Login not working
**Solution**:

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies

### Environment Variables Not Working

**Problem**: App can't access environment variables
**Solution**:

1. Ensure variables are set in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly

---

## ✅ Success Checklist

- [ ] Project deployed to Vercel
- [ ] Database connected and migrated
- [ ] Environment variables configured
- [ ] Authentication working
- [ ] All pages loading correctly
- [ ] Custom domain configured (if needed)
- [ ] Team members invited (if needed)
- [ ] Monitoring enabled

---

## 📞 Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment Guide**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Status**: [vercel-status.com](https://vercel-status.com)

---

## 🎉 You're Done!

Your IVF Maintenance Utility is now live on Vercel! Share the URL with your team and start using the application.

**Your live URL**: `https://ivf-maintenance-utility.vercel.app` (or your custom domain)
