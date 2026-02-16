export default function SettingsPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-600">Manage your account preferences</p>

      <div className="mt-6 space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email notifications</p>
              <p className="text-xs text-gray-500">Receive updates about your projects</p>
            </div>
            <div className="h-5 w-9 rounded-full bg-gray-900 p-0.5">
              <div className="size-4 translate-x-4 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Deploy previews</p>
              <p className="text-xs text-gray-500">Auto-generate preview URLs</p>
            </div>
            <div className="h-5 w-9 rounded-full bg-gray-900 p-0.5">
              <div className="size-4 translate-x-4 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Two-factor auth</p>
              <p className="text-xs text-gray-500">Add an extra layer of security</p>
            </div>
            <div className="h-5 w-9 rounded-full bg-gray-200 p-0.5">
              <div className="size-4 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
