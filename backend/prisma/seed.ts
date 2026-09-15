import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = (value: string) => bcrypt.hash(value, 10);

  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.bus.deleteMany();
  await prisma.route.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.emailLog.deleteMany();

  const company = await prisma.company.create({
    data: {
      name: "Kigali Express",
      status: "ACTIVE",
      contactPerson: "Marie Mukamana",
      phone: "+250 788 123 456",
      email: "admin@kigaliexpress.rw",
      address: "Nyabugogo, Kigali",
      businessRegistrationNumber: "BRN-123456789",
      tinNumber: "TIN-987654321",
      companyType: "Private Limited Company",
      operatingRoutes: "Masaka - Remera, Kigali - Huye, Nyabugogo - Rubavu",
      fleetSize: 4,
    },
  });

  await prisma.user.create({
    data: {
      email: "superadmin@translinka.rw",
      phone: "+250780000001",
      firstName: "Super",
      lastName: "Admin",
      passwordHash: await password("SuperAdmin@2026"),
      role: "SUPER_ADMIN",
      walletBalance: 0,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@kigaliexpress.rw",
      phone: "+250780000002",
      firstName: "Marie",
      lastName: "Mukamana",
      passwordHash: await password("Admin@2026"),
      role: "COMPANY_ADMIN",
      companyId: company.id,
    },
  });

  const traveler = await prisma.user.create({
    data: {
      email: "traveler@translinka.rw",
      phone: "+250780000003",
      firstName: "Jean",
      lastName: "Uwimana",
      passwordHash: await password("Traveler@2026"),
      role: "TRAVELER",
      walletBalance: 50000,
    },
  });

  const masaka = await prisma.route.create({
    data: {
      companyId: company.id,
      name: "City Express",
      origin: "Masaka",
      destination: "Remera",
      distanceKm: "15 km",
      duration: "45 min",
      price: 2000,
      frequency: "Every 30 min",
      status: "ACTIVE",
      stops: "Kumurindi, Free Zone, KIM University",
      departureTime: "08:30",
      arrivalTime: "13:00",
    },
  });

  const huye = await prisma.route.create({
    data: {
      companyId: company.id,
      name: "Southern Line",
      origin: "Kigali",
      destination: "Huye",
      distanceKm: "135 km",
      duration: "2h 10m",
      price: 3000,
      frequency: "Every 2 hours",
      status: "ACTIVE",
      stops: "Muhanga, Ruhango",
      departureTime: "07:00",
      arrivalTime: "09:10",
    },
  });

  await prisma.route.create({
    data: {
      companyId: company.id,
      name: "Lake Kivu",
      origin: "Nyabugogo",
      destination: "Rubavu",
      distanceKm: "145 km",
      duration: "3h 45m",
      price: 4500,
      frequency: "Daily",
      status: "ACTIVE",
      stops: "Musanze",
      departureTime: "06:30",
      arrivalTime: "10:15",
    },
  });

  await prisma.bus.createMany({
    data: [
      {
        companyId: company.id,
        name: "City Express 1",
        plateNumber: "RAD-123-A",
        make: "Isuzu",
        model: "NPR 75L",
        year: 2022,
        color: "White",
        seats: 45,
        mileage: "125,000 km",
        driverName: "Jean Baptiste Uwimana",
        driverLicense: "DL-2023-001234",
        status: "ACTIVE",
        assignedRouteId: masaka.id,
      },
      {
        companyId: company.id,
        name: "City Express 2",
        plateNumber: "RAD-124-A",
        make: "Toyota",
        model: "Coaster",
        year: 2021,
        color: "Blue",
        seats: 45,
        mileage: "98,500 km",
        driverName: "Paul Niyonzima",
        status: "MAINTENANCE",
      },
      {
        companyId: company.id,
        name: "City Express 3",
        plateNumber: "RAD-125-A",
        make: "Mercedes",
        model: "Sprinter",
        year: 2023,
        seats: 35,
        driverName: "Marie Uwimana",
        status: "ACTIVE",
        assignedRouteId: huye.id,
      },
      {
        companyId: company.id,
        name: "City Express 4",
        plateNumber: "RAD-126-A",
        make: "Isuzu",
        model: "NPR 75L",
        year: 2020,
        seats: 50,
        driverName: "David Mugisha",
        status: "ACTIVE",
      },
    ],
  });

  const bus = await prisma.bus.findFirst({ where: { plateNumber: "RAD-123-A" } });
  const booking = await prisma.booking.create({
    data: {
      reference: "TL-SEED-001",
      userId: traveler.id,
      companyId: company.id,
      routeId: masaka.id,
      busId: bus?.id,
      origin: "Masaka",
      destination: "Remera",
      travelDate: new Date("2026-09-20"),
      departureTime: "08:30",
      arrivalTime: "13:00",
      seats: ["1A"],
      passengers: 1,
      amount: 2000,
      status: "CONFIRMED",
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      userId: traveler.id,
      method: "MOMO",
      provider: "mtn",
      amount: 2000,
      status: "COMPLETED",
      transactionId: "SEED-MOMO-001",
    },
  });

  console.log("Seeded TransLinka database.");
  console.log("Super admin: superadmin@translinka.rw / SuperAdmin@2026");
  console.log("Company admin:  admin@kigaliexpress.rw / Admin@2026");
  console.log("Traveler:       traveler@translinka.rw / Traveler@2026");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
