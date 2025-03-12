"use client";

import { useActionState, useState } from "react";
import { createQuiz } from "@/app/create/actions";
import { z } from "zod";
import { defaultQuizFormValues, quizFormSchema } from "@/app/create/schemas";
import { IconPlus } from "@tabler/icons-react";
import QuizForm from "@/app/_components/QuizForm";
import AlertBox, { AlertType } from "@/app/_components/AlertBox";

/**
 * Form to create a quiz
 */
export default function CreateQuizForm() {
  const [state, formAction, isPending] = useActionState(createQuiz, null);
  const [quizForm, setQuizForm] = useState<z.infer<typeof quizFormSchema>>(
    defaultQuizFormValues,
  );

  return (
    <>
      <form className={"flex flex-col gap-8"} action={formAction}>
        <QuizForm
          quizForm={quizForm}
          setQuizForm={setQuizForm}
          isPending={isPending}
        />
        {state && <AlertBox type={AlertType.error}>{state.message}</AlertBox>}
        <button
          type={"submit"}
          className={"ql-button ql-button--accent w-full"}
        >
          <IconPlus className={"ql-button__icon"} />
          Create Quiz
        </button>
      </form>
    </>
  );
}
