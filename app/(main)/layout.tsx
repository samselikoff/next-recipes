import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await new Promise((resolve) => setTimeout(resolve, 2_000));
  return (
    <div className="min-h-dvh">
      <nav className="bg-gray-50">
        <Link href="/" className="block p-4 font-medium">
          Next.js Recipes
        </Link>
      </nav>

      <main className="w-full">{children}</main>
    </div>
  );
}
