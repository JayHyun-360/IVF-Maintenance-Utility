# Vercel Redirect Fix Guide

## Problem

Users are being redirected to Vercel's login page instead of your application's authentication flow.

## Root Cause

NextAuth is not properly configured for Vercel's production environment, causing authentication redirects to fail.

## Applied Fixes

### 1. ✅ Middleware Added

Created `apps/web/middleware.ts` to properly handle authentication redirects:

```typescript
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/staff/:path*",
    "/api/auth/:path*",
  ],
};
```

### 2. ✅ NextAuth Configuration Updated

Updated `apps/web/src/lib/auth.ts` with production-ready settings:

- Added secure cookie configuration for production
- Ensured proper environment variable handling

### 3. ✅ Environment Variables Updated

Updated `apps/web/.env.production` with:

- `NEXTAUTH_URL=https://ivf-maintenance-utility.vercel.app`
- `NEXTAUTH_SECRET=ivf123secure456secret789auth012key345next678auth901`
- `NODE_ENV=production`

## Required Actions

### Step 1: Update Vercel Environment Variables

Go to your Vercel project dashboard → Settings → Environment Variables and add/update:

1. **NEXTAUTH_URL**
   - Value: `https://your-actual-vercel-domain.vercel.app`
   - Environments: Production, Preview, Development
   - **Important**: No trailing slash

2. **NEXTAUTH_SECRET**
   - Value: `ivf123secure456secret789auth012key345next678auth901`
   - Environments: Production, Preview, Development

3. **NODE_ENV**
   - Value: `production`
   - Environments: Production

4. **DATABASE_URL**
   - Value: `"file:./dev.db"`
   - Environments: Production, Preview, Development

### Step 2: Redeploy Application

After updating environment variables:

1. Go to Deployments tab
2. Click "Redeploy" or push a new commit

### Step 3: Test Authentication Flow

1. Visit your deployed URL
2. Try accessing protected routes (/student, /admin, /staff)
3. Verify you're redirected to `/login` instead of Vercel login
4. Test login functionality

## Verification Checklist

- [ ] Environment variables set correctly in Vercel dashboard
- [ ] NEXTAUTH_URL uses HTTPS and has no trailing slash
- [ ] NEXTAUTH_SECRET is set and consistent
- [ ] NODE_ENV is set to "production"
- [ ] Application redeployed after environment changes
- [ ] Authentication redirects work properly
- [ ] Login/logout functionality works
- [ ] Sessions persist correctly

## Troubleshooting

### If still redirecting to Vercel login:

1. **Check environment variables**: Ensure they're set for the correct environment (Production)
2. **Verify NEXTAUTH_URL**: Must match your exact Vercel domain
3. **Clear browser cache**: Authentication cookies might be stale
4. **Check Vercel logs**: Look for NextAuth-related errors

### If authentication fails:

1. **Verify NEXTAUTH_SECRET**: Ensure it's the same across all environments
2. **Check middleware**: Ensure middleware.ts is in the correct location
3. **Test locally**: Run with the same environment variables to reproduce

## Expected Behavior After Fix

✅ Users accessing protected routes are redirected to `/login` (not Vercel login)
✅ Login works with credentials (admin@test.com / admin12345, user@test.com / user12345)
✅ Sessions persist correctly
✅ Logout works properly
✅ No more redirects to Vercel's authentication system

## Next Steps

1. **Deploy the changes** to Vercel
2. **Update environment variables** in Vercel dashboard
3. **Test thoroughly** to ensure the redirect issue is resolved
4. **Monitor logs** for any remaining authentication issues

The middleware will now properly handle authentication redirects, ensuring users stay within your application instead of being sent to Vercel's login system.
