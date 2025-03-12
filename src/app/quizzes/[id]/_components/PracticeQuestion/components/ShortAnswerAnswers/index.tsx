"use client";

import TextAreaField from "@/app/_components/TextAreaField";
import {
  useRef,
  useState,
  UIEvent,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import "./styles.css";
import { TextAnswerQuestion } from "../../types/question-types";
import { isShortAnswerQuestionCorrect } from "@/app/quizzes/[id]/_components/PracticeQuestion/utils/question-utils";

/**
 * Props for {@link ShortAnswerAnswers}
 */
interface ShortAnswerAnswersProps {
  question: TextAnswerQuestion;
  setQuestion: Dispatch<SetStateAction<TextAnswerQuestion>>;
  showAnswers: boolean;
  setShowAnswers: (showAnswers: boolean) => void;
}

/**
 * Short-answer answers
 */
export default function ShortAnswerAnswers(props: ShortAnswerAnswersProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const [missingAnswers, setMissingAnswers] = useState<string[]>([]);

  const handleScroll = useCallback((e: UIEvent<HTMLTextAreaElement>) => {
    displayRef.current!.scrollTop = (e.target as HTMLTextAreaElement).scrollTop;
  }, []);

  useEffect(() => {
    if (!displayRef.current) return;

    if (props.question.isSubmitted || props.showAnswers) {
      let newText = props.question.selectedAnswer;

      const answers = isShortAnswerQuestionCorrect(
        props.question.selectedAnswer,
        props.question.answers,
      );

      answers.correctAnswers.forEach((answer) => {
        newText = newText.replaceAll(
          new RegExp(`${answer}`, "gi"),
          (match) =>
            `<span class='ql-practice-question__highlight'>${match}</span>`,
        );
      });

      setMissingAnswers(answers.missingAnswers);
      displayRef.current.innerHTML = newText;
    } else {
      setMissingAnswers([]);
      displayRef.current.innerHTML = props.question.selectedAnswer;
    }
  }, [
    props.question.isSubmitted,
    props.question.selectedAnswer,
    props.question.answers,
    props.showAnswers,
  ]);

  return (
    <>
      <div
        className={`ql-short-answer ${
          (props.question.isSubmitted || props.showAnswers) &&
          missingAnswers.length < 1 &&
          props.question.selectedAnswer.length > 0 &&
          "ql-short-answer--correct"
        }
        ${
          (props.question.isSubmitted || props.showAnswers) &&
          missingAnswers.length > 0 &&
          props.question.selectedAnswer.length > 0 &&
          "ql-short-answer--incorrect"
        }
        `}
      >
        <div className={"ql-short-answer__input-container"}>
          <TextAreaField
            placeholder={"Type your answer..."}
            value={props.question.selectedAnswer}
            setValue={(value) =>
              props.setQuestion({ ...props.question, selectedAnswer: value })
            }
            spellCheck={false}
            onScroll={handleScroll}
            disabled={props.question.isSubmitted || props.showAnswers}
          />
          <div ref={displayRef} className={"ql-short-answer__display-text"}>
            {props.question.selectedAnswer}
          </div>
          {!(props.question.isSubmitted || props.showAnswers) &&
            props.question.selectedAnswer.length > 0 && (
              <button
                type={"button"}
                className={"ql-short-answer__clear-button"}
                onClick={() =>
                  props.setQuestion({ ...props.question, selectedAnswer: "" })
                }
              >
                Clear answer
              </button>
            )}
        </div>
        {(props.showAnswers || props.question.isSubmitted) &&
          missingAnswers.length > 0 && (
            <>
              <div className={"ql-short-answer__missing-header"}>
                {(props.question.isSubmitted || props.showAnswers) &&
                missingAnswers.length > 0 &&
                props.question.selectedAnswer.length < 1
                  ? "Keywords"
                  : "Missing keywords"}
              </div>
              <ul className={"ql-short-answer__missing-list"}>
                {missingAnswers.map((missingAnswer, index) => (
                  <li key={index} className={"ql-short-answer__missing-item"}>
                    {missingAnswer}
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
    </>
  );
}
