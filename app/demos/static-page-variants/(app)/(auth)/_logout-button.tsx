"use client";

import { useTransition } from "react";
import { logOut } from "./actions";
import Spinner from "../../../instant-page-loads-with-suspense/_spinner";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logOut())}
      disabled={isPending}
      className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors enabled:hover:bg-gray-50 disabled:opacity-70"
    >
      <Spinner loading={isPending} className="size-4">
        Log out
      </Spinner>
    </button>
  );
}
