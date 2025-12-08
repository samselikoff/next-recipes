"use client";

import { ReactNode } from "react";
import { Context } from "./_context";

export function Provider({
  currentUserPromise,
  children,
}: {
  currentUserPromise: Promise<{ id: string; name: string }>;
  children: ReactNode;
}) {
  return <Context value={{ currentUserPromise }}>{children}</Context>;
}
