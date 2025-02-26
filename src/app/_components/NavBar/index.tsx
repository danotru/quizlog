"use client";

import { ReactNode } from "react";
import "./styles.css";
import Link from "next/link";
import {
  IconChartDots2,
  IconCompass,
  IconHome,
  IconHomeFilled,
  IconPlus,
  IconTable,
  IconTableFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import NavLink from "@/app/_components/NavBar/components/NavLink";

/**
 * Props for {@link NavBar}
 */
interface NavBarProps {
  children?: ReactNode;
}

/**
 * Navbar
 */
export default function NavBar(props: NavBarProps) {
  const router = useRouter();

  return (
    <>
      <nav className={"ql-navbar"}>
        <NavLink
          href={"/"}
          className={"ql-navbar__link"}
          activeClassName={"ql-navbar__link--active"}
          activeNode={<IconHomeFilled />}
          inactiveNode={<IconHome />}
        />
        <button className={"ql-navbar__link"} disabled={true}>
          <IconCompass />
        </button>
        <div className={"relative w-6 h-6"}>
          <div className={"absolute left-1/2 bottom-1/2 -translate-x-1/2"}>
            <button
              className={"ql-button ql-button--accent"}
              onClick={() => router.push("/create")}
            >
              <IconPlus />
            </button>
          </div>
        </div>
        <NavLink
          href={"/quizzes"}
          className={"ql-navbar__link"}
          activeClassName={"ql-navbar__link--active"}
          activeNode={<IconTableFilled />}
          inactiveNode={<IconTable />}
        />
        <button className={"ql-navbar__link"} disabled={true}>
          <IconChartDots2 />
        </button>
      </nav>
    </>
  );
}
