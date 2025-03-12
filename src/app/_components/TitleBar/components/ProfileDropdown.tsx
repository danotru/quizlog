"use server";

import { ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import LogoutButton from "@/app/_components/TitleBar/components/LogoutButton";

/**
 * Props for {@link ProfileDropdown}
 */
interface ProfileDropdownProps {
  currentProfileId: string;
  children?: ReactNode;
}

/**
 * Profile dropdown
 */
export default async function ProfileDropdown(props: ProfileDropdownProps) {
  return (
    <>
      <div className={"flex items-center gap-2"}>
        <Link
          href={`/profiles/${props.currentProfileId}`}
          className={
            "w-8 h-8 rounded-full bg-secondary-500 ring-2 ring-secondary-400"
          }
        ></Link>
        <div className={"relative"}>
          <button className={"flex peer w-5 h-5"}>
            <IconChevronDown />
          </button>
          <ul
            className={`absolute opacity-0 pointer-events-none transition-all -translate-y-1
            peer-hover:opacity-100 peer-focus:opacity-100 hover:opacity-100 
            peer-hover:translate-y-0 peer-focus:translate-y-0 hover:translate-y-0
            peer-hover:pointer-events-auto peer-focus:pointer-events-auto hover:pointer-events-auto
            right-0 top-full 
              bg-secondary-500 p-3 flex-col gap-2 rounded-xl ring-2 ring-secondary-400`}
          >
            <li className={"ql-link"}>
              <Link href={`/profiles/${props.currentProfileId}`}>Profile</Link>
            </li>
            <li className={"ql-link"}>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
