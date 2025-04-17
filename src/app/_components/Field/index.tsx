"use client";

import { ReactNode } from "react";
import { ZodType } from "zod";
import { IconCircleXFilled } from "@tabler/icons-react";
import "./styles.css";

/**
 * Required props for {@link Field}
 */
export interface RequiredFieldProps {
  id?: string;
  className?: string;
  heading?: string;
  name?: string;
  required?: boolean;
  schema?: ZodType;
  fieldPrependNode?: ReactNode;
  fieldAppendNode?: ReactNode;
}

/**
 * Props for {@link Field}
 */
interface FieldProps extends RequiredFieldProps {
  children?: ReactNode;
  errorMessage?: ReactNode;
}

/**
 * Field with heading and validation
 */
export default function Field(props: FieldProps) {
  return (
    <>
      <div className={props.className}>
        {props.heading && (
          <label className={"ql-field__heading"} htmlFor={props.id}>
            <div className={"ql-field__heading-text"}>{props.heading}</div>
            {props.required !== undefined && !props.required && (
              <div className={"ql-field__optional-text"}>Optional</div>
            )}
          </label>
        )}
        <div className={"ql-field__container"}>
          {props.fieldPrependNode}
          <div className={"ql-field__content"}>
            {props.children}
            {props.errorMessage && (
              <div className={"ql-field__error"}>
                <>
                  <IconCircleXFilled className={"ql-field__error-icon"} />
                  {props.errorMessage}
                </>
              </div>
            )}
          </div>
          {props.fieldAppendNode}
        </div>
      </div>
    </>
  );
}
