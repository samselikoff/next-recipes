import { ReactNode } from "react";
import { getCurrentUser } from "../lib/get-current-user";
import { AuthContext } from "./context";

export function AuthProvider({ children }: { children: ReactNode }) {
  // 🟢 Note: Not awaited
  const currentUserPromise = getCurrentUser();

  return <AuthContext value={currentUserPromise}>{children}</AuthContext>;
}
