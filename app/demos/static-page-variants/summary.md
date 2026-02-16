---
title: Static page variants
description: Serve different static content at the same URL based on cookies or headers from the incoming request.
# description: Serve different prerendered pages to the same URL using rewrites based on cookies or headers from the incoming request.
# description: Serve different prerendered pages at the same URL, based on cookies or headers from the incoming request.
# description: Use rewrites to serve different prerendered pages to the same URL, based on cookies or headers from the incoming request.
---

To cover:

- optimistic auth cookie
- accept text/markdown

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
        destination:
          "/variants/logged-in/dashboard",
      },
      {
        source: "/dashboard",
        destination:
          "/variants/logged-out/dashboard",
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
