"use server";

import { ReactNode } from "react";
import QuizlogLogo from "@/app/_components/QuizlogLogo";
import { createClient } from "@/lib/auth/server";
import Link from "next/link";
import ProfileDropdown from "@/app/_components/TitleBar/components/ProfileDropdown";
import "./styles.css";

/**
 * Props for {@link TitleBar}
 */
interface TitleBarProps {
  children?: ReactNode;
}

/**
 * Title navigation bar
 */
export default async function TitleBar(props: TitleBarProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();

  return (
    <>
      <nav
        className={
          "p-6 border-b-2 border-secondary-500 bg-secondary-600 md:sticky top-0 flex items-center justify-between z-20"
        }
      >
        <QuizlogLogo className={"w-16 h-auto shrink-0"} />
        {data.session?.user ? (
          <>
            <div
              className={"flex gap-[min(4rem,8vw)] items-center max-md:hidden"}
            >
              <Link className={"ql-link"} href={"/"}>
                Home
              </Link>
              <button className={"ql-link"} disabled={true}>
                Search
              </button>
              {/*<Link className={"ql-link"} href={"/search"}>
                Search
              </Link>*/}
              <Link className={"ql-button ql-button--accent"} href={"/create"}>
                Create
              </Link>
              <Link className={"ql-link"} href={"/quizzes"}>
                Quizzes
              </Link>
              <button className={"ql-link"} disabled={true}>
                Progress
              </button>
              {/*<Link className={"ql-link"} href={"/progress"}>
                Progress
              </Link>*/}
            </div>
            <ProfileDropdown />
          </>
        ) : (
          <div className={"flex items-center gap-8"}>
            <Link href={"/login"} className={"ql-link"}>
              Login
            </Link>
            <Link
              href={"/register"}
              className={"ql-button ql-button--secondary"}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
