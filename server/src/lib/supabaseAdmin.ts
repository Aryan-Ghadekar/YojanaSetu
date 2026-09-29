import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Service-role client: bypasses Row Level Security. Only ever used server-side,
// after this API has independently verified the caller's identity (see auth middleware).
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
