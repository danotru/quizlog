"use client";

import { ChangeEvent } from "react";
import InputField from "@/app/_components/InputField";
import { z } from "zod";
import {
  answerFormSchema,
  questionTypeAnswersSchemaRefined,
} from "@/app/create/schemas";
import CheckboxButton from "@/app/_components/CheckboxButton";

/**
 * Props for {@link MultipleAnswerField}
 */
interface MultipleAnswerFieldProps {
  className?: string;
  index: number;
  questionIndex: number;
  disabled?: boolean;
  correctButtonsFocused: boolean;
  setCorrectButtonsFocused: (value: boolean) => void;
  answers: z.infer<typeof answerFormSchema>[];
  answer: z.infer<typeof answerFormSchema>;
  setAnswer: (value: z.infer<typeof answerFormSchema>) => void;
  handleDeleteClick: () => void;
}

/**
 * Multiple answer field
 */
export default function MultipleAnswerField(props: MultipleAnswerFieldProps) {
  return (
    <>
      <div className={`flex gap-4 ${props.className ? props.className : ""}`}>
        <input
          name={`questions[${props.questionIndex}][answers][${props.index}][id]`}
          type={"hidden"}
          value={props.answer.id}
        />
        <InputField
          id={`answer_text-${props.questionIndex}-${props.index}`}
          name={`questions[${props.questionIndex}][answers][${props.index}][text]`}
          value={props.answer.text}
          schema={answerFormSchema.shape.text}
          required={true}
          setValue={(value) => {
            const answer = { ...props.answer };
            answer.text = value;
            props.setAnswer(answer);
          }}
          className={"grow"}
        />
        <input
          name={`questions[${props.questionIndex}][answers][${props.index}][isCorrect]`}
          type={"hidden"}
          value={props.answer.isCorrect ? "true" : ""}
        />
        <CheckboxButton
          className={"mt-3"}
          name={`questions[${props.questionIndex}][answers][checked]`}
          value={props.answer.id}
          checked={props.answer.isCorrect}
          required={true}
          wasFocused={props.correctButtonsFocused}
          setWasFocused={props.setCorrectButtonsFocused}
          schema={questionTypeAnswersSchemaRefined}
          validationValue={
            { type: "multiple_answer", answers: props.answers } as z.infer<
              typeof questionTypeAnswersSchemaRefined
            >
          }
          handleChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setAnswer({ ...props.answer, isCorrect: e.target.checked });
          }}
        />
        <button
          type={"button"}
          className={"ql-button ql-button--secondary"}
          onClick={props.handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </>
  );
}
