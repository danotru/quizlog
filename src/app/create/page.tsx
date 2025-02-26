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
      <section className={"grow flex justify-center p-10"}>
        <div className={"max-w-[48rem] w-full"}>
          <h1 className={"text-5xl mb-8"}>Create Quiz</h1>
          <CreateQuizForm />
        </div>
      </section>
    </>
  );
}
