// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// These will come either from your local `.env` (in dev) or from GitHub Actions env (in CI)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase env vars are not defined. Make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
