// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const { siteConfig } = useDocusaurusContext();
const supabaseUrl = siteConfig.customFields.supabaseUrl;
const supabaseKey = siteConfig.customFields.supabaseAnonKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not defined.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
