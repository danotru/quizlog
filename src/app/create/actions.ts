"use server";

import { quizFormSchema } from "@/app/create/schemas";
import { formDataToObject } from "@/app/_utils/form-utils";
import { db } from "@/lib/db/client";
import { createClient } from "@/lib/auth/server";
import { answersTable, questionsTable, quizzesTable } from "@/lib/db/schemas";
import { DrizzleError } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * To create a quiz
 */
export async function createQuiz(
  prevState: {} | null | undefined,
  formData: FormData,
) {
  const input = formDataToObject(formData);
  const validatedInput = quizFormSchema.safeParse(input);

  if (!validatedInput.success) {
    return { message: validatedInput.error.message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { message: error.message };
  }

  const { name, description, privacy, questions } = validatedInput.data;
  let quizId;

  try {
    quizId = await db.transaction(async (tx) => {
      const insertedQuizzes = await tx
        .insert(quizzesTable)
        .values({ name, description, privacy, userId: data.user?.id })
        .returning();

      if (insertedQuizzes.length < 1) {
        tx.rollback();
        return;
      }

      for (const question of questions) {
        const { text, type, explanation, hint } = question;
        const insertedQuestions = await tx
          .insert(questionsTable)
          .values({
            text,
            type,
            explanation,
            hint,
            quizId: insertedQuizzes[0].id,
          })
          .returning();

        if (insertedQuestions.length < 1) {
          tx.rollback();
          return;
        }

        for (const answer of question.answers) {
          const { text, isCorrect } = answer;
          const insertedAnswersCount = (
            await tx
              .insert(answersTable)
              .values({
                text,
                isCorrect,
                questionId: insertedQuestions[0].id,
              })
              .returning()
          ).length;

          if (insertedAnswersCount < 1) {
            tx.rollback();
            return;
          }
        }
      }

      return insertedQuizzes[0].id;
    });
  } catch (error) {
    if (error instanceof DrizzleError) {
      return {
        message: "An error occurred while creating quiz, please try again...",
      };
    }
  }

  if (quizId) {
    revalidatePath("/quizzes");
    redirect(`/quizzes/${quizId}`);
  }

  return {
    message: "An error occurred while creating quiz, please try again...",
  };
}
