"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable, questionsTable } from "@/lib/db/schemas";
import "./styles.css";
import { useState } from "react";
import MultipleChoiceAnswers from "@/app/quizzes/[id]/_components/PracticeQuestion/components/MultipleChoiceAnswers";

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
        <div className={"ql-practice-question__content"}>
          <h2 className={"ql-practice-question__heading"}>Question Text</h2>
          <div className={"ql-practice-question__text"}>
            {props.question.text}
          </div>
          <h2 className={"ql-practice-question__heading"}>Answers</h2>
          {props.question.type === "multiple_choice" && (
            <MultipleChoiceAnswers answers={props.question.answers} />
          )}
        </div>
      </article>
    </>
  );
}
