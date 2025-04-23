// src/services/unlock.js
import { supabase } from './supabaseClient';
import { log } from './log';

export async function isUnlocked(feature_key) {
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('unlocks')
    .select('unlocked')
    .eq('user_id', session.user.id)
    .eq('feature_key', feature_key)
    .maybeSingle();

  if (error) throw error;
  return data?.unlocked ?? false;
}

export async function unlock(feature_key, payload = {}) {
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  // check first to avoid duplicates
  const existing = await isUnlocked(feature_key);
  if (existing) return true;

  const { error: insertError } = await supabase.from('unlocks').insert({
    user_id: session.user.id,
    feature_key,
    unlocked: true,
    payload,
  });

  if (insertError) throw insertError;

  await log('unlock', { feature_key, payload });
  return true;
}
