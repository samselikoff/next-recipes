import { Suspense } from "react";
import Spinner from "./_spinner";

export default function Demo() {
  return (
    <div className="relative flex">
      <div className="fixed top-0 h-dvh w-[100px] px-2 py-4 max-md:border-r max-md:border-gray-300 md:px-4 md:py-6">
        <h1 className="text-lg">DemoApp</h1>
        <div className="mt-4">
          <p>Home</p>
          <p>Explore</p>
          <p>Chat</p>
          <p>Profile</p>
        </div>
      </div>

      <div className="mx-auto max-w-sm px-4 py-4 max-md:ml-[100px] md:py-6">
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
      {posts.map((post, i) => (
        <div key={i}>{post}</div>
      ))}
    </div>
  );
}
const posts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
];
