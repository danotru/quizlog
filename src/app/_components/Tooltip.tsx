"use client";

import { ReactNode } from "react";

/**
 * Props for {@link Tooltip}
 */
interface TooltipProps {
  text?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Tooltip
 */
export default function Tooltip(props: TooltipProps) {
  return (
    <>
      <div className={"group relative cursor-pointer"}>
        <div className={`ql-tooltip ${props.className}`}>{props.text}</div>
        {props.children}
      </div>
    </>
  );
}
