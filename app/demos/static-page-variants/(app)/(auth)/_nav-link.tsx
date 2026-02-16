"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const pathFromHref = ["demos", "static-page-variants", ...segments].join("/");
  const active = href === `/${pathFromHref}`;

  return (
    <Link
      href={href}
      className={`-mb-px flex items-center border-b-2 py-3 text-sm ${
        active
          ? "border-gray-900 text-gray-900"
          : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
}
