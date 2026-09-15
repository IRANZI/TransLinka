"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "@/lib/api";

export type SessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: "TRAVELER" | "COMPANY_ADMIN" | "SUPER_ADMIN";
  companyId: string | null;
  walletBalance: number;
};

type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signout: () => Promise<void>;
  setUser: (user: SessionUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api<{ user: SessionUser }>("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signout = useCallback(async () => {
    await api("/api/auth/signout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, refresh, signout, setUser }),
    [user, loading, refresh, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function dashboardFor(role?: SessionUser["role"]) {
  if (role === "SUPER_ADMIN") return "/super-admin";
  if (role === "COMPANY_ADMIN") return "/admin";
  return "/dashboard";
}

export function destinationAfterAuth(role?: SessionUser["role"]) {
  if (typeof window !== "undefined") {
    const next = new URLSearchParams(window.location.search).get("next");
    if (
      next &&
      next.startsWith("/") &&
      !next.startsWith("//") &&
      !next.startsWith("/signin") &&
      !next.startsWith("/signup")
    ) {
      return next;
    }
  }
  return dashboardFor(role);
}
