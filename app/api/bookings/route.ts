import { NextRequest } from "next/server";
import { PaymentMethod } from "@/backend/generated/prisma";
import { jsonError, requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { adminOverview, cancelBooking, checkoutPayment, listUserBookings } from "@/backend/services/booking.service";
import { prisma } from "@/backend/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER", "COMPANY_ADMIN", "SUPER_ADMIN"]);
    const reference = new URL(request.url).searchParams.get("reference");
    if (reference) {
      const booking = await prisma.booking.findFirst({
        where: {
          reference,
          ...(user.role === "TRAVELER" ? { userId: user.id } : {}),
        },
        include: { company: true, route: true, payment: true, bus: true, user: true },
      });
      if (!booking) return jsonError("Booking not found", 404);
      return Response.json({ booking });
    }
    const bookings = await listUserBookings(user.id);
    return Response.json({ bookings, walletBalance: user.walletBalance, user });
  } catch (error) {
    return handleError(error);
  }
}

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
      method: String(body.method || "MOMO").toUpperCase() as PaymentMethod,
      provider: body.provider,
      momoPhone: body.momoPhone,
      cardLast4: body.cardLast4,
    });
    return Response.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER"]);
    const body = await request.json();
    if (body.firstName || body.lastName || body.phone) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
        },
      });
      return Response.json({
        user: {
          id: updated.id,
          email: updated.email,
          firstName: updated.firstName,
          lastName: updated.lastName,
          phone: updated.phone,
          role: updated.role,
          walletBalance: updated.walletBalance,
        },
      });
    }
    return jsonError("Nothing to update");
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER", "COMPANY_ADMIN", "SUPER_ADMIN"]);
    const body = await request.json().catch(() => ({}));
    if (body.action === "cancel" && (body.id || body.reference)) {
      return Response.json(await cancelBooking(user, body.id || body.reference));
    }
    if (user.role === "COMPANY_ADMIN" || user.role === "SUPER_ADMIN") {
      return Response.json(await adminOverview(user.companyId));
    }
    return jsonError("Nothing to update");
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER", "COMPANY_ADMIN", "SUPER_ADMIN"]);
    const url = new URL(request.url);
    const idOrRef = url.searchParams.get("id") || url.searchParams.get("reference") || "";
    if (!idOrRef) return jsonError("Booking id is required");
    return Response.json(await cancelBooking(user, idOrRef));
  } catch (error) {
    return handleError(error);
  }
}
