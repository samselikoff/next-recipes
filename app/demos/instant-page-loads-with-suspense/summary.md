---
title: Instant page loads with Suspense
description: Use Suspense to unblock pages from their dynamic content, giving server-rendered pages a prerendered static shell that can be served instantly.
---

In Next apps using the App Router, the primary way to fetch data is by calling async functions in Server Components:

```jsx
async function Posts() {
  const posts = await getLatestPosts();

  return posts.map((post) => (
    <div key={post.id}>{post.content}</div>
  ));
}
```

When you load a page that renders such a component:

```jsx
export async function Page() {
  return (
    <main>
      <nav>
        <p>DemoApp</p>
      </nav>

      <Posts />
    </main>
  );
}
```

...that page's initial render will be blocked until the data fetch completes.

If you wanted an instant page load prior to Next 16, you had two options: either statically render your data-fetching components at build time, or switch to using client components to fetch data from the browser.

In Next 16, you no longer have to make this choice. By enabling Cache Components:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

...Next now has the ability to _prerender_ every page in your app—even pages with Server Components that fetch data at request time.

With Cache Components enabled, Next will ensure that your data-fetching components never block the initial page load by enforcing that you provide some static fallback content with Suspense:

```jsx
export async function Page() {
  return (
    <main>
      <nav>
        <p>DemoApp</p>
      </nav>

      <Suspense fallback={<Spinner />}>
        <Posts />
      </Suspense>
    </main>
  );
}
```

This gives your app a fast initial boot—as fast as you'd get with a traditional SSG or jamstack approach, since the prerendered content can be served from a CDN—while _still_ letting you fetch dynamic data on the server as part of the initial request. Even if the prerendered UI is minimal, the shell gets the browser to start loading your app's static assets (like `<script>` and `<link>` tags) in parallel with your data fetch, since they're known ahead of time and are part of the shell.

No client-side data fetching library or API routes needed, and no need for a second roundtrip back to the server. Just use Server Components and Suspense, and every page will serve its prerendered static content _and_ its dynamic data, all in the same response.

Powered by React's server-side streaming APIs and Next's ability to extract static content from every page.
