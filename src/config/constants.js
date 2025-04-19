// src/config/constants.js

export const BASE_URL = '/buds_bunker';

export const LOCAL_BASE_URL = `http://localhost:3000${BASE_URL}`;
export const PROD_BASE_URL  = `https://doubleobud.github.io${BASE_URL}`;

// 👉 Use this for Supabase email redirect — no trailing slash!
export const FINAL_REDIRECT_URL = `${PROD_BASE_URL}`; 
