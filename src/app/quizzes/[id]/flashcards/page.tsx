"use client";

import { useCallback, useContext, useState } from "react";
import { QuizContext } from "@/app/quizzes/[id]/_components/QuizContextProvider";
import {
  IconArrowsShuffle,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import "./styles.css";
import ShortAnswerAnswers from "@/app/quizzes/[id]/flashcards/_components/ShortAnswerAnswers";
import MultipleAnswerAnswers from "@/app/quizzes/[id]/flashcards/_components/MultipleAnswerAnswers";
import { shuffleArray } from "@/app/_utils/array-utils";
import Tooltip from "@/app/_components/Tooltip";

/**
 * Page to take quiz in flashcards-mode
 */
export default function QuizFlashcardsPage() {
  const quiz = useContext(QuizContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [questions, setQuestions] = useState(
    quiz!.questions.map((question) => ({
      ...question,
      isFlipped: false,
    })),
  );
  const clearFlipped = useCallback(() => {
    setQuestions((prev) =>
      prev.map((question) => ({ ...question, isFlipped: false })),
    );
  }, []);

  return (
    <>
      <div className={"ql-quiz-actions"}>
        <div className={"ql-quiz-actions__side"}>
          <Tooltip
            text={"Shuffle questions"}
            className={"ql-tooltip__top w-20"}
          >
            <button
              className={"ql-quiz-actions__action"}
              onClick={() =>
                setQuestions(
                  shuffleArray(questions).map((question) => ({
                    ...question,
                    isFlipped: false,
                  })),
                )
              }
            >
              <IconArrowsShuffle />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className={"ql-flashcards"}>
        {questions.map((question, index) => (
          <div
            key={`${question.id}-${index}`}
            className={`ql-flashcards__flashcard ${
              question.isFlipped && "ql-flashcards__flashcard--flipped"
            }`}
            style={{
              transform: `
              translateX(${(index - selectedIndex) * 100}%) 
              scale(max(0, calc(1 - ${Math.abs(index - selectedIndex) / 10}))) 
              rotateY(${(index - selectedIndex) * 10}deg)`,
            }}
            onClick={() => {
              const newQuestions = [...questions];
              newQuestions[index] = {
                ...question,
                isFlipped: !question.isFlipped,
              };
              setQuestions(newQuestions);
            }}
          >
            <div className={"ql-flashcards__flashcard-inner"}>
              <div className={"ql-flashcards__flashcard-front"}>
                <span className={"ql-flashcards__question-text"}>
                  {question.text}
                </span>
              </div>
              <div className={"ql-flashcards__flashcard-back"}>
                <div className={"ql-flashcards__answers"}>
                  {question.type === "short_answer" ? (
                    <ShortAnswerAnswers answers={question.answers} />
                  ) : question.type === "multiple_answer" ? (
                    <MultipleAnswerAnswers answers={question.answers} />
                  ) : (
                    question.answers.map(
                      (answer, index) =>
                        answer.isCorrect && (
                          <span
                            key={index}
                            className={"ql-flashcards__answer-text"}
                          >
                            {answer.text}
                          </span>
                        ),
                    )
                  )}
                  {question.explanation && (
                    <p className={"ql-flashcards__explanation"}>
                      Explanation: {question.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={"ql-flashcards__cycle-buttons"}>
        <button
          className={
            "ql-button ql-button--secondary ql-flashcards__cycle-button"
          }
          onClick={() => {
            if (selectedIndex - 1 < 0) {
              setSelectedIndex(quiz!.questions.length - 1);
            } else {
              setSelectedIndex(selectedIndex - 1);
            }

            clearFlipped();
          }}
        >
          <IconChevronLeft className={"ql-button__icon"} />
          <span>Previous</span>
        </button>
        <div>
          {selectedIndex + 1}/{quiz!.questions.length}
        </div>
        <button
          className={
            "ql-button ql-button--secondary ql-flashcards__cycle-button"
          }
          onClick={() => {
            if (selectedIndex + 1 === quiz!.questions.length) {
              setSelectedIndex(0);
            } else {
              setSelectedIndex(selectedIndex + 1);
            }

            clearFlipped();
          }}
        >
          <span>Next</span>
          <IconChevronRight className={"ql-button__icon"} />
        </button>
      </div>
    </>
  );
}
