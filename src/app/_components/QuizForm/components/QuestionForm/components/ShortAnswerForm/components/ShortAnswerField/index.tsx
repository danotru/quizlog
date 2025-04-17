"use client";

import { useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import {
  answerFormSchema,
  generateDefaultAnswerFormValues,
  questionFormSchema,
} from "@/app/create/schemas";
import { z } from "zod";
import useFocused from "@/app/_hooks/useFocused";
import useValidity from "@/app/_hooks/useValidity";
import Field from "@/app/_components/Field";
import "./styles.css";

/**
 * Props for {@link ShortAnswerField}
 */
interface ShortAnswerFieldProps {
  questionIndex: number;
  answers: z.infer<typeof answerFormSchema>[];
  setAnswers: (answers: z.infer<typeof answerFormSchema>[]) => void;
  isPending: boolean;
}

/**
 * Short answer field
 */
export default function ShortAnswerField(props: ShortAnswerFieldProps) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const { wasFocused } = useFocused(ref);
  const { message } = useValidity<
    z.infer<typeof questionFormSchema.shape.answers>
  >(props.answers, true, questionFormSchema.shape.answers, ref);

  return (
    <>
      <Field errorMessage={wasFocused ? message : undefined}>
        <label
          className={`ql-input ql-short-answer-field ${
            message && wasFocused ? "ql-input--error" : ""
          }`}
        >
          {props.answers.map((answer, index) => (
            <div
              key={index}
              className={
                "flex items-center gap-2 px-3 py-2 bg-accent-500 text-primary-300 rounded-lg ring-2 ring-accent-400"
              }
            >
              <input
                type={"hidden"}
                name={`questions[${props.questionIndex}][answers][${index}][id]`}
                value={answer.id}
              />
              <input
                type={"hidden"}
                name={`questions[${props.questionIndex}][answers][${index}][text]`}
                value={answer.text}
              />
              <input
                type={"hidden"}
                name={`questions[${props.questionIndex}][answers][${index}][isCorrect]`}
                value={"true"}
              />
              <span className={"break-all"}>{answer.text}</span>
              <IconX
                className={
                  "shrink-0 w-5 h-5 cursor-pointer hover:text-primary-400 transition-colors"
                }
                onClick={(e) => {
                  e.preventDefault();

                  const answers = [...props.answers];
                  answers.splice(index, 1);
                  props.setAnswers(answers);
                }}
              />
            </div>
          ))}
          <input
            ref={ref}
            placeholder={"Write a short answer keyword, and enter..."}
            className={"ql-short-answer-field__input ql-input__input"}
            type={"text"}
            disabled={props.isPending}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }

              if (e.key === "Enter" && text !== "") {
                props.setAnswers([
                  ...props.answers,
                  {
                    ...generateDefaultAnswerFormValues(),
                    text: text,
                  },
                ]);

                setText("");
              }
            }}
          />
        </label>
      </Field>
    </>
  );
}
