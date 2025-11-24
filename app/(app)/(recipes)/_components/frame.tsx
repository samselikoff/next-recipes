"use client";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function Frame({ src }: { src: string }) {
  const [reset, setReset] = useState(0);

  return (
    <div
      key={reset}
      className="mt-12 flex aspect-video flex-col overflow-hidden rounded-md border border-gray-200 bg-white lg:-mx-8"
    >
      <div className="flex grow">
        <iframe src={src} className="m-0 w-full" />
      </div>

      <div className="flex justify-end border-t border-gray-200 bg-gray-100">
        <button
          onClick={() => setReset((c) => c + 1)}
          className="p-2 text-gray-500 hover:text-gray-900"
        >
          <ArrowPathIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
