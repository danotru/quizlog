"use client";

import { InferSelectModel } from "drizzle-orm";
import { questionTypeEnum, quizzesTable } from "@/lib/db/schemas";
import { z } from "zod";
import Link from "next/link";
import { IconEdit, IconInputSpark } from "@tabler/icons-react";
import "./styles.css";
import moment from "moment";

const questionType = z.enum(questionTypeEnum.enumValues);

/**
 * Props for {@link QuizCard}
 */
interface QuizCardProps {
  className?: string;
  currentUserId?: string;
  quiz: InferSelectModel<typeof quizzesTable> & {
    profileId: string;
    username: string;
    questionsTypes: z.infer<typeof questionType>[];
    questionsCount: number;
  };
}

/**
 * Quiz card
 */
export default function QuizCard(props: QuizCardProps) {
  return (
    <>
      <article className={`ql-quiz-card ${props.className}`}>
        <div className={"ql-quiz-card__banner"}></div>
        <div className={"ql-quiz-card__content"}>
          <hgroup>
            <h1 className={"ql-quiz-card__title"}>{props.quiz.name}</h1>
            <div className={"ql-quiz-card__profile"}>
              <span className={"font-semibold text-primary-700"}>
                <span className={"ql-quiz-card__created"}>Created </span>by
              </span>
              <div className={"ql-quiz-card__profile-picture"}></div>
              <Link
                className={"ql-link"}
                href={`/profiles/${props.quiz.profileId}`}
              >
                {props.quiz.username}
              </Link>
              <span className={"ql-quiz-card__date"}>
                {moment(props.quiz.createdAt).fromNow()}
              </span>
            </div>
          </hgroup>
          {props.quiz.description && (
            <p className={"ql-quiz-card__description"}>
              {props.quiz.description}
            </p>
          )}
          <div className={"ql-quiz-card__tags"}>
            <div className={"ql-quiz-card__tag"}>
              {`${props.quiz.questionsCount} Question${
                props.quiz.questionsCount > 1 ? "s" : ""
              }`}
            </div>
            {props.quiz.questionsTypes.map((questionType, index) => (
              <div key={index} className={"ql-quiz-card__tag"}>
                {questionType === "multiple_choice" && "Multiple Choice"}
                {questionType === "multiple_answer" && "Multiple Answer"}
                {questionType === "true_or_false" && "True or False"}
                {questionType === "short_answer" && "Short Answer"}
              </div>
            ))}
          </div>
          <Link
            href={`/quizzes/${props.quiz.id}`}
            className={"ql-button ql-button--accent w-full ql-quiz-card__take"}
          >
            <IconInputSpark className={"ql-button__icon"} />
            Take Quiz
          </Link>
          {props.currentUserId === props.quiz.userId && (
            <div className={"ql-quiz-card__actions"}>
              <Link
                href={`/modify/${props.quiz.id}`}
                className={"ql-button ql-button--accent w-full"}
              >
                <IconEdit className={"ql-button__icon"} />
                Modify quiz
              </Link>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
