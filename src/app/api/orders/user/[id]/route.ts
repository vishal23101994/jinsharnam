import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/orders/user/[id]
 * Returns all orders for the given user (must be logged in or admin)
 */
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    // ✅ Verify session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = Number(session.user.id);
    const requestedUserId = Number(id);

    // 🛑 Prevent users from accessing other users' orders unless admin
    const isAdmin = (session.user as any).role === "ADMIN";
    if (currentUserId !== requestedUserId && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Fetch orders
    const orders = await prisma.order.findMany({
      where: { userId: requestedUserId },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                priceCents: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 🧩 Always return an array for frontend consistency
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
