"use server";

import { createClient } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginFormSchema } from "@/app/(auth)/login/schemas";

/**
 * To log in user using credentials
 */
export async function login(
  prevState: { message: string } | null,
  formData: FormData,
) {
  const input = Object.fromEntries(formData);

  const validatedInput = loginFormSchema.safeParse(input);

  if (!validatedInput.success) {
    return { message: validatedInput.error.message };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validatedInput.data.emailAddress,
    password: validatedInput.data.password,
  });

  if (error?.code === "invalid_credentials")
    return {
      message:
        "Entered credentials do not match or account does not exist, try again",
    };

  if (error) {
    return { message: "An error occurred while logging in, try again" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
