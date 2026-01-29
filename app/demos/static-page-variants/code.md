{% files %}

{% file name="next.config.ts" %}

```ts
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

{% /file %}

{% file name="app/variants/logged-in/dashboard/page.tsx" %}

```tsx
export default function DashboardLoggedIn() {
  return (
    <div>
      <h1>Welcome back!</h1>
      <p>Here's your personalized dashboard.</p>
    </div>
  );
}
```

{% /file %}

{% file name="app/variants/logged-out/dashboard/page.tsx" %}

```tsx
export default function DashboardLoggedOut() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Please sign in to view your dashboard.</p>
    </div>
  );
}
```

{% /file %}

{% /files %}
