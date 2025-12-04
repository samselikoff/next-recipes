---
# title: Server Components and Suspense
# title: Instant page loads
# title: Instant page loads
# title: Instant loading shells
# title: Instant prerendered pages
# title: Instant shells with streaming data
# title: Instant shells for dynamic pages
# title: Dynamic pages with instant prerendered shells
# title: Generate instant loading shells for dynamic pages
# title: Give dynamic pages an instant loading shell
# title: Instant loading of server-rendered pages
# title: Prerendered dynamic pages
# title: Prerendering pages with dynamic data
# title: Using Suspense to prerender pages with dynamic data
# title: Using Suspense to prerender pages with dynamic data

# title: Instant loading shells for dynamic pages
# title: Instant loading shells with Suspense
# title: Using Suspense for instant loading shells
# title: Using Suspense for instant page loads
# title: Instant page loads with prerendering and Suspense
title: Instant page loads with Suspense
# title: Instant prerendered pages with Suspense
# title: Instant page loads for dynamic pages
# title: Instant loading of dynamic pages
# title: Instantly load pages with dynamic content
# title: Instant loads for dynamic pages
# title: Instant page loads for pages of dynamic pages
# title: Instant page loads for pages with dynamic content
# title: Suspense for dynamic pages
# title: Prerender dynamic content with Suspense

# description: Load server-rendered pages instantly with a partially prerendered shell.
# description: Load server-rendered pages instantly with a prerendered static shell.
# description: Prerender server-side pages to serve an instant loading shell.
# description: Prerender server-side pages to serve an instant prerendered version of the page.
# description: Prerender server-side pages to serve an instant loading shell.
# description: Prerender server-rendered pages to serve its static content instantly.
# description: Prerender a dynamic page to serve its static content instantly.
# description: Serve a server-rendered page's static content instantly.
# description: Use Suspense to prerender the static content of dynamic pages.
# description: Speed up server-rendered pages wi

# description: Speed up server-rendered pages with a partially prerendered shell.
# description: Speed up server-rendered pages with a prerendered static shell.
# description: Speed up server-rendered pages with prerendered static shells.
# description: Speed up server-rendered pages with prerendered static shells.
# description: Speed up server-rendered pages with prerendered static shells by using Suspense to unblock dynamic content.
# description: Use Suspense to unblock dynamic content, giving server-rendered pages a prerendered static shell that can be served instantly.
description: Use Suspense to unblock a page from its dynamic content, giving server-rendered pages a prerendered static shell that can be served instantly.
# description: Use Suspense to prerender a static version of server-rendered pages.
# description: Prerender static versions of server-rendered pages by using Suspense to provide fallbacks for dynamic data.
---

In Next 16, the primary way to fetch data is by calling async functions in Server Components:

```jsx
async function Posts() {
  const posts = await getLatestPosts();

  return posts.map((post) => (
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

Powered by React's server-side streaming APIs and Next's ability to extract static content from every page.
