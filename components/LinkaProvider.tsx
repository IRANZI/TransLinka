"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LinkaRole = "user" | "assistant";

export type LinkaMessage = {
  id: string;
  role: LinkaRole;
  content: string;
};

export type LinkaConversation = {
  id: string;
  title: string;
  messages: LinkaMessage[];
};

export const LINKA_PROMPTS = [
  { label: "Book a ticket", text: "Help me book a bus ticket from Remera to Masaka." },
  { label: "Today's schedules", text: "What times do coaches leave for Huye today?" },
  { label: "Refund policy", text: "How do cancellations and refunds work?" },
  { label: "Live trip help", text: "How do I track my bus and find my boarding gate?" },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function titleFrom(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 34 ? `${clean.slice(0, 34)}…` : clean;
}

export function generateLinkaReply(userInput: string): string {
  const input = userInput.toLowerCase();

  if (input.includes("book") || input.includes("ticket")) {
    return "I can help you reserve a seat.\n\nTell me your departure, destination, and travel date. You can also open Book ticket to compare coaches, then come back here if you need a fare check.\n\nTypical city fares are 1,500–3,000 Rwf depending on the route.";
  }
  if (input.includes("schedule") || input.includes("time") || input.includes("huye")) {
    return "Here is a typical weekday pattern for popular routes:\n\n• Remera → Masaka: 06:30, 09:00, 12:30, 16:00, 19:30\n• Kigali → Huye: 07:00, 10:15, 13:45, 17:20\n\nTimes can shift on public holidays. Share a route and I will narrow it down.";
  }
  if (input.includes("route") || input.includes("direction") || input.includes("gate")) {
    return "For boarding, open AR navigation when you arrive at the station. It points you to the correct bay and gate.\n\nIf you tell me your booking reference or route name, I can confirm the usual departure gate.";
  }
  if (input.includes("price") || input.includes("cost") || input.includes("fare")) {
    return "Fares depend on distance and coach type:\n\n• City / short haul: about 1,500–2,500 Rwf\n• Intercity: about 3,000–5,000 Rwf\n• Full bus charter: quoted separately\n\nA small service fee is added at checkout. Which route should I price?";
  }
  if (input.includes("cancel") || input.includes("refund")) {
    return "Cancellations made at least 24 hours before departure are eligible for a full refund to your TransLinka wallet or original payment method.\n\nOpen My tickets, select the booking, then choose Cancel. Need help with a specific reference?";
  }
  if (input.includes("track") || input.includes("live") || input.includes("where")) {
    return "Once a ticket is confirmed, live tracking is available from My tickets. You will see the coach position, ETA, and boarding reminders.\n\nIf your trip is today, I can walk you through opening the live map.";
  }
  if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
    return "Hello, I am Linka — TransLinka’s travel assistant.\n\nAsk me about bookings, schedules, fares, refunds, or finding your bus at the station.";
  }

  return "I can help with tickets, schedules, fares, refunds, and station navigation.\n\nTry a prompt below, or tell me your route and travel date.";
}

type LinkaContextValue = {
  conversations: LinkaConversation[];
  activeId: string;
  active: LinkaConversation;
  sidebarOpen: boolean;
  typing: boolean;
  listening: boolean;
  copiedId: string | null;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  selectConversation: (id: string) => void;
  newChat: () => void;
  sendMessage: (text: string) => void;
  regenerate: () => void;
  copyMessage: (id: string, content: string) => void;
  toggleListening: () => void;
};

const LinkaContext = createContext<LinkaContextValue | null>(null);

export function LinkaProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<LinkaConversation[]>([
    { id: "welcome", title: "New chat", messages: [] },
  ]);
  const [activeId, setActiveId] = useState("welcome");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const active = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? conversations[0],
    [conversations, activeId]
  );

  const sendMessage = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    const userMessage: LinkaMessage = { id: uid(), role: "user", content: text };
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? titleFrom(text) : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    );
    setTyping(true);

    window.setTimeout(() => {
      const reply: LinkaMessage = {
        id: uid(),
        role: "assistant",
        content: generateLinkaReply(text),
      };
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeId ? { ...chat, messages: [...chat.messages, reply] } : chat
        )
      );
      setTyping(false);
    }, 700 + Math.min(text.length * 12, 900));
  }, [activeId, typing]);

  const newChat = useCallback(() => {
    const id = uid();
    setConversations((prev) => [{ id, title: "New chat", messages: [] }, ...prev]);
    setActiveId(id);
    setTyping(false);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
    setTyping(false);
  }, []);

  const regenerate = useCallback(() => {
    const lastUser = [...active.messages].reverse().find((message) => message.role === "user");
    if (!lastUser || typing) return;

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeId) return chat;
        const withoutLastAssistant =
          chat.messages[chat.messages.length - 1]?.role === "assistant"
            ? chat.messages.slice(0, -1)
            : chat.messages;
        return { ...chat, messages: withoutLastAssistant };
      })
    );
    setTyping(true);
    window.setTimeout(() => {
      const reply: LinkaMessage = {
        id: uid(),
        role: "assistant",
        content: generateLinkaReply(lastUser.content),
      };
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeId ? { ...chat, messages: [...chat.messages, reply] } : chat
        )
      );
      setTyping(false);
    }, 800);
  }, [active.messages, activeId, typing]);

  const copyMessage = useCallback(async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((value) => !value);
  }, []);

  const toggleListening = useCallback(() => {
    setListening((value) => !value);
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      activeId,
      active,
      sidebarOpen,
      typing,
      listening,
      copiedId,
      setSidebarOpen,
      toggleSidebar,
      selectConversation,
      newChat,
      sendMessage,
      regenerate,
      copyMessage,
      toggleListening,
    }),
    [
      conversations,
      activeId,
      active,
      sidebarOpen,
      typing,
      listening,
      copiedId,
      toggleSidebar,
      selectConversation,
      newChat,
      sendMessage,
      regenerate,
      copyMessage,
      toggleListening,
    ]
  );

  return <LinkaContext.Provider value={value}>{children}</LinkaContext.Provider>;
}

export function useLinka() {
  const context = useContext(LinkaContext);
  if (!context) {
    throw new Error("useLinka must be used within LinkaProvider");
  }
  return context;
}
