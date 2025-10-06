# Production Domain Setup for QR Verification

## Current Configuration

Your SkillHouse app uses dynamic URLs for QR code verification, configured via environment variables.

---

## Environment Variables

### Development (`.env.local`)
```bash
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### Production (`.env.production` or Vercel/hosting settings)
```bash
# Option 1: Use Appwrite's subdomain
NEXT_PUBLIC_APP_URL=https://skillhouse.appwrite.network

# Option 2: Use your custom domain (recommended for production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## How It Works

### QR Code Component
The `qr-code-dialog.tsx` component now imports and uses `APP_URL` from config:

```typescript
import { APP_URL } from "@/lib/appwrite/config";

const verificationUrl = `${APP_URL}/verify/${skillId}`;
```

### Config File (`src/lib/appwrite/config.ts`)
```typescript
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
```

This means:
- ✅ **Development:** Uses `http://localhost:9002`
- ✅ **Production:** Uses whatever you set in `NEXT_PUBLIC_APP_URL`
- ✅ **QR Codes:** Automatically contain the correct domain

---

## Setting Up Your Production Domain

### Option 1: Appwrite Static Hosting

If you're deploying to Appwrite Static Hosting:

1. **Your domain will be:** `https://skillhouse.appwrite.network`
   (or similar based on your project name)

2. **Set environment variable:**
   ```bash
   NEXT_PUBLIC_APP_URL=https://skillhouse.appwrite.network
   ```

3. **Deploy your app** to Appwrite Static Hosting

4. **QR codes will automatically generate with:** 
   `https://skillhouse.appwrite.network/verify/{id}`

---

### Option 2: Custom Domain (Recommended)

If you have your own domain (e.g., `skillhouse.com`):

1. **Register your domain** (GoDaddy, Namecheap, etc.)

2. **Point DNS to your hosting:**
   - **Vercel:** Add domain in project settings
   - **Netlify:** Add domain in site settings
   - **Appwrite:** Configure custom domain in console

3. **Set environment variable:**
   ```bash
   NEXT_PUBLIC_APP_URL=https://skillhouse.com
   ```

4. **Deploy your app**

5. **QR codes will generate with:** 
   `https://skillhouse.com/verify/{id}`

---

### Option 3: Vercel/Netlify

If deploying to Vercel or Netlify:

**Vercel:**
1. Connect GitHub repo to Vercel
2. In Vercel dashboard → Project Settings → Environment Variables
3. Add: `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`
4. Redeploy

**Netlify:**
1. Connect GitHub repo to Netlify
2. In Netlify dashboard → Site Settings → Environment Variables
3. Add: `NEXT_PUBLIC_APP_URL` = `https://your-project.netlify.app`
4. Redeploy

---

## Testing QR Codes

### Local Development
1. Start dev server: `npm run dev`
2. Create a credential
3. Click "Verify" button
4. QR code will contain: `http://localhost:9002/verify/{id}`
5. **Note:** This won't work on phones unless they're on same network

### Production Testing
1. Deploy to production with correct `NEXT_PUBLIC_APP_URL`
2. Create a credential
3. Click "Verify" button
4. QR code will contain your production URL
5. Scan with phone - should open verification page

---

## Verification URL Examples

### Development
```
http://localhost:9002/verify/67a7d2f100077f4def00
```
- Works only on local machine (or same network)
- Good for testing functionality

### Production (Appwrite Subdomain)
```
https://skillhouse.appwrite.network/verify/67a7d2f100077f4def00
```
- Works anywhere in the world
- Uses Appwrite's generated subdomain

### Production (Custom Domain)
```
https://skillhouse.com/verify/67a7d2f100077f4def00
```
- Works anywhere in the world
- Professional branded URL
- **Recommended for public sharing**

---

## OAuth Callback URLs

Don't forget to also update OAuth callback URLs when you deploy:

### GitHub OAuth Settings
Update in GitHub OAuth App settings:
```
Authorization callback URL:
https://your-production-domain.com/auth/callback
```

### Appwrite OAuth Settings
Update in Appwrite Console → Auth → Settings:
```
Success URL:
https://your-production-domain.com/auth/callback

Failure URL:
https://your-production-domain.com/auth?error=oauth_failed
```

---

## Checklist for Production Deployment

- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Update GitHub OAuth callback URL
- [ ] Update Appwrite OAuth success URL
- [ ] Update Appwrite OAuth failure URL
- [ ] Deploy application
- [ ] Test credential creation
- [ ] Test QR code generation (check URL in QR)
- [ ] Test scanning QR code with phone
- [ ] Test verification page loads correctly
- [ ] Test OAuth login works

---

## Common Issues

### Issue: QR code still shows localhost
**Cause:** Environment variable not set or not rebuilt after change  
**Solution:** 
1. Check `NEXT_PUBLIC_APP_URL` is set correctly
2. Rebuild and redeploy: `npm run build`
3. Restart dev server if in development

### Issue: QR code scans but page 404
**Cause:** Verification route not deployed or wrong domain  
**Solution:**
1. Ensure `/app/verify/[skillId]/page.tsx` is deployed
2. Check domain matches `NEXT_PUBLIC_APP_URL`
3. Check hosting provider deployed all routes

### Issue: Phone can't open localhost QR
**Cause:** localhost only works on same machine  
**Solution:**
- Use ngrok for local testing: `ngrok http 9002`
- Or deploy to staging environment for testing

---

## Environment Variable Priority

Next.js loads environment variables in this order:

1. `.env.production.local` (highest priority, production builds)
2. `.env.local` (all builds except test)
3. `.env.production` (production builds)
4. `.env` (all builds)

**For production, use:**
- `.env.production` - committed to git (safe values)
- `.env.production.local` - NOT committed (secrets)

**Example `.env.production`:**
```bash
NEXT_PUBLIC_APP_URL=https://skillhouse.appwrite.network
```

---

## Summary

✅ **Fixed:** QR code now uses `APP_URL` from config  
✅ **Dynamic:** URL changes based on environment  
✅ **Development:** Works with localhost  
✅ **Production:** Set via `NEXT_PUBLIC_APP_URL`  
✅ **Flexible:** Can use Appwrite subdomain or custom domain  

**Next step:** Set your production domain in environment variables and deploy! 🚀
