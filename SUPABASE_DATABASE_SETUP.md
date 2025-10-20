# Supabase Database Setup Guide

## Step-by-Step Instructions

### Step 1: Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project: **penudaveaysechobupbf**
3. Click on **SQL Editor** in the left sidebar (icon looks like a document with `</>`)
4. Click **+ New query** button

### Step 2: Create the Contact Messages Table

Copy and paste this SQL into the editor:

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    message_reference VARCHAR(50) UNIQUE,
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
CREATE POLICY "Anyone can submit contact messages" 
ON contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view contact messages (for tracking)
DROP POLICY IF EXISTS "Anyone can view contact messages" ON contact_messages;
CREATE POLICY "Anyone can view contact messages" 
ON contact_messages 
FOR SELECT 
USING (true);

-- Allow updates (for admin replies)
DROP POLICY IF EXISTS "Anyone can update contact messages" ON contact_messages;
CREATE POLICY "Anyone can update contact messages" 
ON contact_messages 
FOR UPDATE 
USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_reference ON contact_messages(message_reference);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
```

3. Click **Run** button (or press Ctrl+Enter)
4. You should see "Success. No rows returned"

### Step 3: Verify the Table Was Created

Run this query to check:

```sql
SELECT * FROM contact_messages LIMIT 5;
```

You should see an empty table with columns: id, name, email, phone, message, is_read, message_reference, admin_reply, replied_at, created_at

### Step 4: Test from Your Website

1. Go to your website's contact page
2. Fill out the form
3. Submit the message
4. Check Supabase to see if the message was saved:

```sql
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;
```

## Troubleshooting

### Error: "relation 'contact_messages' does not exist"
- You need to run the CREATE TABLE script above

### Error: "new row violates row-level security policy"
- Run the RLS policies script above (the CREATE POLICY commands)

### Error: "permission denied for table contact_messages"
- Make sure RLS is enabled and policies are created

### Still having issues?
1. Go to Supabase Dashboard → Authentication → Policies
2. Check if policies exist for `contact_messages` table
3. Make sure "Enable RLS" is turned ON
4. Verify the INSERT policy allows `true` (anyone can insert)

## What These Policies Do

- **Anyone can submit contact messages**: Allows customers to send messages without authentication
- **Anyone can view contact messages**: Allows customers to track their messages using the reference number
- **Anyone can update contact messages**: Allows admin to add replies to messages

## Next: Create Other Tables

Once contact messages work, you can create the other tables (bookings, services, etc.) by running the full schema from `database/schema.sql`
