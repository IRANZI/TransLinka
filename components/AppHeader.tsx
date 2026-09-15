"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useLinka } from "@/components/LinkaProvider";
import LinkaSidebar from "@/components/LinkaSidebar";
import { useAuth } from "@/components/AuthProvider";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/book-ticket", label: "Book Ticket" },
  { href: "/my-tickets", label: "My Tickets" },
  { href: "/ar-navigation", label: "AR Navigation" },
];

export default function AppHeader({ userInitial }: { userInitial?: string }) {
  const pathname = usePathname();
  const { user, signout } = useAuth();
  const initial = userInitial || user?.firstName?.charAt(0) || "T";
  const [open, setOpen] = useState(false);
  const { sidebarOpen, toggleSidebar } = useLinka();
  const onChatPage = pathname === "/chat-support";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white/90 backdrop-blur-md">
        <div className="page-wrap flex h-16 items-center justify-between sm:h-[4.25rem]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="TransLinka" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
              TransLinka
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
              onClick={() => {
                if (!onChatPage) toggleSidebar();
              }}
              className={`relative rounded-full p-2 transition-colors ${
                sidebarOpen || onChatPage
                  ? "bg-navy-50 text-navy-900"
                  : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
              }`}
              aria-label="Open Linka assistant"
              aria-pressed={sidebarOpen}
            >
              <Sparkles className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="relative rounded-full p-2 text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-800"
              aria-label="Profile"
            >
              {initial}
            </Link>
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
                    isActive(link.href)
                      ? "bg-navy-50 text-navy-800"
                      : "text-navy-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/chat-support"
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  onChatPage ? "bg-navy-50 text-navy-800" : "text-navy-700"
                }`}
              >
                Linka support
              </Link>
              <button
                type="button"
                onClick={async () => {
                  await signout();
                  window.location.href = "/signin";
                }}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-left text-base font-medium text-rose-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </nav>
          </div>
        )}
      </header>
      <LinkaSidebar />
    </>
  );
}
