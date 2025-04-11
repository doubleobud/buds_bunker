import { supabase } from './supabaseClient'
import { LOCAL_BASE_URL } from '../config/constants'

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${LOCAL_BASE_URL}/email-confirm` },
  })
  if (error) throw error
  return data            // { user, session }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data            // { user, session }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
