import Link from "next/link";
import { recipesData } from "./recipes-data";

export default async function Home() {
  return (
    <div className="mx-auto mt-8 max-w-xl px-4 md:mt-20">
      <h1 className="text-lg">
        A collection of code snippets for modern UI techniques with Next.js 16.
      </h1>

      <section className="mt-12">
        <p className="mt-4 text-gray-400 uppercase">Data fetching</p>

        {recipesData.map((recipe, i) => (
          <Link
            key={i}
            href={`/${recipe.slug}`}
            className="block py-2 hover:underline"
          >
            {recipe.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
