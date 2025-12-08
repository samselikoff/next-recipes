"use client";

import { use } from "react";
import { useAuth } from "./auth-provider/_context";

export function ClientComponent() {
  const { currentUserPromise } = useAuth();
  const currentUser = use(currentUserPromise);

  return <p>Hi from client: {currentUser?.name}</p>;
}
