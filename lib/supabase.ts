
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURATION
// Replace these with your actual Supabase Project URL and Anon Key.
// You can find these in your Supabase Dashboard -> Settings -> API.
// ------------------------------------------------------------------

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
