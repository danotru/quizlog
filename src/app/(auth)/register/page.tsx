"use server";

import AuthFormContainer from "@/app/(auth)/_components/AuthFormContainer";
import Link from "next/link";
import GoogleIcon from "@/app/_components/GoogleIcon";
import GitHubIcon from "@/app/_components/GitHubIcon";
import RegisterForm from "@/app/(auth)/register/_components/RegisterForm";

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
              className={"ql-button ql-button--secondary group w-full"}
              disabled={true}
            >
              <GoogleIcon className={"ql-button__icon"} />
              <span>Register with Google</span>
            </button>
            <button
              className={"ql-button ql-button--secondary group w-full"}
              disabled={true}
            >
              <GitHubIcon className={"ql-button__icon"} />
              <span>Register with GitHub</span>
            </button>
          </>
        }
        otherPageNode={
          <div className={"font-semibold"}>
            <span className={"text-primary-700"}>
              Already have an account?{" "}
            </span>
            <Link
              className={"hover:text-primary-600 transition-colors"}
              href={"/login"}
            >
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
