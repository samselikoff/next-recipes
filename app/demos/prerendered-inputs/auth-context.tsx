"use client";

import { createContext, ReactNode, use } from "react";
import { User } from "./lib/get-current-user";

const Context = createContext<Promise<User | null>>(Promise.resolve(null));

export function AuthContext({
  value,
  children,
}: {
  value: Promise<User>;
  children: ReactNode;
}) {
  return <Context value={value}>{children}</Context>;
}

export function useCurrentUserPromise() {
  return use(Context);
}
