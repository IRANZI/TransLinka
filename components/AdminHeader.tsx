"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/bus-management", label: "Buses" },
  { href: "/admin/route-management", label: "Routes" },
  { href: "/admin/bookings", label: "Bookings" },
];

const superLinks = [
  { href: "/super-admin", label: "Dashboard" },
  { href: "/super-admin/companies", label: "Companies" },
  { href: "/admin/bus-management", label: "Buses" },
  { href: "/admin/route-management", label: "Routes" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default function AdminHeader({
  variant = "admin",
}: {
  variant?: "admin" | "super";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signout } = useAuth();
  const [open, setOpen] = useState(false);
  const resolvedVariant = user?.role === "SUPER_ADMIN" ? "super" : variant;
  const links = resolvedVariant === "super" ? superLinks : adminLinks;
  const home = resolvedVariant === "super" ? "/super-admin" : "/admin";
  const initial = user?.firstName?.charAt(0) || (resolvedVariant === "super" ? "S" : "A");
  const role = resolvedVariant === "super" ? "Super admin" : "Admin";

  const isActive = (href: string) =>
    href === home ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white/90 backdrop-blur-md">
      <div className="page-wrap flex h-16 items-center justify-between sm:h-[4.25rem]">
        <Link href={home} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="TransLinka" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
            TransLinka
          </span>
          <span className="hidden rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy-700 sm:inline">
            {role}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${
                isActive(link.href)
                  ? "bg-navy-50 text-navy-800"
                  : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-full p-2 text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white shadow-soft"
            aria-label={role}
          >
            {initial}
          </div>
          <button
            type="button"
            onClick={async () => {
              await signout();
              router.push("/signin");
            }}
            className="hidden rounded-lg p-2 text-navy-600 hover:bg-navy-50 hover:text-navy-900 sm:inline-flex"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-navy-800 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <nav className="page-wrap flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(link.href) ? "bg-navy-50 text-navy-800" : "text-navy-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={async () => {
              await signout();
              router.push("/signin");
              }}
              className="rounded-lg px-3 py-3 text-left text-base font-medium text-rose-700"
            >
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
