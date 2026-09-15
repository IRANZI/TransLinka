import { NextRequest } from "next/server";
import { jsonError } from "@/backend/lib/auth";

export function parseBody<T>(request: NextRequest): Promise<T> {
  return request.json() as Promise<T>;
}

export function handleError(error: unknown) {
  const err = error as Error & { status?: number };
  console.error(err);
  return jsonError(err.message || "Server error", err.status || 500);
}
