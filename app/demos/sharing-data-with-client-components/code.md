{% files %}

{% file name="layout.jsx" %}

```tsx
import { AuthProvider } from "./auth-provider";

export default function Layout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

{% /file %}

{% file name="auth-provider/index.jsx" %}

```tsx
import { getCurrentUser } from "@/lib/get-current-user";
import { AuthContext } from "./context";

export function AuthProvider({ children }) {
  // 🟢 Note: Not awaited
  const currentUserPromise = getCurrentUser();

  return (
    <AuthContext value={currentUserPromise}>
      {children}
    </AuthContext>
  );
}
```

{% /file %}

{% file name="auth-provider/context.jsx" %}

```tsx
"use client";

import { createContext, use } from "react";

const Context = createContext();

export function AuthContext({ value, children }) {
  return (
    <Context value={value}>{children}</Context>
  );
}

export function useCurrentUser() {
  const promise = use(Context);
  const currentUser = use(promise);

  return currentUser;
}
```

{% /file %}

{% file name="menu.jsx" %}

```jsx
"use client";

import { Menu } from "@base-ui/react";
import { useCurrentUser } from "./auth-provider/context";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Suspense } from "react";

export function AccountButton() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        Account <ChevronDownIcon />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Suspense
              fallback={<p>Loading...</p>}
            >
              <AccountMenu />
            </Suspense>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function AccountMenu() {
  // 🟢 Suspends this component
  const currentUser = useCurrentUser();

  return (
    <>
      <div>
        <p>Signed in as</p>
        <p>{currentUser?.email}</p>
      </div>
      <Menu.Separator />
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </>
  );
}
```

{% /file %}

{% /files %}
