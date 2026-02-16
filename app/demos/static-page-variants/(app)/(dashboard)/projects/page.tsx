import { Suspense } from "react";

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
      <p className="mt-1 text-sm text-gray-600">Manage your team's projects</p>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
    </>
  );
}

async function Projects() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const projects = [
    { id: 1, name: "api-service", status: "Active", deploys: 47 },
    { id: 2, name: "web-app", status: "Active", deploys: 89 },
    { id: 3, name: "mobile-backend", status: "Paused", deploys: 23 },
    { id: 4, name: "analytics-dashboard", status: "Active", deploys: 12 },
  ];

  return (
    <ul className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">{project.name}</p>
            <p className="text-xs text-gray-500">{project.deploys} deploys</p>
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              project.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {project.status}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3"
        >
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
