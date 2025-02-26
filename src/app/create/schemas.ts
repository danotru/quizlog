import { z } from "zod";
import { requiredSchema } from "@/app/schemas";
import { questionTypeEnum, quizPrivacyEnum } from "@/lib/db/schemas";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 5000000;

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

/**
 *
 */
/*
export const bannerSchema = z.object({
    z.any()
        .refine((file: File) => file?.length !== 0, "File is required")
        .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
        .refine(
            (file) => checkFileType(file),
            "Only .pdf, .docx formats are supported.",
        )
})
 */

/**
 * Answer form schema
 */
export const answerFormSchema = z.object({
  id: z.string(),
  text: requiredSchema("Answer text"),
  isCorrect: z.coerce.boolean(),
});

/**
 * Question form schema
 */
export const questionFormSchema = z.object({
  id: z.string(),
  text: requiredSchema("Question text"),
  type: z.enum(questionTypeEnum.enumValues),
  explanation: z.string().optional(),
  answers: answerFormSchema
    .array()
    .min(1, "At least one answer is required per question"),
});

/**
 * Question type and answers schema
 */
export const questionTypeAnswersSchema = z.object({
  type: questionFormSchema.shape.type,
  answers: z.object({ text: z.string(), isCorrect: z.boolean() }).array(),
});

/**
 * To validate multiple choice question
 * @param data multiple choice question to validate
 */
function validateMultipleChoiceQuestion(
  data: z.infer<typeof questionTypeAnswersSchema>,
) {
  let valid = false;
  let message = "At least one correct answer is required";

  for (const answer of data.answers) {
    if (answer.isCorrect && valid) {
      valid = false;
      message = "Only a single correct answer is allowed";
      break;
    }

    if (answer.isCorrect) {
      valid = true;
    }
  }

  return valid ? undefined : message;
}

/**
 * To validate multiple answer question
 * @param data multiple answer question to validate
 */
function validateMultipleAnswerQuestion(
  data: z.infer<typeof questionTypeAnswersSchema>,
) {
  let valid = false;

  for (const answer of data.answers) {
    if (answer.isCorrect) {
      valid = true;
      break;
    }
  }

  return valid;
}

/**
 * To validate true-or-false question
 * @param data true-or-false question to validate
 */
function validateTrueOrFalseQuestion(
  data: z.infer<typeof questionTypeAnswersSchema>,
) {
  let message =
    "Incorrectly formatted true-or-false question, must be True or False";

  if (data.answers.length !== 2) {
    return message;
  }

  let valid = false;

  for (const answer of data.answers) {
    if (answer.isCorrect && valid) {
      valid = false;
      message = "Only a single correct answer is allowed";
      break;
    }

    if (answer.text !== "True" && answer.text !== "False") {
      valid = false;
      break;
    }

    if (answer.isCorrect) {
      valid = true;
    }
  }

  return valid ? undefined : message;
}

/**
 * To validate short answer question
 * @param data short answer question to validate
 */
function validateShortAnswerQuestion(
  data: z.infer<typeof questionTypeAnswersSchema>,
) {
  let valid = true;

  for (const answer of data.answers) {
    if (!answer.isCorrect) {
      valid = false;
      break;
    }
  }

  return valid;
}

/**
 * Refinement for question type specific answers validation
 * @param data question type and answers
 * @param ctx refinement context
 */
const questionTypeAnswersRefine = (
  data: z.infer<typeof questionTypeAnswersSchema>,
  ctx: z.RefinementCtx,
) => {
  let message;

  if (
    data.type === "multiple_choice" &&
    (message = validateMultipleChoiceQuestion(data)) !== undefined
  ) {
    ctx.addIssue({
      code: "custom",
      message: message,
      path: ["answers"],
    });
  } else if (
    data.type === "multiple_answer" &&
    !validateMultipleAnswerQuestion(data)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "At least one correct answer is required",
      path: ["answers"],
    });
  } else if (
    data.type === "true_or_false" &&
    (message = validateTrueOrFalseQuestion(data)) !== undefined
  ) {
    ctx.addIssue({
      code: "custom",
      message: message,
      path: ["answers"],
    });
  } else if (
    data.type === "short_answer" &&
    !validateShortAnswerQuestion(data)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "All short answer keywords should be considered correct",
      path: ["answers"],
    });
  }
};

/**
 * Refined question answers type schema
 */
export const questionTypeAnswersSchemaRefined =
  questionTypeAnswersSchema.superRefine(questionTypeAnswersRefine);

/**
 * Quiz form schema
 */
export const quizFormSchema = z.object({
  id: z.string(),
  name: requiredSchema("Quiz name"),
  banner: z.any().optional(),
  description: z.string().optional(),
  privacy: z.enum(quizPrivacyEnum.enumValues),
  questions: questionFormSchema.superRefine(questionTypeAnswersRefine).array(),
});

/**
 * To generate default answer form values
 */
export function generateDefaultAnswerFormValues(): z.infer<
  typeof answerFormSchema
> {
  return {
    id: uuidv4(),
    text: "",
    isCorrect: true,
  };
}

/**
 * Question form default values
 */
export function generateDefaultQuestionFormValues(): z.infer<
  typeof questionFormSchema
> {
  return {
    id: uuidv4(),
    text: "",
    type: "multiple_choice",
    answers: [],
  };
}

/**
 * Quiz form default values
 */
export const defaultQuizFormValues: z.infer<typeof quizFormSchema> = {
  id: uuidv4(),
  name: "",
  banner: [],
  privacy: "public",
  questions: [
    {
      id: uuidv4(),
      text: "",
      type: "multiple_choice",
      answers: [{ id: uuidv4(), text: "", isCorrect: true }],
    },
  ],
};
