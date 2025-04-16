// src/services/character.js

import { supabase } from './supabaseClient'

// Utility function to generate a random 6-digit ID as a string.
function generateRandomID() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

// Standardized default stats schema for all characters.
const defaultStats = {
  version: 'v1',
  level: 1,
  health: 100,
  stamina: 50,
  keywords: [],
  tutorial_complete: false,
  codex_unlocked: false,
  faction_board_unlocked: false,
  // Add future unlocks here as needed
}

/**
 * Create a default character row for the current user — only if one doesn't already exist.
 */
export async function createCharacterIfNotExists() {
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) throw new Error("Not authenticated")

  const { data: existing, error: fetchError } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle()

  if (fetchError) {
    console.error('[character] Fetch error:', fetchError.message)
    throw fetchError
  }

  if (existing) return existing

  const newID = generateRandomID()

  const { data: created, error: insertError } = await supabase
    .from('characters')
    .insert({
      user_id: user.id,
      user_id_number: newID,
      stats: defaultStats,
    })
    .select()
    .single()

  if (insertError) {
    console.error('[character] Insert error:', insertError.message)
    throw insertError
  }

  return created
}

/**
 * Get the current user's character row.
 */
export async function getCharacterForUser() {
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('[character] Get error:', error.message)
    throw error
  }

  return data
}

/**
 * Update the current user's character with the given partial data.
 */
export async function updateCharacter(partial) {
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from('characters')
    .update(partial)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return { data, error }
}

/**
 * Unlock a feature by setting a boolean flag in the stats JSON field.
 * Merges new unlocks with existing data without overwriting other fields.
 */
export async function unlockFeature(key) {
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) throw new Error("Not authenticated")

  const { data: character, error: fetchError } = await supabase
    .from('characters')
    .select('stats')
    .eq('user_id', user.id)
    .single()

  if (fetchError || !character) {
    console.error('[character] Unlock fetch error:', fetchError?.message)
    throw fetchError
  }

  const updatedStats = {
    ...character.stats,
    [key]: true,
  }

  const { data, error: updateError } = await supabase
    .from('characters')
    .update({ stats: updatedStats })
    .eq('user_id', user.id)
    .select()
    .single()

  if (updateError) {
    console.error('[character] Unlock update error:', updateError.message)
    throw updateError
  }

  return data
}
