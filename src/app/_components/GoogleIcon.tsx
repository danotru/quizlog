"use client";

import { ReactNode } from "react";

/**
 * Props for {@link GoogleIcon}
 */
interface GoogleIconProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Google icon
 */
export default function GoogleIcon(props: GoogleIconProps) {
  return (
    <svg
      className={props.className}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={
          "fill-[#4285F4] group-disabled:fill-[var(--secondary-300)] transition-colors"
        }
        d="M19.3 10.5848C19.3 9.93478 19.2417 9.30978 19.1333 8.70978H10.5V12.2598H15.4333C15.2167 13.4014 14.5667 14.3681 13.5917 15.0181V17.3264H16.5667C18.3 15.7264 19.3 13.3764 19.3 10.5848Z"
        fill="#4285F4"
      />
      <path
        className={
          "fill-[#34A853] group-disabled:fill-[var(--secondary-300)] transition-colors"
        }
        d="M10.5 19.5431C12.975 19.5431 15.05 18.7265 16.5667 17.3265L13.5917 15.0181C12.775 15.5681 11.7333 15.9015 10.5 15.9015C8.11665 15.9015 6.09165 14.2931 5.36665 12.1265H2.31665V14.4931C3.82498 17.4848 6.91665 19.5431 10.5 19.5431Z"
      />
      <path
        className={
          "fill-[#FBBC05] group-disabled:fill-[var(--secondary-300)] transition-colors"
        }
        d="M5.36665 12.1181C5.18331 11.5681 5.07498 10.9848 5.07498 10.3765C5.07498 9.76813 5.18331 9.18479 5.36665 8.63479V6.26813H2.31665C1.69165 7.50146 1.33331 8.89313 1.33331 10.3765C1.33331 11.8598 1.69165 13.2515 2.31665 14.4848L4.69165 12.6348L5.36665 12.1181Z"
      />
      <path
        className={
          "fill-[#EA4335] group-disabled:fill-[var(--secondary-300)] transition-colors"
        }
        d="M10.5 4.85978C11.85 4.85978 13.05 5.32644 14.0083 6.22644L16.6333 3.60144C15.0417 2.11811 12.975 1.20978 10.5 1.20978C6.91665 1.20978 3.82498 3.26811 2.31665 6.26811L5.36665 8.63478C6.09165 6.46811 8.11665 4.85978 10.5 4.85978Z"
      />
    </svg>
  );
}
