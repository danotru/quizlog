"use client";

import {
  IconAlertOctagonFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import "./styles.css";

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
          className={`${props.className} ql-alert-box bg-${type}-500 border-${type}-300`}
        >
          {icons[props.type]}
          {props.children}
        </aside>
      )}
    </>
  );
}
