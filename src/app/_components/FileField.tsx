"use client";

import { ChangeEvent, ReactNode, useRef } from "react";
import Field, { RequiredFieldProps } from "@/app/_components/Field";

/**
 * Props for {@link FileField}
 */
interface FileFieldProps<T> extends RequiredFieldProps {
  disabled?: boolean;
  validationValue?: T;
  value: File[];
  setValue: (value: FileList | null) => void;
  placeholder?: string;
  inputAppendNode?: ReactNode;
  accept?: string;
  multiple?: boolean;
}

/**
 * File field
 */
export default function FileField<T>(props: FileFieldProps<T>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Field {...props}>
        <label htmlFor={props.id} className={`ql-file-input cursor-pointer`}>
          <button className={"ql-file-input__button"}>Select File</button>
          <div className={"grow"}>
            {props.value[0] ? (
              props.value[0]?.name
            ) : (
              <span className={"text-secondary-300"}>{props.placeholder}</span>
            )}
          </div>
          {props.inputAppendNode}
          <input
            ref={ref}
            id={props.id}
            type={"file"}
            multiple={props.multiple}
            name={props.name}
            className={"hidden"}
            disabled={props.disabled}
            required={props.required}
            accept={props.accept}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              props.setValue(e.target.files)
            }
          />
        </label>
      </Field>
    </>
  );
}
