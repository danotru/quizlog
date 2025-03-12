import { InferSelectModel } from "drizzle-orm";
import { answersTable, questionsTable } from "@/lib/db/schemas";

/**
 * Text-based answer question type
 */
export type TextAnswerQuestion = InferSelectModel<typeof questionsTable> & {
  type: "multiple_choice" | "true_or_false" | "short_answer";
  answers: InferSelectModel<typeof answersTable>[];
  selectedAnswer: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

/**
 * Array-based answer question type
 */
export type ArrayAnswerQuestion = InferSelectModel<typeof questionsTable> & {
  type: "multiple_answer";
  answers: InferSelectModel<typeof answersTable>[];
  selectedAnswer: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
};

/**
 * Practice question type
 */
export type Question =
  | (InferSelectModel<typeof questionsTable> & {
      answers: InferSelectModel<typeof answersTable>[];
      selectedAnswer: string | string[];
      isSubmitted: boolean;
    })
  | TextAnswerQuestion
  | ArrayAnswerQuestion;
