# Social Authentication Setup Guide

This guide will help you set up Google and Facebook authentication for your IVF Maintenance Utility.

## 🔑 Required API Keys & Client IDs

### 1. Google Cloud Console Setup

1. **Go to**: https://console.cloud.google.com/
2. **Create/Select Project**:
   - Create a new project or select existing one
   - Note your Project ID

3. **Enable Required APIs**:
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - ✅ Google+ API
     - ✅ Google OAuth2 API
     - ✅ Google People API (for profile pictures)

4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client IDs"
   - Application type: **"Web application"**
   - Name: "IVF Maintenance Web App"

5. **Authorized Redirect URIs**:
   ```
   Development: http://localhost:3000/api/auth/callback/google
   Production:  https://yourdomain.com/api/auth/callback/google
   ```

6. **Get Your Credentials**:
   - **Client ID**: `GOOGLE_CLIENT_ID`
   - **Client Secret**: `GOOGLE_CLIENT_SECRET`

### 2. Meta for Developers (Facebook) Setup

1. **Go to**: https://developers.facebook.com/
2. **Create App**:
   - Click "Create App" → "Business" → "Business"
   - App Name: "IVF Maintenance Utility"
   - Contact Email: your email

3. **Add Facebook Login Product**:
   - In App Dashboard, click "Add Product" → "Facebook Login"
   - Click "Set Up" → "Web"

4. **Configure Facebook Login**:
   - Site URL: `http://localhost:3000` (development)
   - Site URL: `https://yourdomain.com` (production)

5. **Valid OAuth Redirect URIs**:
   ```
   Development: http://localhost:3000/api/auth/callback/facebook
   Production:  https://yourdomain.com/api/auth/callback/facebook
   ```

6. **Get Your Credentials**:
   - Go to "Settings" → "Basic"
   - **App ID**: `FACEBOOK_CLIENT_ID`
   - **App Secret**: `FACEBOOK_CLIENT_SECRET`

## 🗝️ Environment Variables

Add these to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret-here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

For production, update:
```env
NEXTAUTH_URL=https://yourdomain.com
```

## 🚀 Features Implemented

### ✅ Button Components
- **Google Button**: Branded with Google colors and logo
- **Facebook Button**: Branded with Facebook blue and logo
- **Loading States**: Individual loading indicators
- **Error Handling**: Graceful error messages

### ✅ Handshake Logic
- **handleSocialLogin(provider)** function implemented
- **Popup/Redirect Flow**: Uses NextAuth's built-in OAuth flow
- **Token Management**: Automatic token handling via NextAuth

### ✅ Error Handling
- **Popup Closed**: "Login cancelled. Please try again."
- **Permission Denied**: User-friendly error messages
- **Network Errors**: Graceful fallback handling

### ✅ Profile Persistence
- **Profile Pictures**: Stored in session state
- **User Names**: Persisted across sessions
- **AccountDropdown Ready**: Profile data available for display

## 🔧 Technical Implementation

### Libraries Used
- **NextAuth v4**: Built-in OAuth providers (recommended)
- **Framer Motion**: Smooth animations and transitions
- **React hooks**: State management and callbacks

### Security Features
- **CSRF Protection**: Built into NextAuth
- **Secure Cookies**: Production-ready cookie settings
- **Token Validation**: Server-side session verification

### Database Integration
- **User Lookup**: Existing users keep their roles
- **New Users**: Default "STAFF" role (configurable)
- **Profile Sync**: Profile pictures and names synced

## 🧪 Testing

1. **Local Development**:
   ```bash
   npm run dev
   ```
   - Navigate to `http://localhost:3000/login`
   - Test both Google and Facebook buttons

2. **Error Scenarios**:
   - Close the OAuth popup → Should show "Login cancelled"
   - Deny permissions → Should show user-friendly error
   - Network issues → Should handle gracefully

## 📱 Mobile Optimization

- **Responsive Design**: Buttons work on all screen sizes
- **Touch Friendly**: Proper touch targets
- **Loading States**: Visual feedback during authentication

## 🔍 Next Steps

1. **Get API Keys**: Follow the setup guide above
2. **Update Environment**: Add credentials to `.env.local`
3. **Test Locally**: Verify both providers work
4. **Deploy**: Update production environment variables
5. **Monitor**: Check authentication logs for issues

## 🐛 Troubleshooting

### Common Issues:
- **Redirect URI Mismatch**: Check your OAuth console settings
- **CORS Errors**: Verify redirect URLs match exactly
- **Missing Profile Picture**: Check API permissions (People API for Google)
- **Role Assignment**: Verify user exists in database or gets default role

### Debug Mode:
NextAuth debug is enabled in development. Check console logs for detailed authentication flow.

---

**Ready to go!** 🎉 Your social authentication is now fully implemented with error handling, profile persistence, and a beautiful UI.
