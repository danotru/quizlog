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
const icons = {
  0: <IconAlertOctagonFilled className={"ql-alert-box__icon"} />,
  1: <IconCircleCheckFilled className={"ql-alert-box__icon"} />,
  2: <IconAlertTriangleFilled className={"ql-alert-box__icon"} />,
  3: <IconInfoCircleFilled className={"ql-alert-box__icon"} />,
};

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
          className={`${props.className} ql-alert-box ql-alert-box--${type}`}
        >
          {icons[props.type]}
          {props.children}
        </aside>
      )}
    </>
  );
}
