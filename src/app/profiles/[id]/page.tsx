"use server";

import { createClient } from "@/lib/auth/server";
import { db } from "@/lib/db/client";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  profilesTable,
  questionsTable,
  questionTypeEnum,
  quizzesTable,
} from "@/lib/db/schemas";
import QuizCard from "@/app/_components/QuizCard";
import "./styles.css";

/**
 * Props for {@link ProfilePage}
 */
interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Profile page
 */
export default async function ProfilePage(props: ProfilePageProps) {
  const params = await props.params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) return null;

  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userId, params.id),
  });

  if (!profile) return null;

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
    .where(
      and(
        eq(quizzesTable.userId, data.user?.id),
        profile.userId !== data.user?.id
          ? eq(quizzesTable.privacy, "public")
          : undefined,
      ),
    )
    .leftJoin(questionsTable, eq(quizzesTable.id, questionsTable.quizId))
    .innerJoin(profilesTable, eq(quizzesTable.userId, profilesTable.userId))
    .orderBy(desc(quizzesTable.createdAt))
    .groupBy(quizzesTable.id, profilesTable.username, profilesTable.id);

  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <h1 className={"ql-page__heading"}>{profile.username}</h1>
          <div className={"ql-profile__cards"}>
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                className={"ql-quiz-card--small ql-profile__card"}
                quiz={quiz}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
