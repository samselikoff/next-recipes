import Image from "next/image";
import LoginButton from "./client";

export default function Page() {
  return (
    <div className="relative mx-auto flex h-full min-h-dvh w-full max-w-4xl flex-col bg-white px-8">
      {/* Header */}
      <header className="flex items-center justify-between pt-8">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-linear-to-br from-gray-500 to-gray-950" />
          <span className="text-sm font-semibold text-gray-900">Acme</span>
        </div>
        <LoginButton />
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

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                "photo-1494790108377-be9c29b29330",
                "photo-1507003211169-0a1dd7228f2d",
                "photo-1534528741775-53994a69daeb",
                "photo-1438761681033-6461ffad8d80",
              ].map((id) => (
                <Image
                  key={id}
                  src={`https://images.unsplash.com/${id}?w=64&h=64&fit=crop&crop=face`}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-white grayscale"
                  unoptimized
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Trusted by{" "}
              <span className="font-medium text-gray-900">10,000+</span> teams
            </p>
          </div>
        </div>
        <div className="hidden w-80 sm:block">
          <Image
            loading="eager"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=400&fit=crop"
            alt="Team collaborating"
            width={320}
            height={200}
            className="rounded-xl object-cover shadow-lg grayscale"
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
