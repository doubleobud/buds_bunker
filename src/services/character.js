// src/services/character.js

import { supabase } from './supabaseClient';

function generateRandomID() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const defaultSelf = 0.0;

/**
 * Create a default character for the current user if none exists.
 */
export async function createCharacterIfNotExists() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");

  const { data: existing, error: fetchError } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle();

  if (fetchError) {
    console.error('[character] Fetch error:', fetchError.message);
    throw fetchError;
  }

  if (existing) return existing;

  const newID = generateRandomID();

  const { data: created, error: insertError } = await supabase
    .from('characters')
    .insert({
      user_id: user.id,
      user_id_number: newID,
      self: defaultSelf,
      tokens_json: { token: 0 }
    })
    .select()
    .single();

  if (insertError) {
    console.error('[character] Insert error:', insertError.message);
    throw insertError;
  }

  return created;
}

/**
 * Fetch the full character record for the current user.
 */
export async function getCharacterForUser() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('[character] Get error:', error.message);
    throw error;
  }

  return data;
}

/**
 * Update part of the character record with a partial object.
 */
export async function updateCharacter(partial) {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from('characters')
    .update(partial)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get the current user's `self` value.
 */
export async function getSelf() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from('characters')
    .select('self')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data?.self ?? 0.0;
}

/**
 * Increase the user's `self` value by the given delta.
 */
export async function incrementSelf(delta = 1.0) {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");

  const current = await getSelf();
  const updated = parseFloat((current + delta).toFixed(1));

  const { data, error } = await supabase
    .from('characters')
    .update({ self: updated })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return updated;
}
