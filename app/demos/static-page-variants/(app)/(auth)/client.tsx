"use client";

import Spinner from "@/app/demos/instant-page-loads-with-suspense/_spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logOut } from "./actions";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === pathname;

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
export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logOut())}
      disabled={isPending}
      className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors enabled:hover:bg-blue-500 disabled:opacity-70"
    >
      <Spinner loading={isPending} className="size-4">
        Log out
      </Spinner>
    </button>
  );
}
