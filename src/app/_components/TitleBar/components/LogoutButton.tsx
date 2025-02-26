"use client";

import { ReactNode } from "react";
import { logOut } from "@/app/actions";

/**
 * Props for {@link LogoutButton}
 */
interface LogoutButtonProps {
  children?: ReactNode;
}

/**
 * Logout button
 */
export default function LogoutButton(props: LogoutButtonProps) {
  return <button onClick={async () => await logOut()}>Logout</button>;
}
