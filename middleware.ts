import { NextRequest, NextResponse } from "next/server";

function roleFromToken(token?: string) {
  if (!token) return null;
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return (payload.role as string) || null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = roleFromToken(request.cookies.get("translinka_token")?.value);

  const needsAuth =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/my-tickets") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/select-seats") ||
    pathname.startsWith("/booking-confirmation");

  if (needsAuth && !role) {
    const signin = request.nextUrl.clone();
    signin.pathname = "/signin";
    signin.search = `?next=${encodeURIComponent(pathname + request.nextUrl.search)}`;
    return NextResponse.redirect(signin);
  }

  if (pathname.startsWith("/super-admin") && role !== "SUPER_ADMIN") {
    const home = role === "COMPANY_ADMIN" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(home, request.url));
  }

  if (pathname.startsWith("/admin") && role !== "COMPANY_ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/super-admin/:path*",
    "/dashboard/:path*",
    "/payment",
    "/payment/:path*",
    "/my-tickets/:path*",
    "/profile/:path*",
    "/select-seats/:path*",
    "/booking-confirmation/:path*",
  ],
};
