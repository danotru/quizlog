"use server";

import { createClient } from "@/lib/auth/server";
import { redirect } from "next/navigation";

/**
 * To log out current user
 */
export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}
