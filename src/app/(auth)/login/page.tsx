import AuthFormContainer from "@/app/(auth)/_components/AuthFormContainer";
import GoogleIcon from "@/app/_components/GoogleIcon";
import GitHubIcon from "@/app/_components/GitHubIcon";
import Link from "next/link";
import LoginForm from "@/app/(auth)/login/_components/LoginForm";
import { Metadata } from "next";

/**
 * Login page metadata
 */
export const metadata: Metadata = {
  title: "Login | QUIZLOG",
};

/**
 * Login page
 */
export default async function LoginPage() {
  return (
    <>
      <AuthFormContainer
        title={"Log into account"}
        separatorText={"Or login with"}
        oAuthNodes={
          <>
            <button
              className={"ql-button ql-button--secondary ql-button--full"}
              disabled={true}
            >
              <GoogleIcon className={"ql-button__icon"} />
              <span>Log in with Google</span>
            </button>
            <button
              className={"ql-button ql-button--secondary ql-button--full"}
              disabled={true}
            >
              <GitHubIcon className={"ql-button__icon"} />
              <span>Log in with GitHub</span>
            </button>
          </>
        }
        otherPageNode={
          <div className={"ql-auth-layout__link-container"}>
            <span className={"ql-auth-layout__link-text"}>
              {"Don't have an account? "}
            </span>
            <Link className={"ql-link"} href={"/register"}>
              Create an account
            </Link>
          </div>
        }
      >
        <LoginForm />
      </AuthFormContainer>
    </>
  );
}
