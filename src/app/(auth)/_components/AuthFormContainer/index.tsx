"use server";

import { ReactNode } from "react";
import QuizlogLogo from "@/app/_components/QuizlogLogo";
import "./styles.css";

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
      <div className={"ql-container"}>
        <div className={"ql-content"}>
          <hgroup className={"ql-auth-form-container__logo-container"}>
            <QuizlogLogo className={"ql-auth-form-container__logo"} />
            <h4>The all-in-one quizzing platform</h4>
          </hgroup>
          <h1>{props.title}</h1>
          {props.children}
        </div>
        <h6 className={"ql-auth-form-container__separator"}>
          {props.separatorText}
        </h6>
        <div className={"ql-content"}>
          {props.oAuthNodes}
          {props.otherPageNode}
        </div>
      </div>
    </>
  );
}
