"use server";

import { ReactNode } from "react";
import "./styles.css";
import {
  IconChartDots2,
  IconCompass,
  IconHome,
  IconHomeFilled,
  IconPlus,
  IconTable,
  IconTableFilled,
} from "@tabler/icons-react";
import NavLink from "@/app/_components/NavBar/components/NavLink";
import { createClient } from "@/lib/auth/server";

/**
 * Props for {@link NavBar}
 */
interface NavBarProps {
  children?: ReactNode;
}

/**
 * Navbar
 */
export default async function NavBar(props: NavBarProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();

  return (
    <>
      {data.session?.user && (
        <nav className={"ql-navbar"}>
          <NavLink
            href={"/"}
            className={"ql-navbar__link"}
            activeClassName={"ql-navbar__link--active"}
            activeNode={<IconHomeFilled />}
          >
            <IconHome />
          </NavLink>
          <button className={"ql-navbar__link"} disabled={true}>
            <IconCompass />
          </button>
          <div className={"relative w-6 h-6"}>
            <div className={"absolute left-1/2 bottom-1/2 -translate-x-1/2"}>
              <NavLink
                className={"ql-button ql-button--accent"}
                href={"/create"}
              >
                <IconPlus />
              </NavLink>
            </div>
          </div>
          <NavLink
            href={"/quizzes"}
            className={"ql-navbar__link"}
            activeClassName={"ql-navbar__link--active"}
            activeNode={<IconTableFilled />}
          >
            <IconTable />
          </NavLink>
          <button className={"ql-navbar__link"} disabled={true}>
            <IconChartDots2 />
          </button>
        </nav>
      )}
    </>
  );
}
