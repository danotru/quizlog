"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable, questionsTable } from "@/lib/db/schemas";
import "./styles.css";
import { useState } from "react";
import MultipleChoiceAnswers from "@/app/quizzes/[id]/_components/PracticeQuestion/components/MultipleChoiceAnswers";
import { IconQuestionMark } from "@tabler/icons-react";

/**
 * Props for {@link PracticeQuestion}
 */
interface PracticeQuestionProps {
  question: InferSelectModel<typeof questionsTable> & {
    answers: InferSelectModel<typeof answersTable>[];
  };
}

/**
 * Practice question
 */
export default function PracticeQuestion(props: PracticeQuestionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <article className={"ql-practice-question"}>
        <form
          className={"ql-practice-question__content"}
          onSubmit={(e) => {
            e.preventDefault();

            setIsSubmitted(!isSubmitted);
          }}
        >
          <div className={"ql-practice-question__text"}>
            {props.question.text}
          </div>
          {props.question.type === "multiple_choice" && (
            <MultipleChoiceAnswers
              questionId={props.question.id}
              answers={props.question.answers}
              isSubmitted={isSubmitted}
            />
          )}
        </form>
        {props.question.hint && (
          <div className={"ql-practice-question__hint-container"}>
            <button className={"ql-button ql-button--secondary"}>
              <IconQuestionMark className={"ql-button__icon"} />
              Give me a hint
            </button>
          </div>
        )}
      </article>
    </>
  );
}
