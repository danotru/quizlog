"use server";

import { quizFormSchema } from "@/app/create/schemas";
import { formDataToObject } from "@/app/_utils/form-utils";
import { db } from "@/lib/db/client";
import { createClient } from "@/lib/auth/server";
import { answersTable, questionsTable, quizzesTable } from "@/lib/db/schemas";
import { DrizzleError } from "drizzle-orm";

/**
 * To create quiz
 */
export async function createQuiz(
  prevState: {} | null | undefined,
  formData: FormData,
) {
  const input = formDataToObject(formData);
  const validatedInput = quizFormSchema.safeParse(input);

  if (!validatedInput.success) {
    console.log(validatedInput.error.message, input.questions[0].answers);
    return { message: validatedInput.error.message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { message: error.message };
  }

  const { name, description, privacy, questions } = validatedInput.data;

  try {
    await db.transaction(async (tx) => {
      const insertedQuizzes = await tx
        .insert(quizzesTable)
        .values({ name, description, privacy, userId: data.user?.id })
        .returning();

      if (insertedQuizzes.length < 1) {
        return;
      }

      for (const question of questions) {
        const { text, type, explanation, answers } = question;
        const insertedQuestions = await tx
          .insert(questionsTable)
          .values({ text, type, explanation, quizId: insertedQuizzes[0].id })
          .returning();

        if (insertedQuestions.length < 1) {
          tx.rollback();
          return;
        }

        for (const answer of answers) {
          const { text, isCorrect } = answer;
          const insertedAnswers = await tx
            .insert(answersTable)
            .values({ text, isCorrect, questionId: insertedQuestions[0].id })
            .returning();

          if (insertedAnswers.length < 1) {
            tx.rollback();
            return;
          }
        }
      }
    });
  } catch (error) {
    if (error instanceof DrizzleError) {
      return {
        message: "An error occurred while creating quiz, please try again...",
      };
    }
  }

  return {};
}
