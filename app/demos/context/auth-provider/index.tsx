import { ReactNode } from "react";
import { Provider } from "./_provider";
import { cookies } from "next/headers";

export function AuthProvider({ children }: { children: ReactNode }) {
  const currentUserPromise = getCurrentUser();

  return (
    <Provider currentUserPromise={currentUserPromise}>{children}</Provider>
  );
}

async function getCurrentUser() {
  await new Promise((resolve) => setTimeout(resolve, 1_000));
  const jar = cookies();

  return { id: "123", name: "Sam" };
}
