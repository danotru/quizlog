"use server";

import { createClient } from "@/lib/auth/server";
import { db } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { quizzesTable } from "@/lib/db/schemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const deleteQuizFormSchema = z.object({
  quizId: z.string(),
});

/**
 * To delete quiz
 */
export async function deleteQuiz(
  prevState: {} | null | undefined,
  formData: FormData,
) {
  const input = Object.fromEntries(formData);
  const validatedInput = await deleteQuizFormSchema.safeParseAsync(input);

  if (!validatedInput.success) {
    return { message: "Missing quiz id, please try again..." };
  }

  const quizId = validatedInput.data.quizId;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { alertType: 0, message: error.message };
  }

  const dbQuiz = await db.query.quizzesTable.findFirst({
    where: eq(quizzesTable.id, quizId),
  });

  if (dbQuiz?.userId !== data.user?.id) {
    return {
      alertType: 0,
      message: "You are not allowed to delete this quiz",
    };
  }

  const deletedQuizzesCount = (
    await db.delete(quizzesTable).where(eq(quizzesTable.id, quizId)).returning()
  ).length;

  if (deletedQuizzesCount < 1) {
    return {
      alertType: 0,
      message: "An error occurred while deleting this quiz, try again...",
    };
  }

  revalidatePath("/quizzes");
  redirect("/quizzes");
}
