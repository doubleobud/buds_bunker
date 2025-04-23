import { supabase } from './supabaseClient';
import { log } from './log';

/**
 * Atomic earn/spend wrapper
 */
export async function modifyTokens(amount, type = 'token', reason = '') {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  const { error } = await supabase.rpc('rpc_modify_tokens', {
    _user: session.user.id,
    _amount: amount,
    _token_type: type,
    _reason: reason,
  });
  if (error) throw error;

  await log('token_transaction', { type, amount, reason });
}

export async function earn(amount, type = 'token', reason = 'earned') {
  return modifyTokens(Math.abs(amount), type, reason);
}

export async function spend(amount, type = 'token', reason = 'spent') {
  return modifyTokens(-Math.abs(amount), type, reason);
}

/**
 * Fetches current balance for a given token type.
 */
export async function getBalance(type = 'token') {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  const { data, error, status } = await supabase
    .from('characters')
    .select('tokens_json')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error && status !== 406) throw error;

  const tokens = data?.tokens_json ?? {};
  return parseInt(tokens[type] ?? 0, 10);
}
