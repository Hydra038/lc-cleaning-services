# WhatsApp Admin Notifications Setup Guide

## 📱 WhatsApp Notification Options

### **Option 1: WhatsApp Business API (Official - Best)** ⭐

**Providers:**
1. **Twilio** (Most Popular)
2. **MessageBird** 
3. **360Dialog**
4. **WATI**

**Twilio WhatsApp Pricing:**
- ✅ **Free**: 1,000 messages/month (trial)
- ✅ **Pay-as-you-go**: $0.005 per message (UK)
- ✅ **Very cheap**: ~200 notifications = $1/month

**What you can send:**
- ✅ New booking alerts
- ✅ New contact messages
- ✅ Payment notifications
- ✅ Urgent updates

---

### **Option 2: WhatsApp Web Automation (Simplest)** 🚀

**Using wa-automate or whatsapp-web.js:**
- ✅ **Free** - No API costs
- ✅ Quick setup
- ✅ Send from your personal WhatsApp
- ⚠️ Requires keeping computer/server running
- ⚠️ Against WhatsApp ToS (risk of ban)

**Best for:**
- Testing
- Personal use
- Low volume

---

### **Option 3: Twilio SMS (Alternative)** 📨

**If WhatsApp is complicated:**
- ✅ Very reliable
- ✅ Easy to set up
- ✅ $0.04 per SMS (UK)
- ✅ 200 notifications = $8/month

---

## 🎯 Recommended: Twilio WhatsApp (Official)

### **Why Twilio WhatsApp?**
1. ✅ Official & reliable
2. ✅ Very cheap ($0.005/message)
3. ✅ Professional
4. ✅ Template-based messages
5. ✅ No risk of ban
6. ✅ Scales automatically

### **Setup Steps:**

#### **1. Sign up for Twilio**
```
1. Go to https://www.twilio.com/try-twilio
2. Sign up (free trial gives $15 credit)
3. Verify your phone number
```

#### **2. Get WhatsApp Sandbox Access**
```
1. Dashboard → Messaging → Try it out → Try WhatsApp
2. Send the join code to Twilio WhatsApp number
3. Example: "join <your-code>" to +1 415 523 8886
```

#### **3. Get Twilio Credentials**
```
Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Auth Token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WhatsApp From: whatsapp:+14155238886 (sandbox)
```

#### **4. Add to .env.local**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_ADMIN_WHATSAPP=whatsapp:+447413069737
```

#### **5. Install Twilio SDK**
```bash
npm install twilio
```

---

## 📋 What Notifications to Send

### **High Priority (Send to WhatsApp):**
1. ✅ **New Booking** 
   ```
   🎯 New Booking!
   
   Customer: John Smith
   Service: End of Tenancy
   Date: 25 Jan 2025, 10:00
   Amount: £150 (£75 deposit)
   Reference: LCB-123456
   
   View: https://yoursite.com/admin
   ```

2. ✅ **New Contact Message**
   ```
   💬 New Message!
   
   From: Sarah Johnson
   Type: Quote Request
   Reference: LCM-789012
   
   Message: "Need quote for 3-bed house..."
   
   View: https://yoursite.com/admin
   ```

3. ✅ **Payment Received** (if integrated)
   ```
   💰 Payment Received!
   
   Booking: LCB-123456
   Customer: John Smith
   Amount: £75 (deposit)
   Status: Confirmed
   ```

### **Low Priority (Email or Dashboard only):**
- Booking status changes
- Customer replies
- System updates

---

## 💰 Cost Breakdown

### **Twilio WhatsApp:**
```
Per Message: £0.004 (UK)

Monthly estimate:
- New bookings: 100 × £0.004 = £0.40
- Contact messages: 50 × £0.004 = £0.20
- Urgent updates: 20 × £0.004 = £0.08
---
Total: ~£0.70/month ($1/month)
```

**Way cheaper than SMS!** 📉

### **Twilio SMS (for comparison):**
```
Per SMS: £0.04 (UK)
Same volume: ~£6.80/month

WhatsApp is 10x cheaper! ✅
```

---

## 🚀 Implementation Code Preview

### **API Route: `/api/notifications/whatsapp`**
```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendWhatsAppNotification(
  type: 'booking' | 'message' | 'payment',
  data: any
) {
  const message = formatMessage(type, data)
  
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.TWILIO_ADMIN_WHATSAPP,
    body: message
  })
}

function formatMessage(type: string, data: any) {
  if (type === 'booking') {
    return `🎯 *New Booking!*

Customer: ${data.customer_name}
Service: ${data.service_name}
Date: ${data.service_date} at ${data.service_time}
Amount: £${data.amount} ${data.deposit_required ? `(£${data.deposit_amount} deposit)` : ''}
Reference: ${data.reference}

View in admin: https://yoursite.com/admin`
  }
  // ... other message types
}
```

### **Usage in Booking Form:**
```typescript
// After successful booking
await supabase.from('bookings').insert([bookingData])

// Send WhatsApp notification
await fetch('/api/notifications/whatsapp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'booking',
    data: bookingData
  })
})
```

---

## 🔄 Production Setup (When You're Ready)

### **Move from Sandbox to Production:**

1. **Apply for WhatsApp Business Account**
   - Needs: Business details, Facebook Business Manager
   - Approval: ~1-2 weeks

2. **Get Approved Templates**
   - WhatsApp requires pre-approved message templates
   - Submit templates for approval

3. **Get Your Own Number**
   - Use your business WhatsApp number
   - Format: `whatsapp:+447413069737`

---

## 🎨 Alternative: Simple Webhook to Your Phone

### **Zapier/Make.com Integration:**
```
Supabase → Webhook → Zapier → WhatsApp
```

**Pros:**
- ✅ No coding needed
- ✅ Visual setup
- ✅ Free tier available

**Cons:**
- ❌ Less control
- ❌ Slower
- ❌ May cost more at scale

---

## 🎯 My Recommendation

**Start Simple:**
1. Use **Twilio WhatsApp Sandbox** (free trial)
2. Send notifications for:
   - New bookings ✅
   - New contact messages ✅
3. Test for 1-2 months
4. If working well, apply for production access

**Cost: ~$1/month** 💰

---

## 📝 Quick Start Checklist

- [ ] Sign up for Twilio (free trial)
- [ ] Join WhatsApp sandbox
- [ ] Get credentials (SID, Token)
- [ ] Add to environment variables
- [ ] Install Twilio SDK
- [ ] Create notification API route
- [ ] Add to booking/contact forms
- [ ] Test with your number
- [ ] Deploy to production

---

## ⚠️ Important Notes

1. **Sandbox Limitations:**
   - Only pre-approved numbers can receive messages
   - Add your number by sending join code
   - Perfect for admin notifications (just you!)

2. **Production Requirements:**
   - Need Facebook Business Manager
   - Message templates must be approved
   - More setup, but more features

3. **Rate Limits:**
   - Sandbox: Generous for admin notifications
   - Production: Can send to any customer

---

## 🚀 Ready to Implement?

**Want me to:**
1. ✅ Set up Twilio WhatsApp integration
2. ✅ Create notification system
3. ✅ Add to booking/contact forms
4. ✅ Test notifications
5. ✅ Deploy to production

**Just say "yes, set up WhatsApp notifications" and I'll build it! 📱**

**Cost: ~$1/month for ~200 notifications**
**Setup time: 15 minutes**
