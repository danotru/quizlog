"use server";

import { quizFormSchema } from "@/app/create/schemas";
import { formDataToObject } from "@/app/_utils/form-utils";
import { db } from "@/lib/db/client";
import { answersTable, questionsTable, quizzesTable } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

/**
 * To edit a quiz
 */
export async function editQuiz(
  prevState: object | null | undefined,
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

  try {
    await db.transaction(async (tx) => {
      const dbQuiz = await tx.query.quizzesTable.findFirst({
        where: eq(quizzesTable.id, id),
        with: { questions: { with: { answers: true } } },
      });

      if (!dbQuiz) throw new Error("The specified quiz does not exist.");
      if (dbQuiz.userId !== data.user?.id)
        throw new Error("You are not allowed to edit this quiz.");

      await tx
        .update(quizzesTable)
        .set({ name, description, privacy })
        .where(eq(quizzesTable.id, dbQuiz.id));

      const submittedQuestionIds = new Set(questions.map((q) => q.id));

      // Delete missing questions
      for (const oldQuestion of dbQuiz.questions) {
        if (!submittedQuestionIds.has(oldQuestion.id)) {
          await tx
            .delete(questionsTable)
            .where(eq(questionsTable.id, oldQuestion.id));
        }
      }

      for (const submittedQuestion of questions) {
        const oldQuestion = dbQuiz.questions.find(
          (q) => q.id === submittedQuestion.id,
        );
        let questionId = submittedQuestion.id;

        // Edit old question
        if (oldQuestion) {
          await tx
            .update(questionsTable)
            .set({
              text: submittedQuestion.text,
              type: submittedQuestion.type,
              explanation: submittedQuestion.explanation,
              hint: submittedQuestion.hint,
            })
            .where(eq(questionsTable.id, oldQuestion.id));

          if (oldQuestion.type !== submittedQuestion.type) {
            await tx
              .delete(answersTable)
              .where(eq(answersTable.questionId, oldQuestion.id));
          }
          // Insert submitted question
        } else {
          const [insertedQuestion] = await tx
            .insert(questionsTable)
            .values({ ...submittedQuestion, quizId: id })
            .returning({ id: questionsTable.id });

          questionId = insertedQuestion.id;
        }

        const submittedAnswerIds = new Set(
          submittedQuestion.answers.map((a) => a.id),
        );
        const oldAnswers = oldQuestion?.answers ?? [];

        // Delete missing answers
        for (const oldAnswer of oldAnswers) {
          if (!submittedAnswerIds.has(oldAnswer.id)) {
            await tx
              .delete(answersTable)
              .where(eq(answersTable.id, oldAnswer.id));
          }
        }

        for (const submittedAnswer of submittedQuestion.answers) {
          const oldAnswer = oldAnswers.find((a) => a.id === submittedAnswer.id);

          // Update old answer if it exists and question type is the same
          if (oldAnswer && oldQuestion?.type === submittedQuestion.type) {
            await tx
              .update(answersTable)
              .set({
                text: submittedAnswer.text,
                isCorrect: submittedAnswer.isCorrect,
              })
              .where(eq(answersTable.id, oldAnswer.id));
            // Insert new submitted answer
          } else {
            await tx
              .insert(answersTable)
              .values({ ...submittedAnswer, questionId });
          }
        }
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      return {
        alertType: 0,
        message: e.message,
      };
    }
  }

  revalidatePath("/quizzes");
  return { alertType: 1, message: "Successfully updated quiz." };
}
