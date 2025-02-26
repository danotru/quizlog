"use client";

import { ReactNode, useActionState, useState } from "react";
import { createQuiz } from "@/app/create/actions";
import { z } from "zod";
import { defaultQuizFormValues, quizFormSchema } from "@/app/create/schemas";
import { IconPlus } from "@tabler/icons-react";
import QuizForm from "@/app/_components/QuizForm";

/**
 * Props for {@link CreateQuizForm}
 */
interface CreateQuizFormProps {
  children?: ReactNode;
}

/**
 * Form to create a quiz
 */
export default function CreateQuizForm(props: CreateQuizFormProps) {
  const [state, formAction, isPending] = useActionState(createQuiz, null);
  const [quizForm, setQuizForm] = useState<z.infer<typeof quizFormSchema>>(
    defaultQuizFormValues,
  );

  return (
    <>
      <form className={"flex flex-col gap-8"} action={formAction}>
        <QuizForm quizForm={quizForm} setQuizForm={setQuizForm} />
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
