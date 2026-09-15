"use client";

import { MessageSquare, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLinka } from "@/components/LinkaProvider";

export default function LinkaHistory({ onSelect }: { onSelect?: () => void }) {
  const { conversations, activeId, selectConversation, newChat } = useLinka();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return conversations;
    return conversations.filter((chat) => chat.title.toLowerCase().includes(value));
  }, [conversations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="space-y-3 p-3">
        <button
          type="button"
          onClick={() => {
            newChat();
            onSelect?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chats"
            className="w-full rounded-xl border border-navy-100 bg-navy-50/70 py-2 pl-9 pr-3 text-sm text-navy-900 outline-none placeholder:text-navy-400 focus:border-navy-400 focus:bg-white"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        <p className="px-2 pb-2 text-label text-navy-400">History</p>
        {filtered.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-navy-400">No chats match that search.</p>
        ) : (
          <ul className="space-y-1">
            {filtered.map((chat) => {
              const selected = chat.id === activeId;
              return (
                <li key={chat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      selectConversation(chat.id);
                      onSelect?.();
                    }}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      selected ? "bg-navy-50 font-semibold text-navy-900" : "text-navy-600 hover:bg-navy-50"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-navy-400" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
