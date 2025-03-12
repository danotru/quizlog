"use client";

import { logOut } from "@/app/actions";

/**
 * Logout button
 */
export default function LogoutButton() {
  return <button onClick={async () => await logOut()}>Logout</button>;
}
