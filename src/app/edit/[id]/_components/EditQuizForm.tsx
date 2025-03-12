"use client";

import { useActionState, useState } from "react";
import { z } from "zod";
import { quizFormSchema } from "@/app/create/schemas";
import QuizForm from "@/app/_components/QuizForm";
import { IconEdit, IconInputSpark, IconTrashX } from "@tabler/icons-react";
import { editQuiz } from "@/app/edit/[id]/actions";
import AlertBox from "@/app/_components/AlertBox";
import Link from "next/link";
import DeleteQuizAction from "@/app/_components/DeleteQuizAction";

/**
 * Props for {@link EditQuizForm}
 */
interface EditQuizFormProps {
  quiz: z.infer<typeof quizFormSchema>;
}

/**
 * Edit quiz form
 */
export default function EditQuizForm(props: EditQuizFormProps) {
  const [state, formAction, isPending] = useActionState(editQuiz, null);
  const [quizForm, setQuizForm] = useState<z.infer<typeof quizFormSchema>>({
    ...props.quiz,
    banner: [],
  });

  return (
    <>
      <form className={"flex flex-col gap-8"} action={formAction}>
        <QuizForm
          quizForm={quizForm}
          setQuizForm={setQuizForm}
          isPending={isPending}
        />
        {state && (
          <AlertBox type={state.alertType}>
            <div className={"ql-edit-form__alert-content"}>
              {state.message}
              {state.alertType === 1 && (
                <Link
                  href={`/quizzes/${props.quiz.id}`}
                  className={"ql-button ql-button--secondary"}
                >
                  <IconInputSpark className={"ql-button__icon"} />
                  Take quiz
                </Link>
              )}
            </div>
          </AlertBox>
        )}
        <div className={"flex gap-4"}>
          <button
            type={"submit"}
            className={"ql-button ql-button--accent grow"}
          >
            <IconEdit className={"ql-button__icon"} />
            Edit quiz
          </button>
          <DeleteQuizAction quizId={props.quiz.id} quizName={props.quiz.name}>
            <button type={"button"} className={"ql-button ql-button--error"}>
              <IconTrashX className={"ql-button__icon"} />
              Delete quiz
            </button>
          </DeleteQuizAction>
        </div>
      </form>
    </>
  );
}
