import LogoutButton from "./_logout-button";
import NavLink from "./_nav-link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl justify-between px-8">
          <nav className="flex gap-6">
            <NavLink href="/demos/static-page-variants/dashboard">
              Dashboard
            </NavLink>
            <NavLink href="/demos/static-page-variants/feed">Feed</NavLink>
            <NavLink href="/demos/static-page-variants/projects">
              Projects
            </NavLink>
            <NavLink href="/demos/static-page-variants/settings">
              Settings
            </NavLink>
          </nav>

          <div className="my-3">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-8 py-8">{children}</main>
    </div>
  );
}
