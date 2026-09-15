import { NextRequest } from "next/server";
import { clearAuthCookie, getSessionUser, jsonError, setAuthCookie } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { signin, signupTraveler } from "@/backend/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const path = new URL(request.url).pathname;

    if (path.endsWith("/signout")) {
      await clearAuthCookie();
      return Response.json({ ok: true });
    }

    const body = await request.json();

    if (path.endsWith("/signup")) {
      if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.password) {
        return jsonError("All traveler fields are required");
      }
      if (body.password !== body.confirmPassword) {
        return jsonError("Passwords do not match");
      }
      const result = await signupTraveler(body);
      await setAuthCookie(result.token);
      return Response.json({ user: result.user });
    }

    if (path.endsWith("/signin")) {
      if (!body.emailOrPhone || !body.password) {
        return jsonError("Email/phone and password are required");
      }
      const result = await signin(body.emailOrPhone, body.password);
      await setAuthCookie(result.token);
      return Response.json({ user: result.user });
    }

    return jsonError("Not found", 404);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);
  return Response.json({ user });
}
