import { Suspense } from "react";
import { AuthProvider } from "./auth-provider";
import { ClientComponent } from "./client";

export default function Page() {
  return (
    <div className="p-8">
      <AuthProvider>
        <p>Unblocked RSC content</p>

        <Suspense fallback="Loading..">
          <ClientComponent />
        </Suspense>
      </AuthProvider>
    </div>
  );
}
