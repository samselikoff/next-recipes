import Markdoc, { Tag } from "@markdoc/markdoc";
import yaml from "js-yaml";
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { codeToHtml } from "shiki";
import * as z from "zod";
import { recipesData } from "../recipes-data";
import { File, Files } from "./Files";
import { Frame } from "./Frame";

export async function generateStaticParams() {
  return recipesData.map((recipe) => ({ slug: recipe.slug }));
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  // "use cache";

  const { slug } = await params;
  const summary = await renderMarkdocFile(`/app/demos/${slug}/summary.md`);
  const code = await renderMarkdocFile(`/app/demos/${slug}/code.md`);

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
            <Frame src={`/demos/${slug}`} />
          </div>
        </div>

        {code.content}

        <div className="prose my-20">{summary.content}</div>
      </div>
    </div>
  );
}

async function renderMarkdocFile(file: string) {
  const parts = file.split("/");
  const filePath = path.join(process.cwd(), ...parts);
  const doc = await fs.readFile(filePath, "utf8");
  const ast = Markdoc.parse(doc);
  const treeNode = Markdoc.transform(ast, {
    nodes: {
      fence: {
        render: "CodeFence",
        attributes: {
          content: { type: String },
          language: { type: String },
        },
      },
    },
    tags: {
      files: {
        render: "Files",
        transform(node, config) {
          const filenames = node
            .transformChildren(config)
            .filter((child) => child instanceof Tag)
            .filter((child) => child.name === "File")
            .map((file) => file.attributes.name);

          return new Tag(
            this.render,
            { filenames },
            node.transformChildren(config),
          );
        },
      },

      file: {
        render: "File",
        attributes: {
          name: {
            type: String,
          },
        },
      },
    },
  });

  const frontmatter = z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .parse(
      ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {},
    );

  const content = Markdoc.renderers.react(treeNode, React, {
    components: {
      CodeFence,
      Files,
      File,
    },
  });

  return { frontmatter, content };
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
