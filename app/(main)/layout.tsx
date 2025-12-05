import Link from "next/link";
import { recipesData } from "./recipes-data";
import { Suspense } from "react";
import { NavLink } from "./NavLink";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh md:flex">
      {/* Mobile nav */}
      <nav className="bg-gray-50 md:hidden">
        <Link href="/" className="block p-4 font-medium">
          Next.js Recipes
        </Link>
      </nav>

      {/* Desktop nav */}
      <nav className="w-60 shrink-0 bg-gray-50 py-2 max-md:hidden">
        <Link href="/" className="block px-3 py-2">
          Next.js Recipes
        </Link>

        <p className="mt-4 mb-1 px-3 text-sm text-gray-500 uppercase">
          Data fetching
        </p>
        {recipesData.map((recipe, i) => (
          <NavLink
            key={i}
            href={`/${recipe.slug}`}
            className="block px-3 py-2 text-sm data-active:font-medium"
          >
            {recipe.title}
          </NavLink>
        ))}
      </nav>

      <main className="w-full">
        {/* TODO: Remove */}
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}
