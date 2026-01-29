export default function Demo() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <p className="text-gray-600">
          This page serves different static variants based on auth state.
        </p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Current variant:</p>
          <p className="text-lg font-medium">Logged Out</p>
          <p className="mt-2 text-sm text-gray-500">
            Try setting a <code className="text-gray-700">token</code> cookie to
            see the logged-in variant.
          </p>
        </div>
      </div>
    </div>
  );
}
