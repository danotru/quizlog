"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import useFocused from "@/app/_hooks/useFocused";
import { ZodType } from "zod";
import useValidity from "@/app/_hooks/useValidity";

/**
 * Props for {@link RadioButton}
 */
interface RadioButtonProps<T> {
  className?: string;
  name: string;
  value: string;
  validationValue?: T;
  schema?: ZodType;
  checked: boolean;
  required?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  wasFocused?: boolean;
  setWasFocused?: (value: boolean) => void;
}

/**
 * Radio button
 */
export default function RadioButton<T>(props: RadioButtonProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
  const { isFocused } = useFocused(ref);
  const { message } = useValidity<T | string>(
    props.validationValue ?? props.value,
    props.required ?? false,
    props.schema,
    ref,
  );

  useEffect(() => {
    if (isFocused) {
      props.setWasFocused?.(true);
    }
  }, [isFocused]);

  return (
    <>
      <label className={`ql-radio ${props.className}`}>
        <input
          ref={ref}
          className={"ql-radio__input peer"}
          name={props.name}
          value={props.value}
          type={"radio"}
          defaultChecked={props.checked}
          required={props.required}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.handleChange(e);
          }}
        />
        <div
          className={`ql-radio__border peer-checked:outline-primary-500 ${
            props.wasFocused &&
            message &&
            "peer-invalid:outline-error-500 peer-invalid:bg-error-700 was-focused"
          }`}
        ></div>
        <div
          className={"ql-radio__checkmark opacity-0 peer-checked:opacity-100"}
        ></div>
      </label>
    </>
  );
}
