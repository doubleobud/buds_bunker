// src/services/token.js

import { supabase } from './supabaseClient';
import { log } from './log';

/**
 * Central earn/spend handler using the rpc_modify_tokens function.
 */
export async function modifyTokens(amount, tokenType = 'token', reason = '') {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) throw new Error('Not authenticated');

  const userId = session.user.id;

  const { error } = await supabase.rpc('rpc_modify_tokens', {
    _user: userId,
    _amount: amount,
    _token_type: tokenType,
    _reason: reason,
  });

  if (error) throw error;

  await log('token_transaction', { type: tokenType, amount, reason });
}

/**
 * Grants tokens to the user (positive amount).
 */
export async function earn(amount, tokenType = 'token', reason = 'earned') {
  return modifyTokens(Math.abs(amount), tokenType, reason);
}

/**
 * Deducts tokens from the user (negative amount).
 */
export async function spend(amount, tokenType = 'token', reason = 'spent') {
  return modifyTokens(-Math.abs(amount), tokenType, reason);
}

/**
 * Gets the user's current balance for a given token type.
 */
export async function getBalance(tokenType = 'token') {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) throw new Error('Not authenticated');

  const userId = session.user.id;

  const { data, error, status } = await supabase
    .from('characters')
    .select('tokens_json')
    .eq('user_id', userId)
    .maybeSingle();

  if (error && status !== 406) throw error;

  const tokens = data?.tokens_json ?? {};
  return parseInt(tokens[tokenType] ?? 0, 10);
}
