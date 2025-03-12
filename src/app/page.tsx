import { db } from "@/lib/db/client";
import {
  profilesTable,
  questionsTable,
  questionTypeEnum,
  quizzesTable,
} from "@/lib/db/schemas";
import { eq, sql } from "drizzle-orm";
import QuizCard from "@/app/_components/QuizCard";
import { Metadata } from "next";

/**
 * Root page metadata
 */
export const metadata: Metadata = {
  title: "Quizlog: Home",
};

/**
 * Root page
 */
export default async function RootPage() {
  const quizzes = await db
    .select({
      id: quizzesTable.id,
      name: quizzesTable.name,
      bannerUrl: quizzesTable.bannerUrl,
      createdAt: quizzesTable.createdAt,
      description: quizzesTable.description,
      privacy: quizzesTable.privacy,
      username: profilesTable.username,
      profileId: profilesTable.id,
      userId: quizzesTable.userId,
      questionsCount: sql<number>`COUNT(${questionsTable.id})`,
      questionsTypes: sql<
        (typeof questionTypeEnum.enumValues)[number][]
      >`ARRAY_AGG(DISTINCT ${questionsTable.type})`,
    })
    .from(quizzesTable)
    .where(eq(quizzesTable.privacy, "public"))
    .leftJoin(questionsTable, eq(quizzesTable.id, questionsTable.quizId))
    .innerJoin(profilesTable, eq(quizzesTable.userId, profilesTable.userId))
    .groupBy(quizzesTable.id, profilesTable.username, profilesTable.id);

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <h1 className={"ql-page__heading"}>Recent Quizzes</h1>
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              className={"ql-quiz-card--large"}
              quiz={quiz}
            />
          ))}
        </section>
      </main>
    </>
  );
}
