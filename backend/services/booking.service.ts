import { PaymentMethod } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { bookingEmail, sendMail } from "../lib/email";
import type { AuthUser } from "../lib/auth";

function reference() {
  return `TL-${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;
}

function transactionId(method: string) {
  return `${method.toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

function parseTravelDate(value: string) {
  const parsed = new Date(value);
  if (!value || Number.isNaN(parsed.getTime()) || value.toLowerCase() === "today") {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    return today;
  }
  return parsed;
}

export async function occupiedSeats(routeId: string, travelDate: string) {
  const day = parseTravelDate(travelDate);
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(day);
  end.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      routeId,
      travelDate: { gte: start, lte: end },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { seats: true },
  });
  return bookings.flatMap((booking) => booking.seats);
}

export async function checkoutPayment(user: AuthUser, input: {
  routeId?: string;
  busId?: string;
  origin?: string;
  destination?: string;
  travelDate: string;
  seats: string[];
  passengers?: number;
  bookingType?: string;
  method: PaymentMethod | string;
  provider?: string;
  momoPhone?: string;
  cardLast4?: string;
}) {
  const method = String(input.method || "MOMO").toUpperCase() as PaymentMethod;
  if (!["MOMO", "CARD", "WALLET", "DIGITAL"].includes(method)) {
    throw Object.assign(new Error("Unsupported payment method"), { status: 400 });
  }

  const route = await resolveRoute(input.routeId, input.origin, input.destination);
  if (!route) {
    throw Object.assign(new Error("Route not found. Search the trip again and continue to payment."), { status: 404 });
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    throw Object.assign(new Error("User not found"), { status: 404 });
  }

  const busId = input.busId && input.busId !== "null" ? input.busId : route.buses[0]?.id || null;
  const seats = input.bookingType === "charter" ? ["CHARTER"] : (input.seats || []).map(String).filter(Boolean);
  if (input.bookingType !== "charter" && seats.length === 0) {
    throw Object.assign(new Error("Select at least one seat"), { status: 400 });
  }

  const taken = await occupiedSeats(route.id, input.travelDate);
  if (seats.some((seat) => taken.includes(seat))) {
    throw Object.assign(new Error("One or more selected seats are no longer available"), { status: 409 });
  }

  const amount =
    input.bookingType === "charter" ? route.price * 40 : route.price * Math.max(seats.length, 1);

  if (method === "WALLET" && dbUser.walletBalance < amount) {
    throw Object.assign(new Error("Wallet balance is not enough for this ticket"), { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        reference: reference(),
        userId: dbUser.id,
        companyId: route.companyId,
        routeId: route.id,
        busId,
        origin: route.origin,
        destination: route.destination,
        travelDate: parseTravelDate(input.travelDate),
        departureTime: route.departureTime,
        arrivalTime: route.arrivalTime,
        seats,
        passengers: input.passengers || seats.length || 1,
        amount,
        bookingType: input.bookingType || "individual",
        status: "CONFIRMED",
      },
    });

    if (method === "WALLET") {
      await tx.user.update({
        where: { id: dbUser.id },
        data: { walletBalance: { decrement: amount } },
      });
    }

    const payment = await tx.payment.create({
      data: {
        bookingId: booking.id,
        userId: dbUser.id,
        method,
        provider: input.provider || method,
        amount,
        status: "COMPLETED",
        transactionId: transactionId(method),
        metadata: {
          momoPhone: input.momoPhone || dbUser.phone || null,
          cardLast4: input.cardLast4 || null,
          processedAt: new Date().toISOString(),
        },
      },
    });

    return { booking, payment };
  });

  const mail = bookingEmail({
    name: dbUser.firstName,
    reference: result.booking.reference,
    origin: route.origin,
    destination: route.destination,
    date: parseTravelDate(input.travelDate).toDateString(),
    seats: seats.join(", "),
    amount,
  });
  void sendMail({ to: dbUser.email, subject: mail.subject, text: mail.text });

  const fresh = await prisma.user.findUnique({ where: { id: dbUser.id } });

  return {
    booking: result.booking,
    payment: result.payment,
    walletBalance: fresh?.walletBalance ?? dbUser.walletBalance,
    company: route.company.name,
    routeName: route.name,
  };
}

async function resolveRoute(routeId?: string, origin?: string, destination?: string) {
  if (routeId) {
    const byId = await prisma.route.findUnique({
      where: { id: routeId },
      include: { company: true, buses: true },
    });
    if (byId) return byId;
  }

  if (origin && destination) {
    return prisma.route.findFirst({
      where: {
        status: "ACTIVE",
        origin: { equals: origin.trim(), mode: "insensitive" },
        destination: { equals: destination.trim(), mode: "insensitive" },
      },
      include: { company: true, buses: true },
    });
  }

  return null;
}

export async function cancelBooking(user: AuthUser, idOrReference: string) {
  const booking = await prisma.booking.findFirst({
    where: { OR: [{ id: idOrReference }, { reference: idOrReference }] },
    include: { payment: true },
  });
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { status: 404 });
  }

  const allowed =
    booking.userId === user.id ||
    user.role === "SUPER_ADMIN" ||
    (user.role === "COMPANY_ADMIN" && user.companyId === booking.companyId);
  if (!allowed) {
    throw Object.assign(new Error("You cannot cancel this booking"), { status: 403 });
  }
  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    throw Object.assign(new Error("This booking cannot be cancelled"), { status: 400 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    const next = await tx.booking.update({
      where: { id: booking.id },
      data: { status: "CANCELLED" },
    });
    if (booking.payment?.status === "COMPLETED") {
      await tx.user.update({
        where: { id: booking.userId },
        data: { walletBalance: { increment: booking.amount } },
      });
    }
    return next;
  });

  return { booking: updated };
}

export async function listUserBookings(userId: string) {
  return prisma.booking.findMany({
    where: { userId },
    include: { company: true, route: true, payment: true, bus: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listCompanyBookings(companyId: string | null) {
  return prisma.booking.findMany({
    where: companyId ? { companyId } : undefined,
    include: { user: true, company: true, route: true, payment: true, bus: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function adminOverview(companyId: string | null) {
  const where = companyId ? { companyId } : {};
  const [revenue, bookings, travelers, buses] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED", booking: where },
    }),
    prisma.booking.count({ where }),
    prisma.user.count({
      where: companyId
        ? { bookings: { some: { companyId } } }
        : { role: "TRAVELER" },
    }),
    prisma.bus.count({ where: companyId ? { companyId, status: "ACTIVE" } : { status: "ACTIVE" } }),
  ]);

  const recent = await prisma.booking.findMany({
    where,
    include: { user: true, route: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return {
    totalRevenue: `${(revenue._sum.amount || 0).toLocaleString()} Rwf`,
    totalBookings: String(bookings),
    activeUsers: String(travelers),
    activeBuses: String(buses),
    recentBookings: recent.map((booking) => ({
      id: booking.id,
      passenger: `${booking.user.firstName} ${booking.user.lastName}`,
      route: `${booking.origin} → ${booking.destination}`,
      bookingRef: booking.reference,
      departure: `${booking.travelDate.toLocaleDateString()} ${booking.departureTime}`,
      amount: `${booking.amount.toLocaleString()} Rwf`,
      status: booking.status.charAt(0) + booking.status.slice(1).toLowerCase(),
    })),
  };
}
