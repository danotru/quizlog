"use server";

import { quizFormSchema } from "@/app/create/schemas";
import { formDataToObject } from "@/app/_utils/form-utils";
import { db } from "@/lib/db/client";
import { answersTable, questionsTable, quizzesTable } from "@/lib/db/schemas";
import { DrizzleError, eq } from "drizzle-orm";
import { createClient } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

/**
 * To edit a quiz
 */
export async function editQuiz(
  prevState: {} | null | undefined,
  formData: FormData,
) {
  const input = formDataToObject(formData);
  const validatedInput = quizFormSchema.safeParse(input);

  if (!validatedInput.success) {
    return {
      alertType: 0,
      message: validatedInput.error.message,
    };
  }

  const { id, name, description, privacy, questions } = validatedInput.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { alertType: 0, message: error.message };
  }

  const dbQuiz = await db.query.quizzesTable.findFirst({
    where: eq(quizzesTable.id, id),
    with: {
      questions: {
        with: { answers: true },
      },
    },
  });

  if (!dbQuiz) {
    return {
      alertType: 0,
      message: "An error occurred while editing quiz, please try again...",
    };
  }

  if (dbQuiz.userId !== data.user?.id) {
    return {
      alertType: 0,
      message: "You are not allowed to edit this quiz",
    };
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(quizzesTable)
        .set({ name, description, privacy })
        .where(eq(quizzesTable.id, dbQuiz.id));

      for (const question of dbQuiz.questions) {
        const matchingQuestion = questions.find((q) => q.id === question.id);

        if (!matchingQuestion) {
          const deletedQuestionsCount = (
            await tx
              .delete(questionsTable)
              .where(eq(questionsTable.id, question.id))
              .returning()
          ).length;

          if (deletedQuestionsCount < 1) {
            tx.rollback();
            return;
          }
        } else {
          for (const answer of question.answers) {
            const matchingAnswer = matchingQuestion.answers.find(
              (a) => a.id === answer.id,
            );

            if (!matchingAnswer) {
              const deletedAnswersCount = (
                await tx
                  .delete(answersTable)
                  .where(eq(answersTable.id, answer.id))
                  .returning()
              ).length;

              if (deletedAnswersCount < 1) {
                tx.rollback();
                return;
              }
            }
          }
        }
      }

      for (const question of questions) {
        const { text, type, explanation, hint } = question;
        const oldQuestion = dbQuiz.questions.find((q) => q.id === question.id);
        let questionId;

        if (oldQuestion) {
          await tx
            .update(questionsTable)
            .set({ text, type, explanation, hint })
            .where(eq(questionsTable.id, oldQuestion.id));

          questionId = oldQuestion.id;
        } else {
          const insertedQuestions = await tx
            .insert(questionsTable)
            .values({
              text,
              type,
              explanation,
              hint,
              quizId: dbQuiz.id,
            })
            .returning();

          if (insertedQuestions.length < 1) {
            tx.rollback();
            return;
          }

          questionId = insertedQuestions[0].id;
        }

        if (oldQuestion && oldQuestion.type !== question.type) {
          const deletedCount = (
            await tx
              .delete(answersTable)
              .where(eq(answersTable.questionId, oldQuestion.id))
              .returning()
          ).length;

          if (deletedCount < 1) {
            tx.rollback();
          }
        }

        for (const answer of question.answers) {
          const { text, isCorrect } = answer;
          const oldAnswer = oldQuestion?.answers.find(
            (a) => a.id === answer.id,
          );

          if (oldAnswer && oldQuestion && oldQuestion.type === question.type) {
            await tx
              .update(answersTable)
              .set({ text, isCorrect })
              .where(eq(answersTable.id, oldAnswer.id));
          } else {
            const insertedAnswersCount = (
              await tx
                .insert(answersTable)
                .values({ text, isCorrect, questionId: questionId })
                .returning()
            ).length;

            if (insertedAnswersCount < 1) {
              tx.rollback();
              return;
            }
          }
        }
      }
    });
  } catch (error) {
    if (error instanceof DrizzleError) {
      return {
        alertType: 0,
        message: "An error occurred while editing quiz, please try again...",
      };
    }
  }

  revalidatePath("/quizzes");
  return { alertType: 1, message: "Successfully updated quiz" };
}
