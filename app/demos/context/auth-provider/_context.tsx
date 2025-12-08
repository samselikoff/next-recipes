import { createContext, use } from "react";

const Context = createContext<{
  currentUserPromise: Promise<{ id: string; name: string } | null>;
}>({ currentUserPromise: Promise.resolve(null) });

function useAuth() {
  return use(Context);
}

export { Context, useAuth };
