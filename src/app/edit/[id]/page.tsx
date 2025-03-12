"use server";

import EditQuizForm from "@/app/edit/[id]/_components/EditQuizForm";
import { createClient } from "@/lib/auth/server";
import { db } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { quizzesTable } from "@/lib/db/schemas";
import { notFound, redirect } from "next/navigation";
import "./styles.css";
import { IconInputSpark } from "@tabler/icons-react";

/**
 * Props for {@link EditQuizPage}
 */
interface EditQuizPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit quiz page
 */
export default async function EditQuizPage(props: EditQuizPageProps) {
  const params = await props.params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) return null;

  const quiz = await db.query.quizzesTable.findFirst({
    where: eq(quizzesTable.id, params.id),
    with: {
      questions: {
        with: { answers: true },
      },
    },
  });

  if (!quiz) {
    notFound();
  }

  if (data.user?.id !== quiz.userId) {
    redirect("/");
  }

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <hgroup className={"flex gap-4 mb-8 justify-between items-center"}>
            <h1 className={"ql-page__heading"}>Edit Quiz</h1>
            <button className={"ql-button ql-button--secondary"}>
              <IconInputSpark className={"ql-button__icon"} />
              Take quiz
            </button>
          </hgroup>
          <EditQuizForm quiz={quiz} />
        </section>
      </main>
    </>
  );
}
