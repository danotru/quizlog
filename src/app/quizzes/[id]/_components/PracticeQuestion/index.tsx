"use client";

import "./styles.css";
import MultipleChoiceAnswers from "@/app/quizzes/[id]/_components/PracticeQuestion/components/MultipleChoiceAnswers";
import { IconEye, IconEyeClosed, IconQuestionMark } from "@tabler/icons-react";
import MultipleAnswerAnswers from "./components/MultipleAnswerAnswers";
import ShortAnswerAnswers from "@/app/quizzes/[id]/_components/PracticeQuestion/components/ShortAnswerAnswers";
import { Dispatch, memo, SetStateAction, useState } from "react";
import {
  ArrayAnswerQuestion,
  Question,
  TextAnswerQuestion,
} from "./types/question-types";

/**
 * Props for {@link PracticeQuestion}
 */
interface PracticeQuestionProps {
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
  showAnswers: boolean;
  setShowAnswers: (showAnswers: boolean) => void;
}

/**
 * Practice question
 */
function PracticeQuestion(props: PracticeQuestionProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <article className={"ql-practice-question"}>
        <form
          className={"ql-practice-question__content"}
          onSubmit={(e) => {
            e.preventDefault();
            props.setQuestion({
              ...props.question,
              isSubmitted: !props.question.isSubmitted,
            });
          }}
        >
          <div className={"ql-practice-question__text"}>
            {props.question.text}
          </div>
          {(props.question.type === "multiple_choice" ||
            props.question.type === "true_or_false") && (
            <MultipleChoiceAnswers
              question={props.question as TextAnswerQuestion}
              setQuestion={
                props.setQuestion as Dispatch<
                  SetStateAction<TextAnswerQuestion>
                >
              }
              showAnswers={props.showAnswers}
              setShowAnswers={props.setShowAnswers}
            />
          )}
          {props.question.type === "multiple_answer" && (
            <MultipleAnswerAnswers
              question={props.question as ArrayAnswerQuestion}
              setQuestion={
                props.setQuestion as Dispatch<
                  SetStateAction<ArrayAnswerQuestion>
                >
              }
              showAnswers={props.showAnswers}
              setShowAnswers={props.setShowAnswers}
            />
          )}
          {props.question.type === "short_answer" && (
            <ShortAnswerAnswers
              question={props.question as TextAnswerQuestion}
              setQuestion={
                props.setQuestion as Dispatch<
                  SetStateAction<TextAnswerQuestion>
                >
              }
              showAnswers={props.showAnswers}
              setShowAnswers={props.setShowAnswers}
            />
          )}
          {(props.showAnswers || props.question.isSubmitted) &&
            props.question.explanation && (
              <p className={"ql-practice-question__explanation"}>
                Explanation: {props.question.explanation}
              </p>
            )}
          <button
            className={`ql-button ${
              props.question.selectedAnswer.length > 0
                ? props.question.isSubmitted || props.showAnswers
                  ? "ql-button--secondary"
                  : "ql-button--accent"
                : "ql-button--secondary"
            }`}
            onClick={(e) => {
              if (props.showAnswers && props.question.isSubmitted) {
                props.setShowAnswers(false);
              } else if (props.showAnswers) {
                e.preventDefault();
                props.setShowAnswers(false);
              }
            }}
          >
            {props.question.isSubmitted || props.showAnswers ? (
              <>
                <IconEyeClosed className={"ql-button__icon"} />
                Hide answer
              </>
            ) : props.question.selectedAnswer.length > 0 ? (
              <div>Submit answer</div>
            ) : (
              <>
                <IconEye className={"ql-button__icon"} />
                Reveal answer
              </>
            )}
          </button>
        </form>
        {props.question.hint && (
          <>
            <div className={"ql-practice-question__hint-container"}>
              {showHint && (
                <p className={"ql-practice-question__hint"}>
                  Hint: {props.question.hint}
                </p>
              )}
              <button
                className={"ql-button ql-button--secondary"}
                onClick={() => setShowHint((prev) => !prev)}
              >
                <IconQuestionMark className={"ql-button__icon"} />
                {showHint ? "Hide hint" : "Give me a hint"}
              </button>
            </div>
          </>
        )}
      </article>
    </>
  );
}

export default memo(PracticeQuestion);
