# Next.js Recipes

This is a demo/recipes site showcasing Next.js patterns and techniques. Each recipe lives in `app/demos/` and demonstrates a specific concept.

## Demo display size

Demos are displayed in a small viewport. Keep UIs simple and don't overcrowd them—avoid too many elements, overly detailed layouts, or features that need lots of space. Think of each demo as a small, focused illustration of a concept.

## Recipe structure

Each recipe in `app/demos/[slug]/` typically includes:

- `page.tsx` - The main demo page
- `code.md` - Simplified code snippets for display (no need for full Tailwind classes or all implementation details—just the core pattern)
- `summary.md` - Brief description of the recipe
- Supporting files as needed (actions, components, etc.)

## Recipe metadata

Recipe metadata (title, slug, description) is defined in `app/(main)/recipes-data.ts`.

## Code style

- Uses Tailwind CSS v4 (use `bg-linear-to-*` instead of `bg-gradient-to-*`)
- Prefix private/internal components with underscore (e.g., `_spinner.tsx`, `_login-button.tsx`)
- Use Next.js `Image` component with `unoptimized` for external URLs like Unsplash
- Server actions can be inline or in separate `actions.ts` files
- Use `"use server"` directive for server actions
- Use Suspense for async data loading with skeleton fallbacks

## Config

- `next.config.ts` contains rewrites and other Next.js config
- The `cacheComponents: true` option is enabled
