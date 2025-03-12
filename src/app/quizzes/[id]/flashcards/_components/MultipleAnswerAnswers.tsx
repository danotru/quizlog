"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable } from "@/lib/db/schemas";

/**
 * Props for {@link MultipleAnswerAnswers}
 */
interface MultipleAnswerAnswersProps {
  answers: InferSelectModel<typeof answersTable>[];
}

/**
 * Multiple-answer answers
 */
export default function MultipleAnswerAnswers(
  props: MultipleAnswerAnswersProps,
) {
  return (
    <>
      <div className={"ql-flashcards__multiple-answer"}>
        {props.answers.map(
          (answer, index) =>
            answer.isCorrect && (
              <div
                key={index}
                className={"ql-flashcards__multiple-answer__answer"}
              >
                {answer.text}
              </div>
            ),
        )}
      </div>
    </>
  );
}
