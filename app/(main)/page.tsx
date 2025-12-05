import Link from "next/link";
import { recipesData } from "./recipes-data";

export default async function Home() {
  return (
    <div className="mt-8 px-4">
      <p className="mt-4 mb-1 text-gray-400 uppercase">Data fetching</p>
      {recipesData.map((recipe, i) => (
        <Link
          key={i}
          href={`/${recipe.slug}`}
          className="block py-2 hover:bg-gray-200"
        >
          {recipe.title}
        </Link>
      ))}
    </div>
  );
}
