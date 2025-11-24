import dedent from "dedent";
import { Frame } from "../_components/frame";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Basic data fetching
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        Use Server Components and Suspense for a fast initial render, followed
        by streaming dynamic data.
      </p>

      <Frame src="/demos/basic-data-fetching" />

      <div className="prose my-20">
        <p>
          In Next.js 16, calling async functions in Server Components is the
          primary way you fetch data:
        </p>

        <pre>
          {dedent`
            export async function Page() {
              await getPosts()

              // ...
            }
          `}
        </pre>

        <p>
          With Cache Components, Next will ensure that your data-fetching
          components don&apos;t fully block your routes by enforcing that you
          provide some static fallback content with Suspense:
        </p>

        <pre>
          {dedent`
            export async function Page() {
              return (
                <Suspense fallback={<Spinner />}>
                  <Posts />
                </Suspense>
              )
            }
          `}
        </pre>

        <p>
          This gives your app a fast initial boot—as fast as you&apos;d get with
          a traditional SSG or JAMstack approach, since it can be served from a
          CDN—while <em>still</em> getting to fetch your dynamic data on the
          server as part of the initial request.
        </p>

        <p>No client-side data fetching library or API routes needed.</p>
      </div>
    </div>
  );
}
