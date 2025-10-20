# Email Notification Setup Guide

## 📧 Email Notification Options

### **Option 1: Resend (Recommended - Free & Easy)** ⭐

**Why Resend?**
- ✅ Free: 100 emails/day, 3,000/month
- ✅ Easy setup: 5 minutes
- ✅ Modern API: Clean, simple
- ✅ Great for transactional emails
- ✅ Professional templates

**Setup Steps:**

1. **Sign up for Resend**
   - Go to https://resend.com
   - Sign up with email
   - Verify your email

2. **Get API Key**
   - Dashboard → API Keys
   - Click "Create API Key"
   - Copy the key (starts with `re_`)

3. **Add to Vercel Environment Variables**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```
   
   Later, add your own domain:
   ```
   RESEND_FROM_EMAIL=bookings@lccleaningservices.co.uk
   ```

4. **Install Package**
   ```bash
   npm install resend
   ```

---

### **Option 2: SendGrid (Free Tier Available)**

**Free Plan:**
- 100 emails/day forever
- Good for small businesses

**Setup:**
1. Sign up at https://sendgrid.com
2. Get API key
3. Add to environment:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxx
   ```
4. Install: `npm install @sendgrid/mail`

---

### **Option 3: AWS SES (Very Cheap)**

**Pricing:**
- $0.10 per 1,000 emails
- Very reliable

**Best for:**
- High volume
- Already using AWS

---

### **Option 4: Nodemailer + Gmail (Quick Test)**

**Good for:**
- Testing only
- Very low volume

**Not recommended for production:**
- Gmail limits to ~500 emails/day
- Can get flagged as spam
- Less reliable

---

## 🚀 Recommended Implementation (Resend)

### **What emails to send:**

1. **Customer Emails:**
   - ✅ Booking confirmation with reference number
   - ✅ Payment instructions (deposit or full)
   - ✅ Booking status updates (confirmed, completed)
   - ✅ Contact message received confirmation
   - ✅ Admin reply to contact message

2. **Admin Emails:**
   - ✅ New booking notification
   - ✅ New contact message
   - ✅ Payment received notification

### **Email Templates Needed:**

1. **Booking Confirmation** (Customer)
   - Booking reference
   - Service details
   - Date & time
   - Payment amount (deposit or full)
   - Payment instructions

2. **Booking Status Update** (Customer)
   - Status changed notification
   - Next steps

3. **Contact Message Received** (Customer)
   - Message reference
   - Tracking link
   - Response time estimate

4. **Admin Reply** (Customer)
   - Original message
   - Admin's reply
   - Contact options

5. **New Booking Alert** (Admin)
   - Customer details
   - Service requested
   - Link to admin dashboard

6. **New Message Alert** (Admin)
   - Customer name & email
   - Message preview
   - Link to admin dashboard

---

## 💰 Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **Resend** | 3,000/month | $20/month (50k) | Modern apps, easy setup |
| **SendGrid** | 100/day | $15/month (40k) | Established service |
| **AWS SES** | 62,000/month* | $0.10/1,000 | High volume, AWS users |
| **Mailgun** | 5,000/month | $35/month | API-first |

*First 62,000 emails free if sent from EC2

---

## 🎯 My Recommendation

**Start with Resend:**
1. Easy to set up (5 minutes)
2. Free tier is generous (3,000/month)
3. Modern, clean API
4. Great documentation
5. Easy to upgrade later

**Implementation Plan:**
1. ✅ Set up Resend account
2. ✅ Add API key to environment variables
3. ✅ Create email API route
4. ✅ Create email templates
5. ✅ Add email triggers to booking/contact forms
6. ✅ Test with your email
7. ✅ Deploy to production

---

## 📝 Quick Start Commands

```bash
# Install Resend
npm install resend

# Add to .env.local
echo "RESEND_API_KEY=re_your_key_here" >> .env.local
echo "RESEND_FROM_EMAIL=onboarding@resend.dev" >> .env.local

# Add to Vercel
# Go to: Vercel Dashboard → Settings → Environment Variables
# Add: RESEND_API_KEY and RESEND_FROM_EMAIL
```

---

## 🔐 Security Note

**Never commit API keys to GitHub!**
- ✅ Always use environment variables
- ✅ Add to `.env.local` (already in .gitignore)
- ✅ Add to Vercel environment variables
- ❌ Never hardcode in source code

---

## 📊 Expected Email Volume

**For L&C Cleaning Services:**
```
Estimated per month:
- Bookings: ~50-100 (200 emails: confirmation + admin)
- Contact messages: ~30-50 (90 emails: confirmation + admin + reply)
- Status updates: ~100 (100 emails)
---
Total: ~400 emails/month
```

✅ Resend free tier (3,000/month) is MORE than enough!

---

## 🎨 Next Steps

Would you like me to:
1. ✅ **Set up Resend integration** (Recommended)
2. Create professional email templates
3. Add email triggers to booking/contact forms
4. Test the email system
5. Deploy to production

**Ready to implement? Just say "set up email with Resend" and I'll do it! 🚀**
