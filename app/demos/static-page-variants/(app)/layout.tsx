"use client";

import { usePathname } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense>
        <NavigationEvents />
      </Suspense>

      {children}
    </>
  );
}

function NavigationEvents() {
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  useEffect(() => {
    // const url = `${pathname}${searchParams.size > 0 ? `?${searchParams}` : ""}`;
    postLocationChange(pathname);
  }, [pathname]);

  return null;
}
const PARENT_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://next-16-recipes.vercel.app/";

function postLocationChange(url: string, reason = "unknown") {
  window.parent.postMessage(
    {
      type: "iframe:location-change",
      url,
      reason, // "load" | "pushState" | "replaceState" | "popstate" | etc
      ts: Date.now(),
    },
    PARENT_ORIGIN,
  );
}
