"use client";

import { useMemo } from "react";
import TrueOrFalseField from "@/app/_components/QuizForm/components/QuestionForm/components/TrueOrFalseForm/components/TrueOrFalseField";
import { answerFormSchema } from "@/app/create/schemas";
import { z } from "zod";

/**
 * Props for {@link TrueOrFalseForm}
 */
interface TrueOrFalseFormProps {
  questionIndex: number;
  answers: z.infer<typeof answerFormSchema>[];
  setAnswers: (answers: z.infer<typeof answerFormSchema>[]) => void;
}

/**
 * True-or-false form
 */
export default function TrueOrFalseForm(props: TrueOrFalseFormProps) {
  const correctAnswerId = useMemo(() => {
    for (const answer of props.answers) {
      if (answer.isCorrect) {
        return answer.id;
      }
    }

    return undefined;
  }, [props.answers]);

  return (
    <>
      {props.answers.map((answer, index) => (
        <TrueOrFalseField
          key={answer.id}
          index={index}
          questionIndex={props.questionIndex}
          correctAnswerId={correctAnswerId}
          answer={answer}
          setAnswer={(value) => {
            const answers = [...props.answers];
            answers[index] = value;
            props.setAnswers(answers);
          }}
          setCorrectAnswer={() => {
            const answers = [...props.answers];
            answers.forEach(
              (answer, i) => (answers[i] = { ...answer, isCorrect: false }),
            );
            answers[index] = { ...answers[index], isCorrect: true };
            props.setAnswers(answers);
          }}
        />
      ))}
    </>
  );
}
