import { NextRequest } from "next/server";
import { handleError } from "@/backend/lib/http";
import { jsonError } from "@/backend/lib/auth";
import { listCities, popularRoutes, publicStats, searchTrips, submitContact } from "@/backend/services/public.service";
import { occupiedSeats } from "@/backend/services/booking.service";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const resource = url.pathname.split("/").pop();

    if (resource === "stats") return Response.json(await publicStats());
    if (resource === "cities") return Response.json(await listCities());
    if (resource === "popular-routes") return Response.json(await popularRoutes());
    if (resource === "search") {
      const from = url.searchParams.get("from") || "";
      const to = url.searchParams.get("to") || "";
      const date = url.searchParams.get("date") || "";
      return Response.json(await searchTrips(from, to, date));
    }
    if (resource === "seats") {
      const routeId = url.searchParams.get("routeId") || "";
      const date = url.searchParams.get("date") || "";
      if (!routeId || !date) return jsonError("routeId and date are required");
      return Response.json({ occupied: await occupiedSeats(routeId, date) });
    }
    return jsonError("Not found", 404);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    if (!url.pathname.endsWith("/contact")) return jsonError("Not found", 404);
    const body = await request.json();
    const saved = await submitContact(body);
    return Response.json({ ok: true, id: saved.id });
  } catch (error) {
    return handleError(error);
  }
}
