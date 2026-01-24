# NextAuth Vercel Deployment Guide

This guide will help you properly configure NextAuth for Vercel deployment.

## Issue Fixed

The original error `"Environment Variable "NEXTAUTH_URL" references Secret "nextauth_url", which does not exist"` was caused by incorrect references to Vercel secrets in `vercel.json`.

## Steps to Deploy Successfully

### 1. Set Up Vercel Environment Variables

Go to your Vercel project dashboard → Settings → Environment Variables and add:

#### Required Environment Variables:

1. **NEXTAUTH_URL**
   - **Production**: `https://your-app-domain.vercel.app`
   - **Preview**: `https://your-preview-url.vercel.app`
   - **Development**: `http://localhost:3000`

2. **NEXTAUTH_SECRET**
   - Generate a secure random string. You can use:
     ```bash
     openssl rand -base64 32
     ```
     or visit https://generate-secret.vercel.app/

### 2. Environment Variable Types

Choose the appropriate environment for each variable:

- **Production**: For your main deployment
- **Preview**: For pull request previews
- **Development**: For local development

### 3. Deployment Commands

Your project is already configured with the correct build settings in `vercel.json`:

- Build Command: `npm run build:web`
- Output Directory: `apps/web/.next`
- Install Command: `npm install`

### 4. Local Development Setup

1. Copy the example environment file:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

2. Update `apps/web/.env.local` with your local values:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-local-secret-key
   DATABASE_URL="file:./dev.db"
   ```

3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

### 5. Verification Steps

After deployment, verify:

1. **Environment Variables**: Check that NEXTAUTH_URL and NEXTAUTH_SECRET are set correctly in your Vercel dashboard
2. **Authentication Flow**: Test login/logout functionality
3. **Session Management**: Verify sessions persist correctly
4. **API Routes**: Ensure `/api/auth/[...nextauth]` endpoints are accessible

### 6. Troubleshooting

#### Common Issues:

**"NEXTAUTH_URL" not set error:**

- Ensure NEXTAUTH_URL is set in Vercel environment variables
- For production, use the full HTTPS URL including the domain

**"Invalid NEXTAUTH_SECRET" error:**

- Generate a new secure secret using the command above
- Ensure it's the same value across all environments where needed

**CORS issues:**

- Verify NEXTAUTH_URL matches your deployed domain exactly
- Include the protocol (https://) and no trailing slash

#### Debug Mode:

Add this to your auth configuration temporarily for debugging:

```typescript
export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  // ... rest of config
};
```

### 7. Security Best Practices

1. **Use HTTPS**: Always use HTTPS URLs in production
2. **Strong Secrets**: Use cryptographically strong secrets (32+ characters)
3. **Environment Separation**: Use different secrets for different environments
4. **Regular Rotation**: Consider rotating secrets periodically

### 8. NextAuth Configuration

Your current setup in `src/lib/auth.ts` is properly configured with:

- Credentials provider for email/password authentication
- JWT session strategy
- Custom sign-in page
- Role-based authentication

The configuration will automatically use the environment variables you set in Vercel.

## Deployment Checklist

- [ ] NEXTAUTH_URL set to correct domain (https://your-app.vercel.app)
- [ ] NEXTAUTH_SECRET generated and added
- [ ] Environment variables applied to correct environments
- [ ] Local .env.local file created for development
- [ ] Test authentication flow after deployment
- [ ] Verify session persistence
- [ ] Check all auth-related API routes

## Support

If you encounter issues:

1. Check Vercel function logs for detailed error messages
2. Verify environment variables are properly set
3. Ensure your auth configuration matches the examples above
4. Test locally with the same environment variable values

For NextAuth-specific issues, refer to: https://next-auth.js.org/docs/deployment
