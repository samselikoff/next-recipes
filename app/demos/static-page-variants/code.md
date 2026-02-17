{% files %}

{% file name="next.config.ts" %}

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    A rewrite based on an optimistic cookie lets you serve /dashboard's
    static content to signed-in users when they visit /.
  */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            { type: "cookie", key: "isLoggedIn" },
          ],
          destination: "/dashboard",
        },
      ],
    };
  },
};

export default nextConfig;
```

{% /file %}

{% file name="app/page.tsx" %}

```tsx
/*
  The public marketing page, served at / to new or signed-out users
*/
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <h1>Build faster, ship smarter</h1>
      <p>
        The all-in-one platform for modern teams.
      </p>
      <form action={logIn}>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

async function logIn() {
  "use server";

  // Sign in as usual with formData, oath, etc.
  // await signInUser(formData)

  // Once authed, set a cookie for the optimistic rewrite
  (await cookies()).set("isLoggedIn", "1");

  redirect("/");
}
```

{% /file %}

{% file name="app/dashboard/page.tsx" %}

```tsx
/*
  The /dashboard page, served at / to signed-in users
*/

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      <header>
        <span>Acme</span>
        <form action={logOut}>
          <button type="submit">Log out</button>
        </form>
      </header>

      <main>
        <h1>Dashboard</h1>
        <Suspense
          fallback={<ActivityGridFallback />}
        >
          <ActivityGrid />
        </Suspense>
      </main>
    </div>
  );
}

async function logOut() {
  "use server";

  // Sign out as usual
  await signOutCurrentUser();

  // Once signed out, delete the optimistic cookie
  (await cookies()).delete("isLoggedIn");

  redirect("/");
}
```

{% /file %}

{% /files %}
