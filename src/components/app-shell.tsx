"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BreadcrumbProvider, usePageTitle } from "./breadcrumb-context";

const navItems = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/library", label: "Playlists", icon: "♫" },
  { href: "/download", label: "Download", icon: "↓" },
];

function Breadcrumb() {
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  const segments: Array<{ label: string; href?: string }> = [];

  const navItem = navItems.find((n) =>
    n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)
  );

  if (navItem) {
    const isSubPage = pathname !== navItem.href && pathname.startsWith(navItem.href + "/");
    if (isSubPage) {
      segments.push({ label: navItem.label, href: navItem.href });
      if (pageTitle) {
        segments.push({ label: pageTitle });
      }
    } else {
      segments.push({ label: navItem.label });
    }
  } else if (pathname === "/settings") {
    segments.push({ label: "Settings" });
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground/50">&gt;</span>}
          {seg.href ? (
            <Link href={seg.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {seg.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{seg.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <BreadcrumbProvider>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
          <div className="h-12 flex items-center px-4 border-b border-border">
            <Link href="/" className="text-base font-semibold tracking-tight">
              Yoto Mage
            </Link>
          </div>

          <nav className="flex-1 p-2 space-y-0.5">
            {navItems.map((item) => {
              const active = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <span className="w-5 text-center text-base leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-2 border-t border-border">
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                pathname === "/settings"
                  ? "bg-secondary text-secondary-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <span className="w-5 text-center text-base leading-none">⚙</span>
              Settings
            </Link>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-12 shrink-0 border-b border-border bg-card flex items-center px-6">
            <Breadcrumb />
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}
