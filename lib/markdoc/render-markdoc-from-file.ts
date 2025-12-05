import Markdoc, { Tag } from "@markdoc/markdoc";
import yaml from "js-yaml";
import fs from "node:fs/promises";
import path from "path";
import React from "react";
import * as z from "zod";
import { CodeFence } from "./CodeFence";
import { File, Files } from "./Files";

export async function renderMarkdocFromFile(file: string) {
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
