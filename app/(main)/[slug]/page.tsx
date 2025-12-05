import { Frame } from "./Frame";
import Markdoc from "@markdoc/markdoc";
import path from "node:path";
import fs from "node:fs/promises";
import yaml from "js-yaml";
import * as z from "zod";
import React from "react";
import { codeToHtml } from "shiki";
import { recipesData } from "../recipes-data";

export async function generateStaticParams() {
  return recipesData.map((recipe) => ({ slug: recipe.slug }));
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  // "use cache";

  const { slug } = await params;

  const filePath = path.join(process.cwd(), "app", "demos", slug, "summary.md");
  const doc = await fs.readFile(filePath, "utf8");
  const ast = Markdoc.parse(doc);

  const content = Markdoc.transform(ast, {
    nodes: {
      fence: {
        render: "CodeFence",
        attributes: {
          content: { type: String },
          language: { type: String },
        },
      },
    },
  });

  const frontmatter = z
    .object({ title: z.string(), description: z.string() })
    .parse(
      ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {},
    );

  const summary = Markdoc.renderers.react(content, React, {
    components: {
      CodeFence,
    },
  });

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-8 pt-20">
        <h1 className="text-3xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-lg text-gray-700">{frontmatter.description}</p>

        <div className="mt-12 flex aspect-video flex-col overflow-hidden rounded-md shadow-md ring-1 ring-gray-900/10 lg:-mx-20">
          <Frame src={`/demos/${slug}`} />
        </div>

        <div className="prose my-20">{summary}</div>
      </div>
    </div>
  );
}

async function CodeFence({
  content,
  language,
}: {
  content: string;
  language: string;
}) {
  const html = await codeToHtml(content, {
    lang: language,
    theme: "dracula",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
