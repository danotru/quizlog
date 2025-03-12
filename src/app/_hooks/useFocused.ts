"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Hook for whenever element is focused
 * @param ref reference to the element
 */
export default function useFocused(
  ref: RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >,
) {
  const [isFocused, setIsFocused] = useState(false);
  const [wasFocused, setWasFocused] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const handleFocus = (e: Event) => {
      setIsFocused(true);

      if (
        ((e as FocusEvent).relatedTarget as HTMLButtonElement)?.type ===
        "submit"
      ) {
        setWasFocused(true);
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      setWasFocused(true);
    };

    if (element) {
      element.addEventListener("focus", handleFocus);
      element.addEventListener("blur", handleBlur);
    }

    return () => {
      if (element) {
        element.removeEventListener("focus", handleFocus);
        element.removeEventListener("blur", handleBlur);
      }
    };
  }, [ref]);

  return { isFocused, wasFocused, setIsFocused, setWasFocused };
}
