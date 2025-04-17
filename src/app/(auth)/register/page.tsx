import AuthFormContainer from "@/app/(auth)/_components/AuthFormContainer";
import Link from "next/link";
import GoogleIcon from "@/app/_components/GoogleIcon";
import GitHubIcon from "@/app/_components/GitHubIcon";
import RegisterForm from "@/app/(auth)/register/_components/RegisterForm";
import { Metadata } from "next";

/**
 * Quizzes page metadata
 */
export const metadata: Metadata = {
  title: "Register | QUIZLOG",
};

/**
 * Register page
 */
export default async function RegisterPage() {
  return (
    <>
      <AuthFormContainer
        title={"Create an account"}
        separatorText={"Or register with"}
        oAuthNodes={
          <>
            <button
              className={"ql-button ql-button--secondary ql-button--full"}
              disabled={true}
            >
              <GoogleIcon className={"ql-button__icon"} />
              <span>Register with Google</span>
            </button>
            <button
              className={"ql-button ql-button--secondary ql-button--full"}
              disabled={true}
            >
              <GitHubIcon className={"ql-button__icon"} />
              <span>Register with GitHub</span>
            </button>
          </>
        }
        otherPageNode={
          <div className={"ql-auth-layout__link-container"}>
            <span className={"ql-auth-layout__link-text"}>
              Already have an account?{" "}
            </span>
            <Link className={"ql-link"} href={"/login"}>
              Log into account
            </Link>
          </div>
        }
      >
        <RegisterForm />
      </AuthFormContainer>
    </>
  );
}
