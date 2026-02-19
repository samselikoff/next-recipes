---
title: Static page variants
description: Serve different static content to the same URL based on cookies or headers from the incoming request.
---

Let's say you're building a site like the demo above, where the homepage looks entirely different for signed-in vs. signed-out users.

No problem! In Next, we can just render this page's content based on whether we have an authenticated user:

```tsx
// app/page.tsx
export default async function Page() {
  const user = await getCurrentUser();

  return user ? <Dashboard /> : <Home />;
}
```

This works great—but because `getCurrentUser` depends on cookies from the request, this page will always be fully rendered from scratch for each new visit.

Next's ability to prerender the static parts of different routes and serve them instantly from a CDN is one of its flagship features. But because these two versions of the homepage share little UI, we don't get that benefit for our app's most-visited URL.

---

To fix this, we can define two separate routes that each have their own prerendered static content. Then, we can use rewrites to map a single public URL to the appropriate page based on cookies from the incoming request.

Let's start by making the homepage render only the public content:

```tsx
// app/page.tsx
export default async function Page() {
  return (
    <div>
      <header>
        <span>Acme</span>
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

---

To cover:

- Hiding the duplicate URL
- /:path\* globs
- optimistic auth cookie
- accept text/markdown

- You can use glob routes (:path\*) for paths under a common segment name, like `/dashboard/`

Sometimes you need to serve different versions of a page to different users—like showing a logged-in vs. logged-out experience—while still benefiting from static generation.

With Next.js rewrites in `next.config.ts`, you can map a single public URL to different static pages based on request conditions like cookies, all while keeping your URLs clean and your pages fully static.

The key insight is that you can statically generate multiple variants of a page at build time, then use config-based rewrites to route users to the appropriate variant:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard",
        has: [{ type: "cookie", key: "token" }],
        destination: "/variants/logged-in/dashboard",
      },
      {
        source: "/dashboard",
        destination: "/variants/logged-out/dashboard",
      },
    ];
  },
};

export default nextConfig;
```

Each variant lives at its own path (e.g., `/variants/logged-in/dashboard`, `/variants/logged-out/dashboard`) but users always see the clean URL (`/dashboard`). Since each variant is statically generated, you get the performance benefits of static pages with the flexibility of personalization.

This pattern is particularly useful for:

- **Auth-aware pages**: Show different content for logged-in vs. logged-out users
- **A/B testing**: Serve different page designs to measure conversion
- **Feature flags**: Roll out new features to a subset of users
- **Personalization**: Show different content based on user segments

The rewrites are evaluated at the edge, so there's no origin server round-trip needed to decide which page to serve.
