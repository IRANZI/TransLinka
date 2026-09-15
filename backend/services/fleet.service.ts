import { BusStatus, RouteStatus } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export async function listBuses(companyId?: string | null) {
  return prisma.bus.findMany({
    where: companyId ? { companyId } : undefined,
    include: { assignedRoute: true, company: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createBus(companyId: string, data: Record<string, unknown>) {
  const plateNumber = String(data.plateNumber || "").trim();
  if (!data.name || !plateNumber) {
    throw Object.assign(new Error("Bus name and plate number are required"), { status: 400 });
  }

  return prisma.bus.create({
    data: {
      companyId,
      name: String(data.name),
      plateNumber,
      chassisNumber: data.chassisNumber ? String(data.chassisNumber) : null,
      engineNumber: data.engineNumber ? String(data.engineNumber) : null,
      make: data.make ? String(data.make) : null,
      model: data.model ? String(data.model) : null,
      year: data.year ? Number(data.year) : null,
      color: data.color ? String(data.color) : null,
      seats: Number(data.seats || 50),
      mileage: "0 km",
      driverName: data.driverName ? String(data.driverName) : null,
      driverLicense: data.driverLicense ? String(data.driverLicense) : null,
      driverNationalId: data.driverNationalId ? String(data.driverNationalId) : null,
      status: "ACTIVE",
      documents: (data.documents as object) || undefined,
      safetyEquipment: (data.safetyEquipment as object) || undefined,
      lastMaintenance: new Date(),
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });
}

export async function updateBus(id: string, companyId: string | null, data: Record<string, unknown>) {
  const existing = await prisma.bus.findUnique({ where: { id } });
  if (!existing || (companyId && existing.companyId !== companyId)) {
    throw Object.assign(new Error("Bus not found"), { status: 404 });
  }

  return prisma.bus.update({
    where: { id },
    data: {
      name: data.name ? String(data.name) : undefined,
      plateNumber: data.plateNumber ? String(data.plateNumber) : undefined,
      make: data.make ? String(data.make) : undefined,
      model: data.model ? String(data.model) : undefined,
      year: data.year ? Number(data.year) : undefined,
      color: data.color ? String(data.color) : undefined,
      seats: data.seats ? Number(data.seats) : undefined,
      driverName: data.driverName ? String(data.driverName) : undefined,
      driverLicense: data.driverLicense ? String(data.driverLicense) : undefined,
      driverNationalId: data.driverNationalId ? String(data.driverNationalId) : undefined,
      status: data.status ? (String(data.status).toUpperCase() as BusStatus) : undefined,
    },
  });
}

export async function deleteBus(id: string, companyId: string | null) {
  const existing = await prisma.bus.findUnique({ where: { id } });
  if (!existing || (companyId && existing.companyId !== companyId)) {
    throw Object.assign(new Error("Bus not found"), { status: 404 });
  }
  await prisma.bus.delete({ where: { id } });
}

export async function listRoutes(companyId?: string | null) {
  const routes = await prisma.route.findMany({
    where: companyId ? { companyId } : undefined,
    include: { buses: true, company: true },
    orderBy: { createdAt: "desc" },
  });
  return routes.map((route) => ({
    ...route,
    busesAssigned: route.buses.length,
    assignedBusIds: route.buses.map((bus) => bus.id),
  }));
}

export async function createRoute(
  companyId: string,
  data: Record<string, unknown>,
  busIds: string[] = []
) {
  if (!data.name || !data.origin || !data.destination || data.price == null) {
    throw Object.assign(new Error("Name, origin, destination and price are required"), { status: 400 });
  }

  const route = await prisma.route.create({
    data: {
      companyId,
      name: String(data.name),
      origin: String(data.origin),
      destination: String(data.destination),
      distanceKm: data.distance ? String(data.distance) : data.distanceKm ? String(data.distanceKm) : null,
      duration: data.duration ? String(data.duration) : null,
      price: Number(String(data.price).replace(/[^\d]/g, "") || 0),
      frequency: data.frequency ? String(data.frequency) : "Daily",
      status: "ACTIVE",
      stops: data.stops ? String(data.stops) : null,
      departureTime: data.departureTime ? String(data.departureTime) : "08:30",
      arrivalTime: data.arrivalTime ? String(data.arrivalTime) : "13:00",
    },
  });

  if (busIds.length) {
    await assignBusesToRoute(companyId, route.id, busIds);
  }

  return prisma.route.findUnique({
    where: { id: route.id },
    include: { buses: true },
  });
}

export async function assignBusesToRoute(companyId: string | null, routeId: string, busIds: string[]) {
  const route = await prisma.route.findUnique({ where: { id: routeId } });
  if (!route || (companyId && route.companyId !== companyId)) {
    throw Object.assign(new Error("Route not found"), { status: 404 });
  }

  await prisma.$transaction([
    prisma.bus.updateMany({
      where: { assignedRouteId: routeId, id: { notIn: busIds } },
      data: { assignedRouteId: null },
    }),
    prisma.bus.updateMany({
      where: {
        id: { in: busIds },
        ...(companyId ? { companyId } : {}),
        status: "ACTIVE",
      },
      data: { assignedRouteId: routeId },
    }),
  ]);

  return prisma.route.findUnique({
    where: { id: routeId },
    include: { buses: true },
  });
}

export async function updateRoute(id: string, companyId: string | null, data: Record<string, unknown>) {
  const existing = await prisma.route.findUnique({ where: { id } });
  if (!existing || (companyId && existing.companyId !== companyId)) {
    throw Object.assign(new Error("Route not found"), { status: 404 });
  }

  return prisma.route.update({
    where: { id },
    data: {
      name: data.name ? String(data.name) : undefined,
      origin: data.origin ? String(data.origin) : undefined,
      destination: data.destination ? String(data.destination) : undefined,
      distanceKm: data.distance ? String(data.distance) : undefined,
      duration: data.duration ? String(data.duration) : undefined,
      price: data.price != null ? Number(String(data.price).replace(/[^\d]/g, "")) : undefined,
      frequency: data.frequency ? String(data.frequency) : undefined,
      status: data.status ? (String(data.status).toUpperCase() as RouteStatus) : undefined,
      stops: data.stops ? String(data.stops) : undefined,
    },
    include: { buses: true },
  });
}

export async function deleteRoute(id: string, companyId: string | null) {
  const existing = await prisma.route.findUnique({ where: { id } });
  if (!existing || (companyId && existing.companyId !== companyId)) {
    throw Object.assign(new Error("Route not found"), { status: 404 });
  }
  await prisma.bus.updateMany({ where: { assignedRouteId: id }, data: { assignedRouteId: null } });
  await prisma.route.delete({ where: { id } });
}

export function mapBus(bus: Awaited<ReturnType<typeof listBuses>>[number]) {
  const routeLabel = bus.assignedRoute
    ? `${bus.assignedRoute.origin} → ${bus.assignedRoute.destination}`
    : null;
  return {
    id: bus.id,
    name: bus.name,
    plateNumber: bus.plateNumber,
    chassisNumber: bus.chassisNumber,
    engineNumber: bus.engineNumber,
    make: bus.make,
    model: bus.model,
    year: bus.year,
    color: bus.color,
    seats: bus.seats,
    mileage: bus.mileage,
    assignedRouteId: bus.assignedRouteId,
    assignedRouteName: routeLabel,
    driver: {
      name: bus.driverName || "",
      licenseNumber: bus.driverLicense || "",
      nationalId: bus.driverNationalId || "",
    },
    company: {
      name: bus.company.name,
      registrationNumber: bus.company.businessRegistrationNumber || "",
      contactPerson: bus.company.contactPerson,
      phone: bus.company.phone,
    },
    documents: bus.documents,
    safetyEquipment: bus.safetyEquipment,
    status: titleCase(bus.status),
    statusColor:
      bus.status === "ACTIVE"
        ? "bg-emerald-50 text-emerald-800"
        : bus.status === "MAINTENANCE"
          ? "bg-amber-50 text-amber-800"
          : "bg-navy-50 text-navy-700",
    lastMaintenance: bus.lastMaintenance,
    nextMaintenance: bus.nextMaintenance,
  };
}

function titleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
