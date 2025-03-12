"use server";

import { ReactNode } from "react";
import { createClient } from "@/lib/auth/server";
import { db } from "@/lib/db/client";
import {
  profilesTable,
  questionsTable,
  questionTypeEnum,
  quizzesTable,
} from "@/lib/db/schemas";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import QuizCard from "@/app/_components/QuizCard";
import ModeTabs from "@/app/quizzes/[id]/_components/ModeTabs";
import QuizContextProvider from "@/app/quizzes/[id]/_components/QuizContextProvider";
import "./styles.css";
import { Metadata } from "next";

/**
 * Props for {@link QuizDetailsLayout}
 */
interface QuizDetailsLayoutProps {
  children?: ReactNode;
  params: Promise<{ id: string }>;
}

/**
 * To generate take quiz layout metadata
 * @param props take quiz layout props
 */
export async function generateMetadata(
  props: QuizDetailsLayoutProps,
): Promise<Metadata> {
  const { id } = await props.params;

  const quiz = await db.query.quizzesTable.findFirst({
    where: eq(quizzesTable.id, id),
  });

  return { title: `Quizlog: Take '${quiz?.name}' Quiz` };
}

/**
 * Layout for quiz details
 */
export default async function QuizDetailsLayout(props: QuizDetailsLayoutProps) {
  const params = await props.params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) return null;

  let quiz, quizDetails;

  try {
    quizDetails = (
      await db
        .select({
          ...getTableColumns(quizzesTable),
          username: profilesTable.username,
          profileId: profilesTable.id,
          questionsCount: sql<number>`COUNT(${questionsTable.id})`,
          questionsTypes: sql<
            (typeof questionTypeEnum.enumValues)[number][]
          >`ARRAY_AGG(DISTINCT ${questionsTable.type})`,
        })
        .from(quizzesTable)
        .where(eq(quizzesTable.id, params.id))
        .leftJoin(questionsTable, eq(quizzesTable.id, questionsTable.quizId))
        .innerJoin(profilesTable, eq(quizzesTable.userId, profilesTable.userId))
        .orderBy(desc(quizzesTable.createdAt))
        .groupBy(quizzesTable.id, profilesTable.username, profilesTable.id)
    )[0];

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

  if (!quizDetails || !quiz) {
    redirect("/");
  }

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <QuizContextProvider quiz={quiz}>
            <QuizCard
              className={"ql-quiz-card--details"}
              currentUserId={data.user?.id}
              quiz={quizDetails}
            />
            <ModeTabs />
            {props.children}
          </QuizContextProvider>
        </section>
      </main>
    </>
  );
}
