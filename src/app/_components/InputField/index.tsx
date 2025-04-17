"use client";

import { ReactNode, useRef } from "react";
import Field, { RequiredFieldProps } from "@/app/_components/Field";
import useFocused from "@/app/_hooks/useFocused";
import useValidity from "@/app/_hooks/useValidity";
import "./styles.css";

/**
 * Props for {@link InputField}
 */
interface InputFieldProps<T> extends RequiredFieldProps {
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  value: string;
  setValue: (value: string) => void;
  validationValue?: T;
  inputPrependNode?: ReactNode;
  inputAppendNode?: ReactNode;
}

/**
 * Input field
 */
export default function InputField<T>(props: InputFieldProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
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
        <label
          htmlFor={props.id}
          className={`ql-input ql-input-field ${
            message && wasFocused ? "ql-input--error" : ""
          }`}
        >
          {props.inputPrependNode}
          <input
            ref={ref}
            id={props.id}
            type={props.type}
            name={props.name}
            className={"ql-input__input ql-input-field__input"}
            value={props.value}
            disabled={props.disabled}
            required={props.required}
            onChange={(e) => props.setValue(e.target.value)}
            placeholder={props.placeholder}
            size={10}
          />
          {props.inputAppendNode}
        </label>
      </Field>
    </>
  );
}
