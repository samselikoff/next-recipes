"server-only";

import { cache } from "react";

export type User = {
  id: string;
  email: string;
  plan: "free" | "pro";
};

// Simulated delay, real implementation would read cookies().
export const getCurrentUser = cache(async function (): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 2_000));

  return { id: "123", email: "test.user@gmail.com", plan: "pro" };
});
