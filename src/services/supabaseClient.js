import { createClient } from '@supabase/supabase-js';

// These env vars must be set in both your .env (locally) and GitHub Actions secrets
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not defined. Check your .env setup.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
