import Link from "next/link";
import { AccountButton } from "./client";

export default function Page() {
  return (
    <div>
      <nav className="sticky top-0 flex gap-4 bg-gray-50 px-4 py-4 text-sm text-gray-700">
        <Link href="/demos/context">Home</Link>

        <div className="ml-auto">
          <AccountButton />
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-md p-4">
        <h1 className="text-2xl font-bold">Main content</h1>

        <div className="mt-4 space-y-4">
          <p>
            This page and all of its content is unblocked, despite being wrapped
            inside of AuthProvider.
          </p>

          <hr className="my-8 border-gray-300" />

          <div className="space-y-4 text-sm text-gray-700">
            {Array.from(Array(8).keys()).map((i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                ducimus rerum doloremque ex eligendi tempora earum consequuntur
                quisquam eius perferendis esse cupiditate nemo ipsa, voluptatum
                unde adipisci! Ab, rerum quae.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
