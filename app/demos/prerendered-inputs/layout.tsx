import { ReactNode } from "react";
import { getCurrentUser } from "./lib/get-current-user";
import { AuthContext } from "./auth-context";

export default function Layout({ children }: { children: ReactNode }) {
  // 🟢 Not awaited — doesn't block the page from rendering
  const currentUserPromise = getCurrentUser();

  return (
    <div className="relative isolate">
      <AuthContext value={currentUserPromise}>{children}</AuthContext>
    </div>
  );
}
