"use client";

import { useState } from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import LinkaChat from "@/components/LinkaChat";
import LinkaHistory from "@/components/LinkaHistory";

export default function ChatSupportPage() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex h-[100svh] flex-col bg-navy-50">
      <AppHeader />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-white lg:flex lg:w-72 lg:flex-col">
          <LinkaHistory />
        </aside>

        {historyOpen && (
          <div className="absolute inset-0 z-20 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-navy-950/40"
              aria-label="Close history"
              onClick={() => setHistoryOpen(false)}
            />
            <div className="relative h-full w-[min(18rem,86vw)] bg-white shadow-lift">
              <LinkaHistory onSelect={() => setHistoryOpen(false)} />
            </div>
          </div>
        )}

        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex items-center justify-between gap-3 border-b border-navy-100 px-3 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 text-navy-600 hover:bg-navy-50 lg:hidden"
                onClick={() => setHistoryOpen(true)}
                aria-label="Open chat history"
              >
                {historyOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
              </button>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h1 className="text-base font-bold text-navy-900 sm:text-lg">Linka</h1>
                <p className="flex items-center gap-1.5 text-xs text-navy-500 sm:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online · TransLinka travel assistant
                </p>
              </div>
            </div>
            <Link href="/dashboard" className="text-sm font-medium text-navy-600 hover:text-navy-900">
              Back to app
            </Link>
          </header>
          <LinkaChat />
        </section>
      </div>
    </div>
  );
}
