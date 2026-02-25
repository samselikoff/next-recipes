import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh">
      <nav className="flex bg-gray-50 p-3">
        <Link href="/" className="p-1 font-medium">
          Next.js Recipes
        </Link>
      </nav>

      <main className="w-full">{children}</main>
    </div>
  );
}
