# Next recipes

```tsx
<Suspense fallback={<div>Loading...</div>}>
  {params.then(({ slug }) => (
    <Content slug={slug} />
  ))}
</Suspense>;

async function Content({ slug }: { slug: string }) {
  const res = await fetch(`.../${slug}`);
  //
}
```

```tsx
function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content slugPromise={params.then((p) => p.slug)} />
    </Suspense>
  );
}

async function Content({ slugPromise }: { slugPromise: Promise<string> }) {
  const slug = await slugPromise;
  const res = await fetch(`.../${slug}`);

  //
}
```

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <WithParams>{({ slug }) => <Content slug={slug} />}</WithParams>
</Suspense>
```
