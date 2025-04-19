export const BASE_URL = '/buds_bunker';

export const LOCAL_BASE_URL = `http://localhost:3000${BASE_URL}`;
export const PROD_BASE_URL  = `https://doubleobud.github.io${BASE_URL}`;

// ✅ Used to redirect users to live site paths after signup
export const FINAL_REDIRECT_URL = PROD_BASE_URL; // No trailing slash
