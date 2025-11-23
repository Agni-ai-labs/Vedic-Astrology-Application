import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function initSupabase(): SupabaseClient {
    if (supabase) {
        return supabase;
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials not found in environment variables');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
}

export function getSupabase(): SupabaseClient {
    if (!supabase) {
        throw new Error('Supabase not initialized. Call initSupabase first.');
    }
    return supabase;
}
