"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable } from "@/lib/db/schemas";

/**
 * Props for {@link MultipleChoiceAnswers}
 */
interface MultipleChoiceAnswersProps {
  answers: InferSelectModel<typeof answersTable>[];
}

/**
 * Multiple-choice answers
 */
export default function MultipleChoiceAnswers(
  props: MultipleChoiceAnswersProps,
) {
  return (
    <>
      <div>
        {props.answers.map((answer, index) => (
          <div key={index} className={"ql-practice-question__answer"}>
            <span>{answer.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
