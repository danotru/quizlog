"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useMemo,
} from "react";
import InputField from "@/app/_components/InputField";
import TextAreaField from "@/app/_components/TextAreaField";
import FileField from "@/app/_components/FileField";
import SelectField from "@/app/_components/SelectField";
import { IconTablePlus } from "@tabler/icons-react";
import QuestionForm from "./components/QuestionForm";
import { createQuiz } from "@/app/create/actions";
import { z } from "zod";
import {
  generateDefaultAnswerFormValues,
  generateDefaultQuestionFormValues,
  quizFormSchema,
} from "@/app/create/schemas";

/**
 * Props for {@link QuizForm}
 */
interface QuizFormProps {
  quizForm: z.infer<typeof quizFormSchema>;
  setQuizForm: Dispatch<SetStateAction<z.infer<typeof quizFormSchema>>>;
  children?: ReactNode;
}

/**
 * Form to create/modify a quiz
 */
export default function QuizForm(props: QuizFormProps) {
  const preview = useMemo(() => {
    if (props.quizForm.banner && props.quizForm.banner[0]) {
      return URL.createObjectURL(props.quizForm.banner[0] as File);
    }
  }, [props.quizForm.banner]);
  const [state, formAction, isPending] = useActionState(createQuiz, null);

  return (
    <>
      <div
        className={
          "outline outline-2 outline-secondary-300 bg-secondary-500 rounded-3xl p-6 flex flex-col gap-4"
        }
      >
        <h1>Quiz Details</h1>
        <input name={`id`} type={"hidden"} value={props.quizForm.id} />
        <InputField
          id={"quiz-name"}
          name={"name"}
          heading={"Quiz name"}
          required={true}
          schema={quizFormSchema.shape.name}
          placeholder={""}
          value={props.quizForm.name}
          setValue={(value) =>
            props.setQuizForm((prevState) => ({ ...prevState, name: value }))
          }
        />
        <FileField
          id={"quiz-banner"}
          name={"banner"}
          placeholder={"Select an image..."}
          value={props.quizForm.banner}
          accept={"image/*"}
          setValue={(value) =>
            props.setQuizForm((prevState) => ({
              ...prevState,
              banner: value as any,
            }))
          }
          heading={"Quiz banner"}
          required={false}
          inputAppendNode={
            preview && (
              <div className={"ql-file-input__preview-container"}>
                <img className={"ql-file-input__preview"} src={preview} />
              </div>
            )
          }
        />
        <TextAreaField
          id={"quiz-description"}
          name={"description"}
          heading={"Quiz description"}
          required={false}
          placeholder={""}
          value={props.quizForm.description ?? ""}
          setValue={(value) =>
            props.setQuizForm((prevState) => ({
              ...prevState,
              description: value,
            }))
          }
        />
        <SelectField
          id={"quiz-privacy"}
          name={"privacy"}
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
          heading={"Quiz privacy"}
          placeholder={""}
          value={props.quizForm.privacy}
          setValue={(value) =>
            props.setQuizForm({
              ...props.quizForm,
              privacy: value as z.infer<typeof quizFormSchema.shape.privacy>,
            })
          }
        />
      </div>
      <div
        className={
          "flex flex-col gap-6 outline outline-2 outline-secondary-500 rounded-[3rem] p-8"
        }
      >
        <h1>Questions</h1>
        <div className={"flex flex-col gap-6"}>
          {props.quizForm.questions.map((question, index) => (
            <QuestionForm
              key={index}
              index={index}
              question={question}
              isPending={isPending}
              setQuestion={(value) => {
                const questions = [...props.quizForm.questions];
                questions[index] = value;
                props.setQuizForm({ ...props.quizForm, questions: questions });
              }}
              handleDeleteClick={() => {
                const questions = [...props.quizForm.questions];
                questions.splice(index, 1);
                props.setQuizForm({ ...props.quizForm, questions: questions });
              }}
            />
          ))}
        </div>
        <button
          type={"button"}
          className={"ql-button ql-button--primary w-full"}
          onClick={() => {
            props.setQuizForm({
              ...props.quizForm,
              questions: [
                ...props.quizForm.questions,
                {
                  ...generateDefaultQuestionFormValues(),
                  answers: [generateDefaultAnswerFormValues()],
                },
              ],
            });
          }}
        >
          <IconTablePlus className={"ql-button__icon"} />
          Add Question
        </button>
      </div>
    </>
  );
}
