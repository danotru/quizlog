"use client";

import { useActionState, useState } from "react";
import { z } from "zod";
import {
  defaultLoginFormValues,
  loginFormSchema,
} from "@/app/(auth)/login/schemas";
import InputField from "@/app/_components/InputField";
import { IconLock, IconLogin, IconMail } from "@tabler/icons-react";
import { login } from "@/app/(auth)/login/actions";
import AlertBox, { AlertType } from "@/app/_components/AlertBox";

/**
 * Login form
 */
export default function LoginForm() {
  const [loginForm, setLoginForm] = useState<z.infer<typeof loginFormSchema>>(
    defaultLoginFormValues,
  );

  const [state, formAction] = useActionState(login, null);

  return (
    <>
      <form className={"ql-content-gap"} action={formAction}>
        <InputField
          id={"email-address"}
          name={"emailAddress"}
          heading={"Email address"}
          schema={loginFormSchema.shape.emailAddress}
          placeholder={"john.doe@example.com"}
          required={true}
          value={loginForm.emailAddress}
          setValue={(value) =>
            setLoginForm((prevState) => ({
              ...prevState,
              emailAddress: value,
            }))
          }
          inputPrependNode={<IconMail className={"ql-input__icon"} />}
        />
        <InputField
          id={"password"}
          name={"password"}
          type={"password"}
          heading={"Password"}
          schema={loginFormSchema.shape.password}
          placeholder={"********"}
          required={true}
          value={loginForm.password}
          setValue={(value) =>
            setLoginForm((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          inputPrependNode={<IconLock className={"ql-input__icon"} />}
        />
        <AlertBox type={AlertType.error}>{state?.message}</AlertBox>
        <button
          className={
            "ql-button ql-button--primary ql-button--full ql-auth-layout__action"
          }
        >
          <IconLogin className={"ql-button__icon"} />
          Log in
        </button>
      </form>
    </>
  );
}
