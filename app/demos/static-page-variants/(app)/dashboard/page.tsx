import { Suspense } from "react";
import LogoutButton from "./_logout-button";

export default function Demo() {
  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-linear-to-br from-gray-500 to-gray-950" />
            <span className="text-sm font-semibold text-gray-900">Acme</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl gap-6 px-8">
          <a href="#" className="-mb-px border-b-2 border-gray-900 py-3 text-sm font-medium text-gray-900">Home</a>
          <a href="#" className="-mb-px border-b-2 border-transparent py-3 text-sm text-gray-600 hover:text-gray-900">Feed</a>
          <a href="#" className="-mb-px border-b-2 border-transparent py-3 text-sm text-gray-600 hover:text-gray-900">Projects</a>
          <a href="#" className="-mb-px border-b-2 border-transparent py-3 text-sm text-gray-600 hover:text-gray-900">Settings</a>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-8 py-8">
        <h1 className="text-xl font-semibold text-gray-900">Your Feed</h1>
        <p className="mt-1 text-sm text-gray-600">
          Recent activity from your team
        </p>

        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </main>
    </div>
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
