"use client";

import { ReactNode } from "react";
import InputField from "@/app/_components/InputField";
import SelectField from "@/app/_components/SelectField";
import MultipleChoiceForm from "@/app/_components/QuizForm/components/QuestionForm/components/MultipleChoiceForm";
import {
  generateDefaultAnswerFormValues,
  questionFormSchema,
} from "@/app/create/schemas";
import { z } from "zod";
import { IconTableMinus } from "@tabler/icons-react";
import MultipleAnswerForm from "@/app/_components/QuizForm/components/QuestionForm/components/MultipleAnswerForm";
import TrueOrFalseForm from "@/app/_components/QuizForm/components/QuestionForm/components/TrueOrFalseForm";
import ShortAnswerForm from "@/app/_components/QuizForm/components/QuestionForm/components/ShortAnswerForm";

/**
 * Props for {@link QuestionForm}
 */
interface QuestionFormProps {
  index: number;
  isPending: boolean;
  question: z.infer<typeof questionFormSchema>;
  setQuestion: (question: z.infer<typeof questionFormSchema>) => void;
  children?: ReactNode;
  handleDeleteClick: () => void;
}

/**
 * Question form
 */
export default function QuestionForm(props: QuestionFormProps) {
  return (
    <div className={"ql-container ql-container--content"}>
      <input
        name={`questions[${props.index}][id]`}
        type={"hidden"}
        value={props.question.id}
      />
      <div
        className={
          "flex justify-center items-center h-11 min-w-11 px-3 rounded-xl border-2 border-secondary-400 self-start "
        }
      >
        {props.index + 1}
      </div>
      <InputField
        id={`question_text-${props.index}`}
        name={`questions[${props.index}][text]`}
        className={"mb-1"}
        heading={"Question text"}
        required={true}
        disabled={props.isPending}
        schema={questionFormSchema.shape.text}
        value={props.question.text}
        setValue={(value) =>
          props.setQuestion({ ...props.question, text: value })
        }
      />
      <h2>Question Answers</h2>
      <SelectField
        id={`question_type-${props.index}`}
        name={`questions[${props.index}][type]`}
        options={[
          { label: "Multiple choice", value: "multiple_choice" },
          { label: "Multiple answer", value: "multiple_answer" },
          { label: "True or false", value: "true_or_false" },
          { label: "Short answer", value: "short_answer" },
        ]}
        heading={"Question type"}
        placeholder={""}
        disabled={props.isPending}
        value={props.question.type}
        setValue={(value) => {
          const question = { ...props.question };
          question.type = value as z.infer<
            typeof questionFormSchema.shape.type
          >;

          if (value === "multiple_choice" || value === "multiple_answer") {
            question.answers = [generateDefaultAnswerFormValues()];
          } else if (value === "true_or_false") {
            question.answers = [
              { ...generateDefaultAnswerFormValues(), text: "True" },
              {
                ...generateDefaultAnswerFormValues(),
                text: "False",
                isCorrect: false,
              },
            ];
          } else if (value === "short_answer") {
            question.answers = [];
          }

          props.setQuestion(question);
        }}
      />
      <div
        className={
          "flex flex-col gap-4 outline outline-2 outline-secondary-300 p-5 max-md:p-4 rounded-3xl"
        }
      >
        {props.question.type === "multiple_choice" && (
          <MultipleChoiceForm
            questionIndex={props.index}
            answers={props.question.answers}
            setAnswers={(value) => {
              props.setQuestion({ ...props.question, answers: value });
            }}
            isPending={props.isPending}
          />
        )}
        {props.question.type === "multiple_answer" && (
          <MultipleAnswerForm
            questionIndex={props.index}
            answers={props.question.answers}
            setAnswers={(value) => {
              props.setQuestion({ ...props.question, answers: value });
            }}
            isPending={props.isPending}
          />
        )}
        {props.question.type === "true_or_false" && (
          <TrueOrFalseForm
            questionIndex={props.index}
            answers={props.question.answers}
            setAnswers={(value) => {
              props.setQuestion({ ...props.question, answers: value });
            }}
            isPending={props.isPending}
          />
        )}
        {props.question.type === "short_answer" && (
          <ShortAnswerForm
            questionIndex={props.index}
            answers={props.question.answers}
            setAnswers={(value) => {
              props.setQuestion({ ...props.question, answers: value });
            }}
            isPending={props.isPending}
          />
        )}
      </div>
      <InputField
        id={`question_explanation-${props.index}`}
        name={`questions[${props.index}][explanation]`}
        heading={"Question explanation"}
        required={false}
        disabled={props.isPending}
        schema={questionFormSchema.shape.explanation}
        value={props.question.explanation ?? ""}
        setValue={(value) =>
          props.setQuestion({ ...props.question, explanation: value })
        }
      />
      <InputField
        id={`question_hint-${props.index}`}
        name={`questions[${props.index}][hint]`}
        heading={"Question hint"}
        className={"mb-1"}
        required={false}
        disabled={props.isPending}
        schema={questionFormSchema.shape.hint}
        value={props.question.hint ?? ""}
        setValue={(value) =>
          props.setQuestion({ ...props.question, hint: value })
        }
      />
      <button
        className={"ql-button ql-button--secondary ql-button--full"}
        type={"button"}
        disabled={props.isPending}
        onClick={props.handleDeleteClick}
      >
        <IconTableMinus className={"ql-button__icon"} />
        Delete Question
      </button>
    </div>
  );
}
