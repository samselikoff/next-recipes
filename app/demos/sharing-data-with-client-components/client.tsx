"use client";

import { Menu } from "@base-ui/react";
import { useCurrentUser } from "./auth-provider/context";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Suspense } from "react";

export function AccountButton() {
  return (
    <Menu.Root>
      <Menu.Trigger className="inline-flex cursor-pointer items-center gap-2 hover:text-gray-900">
        Account <ChevronDownIcon className="size-4" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="w-60 rounded-md bg-white py-1 shadow-lg outline-1 outline-gray-200">
            <Suspense
              fallback={
                <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
              }
            >
              <AccountMenu />
            </Suspense>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function AccountMenu() {
  // 🟢 Suspends this component
  const currentUser = useCurrentUser();

  return (
    <>
      <div className="px-4 py-2">
        <p className="text-xs text-gray-500">Signed in as</p>
        <p className="mt-1 text-sm font-medium">{currentUser?.email}</p>
      </div>
      <Menu.Separator className="my-1.5 h-px bg-gray-200" />
      <Menu.Item className="py-2 pr-8 pl-4 text-sm data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900">
        Item 1
      </Menu.Item>
      <Menu.Item className="py-2 pr-8 pl-4 text-sm data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900">
        Item 2
      </Menu.Item>
      <Menu.Item className="py-2 pr-8 pl-4 text-sm data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900">
        Item 3
      </Menu.Item>
    </>
  );
}
