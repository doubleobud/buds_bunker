import { createClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

const supabaseUrl = siteConfig.customFields.SUPABASE_URL;
const supabaseKey = siteConfig.customFields.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase keys are missing from customFields.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
