export default function HomePage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Welcome back</h1>
      <p className="mt-1 text-sm text-gray-600">
        Here&apos;s what&apos;s happening with your projects
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Active Projects</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Team Members</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">8</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Deployments</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">142</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Uptime</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">99.9%</p>
        </div>
      </div>
    </>
  );
}
