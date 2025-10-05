# SkillHouse Quick Setup Guide

## ✅ Status: Fully Configured & Ready!

All Appwrite resources have been automatically created. You can start using the application immediately!

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Google Gemini API key for AI-powered badge descriptions

---

## Quick Start (2 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Application

```bash
npm run dev
```

Visit **http://localhost:9002** 🚀

### 3. Create Your First Account

1. Navigate to http://localhost:9002/auth
2. Click the "Sign Up" tab
3. Enter your details (username, email, full name, password)
4. Click "Sign Up" - you'll be automatically logged in!

### 4. Create Your First Credential

1. Go to Dashboard → "Add Skill" (or click the + button in sidebar)
2. Fill in your skill details:
   - Title (e.g., "React Development")
   - Category (e.g., "Web Development")
   - Description (or use AI to generate one)
   - Upload evidence (optional)
3. Submit and see it in "My Skills"!

---

## Appwrite Backend (Already Set Up!)

### What's Been Created

The automated setup script has created:

#### Database: `skillhouse`
- ✅ Production-ready database with all collections

#### Collections (4 total)

**1. Profiles Collection**
- Stores user profile information
- Attributes: userId, username, email, fullName, bio, avatarUrl, credentialCount, endorsementCount
- Indexes: Unique on userId, username, email

**2. Credentials Collection**
- Stores skill credentials/badges
- Attributes: userId, title, category, description, evidenceUrl, status, endorsementCount, isPublic
- Indexes: userId, status, category, createdAt for efficient queries
- Status types: pending, verified, rejected

**3. Endorsements Collection**
- Stores credential endorsements
- Attributes: credentialId, endorserId, comment, createdAt
- Unique constraint: One endorsement per user per credential

**4. Flagged Credentials Collection**
- Stores reported credentials for admin review
- Attributes: credentialId, reporterId, reason, status
- Status types: pending, reviewed, resolved

#### Storage Buckets (2 total)

**1. user-avatars**
- Max size: 5MB
- Allowed: PNG, JPEG, WebP, GIF
- Encryption: ✅ Enabled
- Antivirus: ✅ Enabled

**2. evidence-files**
- Max size: 25MB
- Allowed: Images, PDF, Videos (MP4, MOV)
- Encryption: ✅ Enabled
- Antivirus: ✅ Enabled

### Security Features

- ✅ Document-level permissions (users can only edit their own data)
- ✅ Public read access for discovery features
- ✅ Encrypted file storage
- ✅ Antivirus scanning on all uploads
- ✅ Unique constraints on usernames and emails

---

## Optional: Enable AI Badge Descriptions

To enable AI-powered badge description generation:

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add to Environment

Open `.env.local` and replace:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

With your actual key:

```bash
GEMINI_API_KEY=AIzaSyD...your-actual-key
```

### 3. Restart Dev Server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

Now the "Generate with AI" button in Add Skill form will work!

---

## Optional: Configure OAuth (Social Login)

### GitHub Login (Already Configured! ✅)

GitHub OAuth has been enabled and configured in the Appwrite Console. Users can now sign in with their GitHub account!

**How it works:**
1. Click "GitHub" button on the login page
2. Authorize the app on GitHub
3. Automatically logged in with profile created

### Enable Additional OAuth Providers (Optional)

If you want to add Google or other providers:

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Navigate to your project → **Auth** → **Settings**
3. Find **OAuth2 Providers** and enable the provider you want
4. Add your OAuth credentials from the provider's developer console
5. Add authorized redirect URIs:
   - Development: `http://localhost:9002/dashboard`
   - Production: `https://your-domain.com/dashboard`
6. Update the auth page to include the new provider button

---

## Features Overview

### ✅ Authentication & Authorization
- Email/password signup and login
- OAuth2 with GitHub (configured and ready!)
- Protected dashboard routes
- Automatic profile creation
- Session management with Appwrite

### ✅ Credential Management
- Create skill credentials/badges
- Upload evidence files (images, PDFs, videos)
- AI-generated descriptions (with Gemini)
- Three-tier status system (pending/verified/rejected)
- Public/private visibility toggle

### ✅ Social Features
- Endorse other users' credentials
- Real-time endorsement counts
- Prevent duplicate endorsements
- Public user profiles
- Leaderboard rankings

### ✅ Discovery & Verification
- Browse all public verified credentials
- Search by skill name or category
- Filter by status
- QR code generation for credential sharing
- Public verification pages (`/verify/[skillId]`)

### ✅ Admin Panel
- Review flagged credentials
- Moderate content
- Access control for admin users

---

## Testing Guide

### Test Authentication Flow

1. **Sign Up**: Visit `/auth` and create account
2. **Login**: Test logout and login back in
3. **Profile**: Check auto-created profile in dashboard
4. **Session**: Refresh page - should stay logged in

### Test Credential Creation

1. **Navigate**: Dashboard → Add Skill
2. **Fill Form**: Add title, category, description
3. **AI Generation**: Test "Generate with AI" (needs Gemini key)
4. **Upload Evidence**: Try uploading an image or PDF
5. **Submit**: Create the credential
6. **Verify**: Check it appears in "My Skills"

