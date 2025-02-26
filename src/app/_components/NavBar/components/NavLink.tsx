"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Props for {@link NavLink}
 */
interface NavLinkProps {
  className?: string;
  activeClassName?: string;
  href: string;
  activeNode: ReactNode;
  inactiveNode: ReactNode;
}

/**
 * Navigation link
 */
export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={props.href}
        className={`${props.className} ${
          pathname === props.href && props.activeClassName
        }`}
      >
        {pathname === props.href ? props.activeNode : props.inactiveNode}
      </Link>
    </>
  );
}
