import { NextRequest } from "next/server";
import { publicUser, requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { prisma } from "@/backend/lib/prisma";

export async function GET() {
  try {
    const user = await requireUser();
    return Response.json({ user });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: body.firstName ? String(body.firstName).trim() : undefined,
        lastName: body.lastName ? String(body.lastName).trim() : undefined,
        phone: body.phone ? String(body.phone).trim() : undefined,
      },
    });
    return Response.json({ user: publicUser(updated) });
  } catch (error) {
    return handleError(error);
  }
}
