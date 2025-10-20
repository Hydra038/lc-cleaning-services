# 📍 Supabase Dashboard Navigation Guide

## Where to Find Everything in Your Supabase Dashboard

```
🏠 SUPABASE DASHBOARD
│
├── 🔧 PROJECT SETTINGS (Bottom Left - Gear Icon)
│   ├── General → Project name, region info
│   ├── API → ⭐ YOUR CREDENTIALS HERE ⭐
│   │   ├── Project URL (Copy this!)
│   │   └── Anon/Public Key (Copy this!)
│   ├── Database → Connection strings
│   └── Billing → Upgrade/usage info
│
├── 📊 TABLE EDITOR (Left Sidebar)
│   ├── services → Your 5 cleaning services
│   ├── bookings → Customer bookings appear here
│   ├── contact_messages → Contact form submissions
│   ├── testimonials → Customer reviews
│   ├── payment_methods → PayPal & Bank Transfer
│   └── user_profiles → Customer accounts
│
├── 🔐 AUTHENTICATION (Left Sidebar)
│   ├── Users → Manage user accounts
│   ├── Policies → Security rules (already set up)
│   └── Providers → Enable email/social login
│
├── 💾 SQL EDITOR (Left Sidebar)
│   ├── ⭐ Click "New Query"
│   ├── ⭐ Paste your schema.sql here
│   └── ⭐ Click "RUN" to create tables
│
├── 📁 STORAGE (Left Sidebar)
│   └── Upload images/files (for future use)
│
└── 📈 REPORTS (Left Sidebar)
    └── View database usage & performance

```

---

## 🎯 What You Need RIGHT NOW

### Step 1: Get Your Credentials
```
📍 Click: Settings (gear icon) → API
```

Look for:
1. **"Project URL"** section
   - Copy the URL (looks like: https://xxxxx.supabase.co)

2. **"Project API keys"** section
   - Find "anon" "public" key
   - Click the copy icon
   - This is a VERY LONG string (normal!)

### Step 2: Create Database Tables
```
📍 Click: SQL Editor → New Query
```

Then:
1. Open file: `database/schema.sql` (in your project folder)
2. Select ALL text (Ctrl+A)
3. Copy (Ctrl+C)
4. Paste into Supabase SQL Editor
5. Click green "RUN" button (top right)
6. Wait for "Success" message

### Step 3: Verify Tables Created
```
📍 Click: Table Editor
```

You should see these 6 tables on the left:
- ✅ services
- ✅ bookings  
- ✅ contact_messages
- ✅ testimonials
- ✅ payment_methods
- ✅ user_profiles

Click on "services" - should show 5 rows!

---

## 📸 Visual Walkthrough

### Finding Your API Credentials:
```
Supabase Dashboard
    ↓
Settings (gear icon at bottom left)
    ↓
Click "API" in left menu
    ↓
Scroll down to see:
    • Project URL ← Copy this
    • Anon key ← Copy this (the long one!)
```

### Creating Tables:
```
Supabase Dashboard
    ↓
SQL Editor (left sidebar)
    ↓
Click "+ New query"
    ↓
Paste your schema.sql content
    ↓
Click "RUN" button
    ↓
See "Success. No rows returned" ✅
```

### Viewing Data:
```
Supabase Dashboard
    ↓
Table Editor (left sidebar)
    ↓
Click "services" table
    ↓
See 5 cleaning services ✅
```

---

## 🎨 Color Guide in Supabase UI

- **Green** = Success, Active, Enabled
- **Yellow** = Warning, Pending
- **Red** = Error, Disabled
- **Blue** = Info, Links
- **Purple** = Primary actions

---

## 🔍 Where Customer Data Appears

### When someone books a service:
```
Table Editor → bookings → New row appears!
```
You'll see:
- Customer name
- Email
- Phone
- Service chosen
- Date & time requested
- Address
- Payment method
- Status (pending/confirmed/completed)

### When someone sends contact form:
```
Table Editor → contact_messages → New row appears!
```
You'll see:
- Name
- Email  
- Phone
- Message
- Timestamp

---

## 💡 Pro Tips

1. **Bookmark this URL**: https://supabase.com/dashboard/project/YOUR-PROJECT-ID
   - Quick access to your dashboard

2. **Save your credentials** in a password manager
   - Database password
   - Project URL
   - API keys

3. **Check Table Editor daily** for new:
   - Bookings
   - Contact messages

4. **Use SQL Editor** to run queries like:
   ```sql
   -- See today's bookings
   SELECT * FROM bookings 
   WHERE DATE(created_at) = CURRENT_DATE;
   
   -- Count total bookings
   SELECT COUNT(*) FROM bookings;
   ```

---

## 🆘 Quick Troubleshooting

**Can't find API credentials?**
→ Settings → API → Scroll down

**SQL query failed?**
→ Make sure you copied the ENTIRE schema.sql file
→ Try running in smaller sections

**Tables not showing?**
→ Refresh page (F5)
→ Check SQL query ran successfully

**Website can't connect?**
→ Verify .env.local has correct values
→ Restart dev server: npm run dev

---

## ✅ Success Checklist

After setup, you should have:
- [ ] Project created in Supabase
- [ ] API credentials copied
- [ ] .env.local updated
- [ ] Schema SQL executed
- [ ] 6 tables visible in Table Editor
- [ ] 5 services showing in "services" table
- [ ] Website shows services on /booking page
- [ ] Test booking successful

---

**You're all set! 🎉**

Your L&C Cleaning Services website is now connected to a professional database!
