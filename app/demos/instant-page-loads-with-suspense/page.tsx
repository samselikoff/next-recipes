import { Suspense } from "react";
import Spinner from "./_spinner";

export default function Demo() {
  return (
    <div className="relative flex">
      <div className="sticky top-0 h-dvh px-4 py-6">
        <h1 className="text-lg">DemoApp</h1>
        <div className="mt-4">
          <p>Home</p>
          <p>Explore</p>
          <p>Chat</p>
          <p>Profile</p>
        </div>
      </div>

      <div className="mx-auto max-w-sm py-6">
        <Suspense fallback={<Spinner />}>
          <Feed />
        </Suspense>
      </div>
    </div>
  );
}

async function Feed() {
  await new Promise((resolve) => setTimeout(resolve, 1_500));

  return (
    <div className="space-y-4">
      {Array.from(Array(10).keys()).map((i) => (
        <div key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          dolores natus inventore totam molestias aliquam fugiat.
        </div>
      ))}
    </div>
  );
}
