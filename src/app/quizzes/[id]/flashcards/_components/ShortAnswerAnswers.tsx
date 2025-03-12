"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable } from "@/lib/db/schemas";

/**
 * Props for {@link ShortAnswerAnswers}
 */
interface ShortAnswerAnswersProps {
  answers: InferSelectModel<typeof answersTable>[];
}

/**
 * Short-answer answers
 */
export default function ShortAnswerAnswers(props: ShortAnswerAnswersProps) {
  return (
    <>
      <div className={"ql-flashcards__short-answer"}>
        <div className={"ql-flashcards__short-answer__header"}>Keywords</div>
        <div className={"ql-flashcards__short-answer__answers"}>
          {props.answers.map((answer, index) => (
            <div key={index} className={"ql-flashcards__short-answer__answer"}>
              {answer.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
