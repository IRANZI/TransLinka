"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  Copy,
  Mic,
  Paperclip,
  RefreshCw,
  Sparkles,
  Square,
} from "lucide-react";
import { LINKA_PROMPTS, useLinka } from "@/components/LinkaProvider";

type LinkaChatProps = {
  compact?: boolean;
};

function LinkaAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-navy-700 text-white ${box}`}
    >
      <Sparkles className={icon} />
    </span>
  );
}

export default function LinkaChat({ compact = false }: LinkaChatProps) {
  const {
    active,
    typing,
    listening,
    copiedId,
    sendMessage,
    regenerate,
    copyMessage,
    toggleListening,
  } = useLinka();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [active.messages, typing]);

  useEffect(() => {
    if (!listening) return;
    const timer = window.setTimeout(() => {
      setDraft("What time is the next coach from Remera to Masaka?");
      toggleListening();
      inputRef.current?.focus();
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [listening, toggleListening]);

  const submit = () => {
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const empty = active.messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-navy-50/40">
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {empty ? (
          <div className={`mx-auto flex h-full w-full max-w-3xl flex-col justify-center ${compact ? "py-4" : "py-6"}`}>
            <div className="mb-5 flex items-center gap-3">
              <LinkaAvatar />
              <div>
                <p className="text-lg font-bold text-navy-900 sm:text-xl">How can I help you travel?</p>
                <p className="text-sm text-navy-500">Schedules, tickets, fares, and station help.</p>
              </div>
            </div>
            <div className={`grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
              {LINKA_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => sendMessage(prompt.text)}
                  className="rounded-xl border border-navy-100 bg-white px-4 py-3 text-left text-sm text-navy-800 shadow-soft transition hover:border-navy-300 hover:shadow-lift"
                >
                  <span className="block font-semibold text-navy-900">{prompt.label}</span>
                  {!compact && (
                    <span className="mt-1 block text-xs text-navy-500 sm:text-sm">{prompt.text}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`mx-auto w-full space-y-5 ${compact ? "max-w-none" : "max-w-4xl"}`}>
            {active.messages.map((message, index) => {
              const isLastAssistant =
                message.role === "assistant" && index === active.messages.length - 1 && !typing;
              if (message.role === "user") {
                return (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-700 px-4 py-3 text-sm leading-relaxed text-white sm:text-base">
                      {message.content}
                    </div>
                  </div>
                );
              }
              return (
                <div key={message.id} className="flex items-start gap-3">
                  <LinkaAvatar size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-navy-800 sm:text-base">
                      {message.content}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => copyMessage(message.id, message.content)}
                        className="rounded-lg p-1.5 text-navy-400 hover:bg-white hover:text-navy-800"
                        aria-label="Copy reply"
                      >
                        {copiedId === message.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      {isLastAssistant && (
                        <button
                          type="button"
                          onClick={regenerate}
                          className="rounded-lg p-1.5 text-navy-400 hover:bg-white hover:text-navy-800"
                          aria-label="Regenerate reply"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex items-start gap-3">
                <LinkaAvatar size="sm" />
                <div className="flex h-9 items-center gap-1 rounded-2xl bg-white px-3 shadow-soft">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400 [animation-delay:240ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-navy-100 bg-white/90 px-3 py-3 backdrop-blur sm:px-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
          className={`mx-auto w-full ${compact ? "" : "max-w-4xl"}`}
        >
          <div className="flex items-end gap-2 rounded-2xl border border-navy-100 bg-navy-50/70 p-2 shadow-soft focus-within:border-navy-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-navy-500/15">
            <button
              type="button"
              className="mb-0.5 rounded-xl p-2 text-navy-500 hover:bg-white hover:text-navy-800"
              aria-label="Attach a file"
              title="Attach a ticket or screenshot"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${Math.min(event.target.scrollHeight, 140)}px`;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder={listening ? "Listening…" : "Ask Linka anything about your trip"}
              className="max-h-36 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-sm text-navy-900 outline-none placeholder:text-navy-400 sm:text-base"
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`mb-0.5 rounded-xl p-2 ${
                listening ? "bg-rose-50 text-rose-600" : "text-navy-500 hover:bg-white hover:text-navy-800"
              }`}
              aria-label={listening ? "Stop voice input" : "Start voice input"}
            >
              {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              className="mb-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700 text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-navy-300"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-navy-400">
            Linka can make mistakes. Confirm times and fares before you travel.
          </p>
        </form>
      </div>
    </div>
  );
}
