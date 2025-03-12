"use client";

import { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import { IconCheck } from "@tabler/icons-react";
import { ZodType } from "zod";
import useFocused from "@/app/_hooks/useFocused";
import useValidity from "@/app/_hooks/useValidity";

/**
 * Props for {@link CheckboxButton}
 */
interface CheckboxButtonProps<T> {
  children?: ReactNode;
  className?: string;
  name: string;
  value: string;
  validationValue?: T;
  schema?: ZodType;
  checked: boolean;
  disabled?: boolean;
  useChecked?: boolean;
  required?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  wasFocused?: boolean;
  setWasFocused?: (value: boolean) => void;
}

/**
 * Checkbox button
 */
export default function CheckboxButton<T>(props: CheckboxButtonProps<T>) {
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
  }, [isFocused, props]);

  return (
    <>
      <label className={`ql-checkbox ${props.className}`}>
        {props.useChecked === true ? (
          <input
            ref={ref}
            className={"ql-checkbox__input peer"}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
            type={"checkbox"}
            checked={props.checked}
            onChange={props.handleChange}
          />
        ) : (
          <input
            ref={ref}
            className={"ql-checkbox__input peer"}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
            type={"checkbox"}
            defaultChecked={props.checked}
            onChange={props.handleChange}
          />
        )}

        <div
          className={`ql-checkbox__border peer-checked:outline-primary-500 ${
            props.wasFocused &&
            message &&
            "peer-invalid:outline-error-500 peer-invalid:bg-error-700 was-focused"
          }`}
        ></div>
        <div
          className={
            "ql-checkbox__checkmark opacity-0 peer-checked:opacity-100"
          }
        >
          <IconCheck stroke={4} className={"ql-checkbox__icon"} />
        </div>
        {props.children}
      </label>
    </>
  );
}
