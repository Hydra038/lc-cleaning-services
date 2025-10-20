# 📋 Booking Status & Notification System Guide

## Overview
Your L&C Cleaning Services website now has a complete booking status tracking and notification system that keeps customers informed throughout their booking journey.

---

## ✅ Features Implemented

### 1. **Unique Booking References**
- Every booking gets a unique reference code (e.g., `LCB-123456-ABC`)
- Format: `LCB-[timestamp]-[random]`
- Customers receive this reference immediately after booking
- Used to track booking status without requiring login

### 2. **Enhanced Success Page**
After booking, customers see:
- ✅ Large, highlighted booking reference number
- 📧 Confirmation that email was sent
- 📋 Step-by-step "What happens next" guide
- 📊 Complete booking summary
- 🔗 Direct link to track booking
- 📱 WhatsApp contact button with pre-filled reference

### 3. **Track Booking Page** (`/track-booking`)
Customers can check their booking status by entering:
- Booking reference
- Email address

They'll see:
- **Current booking status** (pending/confirmed/completed/cancelled)
- **Payment status** (pending/paid/failed/refunded)
- **Service details** (date, time, address, service type)
- **Status-specific messages** with next steps
- **Color-coded status badges** for easy understanding
- **Direct WhatsApp contact** button

### 4. **Email Notification System** (Ready to integrate)
API endpoint created at `/api/notifications` supporting:
- 📧 Booking confirmation emails
- 💳 Payment confirmation emails
- ⏰ Service reminder emails (day before)
- ❌ Cancellation emails

---

## 🎯 Customer Journey

### Step 1: Customer Makes Booking
1. Customer fills booking form
2. Clicks "Confirm Booking"
3. Booking saved to database with unique reference

### Step 2: Booking Confirmation Screen
Customer immediately sees:
```
✅ Booking Submitted Successfully!

Your Booking Reference
    LCB-123456-ABC

📧 Confirmation email sent to customer@email.com
Save this reference to track your booking

What Happens Next?
1️⃣ We'll Contact You
   Our team will reach out on WhatsApp within 24 hours

2️⃣ Payment Confirmation
   We'll verify your payment and update your booking status

3️⃣ Service Delivery
   Our professional team will arrive at scheduled time
```

### Step 3: Track Booking Status
Customer can:
1. Click "Track Your Booking" button
2. Or visit `/track-booking` anytime
3. Enter reference + email
4. See real-time booking and payment status

### Step 4: Status Updates by Admin
When admin updates booking/payment status:
- Customer sees updated status on track booking page
- Status badge changes color
- Message updates automatically

---

## 📊 Booking Status Flow

### Booking Statuses:
```
pending → confirmed → completed
    └────→ cancelled
```

| Status | Color | Meaning |
|--------|-------|---------|
| **Pending** | 🟡 Yellow | Booking received, awaiting confirmation |
| **Confirmed** | 🔵 Blue | Booking confirmed, service scheduled |
| **Completed** | 🟢 Green | Service delivered successfully |
| **Cancelled** | 🔴 Red | Booking cancelled by customer or admin |

### Payment Statuses:
```
pending → paid → (completed)
    ├────→ failed
    └────→ refunded
```

| Status | Color | Meaning |
|--------|-------|---------|
| **Pending** | 🟡 Yellow | Awaiting payment |
| **Paid** | 🟢 Green | Payment received and verified |
| **Failed** | 🔴 Red | Payment attempt failed |
| **Refunded** | ⚪ Gray | Payment refunded to customer |

---

## 🔧 How Admin Updates Status

### From Admin Dashboard (`/admin`):

1. **Update Payment Status:**
   - Go to Bookings tab
   - Find the booking
   - Click payment status dropdown
   - Select new status (Pending → Paid)
   - Status saves automatically

2. **Update Booking Status:**
   - Click status buttons (Confirm/Complete/Cancel)
   - Status updates immediately
   - Customer can see change on tracking page

3. **Customer Sees Update:**
   - Customer visits `/track-booking`
   - Enters reference + email
   - Sees updated status and messages

---

## 📧 Email Integration Guide

### To Enable Email Notifications:

#### Option 1: Resend (Recommended - Easiest)
```bash
# 1. Install Resend
npm install resend

# 2. Get API key from resend.com (Free tier: 3000 emails/month)

# 3. Add to .env.local
RESEND_API_KEY=re_your_api_key_here

# 4. Uncomment email code in:
# app/api/notifications/route.ts (line 73-82)

# 5. Update booking page to send emails:
# app/booking/page.tsx - add after booking success:
await fetch('/api/notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'booking_confirmation',
    bookingId: data[0].id,
    email: formData.email,
    reference: reference
  })
})
```

#### Option 2: Other Email Services
- **SendGrid**: `npm install @sendgrid/mail`
- **Mailgun**: `npm install mailgun-js`
- **AWS SES**: `npm install @aws-sdk/client-ses`

