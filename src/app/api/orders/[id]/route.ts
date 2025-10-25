import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = (await getServerSession(authOptions)) as any;

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isAdmin = (session.user as any).role === "ADMIN";
  if (!isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const allowed = new Set([
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]);
  const status = String(body.status || "");
  if (!allowed.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: status as any },
    });


    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }
}
