"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  (await cookies()).delete("isLoggedIn");

  redirect("/demos/static-page-variants");
}
