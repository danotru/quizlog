"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  answerFormSchema,
  generateDefaultAnswerFormValues,
} from "@/app/create/schemas";
import { IconCodeVariablePlus } from "@tabler/icons-react";
import { z } from "zod";
import MultipleAnswerField from "@/app/_components/QuizForm/components/QuestionForm/components/MultipleAnswerForm/components/MultipleAnswerField";

/**
 * Props for {@link MultipleAnswerForm}
 */
interface MultipleAnswerFormProps {
  questionIndex: number;
  answers: z.infer<typeof answerFormSchema>[];
  setAnswers: (answers: z.infer<typeof answerFormSchema>[]) => void;
  children?: ReactNode;
}

/**
 * Multiple answer form
 */
export default function MultipleAnswerForm(props: MultipleAnswerFormProps) {
  const [correctButtonsFocused, setCorrectButtonsFocused] = useState(false);

  useEffect(() => {
    setCorrectButtonsFocused(false);
  }, [props.answers]);

  return (
    <>
      {props.answers.length > 0 && (
        <div className={"flex flex-col gap-4 group mb-1"}>
          {props.answers.map((answer, index) => (
            <MultipleAnswerField
              key={answer.id}
              index={index}
              questionIndex={props.questionIndex}
              answers={props.answers}
              correctButtonsFocused={correctButtonsFocused}
              setCorrectButtonsFocused={setCorrectButtonsFocused}
              answer={answer}
              setAnswer={(value) => {
                const answers = [...props.answers];
                answers[index] = value;
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
        onClick={(e) => {
          e.preventDefault();

          const answers = [...props.answers];
          answers.push({
            ...generateDefaultAnswerFormValues(),
            isCorrect: false,
          });
          props.setAnswers(answers);
        }}
      >
        <IconCodeVariablePlus className={"ql-button__icon"} />
        Add Answer
      </button>
    </>
  );
}
