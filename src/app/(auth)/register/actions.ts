"use server";

import { registerFormSchemaRefined } from "@/app/(auth)/register/schemas";
import { createClient } from "@/lib/auth/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/client";
import { profilesTable } from "@/lib/db/schemas";

/**
 * To register new user in database
 */
export async function register(prevState: object | null, formData: FormData) {
  const input = Object.fromEntries(formData);

  const validatedInput = registerFormSchemaRefined.safeParse(input);

  if (!validatedInput.success) {
    return { alertType: 0, message: validatedInput.error.message };
  }

  if (validatedInput.data.accessCode !== process.env.ACCESS_CODE) {
    return {
      alertType: 0,
      message: "Incorrect access code, please try again...",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: validatedInput.data.emailAddress,
    password: validatedInput.data.password,
  });

  if (error) return { alertType: 0, message: error.message };

  const profiles = await db
    .insert(profilesTable)
    .values({ username: validatedInput.data.username, userId: data.user!.id })
    .returning();

  if (profiles.length < 1) {
    await supabase.auth.signOut();
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    await supabaseAdmin.auth.admin.deleteUser(data.user!.id);

    return {
      alertType: 0,
      message: "An error occurred while registering new user, please try again",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
