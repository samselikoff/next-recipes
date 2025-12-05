{% files %}

{% file name="page.tsx" %}

```tsx
export default function Page() {
  return (
    <div>
      <nav>
        <h1>DemoApp</h1>
        <div>
          <p>Home</p>
          <p>Explore</p>
          <p>Chat</p>
          <p>Profile</p>
        </div>
      </nav>

      <div>
        <Suspense fallback={<Spinner />}>
          <Posts />
        </Suspense>
      </div>
    </div>
  );
}
```

{% /file %}

{% file name="next.config.ts" %}

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

{% /file %}

{% /files %}
