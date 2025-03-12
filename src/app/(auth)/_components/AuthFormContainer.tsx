"use server";

import { ReactNode } from "react";
import QuizlogLogo from "@/app/_components/QuizlogLogo";

/**
 * Props for {@link AuthFormContainer}
 */
interface AuthFormProps {
  children?: ReactNode;
  title: string;
  separatorText: string;
  oAuthNodes: ReactNode;
  otherPageNode: ReactNode;
}

/**
 * Auth form container for register and login forms
 */
export default async function AuthFormContainer(props: AuthFormProps) {
  return (
    <>
      <div
        className={
          "flex flex-col items-center border-2 border-secondary-300 bg-secondary-500 rounded-3xl w-full py-6"
        }
      >
        <div className={"w-full px-6"}>
          <hgroup className={"px-6 flex flex-col items-center mb-8"}>
            <QuizlogLogo className={"h-20 w-64 mb-4"} />
            <h4>The all-in-one quizzing platform</h4>
          </hgroup>
          <div className={"mb-4"}>
            <h1>{props.title}</h1>
          </div>
          <div className={"w-full"}>{props.children}</div>
        </div>
        <h6
          className={
            "w-full flex items-center gap-3 my-8 text-secondary-300 before:grow after:grow before:h-0.5 after:h-0.5 before:bg-secondary-400 after:bg-secondary-400"
          }
        >
          {props.separatorText}
        </h6>
        <div className={"w-full px-6 flex flex-col gap-4 mb-6"}>
          {props.oAuthNodes}
        </div>
        <div className={"px-6"}>{props.otherPageNode}</div>
      </div>
    </>
  );
}
