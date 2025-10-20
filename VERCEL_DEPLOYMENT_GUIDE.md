# 🚀 Vercel Deployment Guide for L&C Cleaning Services

## Complete Setup Instructions

### Step 1: Prepare Environment Variables

Add this to your `.env.local` file:

```env
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://db.penudaveaysechobupbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Authentication (NEW - REQUIRED!)
ADMIN_PASSWORD=YourSecurePasswordHere123!
```

**⚠️ IMPORTANT:** Change `YourSecurePasswordHere123!` to a strong password before deploying!

---

### Step 2: Push Code to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - L&C Cleaning Services"
```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name: `lc-cleaning-services`
   - Make it **Private** (recommended for business sites)
   - Don't initialize with README (you already have code)

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/lc-cleaning-services.git
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up or log in (use your GitHub account)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your `lc-cleaning-services` repository
   - Click "Import"

3. **Configure Environment Variables:**
   In the "Environment Variables" section, add:
   
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://db.penudaveaysechobupbf.supabase.co
   
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [paste your Supabase anon key]
   
   Name: ADMIN_PASSWORD
   Value: [your strong admin password]
   ```
   
   **✅ Check:** Apply to all environments (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `https://your-project.vercel.app`

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Setup and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: lc-cleaning-services
# - Directory: ./ (press Enter)
# - Override settings? N

# Add environment variables
vercel env add ADMIN_PASSWORD
# Enter your password when prompted

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://db.penudaveaysechobupbf.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter your Supabase anon key

# Deploy to production
vercel --prod
```

---

### Step 4: Admin Access After Deployment

1. **Login URL:** `https://your-site.vercel.app/admin/login`
2. **Enter Password:** Use the `ADMIN_PASSWORD` you set in environment variables
3. **Access Dashboard:** You'll be redirected to `/admin` after successful login

**Session Duration:** 24 hours (then you'll need to login again)

---

### Step 5: Custom Domain Setup (Optional)

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add your domain (e.g., `lccleaningservices.co.uk`)

2. **Update DNS** (at your domain registrar):
   ```
   Type: CNAME
   Name: @ (or www)
   Value: cname.vercel-dns.com
   ```

3. **Wait 24-48 hours** for DNS propagation
4. **Enable HTTPS** (automatic with Vercel)

---

## 🔐 Security Features Implemented

### 1. **Admin Authentication**
- ✅ Password-protected admin dashboard
- ✅ Session tokens (24-hour expiry)
- ✅ Auto-redirect to login if not authenticated
- ✅ Logout functionality
- ✅ Password stored as environment variable (not in code)

### 2. **Session Management**
- Login creates a session token
- Token stored in `localStorage`
- Verified on every admin page load
- Automatic redirect to login if expired/missing

### 3. **Best Practices Applied**
- Environment variables for sensitive data
- No hardcoded passwords
- Client-side route protection
- Secure session handling

---

## 🔄 How Admin Authentication Works

### Login Flow:
```
1. User visits /admin
   ↓
2. Check localStorage for admin_session token
   ↓
3. If NO token → Redirect to /admin/login
   ↓
4. User enters password
   ↓
5. API compares with ADMIN_PASSWORD env variable
   ↓
6. If match → Generate session token
   ↓
7. Store token in localStorage
   ↓
8. Redirect to /admin dashboard
```

### Files Created:
- `app/admin/login/page.tsx` - Login page UI
- `app/api/admin/auth/route.ts` - Authentication API
- `app/admin/page.tsx` - Updated with auth check

---

## 📋 Post-Deployment Checklist

### ✅ Must-Do:
- [ ] Set strong `ADMIN_PASSWORD` in Vercel environment variables
- [ ] Test admin login at `/admin/login`
- [ ] Make a test booking to verify database connection
- [ ] Check track booking page works
- [ ] Verify WhatsApp links work
- [ ] Test all admin functions (update status, payment methods, etc.)

### ✅ Recommended:
- [ ] Add custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry/Vercel)
- [ ] Configure email service (Resend.com)
- [ ] Test on mobile devices
- [ ] Check page load speed (Lighthouse)

### ✅ Optional Enhancements:
- [ ] Add two-factor authentication (2FA)
- [ ] Implement role-based access (multiple admins)
- [ ] Add activity logging
- [ ] Set up automated backups
- [ ] Enable rate limiting on login attempts

---

## 🛠️ Troubleshooting

### "Invalid password" error:
```bash
# Check environment variable is set
vercel env ls

# If not set, add it
vercel env add ADMIN_PASSWORD

# Re-deploy
vercel --prod
```

### Admin page redirects to login immediately:
- Clear browser cache and localStorage
- Try incognito/private browsing mode
- Check browser console for errors

### Database not connecting:
- Verify `NEXT_PUBLIC_SUPABASE_URL` in Vercel env vars
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Test direct connection in Supabase dashboard

### Build fails on Vercel:
```bash
# Test build locally first
npm run build

# If successful locally, check Vercel build logs
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - ESLint errors
```

---

## 🔄 Updating After Deployment

### Code Changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```
Vercel auto-deploys on every push to `main` branch!

### Environment Variables:
```bash
# Update via CLI
vercel env rm ADMIN_PASSWORD
vercel env add ADMIN_PASSWORD
# Enter new password

# Or update in Vercel Dashboard:
# Project → Settings → Environment Variables
```

---

## 📊 Monitoring Your Site

### Vercel Analytics (Free):
- Real-time visitor data
- Page performance metrics
- Core Web Vitals

### Enable:
1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Enable Web Analytics
4. View metrics at `/admin` (future enhancement)

---

## 🚨 Emergency Access

### If Locked Out:
1. **Reset Password:**
   - Update `ADMIN_PASSWORD` in Vercel env vars
   - Redeploy: `vercel --prod`

2. **Bypass Login** (emergency only):
   - Temporarily comment out auth check in `app/admin/page.tsx`
   - Deploy, access admin, then restore auth

---

## 🔐 Security Recommendations

### Strong Password Guidelines:
- ✅ Minimum 12 characters
- ✅ Mix of uppercase, lowercase, numbers, symbols
- ✅ No dictionary words
- ✅ Don't reuse from other sites
- ✅ Store securely (use password manager)

**Example Strong Passwords:**
- `Lc@Clean!ng2025$Secure`
- `7&cP9#mK2@xL5wQ!4nR`
- `Admin-LC-Services-2025!`

### Don't:
- ❌ Use `admin`, `password`, `123456`
- ❌ Share password via email/WhatsApp
- ❌ Store in browser autofill
- ❌ Write on sticky notes

---

## 📧 Email Integration Setup (Future)

Already prepared in `app/api/notifications/route.ts`!

### Quick Setup with Resend:
```bash
npm install resend

# Add to .env.local
RESEND_API_KEY=re_your_key_here

# Uncomment email code in:
# app/api/notifications/route.ts (line 73-82)
```

Get API key: https://resend.com (3000 free emails/month)

---

## 🎉 Your Site is Live!

**Production URLs:**
- Website: `https://your-project.vercel.app`
- Admin Login: `https://your-project.vercel.app/admin/login`
- Track Booking: `https://your-project.vercel.app/track-booking`

**Test Everything:**
1. Make a test booking
2. Track the booking
3. Login to admin
4. Update booking status
5. Verify customer can see status change

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Your Code:** Check `BOOKING_STATUS_GUIDE.md` for features

---

**Deployment Estimated Time:** 15-30 minutes
**Cost:** $0 (Vercel Hobby plan + Supabase free tier)
**SSL Certificate:** Automatic & Free
**CDN:** Included globally

🚀 **Ready to deploy!**
