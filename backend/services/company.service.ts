import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";
import { companyAdminEmail, sendMail } from "../lib/email";

export async function listCompanies() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { buses: true, routes: true } },
      bookings: { where: { status: "CONFIRMED" }, select: { amount: true } },
    },
  });

  return companies.map((company) => {
    const docs = (company.documents as Record<string, string> | null) || {};
    return {
    id: company.id,
    name: company.name,
    status: company.status === "ACTIVE" ? "Active" : "Inactive",
    buses: company._count.buses,
    routes: company._count.routes,
    revenue: `${company.bookings.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} Rwf`,
    lastActivity: company.updatedAt.toISOString(),
    registrationDate: company.createdAt.toISOString().slice(0, 10),
    contactPerson: company.contactPerson,
    phone: company.phone,
    email: company.email,
    address: company.address,
    businessRegistrationNumber: company.businessRegistrationNumber,
    tinNumber: company.tinNumber,
    vatRegistrationNumber: company.vatRegistrationNumber,
    transportLicenseNumber: company.transportLicenseNumber,
    ruraLicenseNumber: company.ruraLicenseNumber,
    rtdaPermitNumber: company.rtdaPermitNumber,
    companyType: company.companyType,
    operatingRoutes: company.operatingRoutes,
    fleetSize: String(company.fleetSize || company._count.buses),
    bankAccountDetails: company.bankAccountDetails,
    authorizedCapital: company.authorizedCapital,
    paidUpCapital: company.paidUpCapital,
    directorName: company.directorName,
    directorNationalId: company.directorNationalId,
    directorAddress: company.directorAddress,
    directorPhone: company.directorPhone,
    documents: company.documents,
    businessRegistrationCertificate: docs.businessRegistrationCertificate || "—",
    taxClearanceCertificate: docs.taxClearanceCertificate || "—",
    transportOperatorLicense: docs.transportOperatorLicense || "—",
    ruraOperatingLicense: docs.ruraOperatingLicense || "—",
    rtdaTransportPermit: docs.rtdaTransportPermit || "—",
    insuranceCertificate: docs.insuranceCertificate || "—",
    };
  });
}

export async function platformOverview() {
  const [companies, active, buses, users, revenue] = await Promise.all([
    prisma.company.count(),
    prisma.company.count({ where: { status: "ACTIVE" } }),
    prisma.bus.count(),
    prisma.user.count({ where: { role: "TRAVELER" } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED" },
    }),
  ]);

  return {
    totalCompanies: String(companies),
    activeCompanies: String(active),
    inactiveCompanies: String(companies - active),
    totalRevenue: `${(revenue._sum.amount || 0).toLocaleString()} Rwf`,
    totalBuses: String(buses),
    totalUsers: String(users),
  };
}

export async function createCompany(input: Record<string, string>) {
  const email = (input.email || "").toLowerCase().trim();
  if (!input.name || !email || !input.password || !input.contactPerson) {
    throw Object.assign(new Error("Company name, contact, email and password are required"), { status: 400 });
  }

  const company = await prisma.company.create({
    data: {
      name: input.name,
      status: "ACTIVE",
      contactPerson: input.contactPerson,
      phone: input.phone || "",
      email,
      address: input.address || "",
      businessRegistrationNumber: input.businessRegistrationNumber,
      tinNumber: input.tinNumber,
      vatRegistrationNumber: input.vatRegistrationNumber,
      transportLicenseNumber: input.transportLicenseNumber,
      ruraLicenseNumber: input.ruraLicenseNumber,
      rtdaPermitNumber: input.rtdaPermitNumber,
      companyType: input.companyType,
      operatingRoutes: input.operatingRoutes,
      fleetSize: Number(input.fleetSize || 0),
      bankAccountDetails: input.bankAccountDetails,
      authorizedCapital: input.authorizedCapital,
      paidUpCapital: input.paidUpCapital,
      directorName: input.directorName,
      directorNationalId: input.directorNationalId,
      directorAddress: input.directorAddress,
      directorPhone: input.directorPhone,
      documents: {
        businessRegistrationCertificate: input.businessRegistrationCertificate || null,
        taxClearanceCertificate: input.taxClearanceCertificate || null,
        transportOperatorLicense: input.transportOperatorLicense || null,
        ruraOperatingLicense: input.ruraOperatingLicense || null,
        rtdaTransportPermit: input.rtdaTransportPermit || null,
        insuranceCertificate: input.insuranceCertificate || null,
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      email,
      phone: input.phone || null,
      firstName: input.contactPerson.split(" ")[0] || "Admin",
      lastName: input.contactPerson.split(" ").slice(1).join(" ") || "User",
      passwordHash: await hashPassword(input.password),
      role: "COMPANY_ADMIN",
      companyId: company.id,
    },
  });

  const mail = companyAdminEmail({
    name: admin.firstName,
    email: admin.email,
    password: input.password,
    company: company.name,
  });
  await sendMail({ to: admin.email, subject: mail.subject, text: mail.text });

  return { company, adminEmail: admin.email };
}

export async function updateCompany(id: string, data: Record<string, unknown>) {
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) {
    throw Object.assign(new Error("Company not found"), { status: 404 });
  }

  const statusRaw = data.status != null ? String(data.status) : undefined;
  const status =
    statusRaw == null
      ? undefined
      : statusRaw.toUpperCase() === "INACTIVE" || statusRaw === "Inactive"
        ? "INACTIVE"
        : "ACTIVE";

  return prisma.company.update({
    where: { id },
    data: {
      status,
      name: data.name ? String(data.name) : undefined,
      contactPerson: data.contactPerson ? String(data.contactPerson) : undefined,
      phone: data.phone ? String(data.phone) : undefined,
      email: data.email ? String(data.email).toLowerCase().trim() : undefined,
      address: data.address != null ? String(data.address) : undefined,
    },
  });
}

export async function removeCompanies(ids: string[]) {
  await prisma.company.deleteMany({ where: { id: { in: ids } } });
  return { removed: ids.length };
}
