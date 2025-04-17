"use client";

import { UIEventHandler, useRef } from "react";
import Field, { RequiredFieldProps } from "@/app/_components/Field";
import useFocused from "@/app/_hooks/useFocused";
import useValidity from "@/app/_hooks/useValidity";
import "./styles.css";

/**
 * Props for {@link TextAreaField}
 */
interface TextAreaFieldProps<T> extends RequiredFieldProps {
  placeholder: string;
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  validationValue?: T;
  spellCheck?: boolean;
  onScroll?: UIEventHandler<HTMLTextAreaElement>;
}

/**
 * Textarea field
 */
export default function TextAreaField<T>(props: TextAreaFieldProps<T>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { wasFocused } = useFocused(ref);
  const { message } = useValidity<T | string>(
    props.validationValue ?? props.value,
    props.required ?? false,
    props.schema,
    ref,
  );

  return (
    <>
      <Field {...props} errorMessage={wasFocused ? message : undefined}>
        <div
          className={`ql-textarea ql-input ${
            message && wasFocused ? "ql-input--error" : ""
          }`}
          onClick={() => ref.current?.focus()}
        >
          <textarea
            ref={ref}
            id={props.id}
            name={props.name}
            className={"ql-textarea__textarea ql-input__input"}
            value={props.value}
            disabled={props.disabled}
            required={props.required}
            onChange={(e) => props.setValue(e.target.value)}
            placeholder={props.placeholder}
            spellCheck={props.spellCheck}
            onScroll={props.onScroll}
          />
        </div>
      </Field>
    </>
  );
}
