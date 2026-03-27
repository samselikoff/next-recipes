{% files %}

{% file name="layout.jsx" %}

```tsx
import { getCurrentUser } from "./lib/get-current-user";
import { AuthContext } from "./auth-context";

export default function Layout({ children }) {
  // 🟢 Not awaited — doesn't block the page from rendering
  const currentUserPromise = getCurrentUser();

  return (
    <AuthContext value={currentUserPromise}>
      {children}
    </AuthContext>
  );
}
```

{% /file %}

{% file name="auth-context.jsx" %}

```tsx
"use client";

import { createContext, use } from "react";

const Context = createContext();

export function AuthContext({ value, children }) {
  return (
    <Context value={value}>{children}</Context>
  );
}

export function useCurrentUserPromise() {
  return use(Context);
}
```

{% /file %}

{% file name="page.jsx" %}

```tsx
import { PromptForm } from "./client";

export default function Page() {
  return (
    <div>
      <h1>What can I help you with?</h1>
      <PromptForm />
    </div>
  );
}
```

{% /file %}

{% file name="client.jsx" %}

```tsx
"use client";

import { useCurrentUserPromise } from "./auth-context";
import { useActionState } from "react";

export function PromptForm() {
  const currentUserPromise = useCurrentUserPromise();

  const [result, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      // 🟢 Wait for auth only when the user submits
      const currentUser = await currentUserPromise;
      const prompt = formData.get("prompt");

      // Use currentUser for authorization, rate limiting, etc.
      return `"${prompt}" submitted by ${currentUser?.email}`;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <textarea name="prompt" />
      <button type="submit" disabled={isPending}>
        Send
      </button>
      {result && <p>{result}</p>}
    </form>
  );
}
```

{% /file %}

{% /files %}
