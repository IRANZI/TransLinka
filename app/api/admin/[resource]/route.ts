import { NextRequest } from "next/server";
import { requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { adminOverview, listCompanyBookings } from "@/backend/services/booking.service";
import {
  assignBusesToRoute,
  createBus,
  createRoute,
  deleteBus,
  deleteRoute,
  listBuses,
  listRoutes,
  mapBus,
  updateBus,
  updateRoute,
} from "@/backend/services/fleet.service";

function companyScope(user: { role: string; companyId: string | null }) {
  return user.role === "SUPER_ADMIN" ? null : user.companyId;
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(["COMPANY_ADMIN", "SUPER_ADMIN"]);
    const resource = new URL(request.url).pathname.split("/").pop();
    const companyId = companyScope(user);

    if (resource === "overview") return Response.json(await adminOverview(companyId));
    if (resource === "buses") {
      const buses = await listBuses(companyId || undefined);
      return Response.json(buses.map(mapBus));
    }
    if (resource === "routes") return Response.json(await listRoutes(companyId || undefined));
    if (resource === "bookings") return Response.json(await listCompanyBookings(companyId));
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(["COMPANY_ADMIN", "SUPER_ADMIN"]);
    if (!user.companyId && user.role !== "SUPER_ADMIN") {
      return Response.json({ error: "No company assigned" }, { status: 400 });
    }
    const resource = new URL(request.url).pathname.split("/").pop();
    const body = await request.json();
    const companyId = user.companyId || body.companyId;
    if (!companyId) return Response.json({ error: "companyId is required" }, { status: 400 });

    if (resource === "buses") return Response.json(await createBus(companyId, body));
    if (resource === "routes") {
      return Response.json(await createRoute(companyId, body, body.busIds || []));
    }
    if (resource === "assign") {
      return Response.json(await assignBusesToRoute(companyScope(user), body.routeId, body.busIds || []));
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireUser(["COMPANY_ADMIN", "SUPER_ADMIN"]);
    const resource = new URL(request.url).pathname.split("/").pop();
    const body = await request.json();
    const companyId = companyScope(user);
    if (resource === "buses") return Response.json(await updateBus(body.id, companyId, body));
    if (resource === "routes") return Response.json(await updateRoute(body.id, companyId, body));
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser(["COMPANY_ADMIN", "SUPER_ADMIN"]);
    const url = new URL(request.url);
    const resource = url.pathname.split("/").pop();
    const id = url.searchParams.get("id") || "";
    const companyId = companyScope(user);
    if (resource === "buses") {
      await deleteBus(id, companyId);
      return Response.json({ ok: true });
    }
    if (resource === "routes") {
      await deleteRoute(id, companyId);
      return Response.json({ ok: true });
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}
