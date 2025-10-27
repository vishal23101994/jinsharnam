import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { OrderStatus } from "@prisma/client";

/**
 * PATCH /api/orders/[id]
 * Updates order status — accessible to ADMIN only
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // 🧭 Authenticate session
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🛑 Verify admin privilege
  if ((session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  // 🧾 Parse request body
  const body = await request.json();
  const statusInput = String(body.status || "").trim().toUpperCase();

  // ✅ Validate against actual Prisma enum values
  const allowedStatuses = Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>;
  if (!allowedStatuses.includes(statusInput as keyof typeof OrderStatus)) {
    return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
  }

  try {
    // 🔍 Validate order existence
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 🔄 Update order status using enum type
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus[statusInput as keyof typeof OrderStatus] }, // ✅ Correct cast
      include: {
        user: { select: { id: true, name: true, email: true } },
        orderItems: {
          include: {
            product: { select: { title: true, priceCents: true } },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
