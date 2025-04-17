"use server";

import { ReactNode } from "react";
import "./styles.css";

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
      <main className={"ql-page"}>
        <section className={"ql-page__content"}>{props.children}</section>
      </main>
    </>
  );
}
