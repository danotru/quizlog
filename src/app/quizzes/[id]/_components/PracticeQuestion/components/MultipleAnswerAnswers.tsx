"use client";

import { Dispatch, SetStateAction } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import CheckboxButton from "@/app/_components/CheckboxButton";
import { ArrayAnswerQuestion } from "../types/question-types";

/**
 * Props for {@link MultipleAnswerAnswers}
 */
interface MultipleAnswerAnswersProps {
  question: ArrayAnswerQuestion;
  setQuestion: Dispatch<SetStateAction<ArrayAnswerQuestion>>;
  showAnswers: boolean;
  setShowAnswers: (showAnswers: boolean) => void;
}

/**
 * Multiple-answer answers
 */
export default function MultipleAnswerAnswers(
  props: MultipleAnswerAnswersProps,
) {
  return (
    <>
      <div className={"group ql-practice-question__answers"}>
        {props.question.answers.map((answer, index) => (
          <label
            key={`${answer.id}-${index}`}
            className={`ql-practice-question__answer 
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer.includes(answer.id) &&
                answer.isCorrect &&
                "ql-practice-question__answer--correct"
              }
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                !props.question.selectedAnswer.includes(answer.id) &&
                answer.isCorrect &&
                "ql-practice-question__answer--missed"
              }
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer.includes(answer.id) &&
                !answer.isCorrect &&
                "ql-practice-question__answer--incorrect"
              }`}
          >
            <CheckboxButton
              name={`${props.question.id}_answers`}
              value={answer.id}
              useChecked={true}
              disabled={props.question.isSubmitted || props.showAnswers}
              checked={props.question.selectedAnswer.includes(answer.id)}
              handleChange={(e) => {
                if (
                  e.target.checked &&
                  !props.question.selectedAnswer.includes(answer.id)
                ) {
                  props.setQuestion((prev) => ({
                    ...prev,
                    selectedAnswer: [...prev.selectedAnswer, answer.id],
                  }));
                } else {
                  const answersIds = [...props.question.selectedAnswer];
                  answersIds.splice(
                    props.question.selectedAnswer.indexOf(answer.id),
                    1,
                  );

                  props.setQuestion((prev) => ({
                    ...prev,
                    selectedAnswer: answersIds,
                  }));
                }
              }}
            >
              {(props.question.isSubmitted || props.showAnswers) &&
                answer.isCorrect && (
                  <IconCheck
                    stroke={4}
                    className={"ql-practice-question__answer-icon"}
                  />
                )}
              {(props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer.includes(answer.id) &&
                !answer.isCorrect && (
                  <IconX
                    stroke={4}
                    className={"ql-practice-question__answer-icon"}
                  />
                )}
            </CheckboxButton>
            <span className={"ql-practice-question__answer-text"}>
              {answer.text}
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
