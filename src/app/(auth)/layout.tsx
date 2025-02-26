"use server";

import { ReactNode } from "react";

/**
 * Props for {@link AuthLayout}
 */
interface AuthLayoutProps {
  children?: ReactNode;
}

/**
 * Auth layout
 */
export default async function AuthLayout(props: AuthLayoutProps) {
  return (
    <>
      <section className={"grow flex items-center justify-center p-10"}>
        {props.children}
      </section>
    </>
  );
}
