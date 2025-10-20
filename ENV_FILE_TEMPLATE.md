# 📝 .env.local Template

## After you get your Supabase credentials, your .env.local should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjM0NTY3OCwiZXhwIjoxOTI3OTIxNjc4fQ.abcdefghijklmnopqrstuvwxyz123456789
```

## ⚠️ IMPORTANT NOTES:

1. **Replace the example values** with YOUR actual values from Supabase

2. **The Project URL** should be:
   - Start with `https://`
   - End with `.supabase.co`
   - Example: `https://xyzabc123.supabase.co`

3. **The Anon Key** should be:
   - VERY LONG (400+ characters)
   - Starts with `eyJ`
   - Has dots (.) separating sections
   - Don't worry if it seems too long - that's normal!

4. **NO QUOTES needed** around the values

5. **NO SPACES** before or after the values

6. **Save the file** after editing

---

## ✅ Correct Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://myproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...very...long...key
```

## ❌ WRONG Examples:

### Missing https://
```env
NEXT_PUBLIC_SUPABASE_URL=myproject.supabase.co  ← WRONG!
```

### Has quotes
```env
NEXT_PUBLIC_SUPABASE_URL="https://myproject.supabase.co"  ← WRONG!
```

### Has spaces
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY= eyJhbGc...  ← WRONG! (space before key)
```

### Incomplete key
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  ← WRONG! (key cut off)
```

---

## 🔍 Where to Find Your Values:

1. **Go to**: https://supabase.com/dashboard
2. **Open your project**: lc-cleaning-services
3. **Click**: Settings (gear icon, bottom left)
4. **Click**: API (in the left menu)
5. **Scroll down** to find:

### Project URL
Look for section: "Project URL"
```
URL: https://xxxxxxxxxxxxx.supabase.co
```
Click the copy icon → Paste into .env.local

### Anon Key
Look for section: "Project API keys"
Find the one labeled: **anon** **public**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi... (continues for many lines)
```
Click the copy icon → Paste into .env.local

---

## 🔒 Security Reminder:

- ✅ Keep .env.local on your computer only
- ❌ Never share it publicly
- ❌ Never commit it to GitHub
- ❌ Never post screenshots with these values

The .env.local file is already in .gitignore, so it won't be uploaded to GitHub accidentally.

---

## 🚀 After Updating:

1. **Save** the .env.local file
2. **Restart** your dev server:
   ```powershell
   # Stop the current server (Ctrl+C)
   # Then start again:
   npm run dev
   ```
3. **Test** by visiting: http://localhost:3000/booking
4. **Should see** all 5 cleaning services loading! ✅

---

## 🆘 Still Not Working?

**Double-check**:
- [ ] URL starts with `https://`
- [ ] URL ends with `.supabase.co`
- [ ] Anon key is complete (very long)
- [ ] No extra spaces
- [ ] No quotes around values
- [ ] File is saved
- [ ] Dev server restarted

**Still stuck?**
→ Open: SUPABASE_NAVIGATION_GUIDE.md
→ Check screenshots in Supabase dashboard
→ Verify you copied the "anon" key, not "service_role" key
