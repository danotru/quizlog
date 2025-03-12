import { InferSelectModel } from "drizzle-orm";
import { answersTable } from "@/lib/db/schemas";

/**
 * To check if short-answer question is correct
 * @param selectedAnswer answer text to check
 * @param answers list of correct answer terms
 */
export function isShortAnswerQuestionCorrect(
  selectedAnswer: string,
  answers: InferSelectModel<typeof answersTable>[],
) {
  const missingAnswers: string[] = [];
  const correctAnswers: string[] = [];

  answers.forEach((answer) => {
    const isAnswerPresent = selectedAnswer.match(
      new RegExp(`${answer.text}`, "gi"),
    );

    if (!isAnswerPresent && !missingAnswers.includes(answer.text)) {
      missingAnswers.push(answer.text);
    } else if (isAnswerPresent) {
      correctAnswers.push(answer.text);
    }
  });

  return { correctAnswers, missingAnswers };
}

/**
 * To check if text-based answer question is correct
 * @param selectedAnswer answer id to check
 * @param answers list of answers
 */
export function isTextAnswerQuestionCorrect(
  selectedAnswer: string,
  answers: InferSelectModel<typeof answersTable>[],
) {
  const correctAnswer = answers.find((answer) => answer.isCorrect);

  return selectedAnswer === correctAnswer?.id;
}

/**
 * To check if array-based answer question is correct
 * @param selectedAnswer array of answer IDs to check
 * @param answers list of correct answers
 */
export function isArrayAnswerQuestionCorrect(
  selectedAnswer: string[],
  answers: InferSelectModel<typeof answersTable>[],
) {
  let isCorrect = true;

  for (const answer of answers) {
    if (
      (answer.isCorrect && !selectedAnswer.includes(answer.id)) ||
      (!answer.isCorrect && selectedAnswer.includes(answer.id))
    ) {
      isCorrect = false;
      break;
    }
  }

  return isCorrect;
}
