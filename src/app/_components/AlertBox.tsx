"use client";

import {
  IconAlertOctagonFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import { ReactNode } from "react";

/**
 * Alert icons
 */
const icons = [
  <IconAlertOctagonFilled className={"flex-shrink-0"} />,
  <IconCircleCheckFilled className={"flex-shrink-0"} />,
  <IconAlertTriangleFilled className={"flex-shrink-0"} />,
  <IconInfoCircleFilled className={"flex-shrink-0"} />,
];

export enum AlertType {
  error,
  success,
  warning,
  info,
}

/**
 * Props for {@link AlertBox}
 */
interface AlertBoxProps {
  type: AlertType;
  className?: string;
  children?: ReactNode;
}

/**
 * Alert box
 */
export default function AlertBox(props: AlertBoxProps) {
  const type = AlertType[props.type];

  return (
    <>
      {props.children && (
        <aside
          className={`${props.className} flex gap-3 font-semibold p-4 rounded-2xl text-secondary-300 ring-2 bg-${type}-500 ring-${type}-400`}
        >
          {icons[props.type]}
          <p>{props.children}</p>
        </aside>
      )}
    </>
  );
}
