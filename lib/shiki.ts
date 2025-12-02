// // lib/shiki.ts
// import 'server-only';
// import { getHighlighter, Highlighter } from 'shiki';

// let highlighterPromise: Promise<Highlighter> | null = null;

// function getSingletonHighlighter() {
//   if (!highlighterPromise) {
//     highlighterPromise = getHighlighter({
//       theme: 'github-dark', // or 'vitesse-dark', 'nord', etc
//       langs: ['javascript', 'typescript', 'tsx', 'jsx', 'css', 'html', 'bash', 'json'],
//     });
//   }
//   return highlighterPromise;
// }

// export async function highlightCode(code: string, lang?: string | null) {
//   const highlighter = await getSingletonHighlighter();

//   // Fallback if no lang specified
//   const language = lang && highlighter.getLoadedLanguages().includes(lang as any)
//     ? (lang as any)
//     : 'text';

//   const html = highlighter.codeToHtml(code, { lang: language });

//   // Shiki wraps it with its own pre/code; you can return as-is, or strip
//   return html;
// }