### Test Social Features

1. **Endorse**: Create second account, endorse first account's credential
2. **Real-time**: Watch endorsement count update live
3. **Duplicate Prevention**: Try endorsing same credential twice
4. **Profile View**: Visit `/profile/[username]`

### Test Discovery

1. **Browse**: Visit `/discover`
2. **Search**: Use search bar to find credentials
3. **Filter**: Try different status filters
4. **Verify**: Click credential → Share → Copy verification link
5. **Public View**: Test verification page in incognito

### Test Leaderboard

1. **Rankings**: Visit `/leaderboard`
2. **Sorting**: Check users ranked by credentials + endorsements
3. **Profile Links**: Click user to view their profile

---

## Re-running Setup (If Needed)

If you need to recreate all Appwrite resources:

```bash
npm run setup:appwrite
```

This is **idempotent** - it will:
- Create missing resources
- Skip existing resources
- Update status for each step

Safe to run multiple times!

---

## Troubleshooting

### Issue: "Cannot connect to Appwrite"
**Solution:**
- Check internet connection
- Verify Appwrite Cloud is accessible
- Check `.env.local` has correct endpoint

### Issue: "Authentication failed"
**Solution:**
- Clear browser cookies and local storage
- Try incognito/private window
- Check Appwrite Console → Auth is enabled

### Issue: "Can't upload files"
**Solution:**
- Check file size (5MB for avatars, 25MB for evidence)
- Verify file type is supported
- Run `npm run setup:appwrite` to ensure buckets exist

### Issue: "AI descriptions not generating"
**Solution:**
- Add Gemini API key to `.env.local`
- Restart dev server after adding key
- Check API key is valid at [Google AI Studio](https://aistudio.google.com)

### Issue: "Realtime updates not working"
**Solution:**
- Check browser console for WebSocket errors
- Verify browser supports WebSockets
- Check firewall/antivirus isn't blocking WebSocket connections

### Issue: "OAuth login fails"
**Solution:**
- Verify OAuth is configured in Appwrite Console
- Check redirect URLs match exactly
- Ensure OAuth credentials are correct

---

## Production Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   
   In Vercel project settings → Environment Variables, add:

   ```bash
   # Appwrite (Copy from .env.local)
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=68e0b33700078b078177
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=skillhouse
   NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID=profiles
   NEXT_PUBLIC_APPWRITE_CREDENTIALS_COLLECTION_ID=credentials
   NEXT_PUBLIC_APPWRITE_ENDORSEMENTS_COLLECTION_ID=endorsements
   NEXT_PUBLIC_APPWRITE_FLAGGED_COLLECTION_ID=flagged_credentials
   NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID=user-avatars
   NEXT_PUBLIC_APPWRITE_EVIDENCE_BUCKET_ID=evidence-files
   
   # Optional: AI Features
   GEMINI_API_KEY=your_gemini_api_key
   
   # App URL (your Vercel domain)
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

### Post-Deployment

1. **Update OAuth URLs**
   - Go to Appwrite Console → Auth → Settings
   - Update OAuth redirect URLs to your production domain
   - Add: `https://your-app.vercel.app/dashboard`

2. **Test Production**
   - Create test account
   - Test all features
   - Check mobile responsiveness

3. **Monitor**
   - Check Vercel Analytics
   - Monitor Appwrite Usage in Console

---

## Project Structure

```
skill-house/
├── src/
│   ├── app/                    # Next.js pages (App Router)
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Protected dashboard
│   │   ├── discover/          # Public credential discovery
│   │   ├── profile/           # User profiles
│   │   └── verify/            # Credential verification
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── home/              # Homepage components
│   │   └── ui/                # Reusable UI components (shadcn)
│   ├── contexts/              # React contexts
│   │   └── auth-context.tsx   # Authentication state
│   ├── hooks/                 # Custom React hooks
│   │   └── use-appwrite.ts    # Appwrite data hooks
│   ├── lib/                   # Utilities and services
│   │   ├── appwrite/          # Appwrite services
│   │   │   ├── auth.service.ts
│   │   │   ├── database.service.ts
│   │   │   ├── storage.service.ts
│   │   │   └── realtime.service.ts
│   │   └── types.ts           # TypeScript types
│   └── ai/                    # AI features (Genkit)
├── scripts/
│   └── setup-appwrite.mjs     # Automated Appwrite setup
├── .env.local                 # Environment variables
└── package.json
```

---

## Additional Resources

- **Appwrite Docs**: https://appwrite.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Project Blueprint**: See `docs/blueprint.md`
- **Integration Guide**: See `APPWRITE_INTEGRATION.md`

---

## Need Help?

- Check the [Appwrite Discord](https://appwrite.io/discord)
- Review [Appwrite Documentation](https://appwrite.io/docs)
- Open an issue on GitHub

---

**🎉 You're all set! Start building your proof-of-skill credentials!**

The entire Appwrite backend is configured and ready. Just run `npm run dev` and start creating credentials!
