# Vercel Project Setup and Deployment Guide

This guide will walk you through creating a new Vercel project and deploying your IVF Maintenance Utility step by step.

## Prerequisites

1. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be pushed to a GitHub repository
3. **Node.js**: Installed locally (your project uses Node.js)

## Step 1: Prepare Your Local Project

### 1.1 Push Code to GitHub

If you haven't already, push your project to GitHub:

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - IVF Maintenance Utility"

# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/ivf-maintenance-utility.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Project Structure

Ensure your project has the correct structure:

```
IVF-Maintenance-Utility/
├── apps/
│   └── web/
│       ├── src/
│       ├── package.json
│       └── .env.example
├── vercel.json
├── package.json
└── NEXTAUTH_DEPLOYMENT_GUIDE.md
```

## Step 2: Create Vercel Account

### 2.1 Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose one of the signup methods:
   - Continue with GitHub (Recommended)
   - Continue with GitLab
   - Continue with Email

### 2.2 Verify Email

- Check your email for verification
- Click the verification link

## Step 3: Create New Vercel Project

### 3.1 Dashboard Navigation

1. After signing in, you'll see the Vercel Dashboard
2. Click **"Add New..."** button
3. Select **"Project"** from the dropdown

### 3.2 Import Repository

1. **Choose Git Provider**: Select "GitHub"
2. **Authorize Vercel**: Click "Install Vercel" on GitHub if prompted
3. **Select Repository**: Find and click "Import" next to your `ivf-maintenance-utility` repository

### 3.3 Configure Project Settings

Vercel will automatically detect your project settings. Verify:

**Framework Preset**: Next.js

- Should be automatically detected
- If not, select "Next.js" manually

**Build & Development Settings**:

- **Build Command**: `npm run build:web`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `npm install`
- **Root Directory**: `./` (leave as is)

**Node.js Version**:

- Set to `18.x` or `20.x` (recommended)

Click **"Continue"** to proceed.

## Step 4: Configure Environment Variables

### 4.1 Add Environment Variables

In the project configuration screen, add these environment variables:

#### Production Environment Variables:

1. **NEXTAUTH_URL**
   - Leave blank for now (Vercel will set it automatically)
   - Or enter: `https://your-project-name.vercel.app`

2. **NEXTAUTH_SECRET**
   - Generate a secure secret:
     ```bash
     openssl rand -base64 32
     ```
   - Paste the generated value

3. **DATABASE_URL**
   - For now, you can use: `"file:./dev.db"`
   - Later, you'll want to use Vercel Postgres or similar

### 4.2 Environment Selection

- Choose **"Production"** for the main deployment
- You can add the same variables for **"Preview"** and **"Development"** later

Click **"Continue"**.

## Step 5: Deploy Project

### 5.1 Initial Deployment

1. Review all settings
2. Click **"Deploy"**
3. Vercel will now:
   - Install dependencies
   - Build your project
   - Deploy to their global network

### 5.2 Monitor Deployment

- You'll see real-time logs
- Wait for the deployment to complete (usually 2-5 minutes)
- If successful, you'll see a "Congratulations!" message

## Step 6: Post-Deployment Setup

### 6.1 Get Your Project URL

- Your deployed app will be available at: `https://your-project-name.vercel.app`
- Copy this URL for the NEXTAUTH_URL configuration

### 6.2 Update Environment Variables

1. Go to your project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the sidebar
4. Update **NEXTAUTH_URL** to your actual deployment URL:
   ```
   https://your-project-name.vercel.app
   ```
5. Click **"Save"**
6. **Redeploy** your project to apply changes

### 6.3 Test Your Application

- Visit your deployed URL
- Test all functionality:
  - Home page loads
  - Login/logout works
  - All pages accessible
  - Forms submit correctly

## Step 7: Configure Custom Domain (Optional)

### 7.1 Add Custom Domain

1. In project dashboard, go to **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `app.yourdomain.com`)
4. Follow DNS configuration instructions

### 7.2 SSL Certificate

- Vercel automatically provides SSL certificates
- May take a few minutes to provision

## Step 8: Team Collaboration (Optional)

### 8.1 Invite Team Members

1. Go to **"Settings"** → **"Members"**
2. Click **"Invite"**
3. Enter team member email
4. Assign appropriate role

### 8.2 Branch Deployments

- Enable automatic deployments for pull requests
- Each PR gets a preview URL
- Great for testing before merging

## Step 9: Monitoring and Analytics

### 9.1 View Analytics

1. Go to **"Analytics"** tab
2. Monitor:
   - Page views
   - Unique visitors
   - Performance metrics

### 9.2 Check Logs

1. Go to **"Logs"** tab
2. View:
   - Function logs
   - Build logs
   - Error tracking

## Step 10: Common Troubleshooting

### 10.1 Build Failures

**Issue**: Build fails during deployment
**Solution**:

1. Check build logs for specific errors
2. Ensure all dependencies are in package.json
3. Verify build command is correct

### 10.2 Environment Variable Issues

**Issue**: App crashes due to missing environment variables
**Solution**:

1. Go to Settings → Environment Variables
2. Ensure all required variables are set
3. Redeploy after changes

### 10.3 NextAuth Issues

**Issue**: Authentication not working
**Solution**:

1. Verify NEXTAUTH_URL is correct (no trailing slash)
2. Ensure NEXTAUTH_SECRET is set
3. Check that URL uses HTTPS in production

## Step 11: Continuous Deployment

### 11.1 Automatic Deployments

Your project is now set up for automatic deployments:

- Push to main branch → Production deployment
- Push to other branches → Preview deployments
- Pull requests → Preview deployments

### 11.2 Deployment Workflow

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically detects and deploys
```

## Quick Reference Commands

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:web
```

### Vercel CLI (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy manually
vercel --prod

# Link existing project
vercel link
```

## Environment Variables Checklist

- [ ] NEXTAUTH_URL: `https://your-project.vercel.app`
- [ ] NEXTAUTH_SECRET: Generated secure string
- [ ] DATABASE_URL: Database connection string
- [ ] NODE_ENV: `production` (optional, Vercel sets this)

## Success Indicators

✅ **Deployment Successful**: Green checkmark in Vercel dashboard
✅ **Site Accessible**: Your URL loads without errors
✅ **Authentication Works**: Login/logout functions properly
✅ **All Pages Load**: Navigation works correctly
✅ **No Console Errors**: Check browser dev tools for errors

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **NextAuth Documentation**: [next-auth.js.org](https://next-auth.js.org)
- **Vercel Status**: [vercel-status.com](https://vercel-status.com)

## Next Steps

1. **Monitor Performance**: Use Vercel Analytics
2. **Set Up Alerts**: Configure error monitoring
3. **Add Custom Domain**: For professional appearance
4. **Configure Database**: Upgrade from local SQLite
5. **Set Up CI/CD**: Already configured with GitHub integration

Your IVF Maintenance Utility is now successfully deployed on Vercel!
