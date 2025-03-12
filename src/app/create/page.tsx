"use server";

import CreateQuizForm from "@/app/create/_components/CreateQuizForm";

/**
 * Props for {@link CreatePage}
 */
interface CreatePageProps {}

/**
 * Page for creating quizzes
 */
export default async function CreatePage(props: CreatePageProps) {
  return (
    <>
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>
          <h1 className={"ql-page__heading"}>Create Quiz</h1>
          <CreateQuizForm />
        </section>
      </main>
    </>
  );
}
