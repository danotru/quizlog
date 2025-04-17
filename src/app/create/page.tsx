import CreateQuizForm from "@/app/create/_components/CreateQuizForm";
import { Metadata } from "next";

/**
 * Root page metadata
 */
export const metadata: Metadata = {
  title: "Create | QUIZLOG",
};

/**
 * Page for creating quizzes
 */
export default async function CreatePage() {
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
