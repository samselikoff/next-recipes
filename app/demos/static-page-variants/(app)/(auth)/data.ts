import { cookies } from "next/headers";
import "server-only";

export async function getCurrentUser() {
  const jar = await cookies();
  const userId = jar.get("userId")?.value;

  return userId;
}
