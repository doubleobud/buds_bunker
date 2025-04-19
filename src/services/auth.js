// src/services/auth.js
import { supabase } from './supabaseClient'
import { PROD_BASE_URL } from '../config/constants' // ✅ use correct URL

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${PROD_BASE_URL}/email-confirm`, // ✅ correct, fully resolved
    },
  })
  if (error) throw error
  return data
}
