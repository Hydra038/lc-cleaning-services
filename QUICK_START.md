# 🚀 QUICK START GUIDE

## Admin Login (After Deployment)

**URL:** `https://your-site.vercel.app/admin/login`  
**Password:** Set in Vercel environment variables (`ADMIN_PASSWORD`)

---

## How Booking References Work

**Generated:** Automatically when customer makes booking  
**Format:** `LCB-123456-ABC`  
- `LCB` = L&C Booking prefix  
- `123456` = Timestamp (last 6 digits)  
- `ABC` = Random 3 characters  

**Example:** `LCB-847392-XQ5`

---

## Customer Journey

```
1. Customer books → Gets reference LCB-123456-ABC
                                  ↓
2. Visit /track-booking → Enter reference + email
                                  ↓
3. See status: "Pending Confirmation"
                                  ↓
4. You (admin) update → Change to "Paid" + "Confirmed"
                                  ↓
5. Customer checks again → Sees "Booking Confirmed!"
```

---

## Admin Quick Actions

### Update Payment Status:
1. Login → Bookings tab
2. Find booking
3. Click payment dropdown
4. Select: Pending → **Paid**
5. Done! (Customer can see change immediately)

### Confirm Booking:
1. Bookings tab
2. Click **"Confirm"** button
3. Status changes to "Confirmed"

### Edit Payment Details:
1. Payment Methods tab
2. Click **"Edit Details"**
3. Update PayPal email or bank details
4. **Save**

---

## Environment Variables (Vercel)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://penudaveaysechobupbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=YourSecurePasswordHere!
```

**⚠️ Change the password before deploying!**

---

## Deploy Command

```bash
git add .
git commit -m "Ready for production"
git push origin main
# Then import on Vercel dashboard
```

---

## Status Options

### Booking Status:
- **Pending** → Awaiting confirmation
- **Confirmed** → Service scheduled
- **Completed** → Service done
- **Cancelled** → Booking cancelled

### Payment Status:
- **Pending** → Awaiting payment
- **Paid** → Payment received
- **Failed** → Payment failed
- **Refunded** → Money returned

---

## Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Supabase:** https://supabase.com/dashboard
- **Full Guide:** See `VERCEL_DEPLOYMENT_GUIDE.md`

---

## Test Before Live

```bash
✅ Make test booking
✅ Get reference number
✅ Track booking
✅ Login to admin
✅ Update statuses
✅ Verify customer sees changes
```

---

**Production Build:** ✅ Successful  
**Ready to Deploy:** ✅ Yes  
**Documentation:** ✅ Complete  

🎉 **You're all set!**
