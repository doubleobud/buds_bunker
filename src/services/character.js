import { supabase } from './supabaseClient'

/**
 * Create a default character row for the current user — only if one doesn't already exist.
 */
export async function createCharacterIfNotExists() {
  // Step 1: Check if a character already exists for this user.
  const { data: existing, error: fetchError } = await supabase
    .from('characters')
    .select()
    .maybeSingle()

  if (fetchError) {
    console.error('[character] Fetch error:', fetchError.message)
    throw fetchError
  }

  // If a character already exists, return it.
  if (existing) return existing

  // Step 2: No character exists, so insert a new row.
  // The user_id will be auto-assigned via auth.uid() defined in your database defaults.
  const { data: created, error: insertError } = await supabase
    .from('characters')
    .insert({
      display_name: 'New Adventurer',
      stats: { level: 1, health: 100, stamina: 50, keywords: [] },
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
 * Uses .maybeSingle() to avoid crashing when no row exists.
 */
export async function getCharacterForUser() {
  const { data, error } = await supabase
    .from('characters')
    .select()
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
  const { data, error } = await supabase
    .from('characters')
    .update(partial)
    .select()
    .single()

  if (error) throw error
  return data
}
