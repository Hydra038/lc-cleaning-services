-- Add deposit tracking columns to bookings table
-- Run this in Supabase SQL Editor

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS deposit_required BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS balance_remaining DECIMAL(10,2);

-- Create index for deposit queries
CREATE INDEX IF NOT EXISTS idx_bookings_deposit_paid ON bookings(deposit_paid);
CREATE INDEX IF NOT EXISTS idx_bookings_deposit_required ON bookings(deposit_required);

-- Update existing bookings to calculate deposits
-- Services £50+ require 50% deposit
-- Services <£50 are full payment
UPDATE bookings
SET 
  deposit_required = (amount >= 50),
  deposit_amount = CASE 
    WHEN amount >= 50 THEN ROUND(amount * 0.5, 2)
    ELSE amount
  END,
  balance_remaining = CASE 
    WHEN amount >= 50 THEN ROUND(amount * 0.5, 2)
    ELSE 0
  END
WHERE deposit_amount IS NULL;

-- Comment: 
-- - deposit_required: TRUE if service is £50 or more
-- - deposit_amount: 50% of total if deposit required, full amount if not
-- - deposit_paid: Admin marks this as TRUE when deposit is received
-- - balance_remaining: Remaining amount to be paid (0 if full payment)
