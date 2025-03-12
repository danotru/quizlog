import EditQuizForm from "@/app/edit/[id]/_components/EditQuizForm";
import { createClient } from "@/lib/auth/server";
import { db } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { quizzesTable } from "@/lib/db/schemas";
import { notFound, redirect } from "next/navigation";
import "./styles.css";
import { IconInputSpark } from "@tabler/icons-react";
import Link from "next/link";
import { Metadata } from "next";

/**
 * Props for {@link EditQuizPage}
 */
interface EditQuizPageProps {
  params: Promise<{ id: string }>;
}

/**
 * To generate edit quiz page metadata
 * @param props edit quiz page props
 */
export async function generateMetadata(
  props: EditQuizPageProps,
): Promise<Metadata> {
  const { id } = await props.params;

  const quiz = await db.query.quizzesTable.findFirst({
    where: eq(quizzesTable.id, id),
  });

  return { title: `Quizlog: Edit '${quiz?.name}' Quiz` };
}

/**
 * Edit quiz page
 */
export default async function EditQuizPage(props: EditQuizPageProps) {
  const params = await props.params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) redirect("/");

  let quiz;

  try {
    quiz = await db.query.quizzesTable.findFirst({
      where: eq(quizzesTable.id, params.id),
      with: {
        questions: {
          with: { answers: true },
        },
      },
    });
  } catch (e) {
    redirect("/");
  }

  if (!quiz) {
    notFound();
  }

  if (data.user?.id !== quiz.userId) redirect("/");

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <hgroup className={"flex gap-4 mb-8 justify-between items-center"}>
            <h1 className={"ql-page__heading"}>Edit Quiz</h1>
            <Link
              className={"ql-button ql-button--secondary"}
              href={`/quizzes/${quiz.id}`}
            >
              <IconInputSpark className={"ql-button__icon"} />
              Take quiz
            </Link>
          </hgroup>
          <EditQuizForm quiz={quiz} />
        </section>
      </main>
    </>
  );
}
