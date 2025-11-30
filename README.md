# RampLayer Core 2025

## Quick Deploy
1. Fork this repo.
2. Vercel: Connect GitHub → Deploy /widget branch.
3. Railway: Connect GitHub → Deploy /backend branch.
4. Supabase: Run schema.sql.

## Env Vars (GitHub Secrets)
- SUPABASE_URL=your_supabase_url
- SUPABASE_ANON_KEY=your_key
- STRIPE_SECRET_KEY=sk_test_...

Test: POST to /ramp with {amountCAD: 100, direction: 'on'}
