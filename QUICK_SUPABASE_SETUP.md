# 🚀 Quick Start: Supabase Setup (5 Minutes)

## 1️⃣ Create Account
👉 Go to: https://supabase.com
- Click "Start your project"
- Sign up with GitHub or Email

## 2️⃣ Create Project
- Click "New Project"
- Name: `lc-cleaning-services`
- Password: [CREATE STRONG PASSWORD - SAVE IT!]
- Region: Europe West (London)
- Plan: Free
- Click "Create new project"
- Wait 2-3 minutes ⏱️

## 3️⃣ Get API Keys
📍 Settings → API

Copy these TWO values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**Anon Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....(very long)
```

## 4️⃣ Update .env.local
Open: `.env.local`

Replace with your real values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-VERY-LONG-ANON-KEY-HERE
```

Save file!

## 5️⃣ Create Database Tables
📍 SQL Editor → New Query

1. Open: `database/schema.sql`
2. Copy ALL contents
3. Paste into Supabase SQL Editor
4. Click "RUN" (or F5)

✅ Should see: "Success. No rows returned"

## 6️⃣ Verify Setup
📍 Table Editor

Should see 6 tables:
- ✅ services (5 rows)
- ✅ bookings (0 rows - will fill up with customer bookings)
- ✅ contact_messages (0 rows)
- ✅ testimonials (4 rows)
- ✅ payment_methods (2 rows)
- ✅ user_profiles (0 rows)

## 7️⃣ Test Website
```powershell
npm run dev
```

Open: http://localhost:3000/booking

Should see all 5 services! ✅

---

## ⚡ That's It!

Your website now has a fully functional database!

**Where to view customer data:**
- Bookings: Supabase → Table Editor → bookings
- Contact Messages: Supabase → Table Editor → contact_messages

**Dashboard:** https://supabase.com/dashboard

---

## 🆘 Common Issues

**Services not showing?**
→ Check .env.local has correct URL and key
→ Restart: `npm run dev`

**"Invalid API key"?**
→ Copy the ENTIRE anon key (it's very long!)
→ No spaces before/after

**Can't run schema?**
→ Make sure you're in SQL Editor
→ Copy the WHOLE schema.sql file

---

✅ **Done!** Your database is ready to receive bookings!
