# Environment Variables for Vercel Deployment

## Required Environment Variables

### 1. NEXTAUTH_URL

- **Key**: `NEXTAUTH_URL`
- **Production Value**: `https://your-project-name.vercel.app`
- **Preview Value**: `https://your-branch-name.your-project-name.vercel.app`
- **Development Value**: `http://localhost:3000`

**Notes**:

- Replace `your-project-name` with your actual Vercel project name
- Use HTTPS in production
- No trailing slash at the end

### 2. NEXTAUTH_SECRET

- **Key**: `NEXTAUTH_SECRET`
- **Value**: Generate a secure random string

**How to generate**:

```bash
# Method 1: OpenSSL (recommended)
openssl rand -base64 32

# Method 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Method 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

**Example Value**: `fJ4K9mN2pQ7rT5wX8zA1bC3dE6gH9iJ2kL5oP8sU1vY4=`

### 3. DATABASE_URL

- **Key**: `DATABASE_URL`
- **Current Value**: `"file:./dev.db"`
- **Future Production**: Vercel Postgres connection string

**Notes**:

- For initial deployment, the local SQLite file works
- For production, consider upgrading to Vercel Postgres

## Environment Variable Setup by Environment

### Production Environment

```
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here
DATABASE_URL="file:./dev.db"
```

### Preview Environment

```
NEXTAUTH_URL=https://your-branch-name.your-project-name.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here
DATABASE_URL="file:./dev.db"
```

### Development Environment

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-here
DATABASE_URL="file:./dev.db"
```

## Step-by-Step Vercel Setup

### 1. Navigate to Environment Variables

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the sidebar

### 2. Add Variables for Production

#### Variable 1: NEXTAUTH_URL

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app` (replace with your actual URL)
- **Environments**: Select **"Production"**, **"Preview"**, and **"Development"**
- Click **"Add"**

#### Variable 2: NEXTAUTH_SECRET

- **Name**: `NEXTAUTH_SECRET`
- **Value**: `fJ4K9mN2pQ7rT5wX8zA1bC3dE6gH9iJ2kL5oP8sU1vY4=` (use your generated secret)
- **Environments**: Select **"Production"**, **"Preview"**, and **"Development"**
- Click **"Add"**

#### Variable 3: DATABASE_URL

- **Name**: `DATABASE_URL`
- **Value**: `"file:./dev.db"`
- **Environments**: Select **"Production"**, **"Preview"**, and **"Development"**
- Click **"Add"**

### 3. Save and Redeploy

1. Click **"Save"** after adding all variables
2. Go to **"Deployments"** tab
3. Click **"Redeploy"** or push a new commit to trigger deployment

## Local Development Setup

### Create .env.local file

```bash
# In your apps/web directory
cp .env.example .env.local
```

### Edit .env.local

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-here
DATABASE_URL="file:./dev.db"
```

## Quick Copy-Paste Values

### For Initial Setup (replace your-project-name):

```
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=fJ4K9mN2pQ7rT5wX8zA1bC3dE6gH9iJ2kL5oP8sU1vY4=
DATABASE_URL="file:./dev.db"
```

### Generated Secret Examples (choose one):

```
# Example 1
NEXTAUTH_SECRET=fJ4K9mN2pQ7rT5wX8zA1bC3dE6gH9iJ2kL5oP8sU1vY4=

# Example 2
NEXTAUTH_SECRET=aB3dE6gH9iJ2kL5oP8sU1vY4=fJ4K9mN2pQ7rT5wX8zA1bC3d

# Example 3
NEXTAUTH_SECRET=9mN2pQ7rT5wX8zA1bC3dE6gH9iJ2kL5oP8sU1vY4=fJ4K
```

## Verification Steps

### 1. Check Environment Variables in Vercel

- Go to Settings → Environment Variables
- Verify all three variables are present
- Ensure they're applied to correct environments

### 2. Test Locally

```bash
cd apps/web
npm run dev
```

- Visit http://localhost:3000
- Test authentication functionality

### 3. Test Production

- Visit your Vercel URL
- Test authentication functionality
- Check browser console for errors

## Common Issues and Solutions

### Issue: "NEXTAUTH_URL not set"

**Solution**: Ensure NEXTAUTH_URL is set correctly in Vercel environment variables

### Issue: "Invalid NEXTAUTH_SECRET"

**Solution**: Generate a new secret and update all environments

### Issue: "Database connection failed"

**Solution**: Verify DATABASE_URL format and accessibility

## Security Best Practices

1. **Use different secrets** for different environments
2. **Never commit secrets** to git repository
3. **Use long secrets** (32+ characters recommended)
4. **Rotate secrets periodically** for enhanced security

## Environment Variable Template

```
# Copy this template and fill in your values
NEXTAUTH_URL=https://your-actual-project-url.vercel.app
NEXTAUTH_SECRET=your-actually-generated-secret-here
DATABASE_URL="file:./dev.db"
```

Replace the placeholder values with your actual values before adding to Vercel.
