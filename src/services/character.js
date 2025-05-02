// src/services/character.js

import { supabase } from './supabaseClient';

function generateRandomID() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const defaultSelf = 0.0;

/**
 * Create a default character for the current user if none exists.
 * Initializes tokens_json, values_json, and beliefs_json.
 */
export async function createCharacterIfNotExists() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

  const { data: existing, error: fetchError } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle();

  if (fetchError) {
    console.error('[character] Fetch error:', fetchError.message);
    throw fetchError;
  }
  if (existing) {
    return existing;
  }

  const newID = generateRandomID();
  const { data: created, error: insertError } = await supabase
    .from('characters')
    .insert({
      user_id: user.id,
      user_id_number: newID,
      self: defaultSelf,
      tokens_json: { token: 0 },
      values_json: {},
      beliefs_json: {},
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
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

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
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

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
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('characters')
    .select('self')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data?.self ?? defaultSelf;
}

/**
 * Increase the user's `self` value by the given delta.
 */
export async function incrementSelf(delta = 1.0) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

  const current = await getSelf();
  const updatedValue = parseFloat((current + delta).toFixed(1));

  const { data, error } = await supabase
    .from('characters')
    .update({ self: updatedValue })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return updatedValue;
}

/**
 * Assigns the starting Value or Belief based on the user's first choice.
 */
export async function grantSeed(choiceKey) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

  const { data: character, error } = await supabase
    .from('characters')
    .select('values_json, beliefs_json')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;

  const values = character.values_json || {};
  const beliefs = character.beliefs_json || {};

  const seedMap = {
    existence: { field: 'values_json', key: 'pleasure' },
    time: { field: 'values_json', key: 'purpose' },
    death: { field: 'beliefs_json', key: 'absurdity' },
  };

  const seed = seedMap[choiceKey];
  if (!seed) throw new Error(`Invalid seed choice: ${choiceKey}`);

  // Skip if already granted
  const alreadyGranted =
    seed.field === 'values_json'
      ? !!values[seed.key]
      : !!beliefs[seed.key];
  if (alreadyGranted) return;

  if (seed.field === 'values_json') {
    values[seed.key] = 1;
    await updateCharacter({ values_json: values });
  } else {
    beliefs[seed.key] = 1;
    await updateCharacter({ beliefs_json: beliefs });
  }
}

/**
 * Add or update a belief badge in beliefs_json.
 * Stores: title, description, confidence (1–100)
 */
export async function addBeliefBadge(key, title, description, confidence) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) throw new Error('Not authenticated');

  // fetch current
  const char = await getCharacterForUser();
  const beliefs = char.beliefs_json || {};

  // upsert badge
  beliefs[key] = { title, description, confidence };

  const updated = await updateCharacter({ beliefs_json: beliefs });
  return updated.beliefs_json;
}

/**
 * Retrieve all belief badges as an array.
 */
export async function getBeliefBadges() {
  const char = await getCharacterForUser();
  const beliefs = char.beliefs_json || {};
  return Object.entries(beliefs).map(([key, { title, description, confidence }]) => ({
    key,
    title,
    description,
    confidence,
  }));
}
