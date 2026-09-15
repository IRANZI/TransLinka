import { NextRequest } from "next/server";
import { requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { checkoutPayment } from "@/backend/services/booking.service";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER", "COMPANY_ADMIN", "SUPER_ADMIN"]);
    const body = await request.json();
    const result = await checkoutPayment(user, {
      routeId: body.routeId || undefined,
      busId: body.busId || undefined,
      origin: body.origin || body.from,
      destination: body.destination || body.to,
      travelDate: body.travelDate || body.date,
      seats: Array.isArray(body.seats) ? body.seats : String(body.seats || "").split(",").filter(Boolean),
      passengers: Number(body.passengers || 1),
      bookingType: body.bookingType || "individual",
      method: String(body.method || "MOMO").toUpperCase(),
      provider: body.provider,
      momoPhone: body.momoPhone,
      cardLast4: body.cardLast4,
    });
    return Response.json(result);
  } catch (error) {
    return handleError(error);
  }
}
