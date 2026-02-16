"use client";

import { useTransition } from "react";
import Spinner from "../../../instant-page-loads-with-suspense/_spinner";
import { logIn } from "./actions";

export default function LoginButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logIn())}
      disabled={isPending}
      className="rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors enabled:hover:bg-gray-800 disabled:opacity-70"
    >
      <Spinner loading={isPending} className="size-4">
        Log in
      </Spinner>
    </button>
  );
}
