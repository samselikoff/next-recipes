---
title: Server Components and Suspense
description: Speed up server-rendered pages with a partially prerendered shell.
---

In Next 16, the primary way to fetch data is by calling async functions in Server Components:

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

This gives your app a fast initial boot—as fast as you'd get with a traditional SSG or jamstack approach, since the prerendered content can be served from a CDN—while _still_ letting you fetch dynamic data on the server as part of the initial request.

No client-side data fetching library or API routes needed, and no need for a second roundtrip back to the server. Just use Server Components and Suspense, and every page will serve its prerendered static content _and_ its dynamic data all in the same response.

Powered by React's server-side streaming APIs and Next's ability to extract static content.
