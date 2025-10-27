import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/orders/create
 * Creates a new order for the logged-in user after payment success
 */
export async function POST(req: NextRequest) {
  try {
    // ✅ Verify user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalCents, paymentId } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // ✅ Create order
    const order = await prisma.order.create({
      data: {
        userId: Number(session.user.id),
        totalCents,
        status: "processing",
        paymentId: paymentId || null,
        orderItems: {
          create: items.map((item: any) => ({
            productId: Number(item.id),
            quantity: item.qty,
            priceCents: item.priceCents,
          })),
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
