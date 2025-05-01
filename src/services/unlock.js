// src/services/unlock.js
import { supabase } from './supabaseClient';
import { log } from './log';

/**
 * Has the current user ever unlocked `featureKey`?
 * Returns true/false.
 */
export async function isUnlocked(featureKey) {
  const { data: { session }, error: sesErr } = await supabase.auth.getSession();
  if (sesErr || !session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('unlocks')
    .select('unlocked')
    .eq('user_id', session.user.id)
    .eq('feature_key', featureKey)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw error;
  return data?.length ? data[0].unlocked : false;
}

/**
 * Insert an unlock row (if it doesn’t exist) & log analytics.
 */
export async function unlock(featureKey, payload = {}) {
  const { data: { session }, error: sesErr } = await supabase.auth.getSession();
  if (sesErr || !session?.user) throw new Error('Not authenticated');

  // Skip if already unlocked
  if (await isUnlocked(featureKey)) return true;

  const { error } = await supabase.from('unlocks').insert({
    user_id: session.user.id,
    feature_key: featureKey,
    unlocked: true,
    payload,
  });
  if (error) throw error;

  await log('unlock', { featureKey, payload });
  return true;
}

/* --------------------------------------------------
   Optional: keep a default export that bundles both.
   Nothing imports this right now, but it avoids
   accidental “missing default export” errors.
---------------------------------------------------*/
export default { isUnlocked, unlock };
