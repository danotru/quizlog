"use client";

import Tooltip from "@/app/_components/Tooltip";
import { IconInfoCircle } from "@tabler/icons-react";
import { z } from "zod";
import { answerFormSchema } from "@/app/create/schemas";
import ShortAnswerField from "@/app/_components/QuizForm/components/QuestionForm/components/ShortAnswerForm/components/ShortAnswerField";

/**
 * Props for {@link ShortAnswerForm}
 */
interface ShortAnswerFormProps {
  questionIndex: number;
  answers: z.infer<typeof answerFormSchema>[];
  setAnswers: (answers: z.infer<typeof answerFormSchema>[]) => void;
  isPending: boolean;
}

/**
 * Short answer form
 */
export default function ShortAnswerForm(props: ShortAnswerFormProps) {
  return (
    <>
      <h3 className={"flex items-center gap-2"}>
        Short Answer Keywords{" "}
        <Tooltip
          className={"ql-tooltip__top w-48"}
          text={"Answer correctness is determined by matching these keywords."}
        >
          <IconInfoCircle className={"text-secondary-300"} />
        </Tooltip>
      </h3>
      <ShortAnswerField
        isPending={props.isPending}
        questionIndex={props.questionIndex}
        answers={props.answers}
        setAnswers={props.setAnswers}
      />
    </>
  );
}
