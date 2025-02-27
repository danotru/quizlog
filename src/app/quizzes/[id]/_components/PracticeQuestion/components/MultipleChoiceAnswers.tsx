"use client";

import { InferSelectModel } from "drizzle-orm";
import { answersTable } from "@/lib/db/schemas";
import RadioButton from "@/app/_components/RadioButton";
import { useEffect, useState } from "react";
import { IconCheck, IconEye, IconEyeClosed, IconX } from "@tabler/icons-react";

/**
 * Props for {@link MultipleChoiceAnswers}
 */
interface MultipleChoiceAnswersProps {
  questionId: string;
  answers: InferSelectModel<typeof answersTable>[];
  isSubmitted: boolean;
}

/**
 * Multiple-choice answers
 */
export default function MultipleChoiceAnswers(
  props: MultipleChoiceAnswersProps,
) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();

  useEffect(() => {
    console.log(selectedAnswerId);
  }, [selectedAnswerId]);

  return (
    <>
      <div className={"group ql-practice-question__answers"}>
        {props.answers.map((answer, index) => {
          const isCorrect = props.isSubmitted
            ? selectedAnswerId === answer.id
              ? answer.isCorrect
              : answer.isCorrect
                ? true
                : undefined
            : undefined;

          return (
            <label
              key={index}
              className={`ql-practice-question__answer 
              ${
                isCorrect !== undefined &&
                (isCorrect
                  ? "ql-practice-question__answer--correct"
                  : "ql-practice-question__answer--incorrect")
              }`}
            >
              <RadioButton
                name={`${props.questionId}_answers`}
                value={answer.id}
                checked={selectedAnswerId === answer.id}
                handleChange={(e) => setSelectedAnswerId(e.target.value)}
              >
                {isCorrect !== undefined &&
                  (isCorrect ? (
                    <IconCheck
                      stroke={4}
                      className={"ql-practice-question__answer-icon"}
                    />
                  ) : (
                    <IconX
                      stroke={4}
                      className={"ql-practice-question__answer-icon"}
                    />
                  ))}
              </RadioButton>
              <span className={"ql-practice-question__answer-text"}>
                {answer.text}
              </span>
            </label>
          );
        })}
      </div>
      <button
        className={`ql-button ${
          selectedAnswerId
            ? props.isSubmitted
              ? "ql-button--secondary"
              : "ql-button--accent"
            : "ql-button--secondary"
        }`}
        onClick={() => {
          if (props.isSubmitted) {
            setSelectedAnswerId(undefined);
          }
        }}
      >
        {props.isSubmitted ? (
          <>
            <IconEyeClosed className={"ql-button__icon"} />
            Hide answer
          </>
        ) : selectedAnswerId ? (
          <div>Submit answer</div>
        ) : (
          <>
            <IconEye className={"ql-button__icon"} />
            Reveal answer
          </>
        )}
      </button>
    </>
  );
}
