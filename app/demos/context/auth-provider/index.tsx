import { ReactNode } from "react";
import { getCurrentUser } from "../lib/get-current-user";
import { Provider } from "./context";

export function AuthProvider({ children }: { children: ReactNode }) {
  // 🟢 Note: Not awaited
  const currentUserPromise = getCurrentUser();

  return <Provider promise={currentUserPromise}>{children}</Provider>;
}
