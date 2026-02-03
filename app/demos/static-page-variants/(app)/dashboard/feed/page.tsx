import { Suspense } from "react";

export default function FeedPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Your Feed</h1>
      <p className="mt-1 text-sm text-gray-600">
        Recent activity from your team
      </p>

      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </>
  );
}

async function Feed() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const items = [
    {
      id: 1,
      user: "Alex Chen",
      action: "deployed",
      target: "api-service",
      time: "2 minutes ago",
    },
    {
      id: 2,
      user: "Sarah Kim",
      action: "merged",
      target: "feature/auth-flow",
      time: "15 minutes ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "commented on",
      target: "PR #142",
      time: "1 hour ago",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      target: "new-dashboard",
      time: "3 hours ago",
    },
  ];

  return (
    <ul className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-4 px-4 py-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
            {item.user
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1 text-sm">
            <span className="font-medium text-gray-900">{item.user}</span>{" "}
            <span className="text-gray-600">{item.action}</span>{" "}
            <span className="font-medium text-gray-900">{item.target}</span>
          </div>
          <span className="text-xs text-gray-500">{item.time}</span>
        </li>
      ))}
    </ul>
  );
}

function FeedSkeleton() {
  return (
    <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <div className="size-8 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
