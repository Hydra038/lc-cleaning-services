-- Add deposit tracking fields to bookings table
-- Run this in your Supabase SQL Editor

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS balance_amount DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS requires_deposit BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS balance_paid BOOLEAN DEFAULT false;

-- Update existing bookings to have correct values
UPDATE bookings 
SET 
  requires_deposit = CASE WHEN amount >= 50 THEN true ELSE false END,
  deposit_amount = CASE WHEN amount >= 50 THEN (amount * 0.5) ELSE amount END,
  balance_amount = CASE WHEN amount >= 50 THEN (amount * 0.5) ELSE 0 END,
  deposit_paid = CASE WHEN payment_status = 'paid' THEN true ELSE false END,
  balance_paid = CASE WHEN payment_status = 'paid' AND amount < 50 THEN true ELSE false END
WHERE deposit_amount IS NULL OR deposit_amount = 0;