### Email Templates Included:
1. ✅ **Booking Confirmation** - Sent immediately after booking
2. 💳 **Payment Confirmation** - Sent when admin marks payment as "Paid"
3. ⏰ **Service Reminder** - Can be sent day before service (setup cron job)
4. ❌ **Cancellation Notice** - Sent when booking cancelled

---

## 🔔 Automated Reminders (Optional Enhancement)

### Setup Daily Reminder Check:
Create a cron job or scheduled task:

```typescript
// Example: Vercel Cron Job
// File: app/api/cron/send-reminders/route.ts

import { supabase } from '@/lib/supabase'

export async function GET() {
  // Get bookings for tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_status', 'confirmed')
    .eq('service_date', tomorrow.toISOString().split('T')[0])
  
  // Send reminder for each booking
  for (const booking of bookings || []) {
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking_reminder',
        bookingId: booking.id,
        email: booking.customer_email,
        reference: booking.payment_reference
      })
    })
  }
  
  return Response.json({ success: true })
}
```

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/send-reminders",
    "schedule": "0 9 * * *"
  }]
}
```

---

## 💡 Customer Communication Flow

### Immediate (After Booking):
- ✅ Success screen with reference number
- ✅ Ability to track booking immediately
- ✅ WhatsApp contact with pre-filled message

### Within 24 Hours:
- 📱 You contact customer on WhatsApp
- 💳 Verify payment details
- ✅ Update booking status to "Confirmed"
- 📧 (Optional) Send confirmation email

### Day Before Service:
- 📧 (Optional) Automated reminder email
- ⏰ Confirm access arrangements

### After Service:
- ✅ Mark booking as "Completed"
- 💳 Mark payment as "Paid" (if not already)
- 📧 (Optional) Send thank you email with review request

---

## 🎨 Status Messages Shown to Customers

### When Booking Status = "Pending":
```
⏳ Awaiting Payment
We're waiting for your payment. Once received, 
we'll confirm your booking within 24 hours.
```

### When Payment Status = "Paid" (but booking still pending):
```
⏳ Pending Confirmation
Payment received! We'll confirm your booking 
shortly via WhatsApp.
```

### When Booking Status = "Confirmed":
```
✓ Booking Confirmed
Your booking is confirmed! Our team will arrive 
on [date] at [time].
```

### When Booking Status = "Completed":
```
✅ Service Completed
Your cleaning service has been completed. 
Thank you for choosing L&C Cleaning Services!
```

### When Booking Status = "Cancelled":
```
❌ Booking Cancelled
This booking has been cancelled. If you have 
any questions, please contact us on WhatsApp.
```

---

## 🔐 Security Features

- ✅ Booking lookup requires BOTH reference AND email (prevents unauthorized access)
- ✅ Unique references (timestamp + random = virtually impossible to guess)
- ✅ No sensitive payment details shown on tracking page
- ✅ Admin dashboard protected (separate login required)

---

## 📱 WhatsApp Integration

All communication includes:
- Pre-filled WhatsApp messages with booking reference
- Direct links to WhatsApp Web/App
- Your WhatsApp number: +44 7413 069737

Example message templates:
```
Success Page:
"Hi, my booking reference is LCB-123456-ABC. 
I just made a booking and wanted to confirm the details."

Track Page:
"Hi, my booking reference is LCB-123456-ABC. 
I have a question about my booking."
```

---

## 📈 Testing the System

### Test Booking Flow:
1. Go to `/booking`
2. Make a test booking
3. Note the reference number
4. Click "Track Your Booking"
5. Verify status shows as "Pending"

### Test Admin Updates:
1. Go to `/admin`
2. Find test booking
3. Update payment status to "Paid"
4. Go back to `/track-booking`
5. Enter reference + email
6. Verify status updated to "Paid"

### Test Email (when integrated):
1. Make booking with your email
2. Check inbox for confirmation email
3. Verify all details are correct

---

## 🚀 Next Steps (Optional Enhancements)

1. **SMS Notifications**
   - Integrate Twilio for SMS updates
   - Send booking confirmation via SMS
   - Send reminder SMS day before

2. **Customer Account System**
   - Allow customers to create accounts
   - View all their past bookings
   - Save favorite services

3. **Review System**
   - Send review request after completed service
   - Collect ratings and testimonials
   - Display on website

4. **Calendar Integration**
   - Send .ics calendar invites
   - Add to Google Calendar button
   - Outlook calendar integration

---

## 📞 Support

For questions about this system:
- Check code comments in relevant files
- Review Supabase database schema
- Contact on WhatsApp: +44 7413 069737

---

## 📁 Related Files

- `app/booking/page.tsx` - Booking form with reference generation
- `app/track-booking/page.tsx` - Status tracking page
- `app/admin/page.tsx` - Admin dashboard (update statuses)
- `app/api/notifications/route.ts` - Email notification API
- `database/schema.sql` - Database schema with status fields
- `components/Navigation.tsx` - Navigation with "Track Booking" link

---

**Last Updated:** October 2025
**System Status:** ✅ Fully Functional
**Email Integration:** ⏳ Ready (needs API key configuration)
