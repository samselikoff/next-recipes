import { cookies } from "next/headers";
import "server-only";

export async function getCurrentUser() {
  const jar = await cookies();
  const userId =
    typeof jar.get("userId") === "string" ? `${jar.get("userId")}` : null;

  return userId;
}
