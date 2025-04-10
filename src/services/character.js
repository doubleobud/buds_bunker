import { supabase } from './supabaseClient';

// Create a default character record for a new user (Option 1)
export async function createDefaultCharacter(userId) {
  const { error } = await supabase.from('characters').insert({
    user_id: userId,
    display_name: 'New Adventurer',
    stats: {
      health: 100,
      stamina: 50,
      keywords: [],
      level: 1,
    },
  });

  if (error) throw error;
}

// Get the current user's character (by user ID)
export async function getCharacterForUser(userId) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Update a user's character stats
export async function updateCharacter(userId, newStats) {
  const { error } = await supabase
    .from('characters')
    .update({ stats: newStats })
    .eq('user_id', userId);

  if (error) throw error;
}
