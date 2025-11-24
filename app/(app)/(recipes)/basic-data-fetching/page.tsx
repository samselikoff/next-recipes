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
    </div>
  );
}
