import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
