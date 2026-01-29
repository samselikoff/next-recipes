"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logIn() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  (await cookies()).set("isLoggedIn", "true");

  redirect("/demos/static-page-variants");
}
