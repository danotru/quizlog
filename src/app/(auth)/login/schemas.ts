import { z } from "zod";
import { requiredSchema } from "@/app/schemas";

/**
 * Login form schema
 */
export const loginFormSchema = z.object({
  emailAddress: requiredSchema("Email address").email(
    "Incorrect email address format",
  ),
  password: requiredSchema("Password"),
});

/**
 * Login form default values
 */
export const defaultLoginFormValues: z.infer<typeof loginFormSchema> = {
  emailAddress: "",
  password: "",
};
