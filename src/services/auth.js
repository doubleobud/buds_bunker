import { supabase } from './supabaseClient';
import { FINAL_REDIRECT_URL } from '../config/constants';

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // ✅ Redirect directly to /profile after email confirmation
      emailRedirectTo: `${FINAL_REDIRECT_URL}/profile`,
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
