import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto mt-20 max-w-2xl px-8">{children}</div>
    </Suspense>
  );
}
