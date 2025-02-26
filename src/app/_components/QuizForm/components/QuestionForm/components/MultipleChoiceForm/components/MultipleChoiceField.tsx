"use client";

import InputField from "@/app/_components/InputField";
import { z } from "zod";
import {
  answerFormSchema,
  questionTypeAnswersSchema,
  questionTypeAnswersSchemaRefined,
} from "@/app/create/schemas";
import RadioButton from "@/app/_components/RadioButton";

/**
 * Props for {@link MultipleChoiceField}
 */
interface MultipleChoiceFieldProps {
  className?: string;
  index: number;
  questionIndex: number;
  correctAnswerId?: string;
  setCorrectAnswer: () => void;
  disabled?: boolean;
  correctButtonsFocused: boolean;
  setCorrectButtonsFocused: (value: boolean) => void;
  answers: z.infer<typeof answerFormSchema>[];
  answer: z.infer<typeof answerFormSchema>;
  setAnswer: (value: z.infer<typeof answerFormSchema>) => void;
  handleDeleteClick: () => void;
}

/**
 * Multiple choice field
 */
export default function MultipleChoiceField(props: MultipleChoiceFieldProps) {
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
        <RadioButton
          className={"mt-3"}
          name={`questions[${props.questionIndex}][answers][checked]`}
          value={props.answer.id}
          checked={props.correctAnswerId === props.answer.id}
          schema={questionTypeAnswersSchemaRefined}
          validationValue={
            { type: "multiple_choice", answers: props.answers } as z.infer<
              typeof questionTypeAnswersSchema
            >
          }
          wasFocused={props.correctButtonsFocused}
          setWasFocused={props.setCorrectButtonsFocused}
          handleChange={props.setCorrectAnswer}
          required={true}
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
