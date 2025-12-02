---
title: Basic data fetching
description: Use Server Components and Suspense for a fast initial render, followed by streaming dynamic data.
---

In Next.js 16, calling async functions in Server Components is the primary way you fetch data:

```jsx
async function Posts() {
  const latestPosts = await getPosts();

  return latestPosts.map((post) => (
    <div key={post.id}>{post.content}</div>
  ));
}
```

With Cache Components enabled, Next will ensure that your data-fetching components don't fully block your routes by enforcing that you provide some static fallback content with Suspense:

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

This gives your app a fast initial boot—as fast as you'd get with a traditional SSG or jamstack approach, since the prerendered content can be served from a CDN—while _still_ getting to fetch your dynamic data on the server as part of the initial request.

No client-side data fetching library or API routes needed, and no need for a second roundtrip back to the server.

Just use Server Components and Suspense, and every page will serve its prerendered static content _and_ its dynamic data all in the initial request, thanks to React's server-side streaming capabilities.
