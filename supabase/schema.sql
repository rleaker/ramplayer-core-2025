-- Run this in Supabase SQL Editor
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  direction TEXT NOT NULL,
  stripe_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test insert
INSERT INTO transactions (amount, direction, stripe_id) VALUES (100.00, 'on', 'test_pi_123');
