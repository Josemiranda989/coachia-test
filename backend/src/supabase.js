import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('❌ La variable de entorno SUPABASE_URL no está definida.');
}

if (!supabaseAnonKey) {
  throw new Error('❌ La variable de entorno SUPABASE_ANON_KEY no está definida.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
