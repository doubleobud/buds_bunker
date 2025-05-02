// src/services/badges.js
import { supabase } from './supabaseClient';
import { updateCharacter, getCharacterForUser } from './character';

/**
 * Add a belief badge with metadata into the user's beliefs_json.
 * @param {string} key          Unique badge key (e.g. "existence_self")
 * @param {string} title        Short badge title
 * @param {string} description  A one-line description
 * @param {number} confidence   1–100 confidence %
 */
export async function addBeliefBadge(key, title, description, confidence) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  // fetch existing
  const char = await getCharacterForUser();
  const beliefs = char.beliefs_json || {};

  // insert/update badge
  beliefs[key] = { title, description, confidence };

  // persist back
  const updated = await updateCharacter({ beliefs_json: beliefs });
  return updated.beliefs_json;
}

/**
 * Retrieve an array of all belief badges:
 * [ { key, title, description, confidence }, … ]
 */
export async function getBeliefBadges() {
  const char = await getCharacterForUser();
  const beliefs = char.beliefs_json || {};
  return Object.entries(beliefs).map(([key, data]) => ({
    key,
    title: data.title,
    description: data.description,
    confidence: data.confidence,
  }));
}
