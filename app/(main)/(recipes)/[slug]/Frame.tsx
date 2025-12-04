"use client";

import { useState } from "react";
import { BrowserWindow } from "./BrowserWindow";

export function Frame({ src }: { src: string }) {
  const [reset, setReset] = useState(0);

  return (
    <div
      key={reset}
      className="mt-12 flex aspect-video flex-col overflow-hidden rounded-md shadow-md ring-1 ring-gray-900/10 lg:-mx-20"
    >
      <div className="flex grow">
        <BrowserWindow onRefresh={() => setReset((c) => c + 1)}>
          <iframe src={src} className="m-0 h-full w-full" />
        </BrowserWindow>
      </div>

      {/* <div className="flex justify-end border-t border-gray-200 bg-gray-100">
        <button
          onClick={() => setReset((c) => c + 1)}
          className="p-2 text-gray-500 hover:text-gray-900"
        >
          <ArrowPathIcon className="size-4" />
        </button>
      </div> */}
    </div>
  );
}
