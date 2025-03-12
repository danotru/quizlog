"use client";

import {
  IconArrowsShuffle,
  IconEye,
  IconEyeClosed,
  IconRestore,
  IconX,
} from "@tabler/icons-react";
import Tooltip from "@/app/_components/Tooltip";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { QuizContext } from "@/app/quizzes/[id]/_components/QuizContextProvider";
import PracticeQuestion from "@/app/quizzes/[id]/_components/PracticeQuestion";
import { shuffleArray } from "@/app/_utils/array-utils";
import { Question } from "./_components/PracticeQuestion/types/question-types";
import {
  isArrayAnswerQuestionCorrect,
  isShortAnswerQuestionCorrect,
  isTextAnswerQuestionCorrect,
} from "@/app/quizzes/[id]/_components/PracticeQuestion/utils/question-utils";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart } from "chart.js";

Chart.register(ArcElement);

/**
 * Page to take quiz in practice-mode
 */
export default function QuizPracticePage() {
  const quiz = useContext(QuizContext);

  if (!quiz) {
    return null;
  }

  const scoreRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);
  const [questions, setQuestions] = useState<Question[]>(
    quiz.questions.map((question) => ({
      ...question,
      selectedAnswer: question.type === "multiple_answer" ? [] : "",
      isCorrect: false,
      isSubmitted: false,
    })),
  );
  const [showAnswers, setShowAnswers] = useState(false);
  const [reset, setReset] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [correctCount, setCorrectCount] = useState(0);
  const [duration, setDuration] = useState(moment.duration(0));

  const correctPercentage = useMemo(
    () => Math.floor((correctCount / questions.length) * 100),
    [correctCount, questions.length],
  );

  const handleResetQuestions = useCallback(() => {
    setShowAnswers(false);
    setQuestions(
      questions.map((question) => ({
        ...question,
        isSubmitted: false,
        selectedAnswer: question.type === "multiple_answer" ? [] : "",
      })),
    );
    setReset(!reset);
    setStartTime(moment());
  }, [questions, reset, showAnswers]);

  useEffect(() => {
    if (isLoaded.current) return;

    setQuestions(
      shuffleArray(questions).map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      })),
    );

    isLoaded.current = true;
  }, [questions]);

  useEffect(() => {
    let completed = true;

    for (const question of questions) {
      if (!question.isSubmitted) {
        completed = false;
        break;
      }
    }

    setShowScore(completed);

    if (completed) {
      let correctCount = 0;

      for (const question of questions) {
        if (question.type === "short_answer") {
          const { missingAnswers } = isShortAnswerQuestionCorrect(
            question.selectedAnswer as string,
            question.answers,
          );

          missingAnswers.length < 1 && correctCount++;
        } else if (
          question.type === "multiple_choice" ||
          question.type === "true_or_false"
        ) {
          isTextAnswerQuestionCorrect(
            question.selectedAnswer as string,
            question.answers,
          ) && correctCount++;
        } else if (question.type === "multiple_answer") {
          isArrayAnswerQuestionCorrect(
            question.selectedAnswer as string[],
            question.answers,
          ) && correctCount++;
        }
      }

      setCorrectCount(correctCount);
      setDuration(moment.duration(moment().diff(startTime)));

      const timeout = setTimeout(() => {
        if (!scoreRef.current) return;

        scoreRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [questions]);

  useEffect(() => {
    if (showScore) {
      setStartTime(moment());
    }
  }, [showScore]);

  return (
    <>
      <div className={"ql-quiz-actions"}>
        <div className={"ql-quiz-actions__side"}>
          <Tooltip
            text={showAnswers ? "Hide answers" : "Show answers"}
            className={"ql-tooltip__top w-20"}
          >
            <button
              className={"ql-quiz-actions__action"}
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? <IconEye /> : <IconEyeClosed />}
            </button>
          </Tooltip>
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
                    answers: shuffleArray(question.answers),
                  })),
                )
              }
            >
              <IconArrowsShuffle />
            </button>
          </Tooltip>
        </div>
        <div>
          <Tooltip text={"Reset questions"} className={"ql-tooltip__top w-20"}>
            <button
              className={"ql-quiz-actions__action"}
              onClick={handleResetQuestions}
            >
              <IconRestore />
            </button>
          </Tooltip>
        </div>
      </div>
      <div
        ref={scoreRef}
        className={`ql-quiz-result ${!showScore && "ql-quiz-result--hidden"} ${
          correctPercentage > 75
            ? "ql-quiz-result--good"
            : correctPercentage > 50
              ? "ql-quiz-result--ok"
              : "ql-quiz-result--bad"
        }`}
      >
        <div
          className={`ql-quiz-result__chart ${
            correctCount === questions.length && "ql-quiz-result__chart--full"
          }`}
        >
          <Doughnut
            data={{
              datasets: [
                {
                  data: [correctCount, questions.length - correctCount],
                  backgroundColor: [
                    correctPercentage > 75
                      ? "#64F895"
                      : correctPercentage > 50
                        ? "#FFC535"
                        : "#FC3B3B",
                    "transparent",
                  ],
                  borderWidth: 0,
                  borderRadius: 9999,
                },
              ],
            }}
            options={{ cutout: "75%" }}
          />
          <h1 className={"ql-quiz-result__chart-label"}>
            {Math.floor((correctCount / questions.length) * 100)}%
          </h1>
        </div>
        <div className={"ql-quiz-result__container"}>
          <div className={"ql-quiz-result__content"}>
            <div className={"ql-quiz-result__message"}>
              <h3>
                {correctPercentage > 75
                  ? "Wow, you're doing great!"
                  : correctPercentage > 50
                    ? "Not bad, keep practicing!"
                    : "That was rough... you're still learning!"}
              </h3>
              <IconX
                className={"ql-quiz-result__close-button ql-link"}
                onClick={() => setShowScore(false)}
              />
            </div>
            <div className={"ql-quiz-result__time"}>
              Time taken: {duration.hours() > 0 ? `${duration.hours()}h` : ""}
              {duration.minutes() > 0 ? `${duration.minutes()}m` : ""}
              {`${duration.seconds()}s`}
            </div>
            <div>
              You answered{" "}
              <span className={"ql-quiz-result__correct-count"}>
                {correctCount} / {questions.length}
              </span>{" "}
              questions right
            </div>
          </div>
          <button
            className={"ql-button ql-button--secondary"}
            onClick={handleResetQuestions}
          >
            <IconRestore className={"ql-button__icon"} /> Reset questions
          </button>
        </div>
      </div>
      {questions.map((question, index) => (
        <PracticeQuestion
          key={`${question.id}-${index}-${reset}`}
          showAnswers={showAnswers}
          setShowAnswers={setShowAnswers}
          question={question}
          setQuestion={(value) => {
            const newQuestions = [...questions];
            newQuestions[index] =
              value instanceof Function ? value(question) : value;
            setQuestions(newQuestions);
          }}
        />
      ))}
      <button
        className={"ql-button ql-button--accent"}
        onClick={() => {
          setQuestions(
            questions.map((question) => ({
              ...question,
              isSubmitted: true,
            })),
          );
        }}
      >
        Submit all answers
      </button>
    </>
  );
}
