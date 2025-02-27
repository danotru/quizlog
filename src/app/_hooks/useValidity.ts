"use client";

import { RefObject, useEffect, useMemo, useState } from "react";
import { ZodType } from "zod";

/**
 * Hook for input validity
 * @param value value to check validity
 * @param required whether input is required or not
 * @param schema zod schema to check validity
 * @param ref reference to input object
 */
export default function useValidity<T>(
  value: T,
  required: boolean,
  schema?: ZodType,
  ref?: RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >,
) {
  const [message, setMessage] = useState<string>();

  const isValid = useMemo<boolean>(() => {
    if (!schema || !required) {
      return true;
    }

    const parsedValue = schema.safeParse(value);

    console.log(parsedValue);

    parsedValue.success
      ? setMessage(undefined)
      : setMessage(parsedValue.error.issues[0]?.message ?? "");

    return parsedValue.success;
  }, [value, schema]);

  useEffect(() => {
    if (!required) {
      setMessage("");
    }
  }, [required]);

  useEffect(() => {
    if (ref?.current) {
      ref?.current.setCustomValidity(message ?? "");
    }
  }, [message]);

  return { message, isValid };
}
