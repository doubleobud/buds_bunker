import { supabase } from './supabaseClient'

// Utility function to generate a random 6-digit ID as a string.
function generateRandomID() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

/**
 * Create a default character row for the current user — only if one doesn't already exist.
 */
export async function createCharacterIfNotExists() {
  // Get the current user from the session.
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) throw new Error("Not authenticated")

  // Step 1: Check if a character already exists for this user.
  const { data: existing, error: fetchError } = await supabase
    .from('characters')
    .select()
    .eq('user_id', user.id)
    .maybeSingle()

  if (fetchError) {
    console.error('[character] Fetch error:', fetchError.message)
    throw fetchError
  }

  // If a character already exists, return it.
  if (existing) return existing

  // Step 2: No character exists, so insert a new row.
  // Generate a random 6-digit ID for user_id_number.
  const newID = generateRandomID()

  const { data: created, error: insertError } = await supabase
    .from('characters')
    .insert({
      // The user_id field is auto-assigned via your database defaults.
      user_id_number: newID,
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
