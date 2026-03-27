import { PromptForm } from "./client";

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white">
      <div className="w-full max-w-2xl px-4">
        <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight text-gray-900">
          What can I help you with?
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Start typing — your input is preserved even while the page loads.
        </p>

        <PromptForm />
      </div>
    </div>
  );
}
