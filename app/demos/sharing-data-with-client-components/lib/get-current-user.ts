"server-only";

import { cache } from "react";

export type User = {
  id: string;
  email: string;
};

// 🟢 Shared server function that can be used in any RSC. De-duped.
// Simulated delay, real implementation would read cookies().
export const getCurrentUser = cache(async function (): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 2_000));

  return { id: "123", email: "test.user@gmail.com" };
});
