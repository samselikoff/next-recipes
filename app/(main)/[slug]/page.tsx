"use cache";

import { recipesData } from "../recipes-data";
import { Frame } from "./Frame";
import { Metadata } from "next";
import { renderMarkdocFromFile } from "@/lib/markdoc/render-markdoc-from-file";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  if (!recipesData.some((r) => r.slug === slug)) {
    notFound();
  }

  const { frontmatter } = await renderMarkdocFromFile(
    `/app/demos/${slug}/summary.md`,
  );

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export async function generateStaticParams() {
  return recipesData.map((recipe) => ({ slug: recipe.slug }));
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;

  if (!recipesData.some((r) => r.slug === slug)) {
    notFound();
  }

  const summary = await renderMarkdocFromFile(`/app/demos/${slug}/summary.md`);
  const code = await renderMarkdocFromFile(`/app/demos/${slug}/code.md`);

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-4 pt-8 md:px-8 md:pt-20">
        <h1 className="text-xl font-semibold tracking-tight md:text-3xl">
          {summary.frontmatter.title}
        </h1>
        <p className="mt-2 text-gray-600 md:text-lg">
          {summary.frontmatter.description}
        </p>

        <div className="mt-12 overflow-hidden rounded-md shadow-xl ring-1 ring-gray-900/10 xl:-mx-20">
          <div className="flex aspect-square flex-col md:aspect-video">
            <Frame initialSrc={`/demos/${slug}`} />
          </div>
        </div>

        {code.content}

        <div className="prose my-20">{summary.content}</div>
      </div>
    </div>
  );
}
