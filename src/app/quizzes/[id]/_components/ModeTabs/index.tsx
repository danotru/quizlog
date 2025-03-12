"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./styles.css";
import Link from "next/link";
import { QuizContext } from "@/app/quizzes/[id]/_components/QuizContextProvider";

const tabs = [
  { label: "Practice", path: "" },
  { label: "Flashcards", path: "/flashcards" },
];

/**
 * Tabs to switch between quiz modes
 */
export default function ModeTabs() {
  const quiz = useContext(QuizContext);

  /**
   * To turn pathname into tab index
   * @param pathname
   */
  const pathnameToTabIndex = useCallback((pathname: string) => {
    let currentIndex = 0;

    for (const [index, tab] of tabs.entries()) {
      if (pathname === `/quizzes/${quiz?.id}${tab.path}`) {
        currentIndex = index;
        break;
      }
    }

    return currentIndex;
  }, []);

  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(pathnameToTabIndex(pathname));

  useEffect(() => {
    setActiveIndex(pathnameToTabIndex(pathname));
  }, [pathname]);

  return (
    <>
      <nav className={"ql-mode-tabs"}>
        <div
          className={"ql-mode-tabs__active-tab"}
          style={{
            width: `calc(${100 / tabs.length}% - 0.5rem)`,
            left: `max(${(100 / tabs.length) * activeIndex}%, 0.5rem)`,
          }}
        ></div>
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={`/quizzes/${quiz?.id}${tab.path}`}
            className={`ql-mode-tabs__tab ${
              activeIndex === index && "ql-mode-tabs__tab--active"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
