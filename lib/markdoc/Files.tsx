"use client";

import clsx from "clsx";
import { createContext, ReactNode, use, useState } from "react";

const Context = createContext<{ activeFilename: string }>({
  activeFilename: "",
});

export function Files({
  filenames,
  children,
}: {
  filenames: string[];
  children: ReactNode;
}) {
  const [isShowingCode, setIsShowingCode] = useState(false);
  const [activeFilename, setActiveFilename] = useState(filenames[0]);
  const activeIndex = filenames.indexOf(activeFilename);

  return (
    <Context.Provider value={{ activeFilename }}>
      <div className="mt-4 xl:-mx-20">
        <div className="flex">
          {isShowingCode && (
            <div className="flex gap-2">
              {filenames.map((filename) => (
                <button
                  key={filename}
                  onClick={() => setActiveFilename(filename)}
                  className={clsx(
                    "rounded-t-md px-3 py-2 text-sm",
                    filename === activeFilename && "bg-[#282A35] text-white",
                    filename !== activeFilename &&
                      "text-gray-500 hover:text-gray-900",
                  )}
                >
                  {filename}
                </button>
              ))}
            </div>
          )}

          <div className="ml-auto">
            <button
              onClick={() => setIsShowingCode(!isShowingCode)}
              className="px-3 py-2 text-sm text-gray-400 hover:text-gray-900"
            >
              {isShowingCode ? "Hide code" : "Show code"}
            </button>
          </div>
        </div>

        {isShowingCode && (
          <div
            className={clsx(
              "overflow-hidden rounded-tr-md rounded-b-md bg-[#282A35] text-sm [&_pre]:overflow-x-auto [&_pre]:p-4",
              activeIndex > 0 && "rounded-tl-md",
            )}
          >
            {children}
          </div>
        )}
      </div>
    </Context.Provider>
  );
}

export function File({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const { activeFilename } = use(Context);

  if (activeFilename !== name) return null;

  return children;
}
