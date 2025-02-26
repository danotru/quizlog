"use client";

import { useEffect, useMemo, useState } from "react";
import { IconCodeVariablePlus } from "@tabler/icons-react";
import MultipleChoiceField from "@/app/_components/QuizForm/components/QuestionForm/components/MultipleChoiceForm/components/MultipleChoiceField";
import { z } from "zod";
import {
  answerFormSchema,
  generateDefaultAnswerFormValues,
} from "@/app/create/schemas";

/**
 * Props for {@link MultipleChoiceForm}
 */
interface MultipleChoiceFormProps {
  questionIndex: number;
  answers: z.infer<typeof answerFormSchema>[];
  setAnswers: (answers: z.infer<typeof answerFormSchema>[]) => void;
}

/**
 * Multiple choice form
 */
export default function MultipleChoiceForm(props: MultipleChoiceFormProps) {
  const correctAnswerId = useMemo(() => {
    for (let answer of props.answers) {
      if (answer.isCorrect) {
        return answer.id;
      }
    }

    return undefined;
  }, [props.answers]);
  const [correctButtonsFocused, setCorrectButtonsFocused] = useState(false);

  useEffect(() => {
    setCorrectButtonsFocused(false);
  }, [props.answers]);

  return (
    <>
      {props.answers.length > 0 && (
        <div className={"flex flex-col gap-4 group mb-1"}>
          {props.answers.map((answer, index) => (
            <MultipleChoiceField
              key={answer.id}
              index={index}
              questionIndex={props.questionIndex}
              correctAnswerId={correctAnswerId}
              correctButtonsFocused={correctButtonsFocused}
              setCorrectButtonsFocused={setCorrectButtonsFocused}
              answers={props.answers}
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
              handleDeleteClick={() => {
                const answers = [...props.answers];
                answers.splice(index, 1);
                props.setAnswers(answers);
              }}
            />
          ))}
        </div>
      )}
      <button
        type={"button"}
        className={"ql-button ql-button--primary w-full"}
        onClick={() =>
          props.setAnswers([
            ...props.answers,
            { ...generateDefaultAnswerFormValues(), isCorrect: false },
          ])
        }
      >
        <IconCodeVariablePlus className={"ql-button__icon"} />
        Add Answer
      </button>
    </>
  );
}
