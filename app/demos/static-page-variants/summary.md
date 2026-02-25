---
title: Static page variants
description: Serve different static content to the same URL based on cookies or headers from the incoming request.
---

Let's say you're building a site like the demo above, where the homepage is completely different for signed-in vs. signed-out users.

No problem! In Next.js, we can write a single page that fetches the current user, and conditionally renders the appropriate content:

```tsx
// app/page.tsx
export default async function Page() {
  const user = await getCurrentUser();

  return user ? <Dashboard /> : <MarketingHomepage />;
}
```

This works—but because `getCurrentUser` reads cookies from the incoming request, this page will always be fully rendered from scratch for each new visit.

Next's ability to prerender static content and serve it instantly from a CDN is one of its flagship features. But because these two versions of the homepage share little UI, we don't get that benefit for our app's most-visited URL.

---

To fix this, we can define two separate routes that each have their own prerendered static content. Then, we can use rewrites to map the same public URL (`/`) to the correct page, based on cookies from the incoming request.

Let's start by making the homepage render only the public content:

```tsx
// app/page.tsx
export default async function Page() {
  return (
    <div>
      <header>
        <span>Acme</span>

        <form action={logIn}>
          <button>Log in</button>
        </form>
      </header>

      <section>
        <h1>Build faster, ship smarter</h1>
        <p>
          The all-in-one platform for modern teams.
        </p>
      </section>
    </div>
  );
}
```

Next, move the dashboard content to a new `/dashboard` route:

```tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div>
      <header>
        <h1>Dashboard</h1>

        <form action={logOut}>
          <button>Log out</button>
        </form>
      </header>

      <Suspense fallback={<ActivityGridSkeleton />}>
        <ActivityGrid />
      </Suspense>
    </div>
  );
}

async function ActivityGrid() {
  const user = await getCurrentUser();

  // ...
}
```

Note that neither page reads cookies or does anything dynamic at the top level. The marketing homepage is completely static, and the dashboard uses Suspense so its static shell can be served immediately while the dynamic `ActivityGrid` streams in.

Now both pages get the benefit of static prerendering. But the dashboard lives at `/dashboard`—we want signed-in users to see it when they visit `/`.

This is where rewrites come in. But first, we need a way for the rewrite to know whether a user is signed in, without calling our database or auth provider on every request.

---

The solution is an **optimistic cookie**—a simple cookie that acts as a hint to the routing layer. We set it on login, and delete it on logout:

```tsx
async function logIn() {
  "use server";

  // Sign in as usual with formData, oauth, etc.
  await signInUser();

  // Set a cookie for the optimistic rewrite
  (await cookies()).set("isLoggedIn", "1");

  redirect("/");
}
```

```tsx
async function logOut() {
  "use server";

  // Sign out as usual
  await signOutCurrentUser();

  // Delete the optimistic cookie
  (await cookies()).delete("isLoggedIn");

  redirect("/");
}
```

This cookie doesn't replace real authentication—your dashboard page still verifies the session when it fetches user data. It just gives Next.js enough information at the routing layer to serve the right static page.

---

Now we can add a rewrite in `next.config.ts` that checks for this cookie:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/dashboard",
        },
      ],
    };
  },
};
```

The `beforeFiles` key is important—it means this rewrite runs before Next.js checks the filesystem for a matching route. When a request comes in for `/` with the `isLoggedIn` cookie present, Next.js internally rewrites it to `/dashboard` and serves that page's static content instead. The URL in the browser stays as `/`.

With this in place, both experiences are fully prerendered and served instantly from the CDN. Signed-out users get the marketing page, signed-in users get the dashboard shell—all from the same URL, with no server-side rendering on the critical path.

## Hiding the internal route

There's one problem: the `/dashboard` route is still publicly accessible. Anyone can visit `/dashboard` directly in their browser and see the page, even though it's only meant to be served via the rewrite.

We can fix this with another rewrite that sends direct visits to `/dashboard` to a 404:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/dashboard",
          destination: "/404",
        },
        {
          source: "/",
          has: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/dashboard",
        },
      ],
    };
  },
};
```

The order here matters. The `/dashboard` → `/404` rewrite comes first, so any direct request to `/dashboard` is caught and sent to a 404 page. But when a request comes in for `/` with the `isLoggedIn` cookie, that second rule matches on the original request URL—`/`—and serves the dashboard content as before. The two rules don't conflict because they match on different source paths.

## Multiple routes under a shared segment

So far we've only rewritten a single page. But many apps organize their authenticated routes under a shared segment—say, `/portal/dashboard`, `/portal/feed`, `/portal/projects`, and so on. With the approach above, you'd need to add a new rewrite for every path.

Fortunately, we can use a glob pattern to handle them all at once:

```
app/
  page.tsx                     ← marketing homepage
  portal/
    page.tsx                   ← dashboard (served at / for signed-in users)
    feed/page.tsx              ← served at /feed
    projects/page.tsx          ← served at /projects
    settings/page.tsx          ← served at /settings
```

Now a single glob rewrite can map any clean URL to its corresponding portal route:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/portal/:path*",
          destination: "/404",
        },
        {
          source: "/:path*",
          has: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/portal/:path*",
        },
      ],
    };
  },
};
```

The `:path*` parameter matches any number of path segments. When a signed-in user visits `/feed`, the rewrite maps it to `/portal/feed`. When they visit `/`, it maps to `/portal/` (the dashboard). And just like before, the first rule hides the internal `/portal/...` URLs from direct access—visiting `/portal/feed` in the browser returns a 404.

One thing to keep in mind: links within your authenticated pages should use the public-facing paths. Use `<Link href="/feed">` and `<Link href="/projects">`, not `<Link href="/portal/feed">`. The rewrite handles the mapping, and linking directly to the `/portal/...` paths would hit the 404 rule.

## Other ideas

This pattern works anywhere you want to serve different static content from the same URL. Rewrites can check cookies, headers, or query parameters, so there's a lot of flexibility.

**Serving markdown to AI agents.** There's a growing convention where AI bots request `text/markdown` in their `Accept` header. You could keep a parallel set of lightweight markdown-only pages and fork at the routing layer:

```ts
{
  source: "/:path*",
  has: [{ type: "header", key: "Accept", value: ".*text/markdown.*" }],
  destination: "/markdown/:path*",
}
```

Both the full HTML page and the markdown version stay fully static—no middleware or dynamic rendering needed.

**A/B testing and feature flags.** You could prerender two variants of a page and use a cookie to decide which one to serve:

```ts
{
  source: "/pricing",
  has: [{ type: "cookie", key: "pricing_variant", value: "b" }],
  destination: "/pricing-b",
}
```

This is nice because A/B tests typically force you into middleware or dynamic rendering. With rewrites, both variants are prerendered and served instantly from the CDN.
