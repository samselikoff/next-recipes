import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-20 max-w-2xl">{children}</div>;
}
