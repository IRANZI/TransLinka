import { prisma } from "../lib/prisma";
import { contactNotifyEmail, sendMail } from "../lib/email";
import { occupiedSeats } from "./booking.service";

export async function publicStats() {
  const [travelers, routes, companies] = await Promise.all([
    prisma.user.count({ where: { role: "TRAVELER" } }),
    prisma.route.count({ where: { status: "ACTIVE" } }),
    prisma.company.count({ where: { status: "ACTIVE" } }),
  ]);
  return {
    travelers,
    routes,
    companies,
    uptime: "99.9%",
  };
}

export async function listCities() {
  const routes = await prisma.route.findMany({
    where: { status: "ACTIVE" },
    select: { origin: true, destination: true },
  });
  return [...new Set(routes.flatMap((route) => [route.origin, route.destination]))].sort();
}

export async function popularRoutes() {
  const routes = await prisma.route.findMany({
    where: { status: "ACTIVE" },
    include: { _count: { select: { bookings: true } }, company: true },
    orderBy: { bookings: { _count: "desc" } },
    take: 6,
  });
  return routes.map((route) => ({
    id: route.id,
    from: route.origin,
    to: route.destination,
    duration: route.duration || "—",
    price: `${route.price.toLocaleString()} Rwf`,
    company: route.company.name,
  }));
}

export async function searchTrips(from: string, to: string, date: string) {
  const routes = await prisma.route.findMany({
    where: {
      status: "ACTIVE",
      origin: { equals: from, mode: "insensitive" },
      destination: { equals: to, mode: "insensitive" },
    },
    include: { company: true, buses: true },
  });

  const results = [];
  for (const route of routes) {
    const bus = route.buses[0];
    const taken = date ? await occupiedSeats(route.id, date) : [];
    const totalSeats = bus?.seats || 45;
    results.push({
      id: route.id,
      busId: bus?.id || null,
      company: route.company.name,
      route: route.name,
      departureTime: route.departureTime,
      arrivalTime: route.arrivalTime,
      duration: route.duration || "—",
      price: `${route.price.toLocaleString()} Rwf`,
      charterPrice: `${(route.price * 40).toLocaleString()} Rwf`,
      seatsLeft: Math.max(totalSeats - taken.length, 0),
      totalSeats,
      occupiedSeats: taken,
      stops: route.stops ? route.stops.split(/[,\n]/).filter(Boolean).length : 0,
      from: route.origin,
      to: route.destination,
      unitPrice: route.price,
    });
  }
  return results;
}

export async function submitContact(input: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!input.email || !input.message || !input.firstName) {
    throw Object.assign(new Error("Name, email and message are required"), { status: 400 });
  }

  const saved = await prisma.contactMessage.create({ data: input });
  const notify = contactNotifyEmail(input);
  await sendMail({ to: notify.to, subject: notify.subject, text: notify.text });
  await sendMail({
    to: input.email,
    subject: "We received your TransLinka message",
    text: `Hi ${input.firstName},\n\nThanks for contacting TransLinka. We received:\n\n${input.subject}\n${input.message}\n\nOur team will reply soon.\n`,
  });
  return saved;
}
