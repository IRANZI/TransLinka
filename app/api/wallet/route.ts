import { NextRequest } from "next/server";
import { publicUser, requireUser } from "@/backend/lib/auth";
import { handleError } from "@/backend/lib/http";
import { prisma } from "@/backend/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(["TRAVELER", "COMPANY_ADMIN", "SUPER_ADMIN"]);
    const body = await request.json();
    const amount = Math.floor(Number(body.amount));
    if (!amount || amount <= 0) {
      return Response.json({ error: "Enter a valid amount" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { walletBalance: { increment: amount } },
    });

    return Response.json({
      walletBalance: updated.walletBalance,
      user: publicUser(updated),
    });
  } catch (error) {
    return handleError(error);
  }
}
