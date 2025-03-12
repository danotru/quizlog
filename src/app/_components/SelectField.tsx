"use client";

import { ReactNode, useRef } from "react";
import Field, { RequiredFieldProps } from "@/app/_components/Field";
import useFocused from "@/app/_hooks/useFocused";
import useValidity from "@/app/_hooks/useValidity";
import { IconChevronDown } from "@tabler/icons-react";

/**
 * Options for select fields
 */
export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Props for {@link SelectField}
 */
interface SelectFieldProps<T> extends RequiredFieldProps {
  placeholder: string;
  disabled?: boolean;
  options: SelectOption[];
  value: string;
  setValue: (value: string) => void;
  validationValue?: T;
  inputPrependNode?: ReactNode;
}

/**
 * Select field
 */
export default function SelectField<T>(props: SelectFieldProps<T>) {
  const ref = useRef<HTMLSelectElement>(null);
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
          className={`ql-select ${
            message && wasFocused ? "ql-select--error" : ""
          } cursor-text`}
        >
          {props.inputPrependNode}
          <select
            ref={ref}
            key={props.value}
            id={props.id}
            name={props.name}
            className={"ql-select__select peer"}
            disabled={props.disabled}
            required={props.required}
            defaultValue={props.value}
            onChange={(e) => {
              props.setValue(e.target.value);
              ref.current?.blur();
            }}
          >
            <option
              className={"ql-select__option"}
              value={"placeholder"}
              disabled
              hidden
            >
              {props.placeholder}
            </option>
            {props.options.map((option, index) => (
              <option
                key={index}
                className={"ql-select__option"}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <IconChevronDown
            className={"ql-select__icon peer-focus:rotate-180"}
          />
        </label>
      </Field>
    </>
  );
}
