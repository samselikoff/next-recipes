---
title: Prerendered inputs
description: Keep inputs interactive from first paint by rendering them outside Suspense boundaries, and deferring auth checks to the form action.
---

A common pattern for pages with a prompt input — like ChatGPT or Lovable — is to check whether the user is logged in before rendering the form:

```jsx
async function Page() {
  const user = await getCurrentUser();

  return <PromptForm user={user} />;
}
```

This blocks the entire page until auth resolves. The user sees nothing while they wait.

A well-intentioned fix is to wrap the form in Suspense with a fallback that _looks_ like the real input:

```jsx
<Suspense fallback={<FakeInput />}>
  <PromptForm />
</Suspense>
```

This removes the layout shift, but if the user starts typing before the data loads, their input is blown away when the real component swaps in.

## The fix: uncontrolled inputs + deferred auth

Instead of waiting for data before rendering the input, render the real input immediately and defer the data check to the form's submit action.

Since the input is uncontrolled, React never replaces it — the user's keystrokes are preserved through hydration and data loading. The form action awaits the auth promise only when the user actually submits:

```jsx
function PromptForm() {
  const currentUserPromise = useCurrentUserPromise();

  const [result, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      // 🟢 Wait for auth only on submit
      const currentUser = await currentUserPromise;
      const prompt = formData.get("prompt");

      return await sendPrompt(prompt, currentUser);
    },
    null,
  );

  return (
    <form action={submitAction}>
      <textarea name="prompt" />
      <button type="submit" disabled={isPending}>
        Send
      </button>
    </form>
  );
}
```

The key insight is that the promise is created in a Server Component (the layout) and passed to the client tree via context — the same pattern from the [Sharing data with Client Components](/sharing-data-with-client-components) recipe. But instead of calling `use()` on it during render (which would suspend), we hold onto the promise and only `await` it inside the action.

This means:

- The input renders instantly, even at build time if the page is prerendered
- The user can start typing immediately
- Auth is checked before submission, not before rendering
- No layout shift, no lost state
