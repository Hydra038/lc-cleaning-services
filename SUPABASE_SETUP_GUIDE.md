# Supabase Setup Guide for L&C Cleaning Services

## 🎯 Overview
This guide will help you set up Supabase as the database for your L&C Cleaning Services website.

---

## Step 1: Create Supabase Account

1. **Go to Supabase**: https://supabase.com
2. **Click "Start your project"** (top right)
3. **Sign up** using one of these methods:
   - GitHub account (recommended)
   - Email and password
4. **Verify your email** if using email signup

---

## Step 2: Create a New Project

1. After logging in, click **"New Project"**
2. Fill in the project details:
   - **Organization**: Select or create one (e.g., "L&C Cleaning Services")
   - **Project Name**: `lc-cleaning-services`
   - **Database Password**: Create a STRONG password and SAVE IT SOMEWHERE SAFE
   - **Region**: Choose closest to UK (e.g., "Europe West (London)")
   - **Pricing Plan**: Select "Free" (perfect for starting)
3. Click **"Create new project"**
4. Wait 2-3 minutes for your database to be provisioned

---

## Step 3: Get Your API Credentials

1. Once your project is ready, go to **Settings** (gear icon on left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:

### Copy These Values:

**Project URL** (looks like):
```
https://abcdefghijklmnop.supabase.co
```

**Anon/Public Key** (looks like):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjM0NTY3OCwiZXhwIjoxOTI3OTIxNjc4fQ.abcdefghijklmnopqrstuvwxyz1234567890
```

---

## Step 4: Update Your Local .env.local File

1. **Open** the file: `c:\Users\wisem\OneDrive\Desktop\lc-cleaning-services\.env.local`

2. **Replace the placeholder values** with your real credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ACTUAL-ANON-KEY-HERE
```

3. **Save the file**

⚠️ **IMPORTANT**: Never share these keys publicly or commit them to GitHub!

---

## Step 5: Run the Database Schema

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. **Open the file**: `c:\Users\wisem\OneDrive\Desktop\lc-cleaning-services\database\schema.sql`
4. **Copy ALL the contents** of that file
5. **Paste it** into the Supabase SQL Editor
6. Click **"Run"** (or press F5)

### What This Creates:
- ✅ 6 database tables (services, bookings, contact_messages, testimonials, payment_methods, user_profiles)
- ✅ Sample data (5 cleaning services, 4 testimonials, 2 payment methods)
- ✅ Row Level Security policies
- ✅ Database indexes for performance

---

## Step 6: Verify Database Setup

1. Click **Table Editor** (left sidebar)
2. You should see 6 tables:
   - ✅ `services`
   - ✅ `bookings`
   - ✅ `contact_messages`
   - ✅ `testimonials`
   - ✅ `payment_methods`
   - ✅ `user_profiles`

3. Click on **`services`** table
4. You should see 5 cleaning services already populated:
   - Domestic Cleaning (£25)
   - Office Cleaning (£35)
   - End of Tenancy (£150)
   - Carpet & Upholstery (£45)
   - Deep Cleaning (£80)

---

## Step 7: Test Your Website Connection

1. **Open terminal** in your project folder
2. **Run**:
   ```powershell
   npm run dev
   ```
3. **Open browser** to: http://localhost:3000
4. **Go to Booking page**: http://localhost:3000/booking
5. **You should see** all 5 services loading properly! ✅

---

## Step 8: Enable Email Authentication (Optional)

If you want users to create accounts:

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Email** provider
3. Configure email templates as needed
4. Users can now sign up and log in

---

## Step 9: View Your Data

### To see bookings customers make:
1. Go to **Table Editor** → **bookings**
2. All customer bookings will appear here
3. You can view: name, email, phone, service, date, status

### To see contact form submissions:
1. Go to **Table Editor** → **contact_messages**
2. All contact form submissions appear here

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your database password secure
- Use environment variables for API keys
- Enable Row Level Security (already done in schema)
- Regularly backup your database

### ❌ DON'T:
- Share your API keys publicly
- Commit `.env.local` to GitHub
- Use the same password across services
- Disable Row Level Security

---

## 📊 Supabase Dashboard Features You Can Use

### 1. **Table Editor**
- View and edit data directly
- Add/remove rows manually
- Export data to CSV

### 2. **SQL Editor**
- Run custom SQL queries
- Create reports
- Modify database structure

### 3. **Authentication**
- Manage user accounts
- View login activity
- Configure social logins

### 4. **Storage** (if needed later)
- Upload images
- Store documents
- Serve files via CDN

### 5. **Database Backups**
- Automatic daily backups (free plan)
- Manual backup creation
- Point-in-time recovery (paid plans)

---

## 🚀 Next Steps After Setup

1. **Test all features**:
   - ✅ Make a test booking
   - ✅ Submit contact form
   - ✅ View data in Supabase dashboard

2. **Monitor your data**:
   - Check bookings daily
   - Respond to contact messages
   - Track which services are popular

3. **Customize services**:
   - Edit prices in `services` table
   - Add new services
   - Update descriptions

4. **Set up notifications** (optional):
   - Email alerts for new bookings
   - SMS notifications
   - WhatsApp integration

---

## 🆘 Troubleshooting

### Problem: Services not loading on website
**Solution**: 
- Check your `.env.local` has correct credentials
- Verify API key is the "anon/public" key, not the "service_role" key
- Restart dev server after changing .env.local

### Problem: "Invalid API key" error
**Solution**:
- Double-check you copied the entire anon key (it's very long!)
- Make sure there are no spaces before/after the key
- Verify the Project URL matches exactly

### Problem: Can't submit bookings
**Solution**:
- Check Row Level Security policies are enabled
- Verify all tables were created successfully
- Check browser console for specific errors

### Problem: Database schema failed to run
**Solution**:
- Make sure you copied the ENTIRE schema.sql file
- Run it in sections if needed (tables first, then policies)
- Check for any error messages in SQL Editor

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Video Tutorials**: https://www.youtube.com/@Supabase

---

## ✅ Checklist

Before going live, make sure:

- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] .env.local updated with real credentials
- [ ] All 6 tables visible in Table Editor
- [ ] Sample data loaded (5 services, 4 testimonials)
- [ ] Website can connect to database
- [ ] Test booking submitted successfully
- [ ] Test contact form submitted successfully
- [ ] Row Level Security enabled
- [ ] Database password saved securely

---

## 💰 Pricing Information

**Free Plan includes**:
- 500 MB database storage
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users
- 500,000 Edge Function invocations
- Perfect for starting out!

**When to upgrade**:
- More than 50,000 visitors/month
- Need more storage
- Want custom domain for API
- Need priority support

---

**Your database is now ready! 🎉**

All bookings and contact form submissions will be saved automatically.
You can view everything in your Supabase dashboard at any time.
