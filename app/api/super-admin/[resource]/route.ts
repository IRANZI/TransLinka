import { NextRequest } from "next/server";
import { requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { createCompany, listCompanies, platformOverview, removeCompanies, updateCompany } from "@/backend/services/company.service";

export async function GET(request: NextRequest) {
  try {
    await requireUser(["SUPER_ADMIN"]);
    const resource = new URL(request.url).pathname.split("/").pop();
    if (resource === "overview") return Response.json(await platformOverview());
    if (resource === "companies") return Response.json(await listCompanies());
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireUser(["SUPER_ADMIN"]);
    const body = await request.json();
    return Response.json(await createCompany(body));
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireUser(["SUPER_ADMIN"]);
    const body = await request.json();
    if (!body.id) return Response.json({ error: "Company id is required" }, { status: 400 });
    return Response.json(await updateCompany(body.id, body));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireUser(["SUPER_ADMIN"]);
    const body = await request.json();
    return Response.json(await removeCompanies(body.ids || []));
  } catch (error) {
    return handleError(error);
  }
}
