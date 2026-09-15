"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Maximize2, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useLinka } from "@/components/LinkaProvider";
import LinkaChat from "@/components/LinkaChat";
import LinkaHistory from "@/components/LinkaHistory";

export default function LinkaSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, newChat } = useLinka();
  const [showHistory, setShowHistory] = useState(false);

  if (pathname === "/chat-support" || !sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/40"
        aria-label="Close Linka"
        onClick={() => setSidebarOpen(false)}
      />
      <aside className="linka-sidebar absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-navy-100 bg-white shadow-lift">
        <header className="flex items-center justify-between gap-2 border-b border-navy-100 px-3 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy-900">Linka</p>
              <p className="flex items-center gap-1.5 text-xs text-navy-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Travel assistant
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                newChat();
                setShowHistory(false);
              }}
              className="rounded-lg p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
              aria-label="New chat"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowHistory((value) => !value)}
              className={`rounded-lg p-2 hover:bg-navy-50 hover:text-navy-900 ${
                showHistory ? "bg-navy-50 text-navy-900" : "text-navy-500"
              }`}
              aria-label="Chat history"
            >
              <History className="h-4 w-4" />
            </button>
            <Link
              href="/chat-support"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
              aria-label="Open full page chat"
            >
              <Maximize2 className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>
        {showHistory ? (
          <LinkaHistory onSelect={() => setShowHistory(false)} />
        ) : (
          <LinkaChat compact />
        )}
      </aside>
    </div>
  );
}
