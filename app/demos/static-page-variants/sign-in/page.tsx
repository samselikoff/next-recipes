import Image from "next/image";

export default function Page() {
  return (
    <div className="relative mx-auto flex h-full min-h-dvh w-full max-w-4xl flex-col bg-white px-8">
      {/* Header */}
      <header className="flex items-center justify-between pt-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-linear-to-br from-gray-500 to-gray-950" />
          <span className="text-sm font-semibold text-gray-900">Acme</span>
        </div>
        <a
          href="#"
          className="rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Log in
        </a>
      </header>

      {/* Hero */}
      <main className="flex flex-1 items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Build faster, ship smarter
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
            The all-in-one platform for modern teams. Streamline your workflow,
            collaborate in real-time, and deliver exceptional results.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get started
            </a>
            <a
              href="#"
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="hidden w-80 sm:block">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=400&fit=crop"
            alt="Team collaborating"
            width={320}
            height={200}
            className="rounded-xl object-cover shadow-lg"
            unoptimized
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500">
        © 2025 Acme Inc. All rights reserved.
      </footer>
    </div>
  );
}
