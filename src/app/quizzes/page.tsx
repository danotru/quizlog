import { db } from "@/lib/db/client";
import {
  profilesTable,
  questionsTable,
  questionTypeEnum,
  quizzesTable,
} from "@/lib/db/schemas";
import { desc, eq, sql } from "drizzle-orm";
import { createClient } from "@/lib/auth/server";
import QuizCard from "@/app/_components/QuizCard";
import "./styles.css";
import { Metadata } from "next";

/**
 * Quizzes page metadata
 */
export const metadata: Metadata = {
  title: "Quizlog: Quizzes",
};

/**
 * Quizzes page
 */
export default async function QuizzesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  const quizzes = await db
    .select({
      id: quizzesTable.id,
      name: quizzesTable.name,
      bannerUrl: quizzesTable.bannerUrl,
      createdAt: quizzesTable.createdAt,
      description: quizzesTable.description,
      privacy: quizzesTable.privacy,
      userId: quizzesTable.userId,
      username: profilesTable.username,
      profileId: profilesTable.id,
      questionsCount: sql<number>`COUNT(${questionsTable.id})`,
      questionsTypes: sql<
        (typeof questionTypeEnum.enumValues)[number][]
      >`ARRAY_AGG(DISTINCT ${questionsTable.type})`,
    })
    .from(quizzesTable)
    .where(eq(quizzesTable.userId, data.user?.id))
    .leftJoin(questionsTable, eq(quizzesTable.id, questionsTable.quizId))
    .innerJoin(profilesTable, eq(quizzesTable.userId, profilesTable.userId))
    .orderBy(desc(quizzesTable.createdAt))
    .groupBy(quizzesTable.id, profilesTable.username, profilesTable.id);

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <h1 className={"ql-page__heading"}>My Quizzes</h1>
          <div className={"ql-cards"}>
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                className={"ql-quiz-card--small ql-cards__card"}
                quiz={quiz}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
