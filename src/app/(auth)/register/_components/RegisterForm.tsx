"use client";

import { ReactNode, useActionState, useState } from "react";
import {
  confirmPasswordSchema,
  defaultRegisterFormValues,
  registerFormSchema,
  registerFormSchemaRefined,
} from "@/app/(auth)/register/schemas";
import { z } from "zod";
import InputField from "@/app/_components/InputField";
import {
  IconLock,
  IconMail,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { register } from "@/app/(auth)/register/actions";

/**
 * Props for {@link RegisterForm}
 */
interface RegisterFormProps {
  children?: ReactNode;
}

/**
 * Register form
 */
export default function RegisterForm(props: RegisterFormProps) {
  const [registerForm, setRegisterForm] = useState<
    z.infer<typeof registerFormSchemaRefined>
  >(defaultRegisterFormValues);

  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <>
      <form className={"w-full"} action={formAction}>
        <InputField
          id={"username"}
          className={"mb-4"}
          name={"username"}
          heading={"Username"}
          schema={registerFormSchema.shape.username}
          placeholder={"JohnDoe"}
          required={true}
          value={registerForm.username}
          setValue={(value) =>
            setRegisterForm((prevState) => ({ ...prevState, username: value }))
          }
          inputPrependNode={<IconUser className={"ql-input__icon"} />}
        />
        <InputField
          id={"email-address"}
          className={"mb-4"}
          name={"emailAddress"}
          heading={"Email address"}
          schema={registerFormSchema.shape.emailAddress}
          placeholder={"john.doe@example.com"}
          required={true}
          value={registerForm.emailAddress}
          setValue={(value) =>
            setRegisterForm((prevState) => ({
              ...prevState,
              emailAddress: value,
            }))
          }
          inputPrependNode={<IconMail className={"ql-input__icon"} />}
        />
        <InputField
          id={"password"}
          className={"mb-4"}
          name={"password"}
          type={"password"}
          heading={"Password"}
          schema={registerFormSchema.shape.password}
          placeholder={"********"}
          required={true}
          value={registerForm.password}
          setValue={(value) =>
            setRegisterForm((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          inputPrependNode={<IconLock className={"ql-input__icon"} />}
        />
        <InputField
          id={"confirm-password"}
          className={"mb-8"}
          name={"confirmPassword"}
          type={"password"}
          heading={"Confirm password"}
          schema={confirmPasswordSchema}
          placeholder={"********"}
          required={true}
          value={registerForm.confirmPassword}
          setValue={(value) =>
            setRegisterForm((prevState) => ({
              ...prevState,
              confirmPassword: value,
            }))
          }
          validationValue={{
            password: registerForm.password,
            confirmPassword: registerForm.confirmPassword,
          }}
          inputPrependNode={<IconLock className={"ql-input__icon"} />}
        />
        {state?.message !== "" && <div>{state?.message}</div>}
        <button className={"ql-button ql-button--primary w-full"}>
          <IconUserPlus className={"ql-button__icon"} />
          Register
        </button>
      </form>
    </>
  );
}
