import { createBrowserClient } from "@supabase/ssr";

/**
 * To create Supabase auth browser client
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
