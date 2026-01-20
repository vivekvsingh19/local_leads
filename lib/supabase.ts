
import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment variables
// See ENV_SETUP.md for configuration instructions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local. See ENV_SETUP.md for details.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
