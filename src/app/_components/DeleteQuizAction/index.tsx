"use client";

import { ReactNode, useActionState, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";
import { IconCancel, IconTrashX } from "@tabler/icons-react";
import { deleteQuiz } from "@/app/_components/DeleteQuizAction/actions";
import AlertBox, { AlertType } from "@/app/_components/AlertBox";

/**
 * Props for {@link DeleteQuizAction}
 */
interface DeleteQuizActionProps {
  quizId: string;
  quizName: string;
  children?: ReactNode;
}

/**
 * Delete quiz action
 */
export default function DeleteQuizAction(props: DeleteQuizActionProps) {
  const [state, formAction] = useActionState(deleteQuiz, null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>{props.children}</div>
      {showModal &&
        createPortal(
          <>
            <div className={"ql-delete-quiz"}>
              <form className={"ql-delete-quiz__modal"} action={formAction}>
                <input type={"hidden"} name={"quizId"} value={props.quizId} />
                <hgroup className={"ql-delete-quiz__headings"}>
                  <h1>Are you sure?</h1>
                  <p>
                    You are about to delete the quiz {`"${props.quizName}"`}.
                  </p>
                </hgroup>
                {state && (
                  <AlertBox type={AlertType.error}>{state.message}</AlertBox>
                )}
                <div className={"ql-delete-quiz__actions"}>
                  <button className={"ql-button ql-button--error grow"}>
                    <IconTrashX className={"ql-button__icon"} />
                    Delete quiz
                  </button>
                  <button
                    type={"button"}
                    className={"ql-button ql-button--secondary grow"}
                    onClick={() => setShowModal(false)}
                  >
                    <IconCancel className={"ql-button__icon"} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
