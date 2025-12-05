import { codeToHtml } from "shiki";

export async function CodeFence({
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
