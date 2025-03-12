"use client";

import RadioButton from "@/app/_components/RadioButton";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { TextAnswerQuestion } from "../types/question-types";
import { isTextAnswerQuestionCorrect } from "@/app/quizzes/[id]/_components/PracticeQuestion/utils/question-utils";

/**
 * Props for {@link MultipleChoiceAnswers}
 */
interface MultipleChoiceAnswersProps {
  question: TextAnswerQuestion;
  setQuestion: Dispatch<SetStateAction<TextAnswerQuestion>>;
  showAnswers: boolean;
  setShowAnswers: (showAnswers: boolean) => void;
}

/**
 * Multiple-choice answers
 */
export default function MultipleChoiceAnswers(
  props: MultipleChoiceAnswersProps,
) {
  useEffect(() => {
    if (!props.question.isSubmitted) return;

    props.setQuestion((prev) => ({
      ...prev,
      isCorrect: isTextAnswerQuestionCorrect(
        props.question.selectedAnswer,
        props.question.answers,
      ),
    }));
  }, [
    props.question.isSubmitted,
    props.question.selectedAnswer,
    props.question.answers,
  ]);

  return (
    <>
      <div className={"ql-practice-question__answers"}>
        {props.question.answers.map((answer, index) => (
          <label
            key={index}
            className={`ql-practice-question__answer 
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer !== "" &&
                answer.isCorrect &&
                "ql-practice-question__answer--correct"
              }
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer === answer.id &&
                !answer.isCorrect &&
                "ql-practice-question__answer--incorrect"
              }
              ${
                (props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer === "" &&
                answer.isCorrect &&
                "ql-practice-question__answer--missed"
              }
              `}
          >
            <RadioButton
              name={`${props.question.id}_answers`}
              value={answer.id}
              useChecked={true}
              disabled={props.question.isSubmitted || props.showAnswers}
              checked={props.question.selectedAnswer === answer.id}
              handleChange={(e) =>
                props.setQuestion({
                  ...props.question,
                  selectedAnswer: e.target.value,
                })
              }
            >
              {(props.question.isSubmitted || props.showAnswers) &&
                answer.isCorrect && (
                  <IconCheck
                    stroke={4}
                    className={"ql-practice-question__answer-icon"}
                  />
                )}
              {(props.question.isSubmitted || props.showAnswers) &&
                props.question.selectedAnswer === answer.id &&
                !answer.isCorrect && (
                  <IconX
                    stroke={4}
                    className={"ql-practice-question__answer-icon"}
                  />
                )}
            </RadioButton>
            <span className={"ql-practice-question__answer-text"}>
              {answer.text}
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
