import Link from "next/link";
import { recipesData } from "./recipes-data";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh">
      <nav className="w-60 shrink-0 bg-gray-50 py-2">
        <Link href="/" className="block px-3 py-2">
          Next.js Recipes
        </Link>

        <p className="mt-4 mb-1 px-3 text-sm text-gray-500 uppercase">
          Data fetching
        </p>
        {recipesData.map((recipe, i) => (
          <Link
            key={i}
            href={`/${recipe.slug}`}
            className="block px-3 py-2 text-sm hover:bg-gray-200"
          >
            {recipe.title}
          </Link>
        ))}
      </nav>

      <main className="w-full">{children}</main>
    </div>
  );
}
