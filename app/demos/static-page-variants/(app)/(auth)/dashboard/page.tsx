import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "../data";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">
        Here&apos;s what&apos;s happening with your projects
      </p>

      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
    </>
  );
}

async function Stats() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    /*
      Could only get here if optimistic cookie was 1 but
      there was no userId.

      Redirect home + clear the stale cookie.
    */
    redirect("/demos/static-page-variants?stale=1");
  }

  const stats = [
    { label: "Active Projects", value: "12" },
    { label: "Team Members", value: "8" },
    { label: "Deployments", value: "142" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <p className="text-sm text-gray-600">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-1 h-8 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
