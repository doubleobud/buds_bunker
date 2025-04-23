// src/services/log.js
import { supabase } from './supabaseClient';

export async function log(event_type, payload = {}) {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const userId = session?.user?.id ?? null;

  const { error } = await supabase.from('site_events').insert({
    user_id: userId,
    event_type,
    payload,
  });

  if (error) console.error('Log error:', error);
}
