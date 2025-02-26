"use client";

import { IconArrowsShuffle, IconRestore } from "@tabler/icons-react";
import Tooltip from "@/app/_components/Tooltip";
import { useContext } from "react";
import { QuizContext } from "@/app/quizzes/[id]/_components/QuizContextProvider";
import PracticeQuestion from "@/app/quizzes/[id]/_components/PracticeQuestion";

/**
 * Props for {@link QuizPracticePage}
 */
interface QuizPracticeProps {}

/**
 * Page to take quiz in practice-mode
 */
export default function QuizPracticePage(props: QuizPracticeProps) {
  const quiz = useContext(QuizContext);

  return (
    <>
      <div className={"ql-quiz-actions"}>
        <div className={"ql-quiz-actions__side"}>
          <Tooltip text={"Reset questions"} className={"ql-tooltip__top w-20"}>
            <button className={"ql-quiz-actions__action"}>
              <IconRestore />
            </button>
          </Tooltip>
        </div>
        <div>
          <Tooltip
            text={"Shuffle questions"}
            className={"ql-tooltip__top w-20"}
          >
            <button className={"ql-quiz-actions__action"}>
              <IconArrowsShuffle />
            </button>
          </Tooltip>
        </div>
      </div>
      {quiz?.questions.map((question, index) => (
        <PracticeQuestion key={index} question={question} />
      ))}
    </>
  );
}
