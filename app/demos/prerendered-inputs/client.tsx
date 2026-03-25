"use client";

import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { useActionState } from "react";
import { useCurrentUserPromise } from "./auth-context";

export function PromptForm() {
  const currentUserPromise = useCurrentUserPromise();

  const [result, submitAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      // 🟢 Wait for auth data before processing — doesn't block the input
      const currentUser = await currentUserPromise;

      const prompt = formData.get("prompt") as string;

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      return `"${prompt}" submitted by ${currentUser?.email} (${currentUser?.plan} plan)`;
    },
    null,
  );

  return (
    <div>
      <form action={submitAction}>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 shadow-sm focus-within:border-gray-300 focus-within:shadow-md">
          <textarea
            name="prompt"
            rows={3}
            placeholder="Ask anything..."
            autoFocus
            className="w-full resize-none bg-transparent px-4 pt-4 text-gray-900 placeholder-gray-400 outline-none"
          />
          <div className="flex items-center justify-end px-3 pb-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-gray-900 p-2 text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
            >
              <ArrowUpIcon className="size-4" />
            </button>
          </div>
        </div>
      </form>

      {result && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {result}
        </div>
      )}
    </div>
  );
}
