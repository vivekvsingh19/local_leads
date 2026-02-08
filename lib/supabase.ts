
import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment variables
// See ENV_SETUP.md for configuration instructions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Allow app to work without Supabase for testing
// Only log warning in development mode
if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn(
      '⚠️ Supabase not configured. Login/auth features disabled. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local to enable.'
    );
  }
}

// Create a dummy client if not configured (allows app to run without Supabase)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        detectSessionInUrl: true,
        flowType: 'implicit',
        autoRefreshToken: true,
        persistSession: true,
      },
    })
  : null;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
