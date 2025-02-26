"use client";

import { createContext, ReactNode } from "react";
import { InferSelectModel } from "drizzle-orm";
import { answersTable, questionsTable, quizzesTable } from "@/lib/db/schemas";

type Quiz = InferSelectModel<typeof quizzesTable> & {
  questions: (InferSelectModel<typeof questionsTable> & {
    answers: InferSelectModel<typeof answersTable>[];
  })[];
};
export const QuizContext = createContext<Quiz | undefined>(undefined);

/**
 * Props for {@link QuizContextProvider}
 */
interface QuizContextProviderProps {
  children?: ReactNode;
  quiz: Quiz;
}

/**
 * Context provider for quiz
 */
export default function QuizContextProvider(props: QuizContextProviderProps) {
  return (
    <>
      <QuizContext.Provider value={props.quiz}>
        {props.children}
      </QuizContext.Provider>
    </>
  );
}
