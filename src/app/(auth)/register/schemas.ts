import { z } from "zod";
import { requiredSchema } from "@/app/schemas";

/**
 * Register form base schema
 */
export const registerFormSchema = z.object({
  accessCode: requiredSchema("Access code"),
  username: requiredSchema("Username"),
  emailAddress: requiredSchema("Email address").email(
    "Incorrect email address format",
  ),
  password: requiredSchema("Password").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Your password must have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
  ),
  confirmPassword: z.string(),
});

/**
 * Confirm password refine
 */
const confirmPasswordRefine = (
  { password, confirmPassword }: any,
  ctx: z.RefinementCtx,
) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Confirm password does not match password",
      path: ["confirmPassword"],
    });
  }
};

/**
 * Validation schema for password with confirm password refinement
 */
export const confirmPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: requiredSchema("Confirm password"),
  })
  .superRefine(confirmPasswordRefine);

/**
 * Validation schema for register form with confirm password refinement
 */
export const registerFormSchemaRefined = registerFormSchema.superRefine(
  confirmPasswordRefine,
);

/**
 * Register form default values
 */
export const defaultRegisterFormValues: z.infer<
  typeof registerFormSchemaRefined
> = {
  accessCode: "",
  username: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
};
