---
title: Server Components and prerendering
# description: Use Server Components and Suspense for a fast initial render, followed by streaming dynamic data.
# description: Server Components and Suspense give you a fast initial render followed by dynamic data, all from the server.
# description: Use Suspense to give server-rendered pages a fast initial response.
# description: Use Suspense to prerender server-generated pages for a fast initial response.
# description: See how Suspense lets you prerender server-generated pages for a fast initial response.
# description: Use Suspense and prerendering to give server-generated pages a fast initial response.
# description: See how prerendering gives server-rendered pages a fast initial response.
# description: Use Suspense to speed up server-rendered pages with a fast prerendered response.
# description: Use Suspense to speed up server-rendered pages with an initial prerendered version.
# description: Speed up server-rendered pages with a fast prerenderd version using Suspense.
# description: Keep server-rendered pages fast with a prerenderd pages using Suspense.
# description: Speed up the initial response of server-rendered pages using Suspense.
# description: Speed up the response of server-rendered pages using prerendering and Suspense.
# description: Keep your server-rendered pages snappy using prerendering and Suspense.
# description: Keep server-rendered pages fast with prerendering and Suspense.
# description: Use Suspense to give server-rendered pages a fast initial prerender.
# description: Use Suspense to give server-rendered pages a fast prerendered shell.
# description: Use Suspense to give server-rendered pages a fast initial response via a partially prerendered shell.
# description: Use Suspense to give server-rendered pages a partially prerendered shell for a fast initial response.
# description: Speed up server-rendered pages by using Suspense to generate partially prerendered shells.
# description: Speed up server-rendered pages with Suspense to generate a partially prerendered shell.
description: Speed up server-rendered pages by using Suspense to generate a partially prerendered shell.
# description: Speed up server-side rendering by using Suspense to generate a partially prerendered page.
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

No client-side data fetching library or API routes needed, and no need for a second roundtrip back to the server.

Just use Server Components and Suspense, and every page will serve its prerendered static content _and_ its dynamic data all in the initial request, thanks to React's server-side streaming APIs combined with Next's ability to extract static content.
