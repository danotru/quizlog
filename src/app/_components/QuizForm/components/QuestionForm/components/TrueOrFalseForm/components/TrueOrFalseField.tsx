"use client";

import { z } from "zod";
import { answerFormSchema } from "@/app/create/schemas";
import RadioButton from "@/app/_components/RadioButton";

/**
 * Props for {@link TrueOrFalseField}
 */
interface TrueOrFalseFieldProps {
  className?: string;
  index: number;
  questionIndex: number;
  correctAnswerId?: string;
  setCorrectAnswer: () => void;
  disabled?: boolean;
  answer: z.infer<typeof answerFormSchema>;
  setAnswer: (value: z.infer<typeof answerFormSchema>) => void;
}

/**
 * True-or-false field
 */
export default function TrueOrFalseField(props: TrueOrFalseFieldProps) {
  return (
    <>
      <label
        className={`${props.className} relative flex gap-4 h-11 w-full items-center px-3 cursor-pointer`}
      >
        <input
          type={"hidden"}
          name={`questions[${props.questionIndex}][answers][${props.index}][id]`}
          value={props.answer.id}
        />
        <input
          type={"hidden"}
          name={`questions[${props.questionIndex}][answers][${props.index}][text]`}
          value={props.answer.text}
        />
        <input
          type={"hidden"}
          name={`questions[${props.questionIndex}][answers][${props.index}][isCorrect]`}
          value={props.answer.isCorrect ? "true" : ""}
        />
        <RadioButton
          required={true}
          className={"z-10 peer"}
          name={`questions[${props.questionIndex}][answers][checked]`}
          value={props.answer.id}
          checked={props.correctAnswerId === props.answer.id}
          handleChange={props.setCorrectAnswer}
        />
        <div
          className={`absolute w-full h-full top-0 left-0 ring-2 ring-secondary-300 bg-secondary-400 rounded-xl 
            peer-has-[:checked]:ring-accent-500 transition-all`}
        ></div>
        <div className={"z-10"}>{props.answer.text}</div>
      </label>
    </>
  );
}
