import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Utility to require authentication
async function requireSession() {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null } as const;
}

// ✅ GET: Fetch all orders (admin sees all, user sees own)
export async function GET() {
  const { session, error } = await requireSession();
  if (error) return error;

  const isAdmin = (session.user as any).role === "ADMIN";

  const orders = await prisma.order.findMany({
    where: isAdmin ? undefined : { userId: Number(session.user.id) },
    include: {
      user: isAdmin
        ? { select: { id: true, name: true, email: true } }
        : false,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// ✅ POST: Create a new order
export async function POST(req: Request) {
  const { session, error } = await requireSession();
  if (error) return error;

  const body = await req.json();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  type NormalizedItem = { productId: string; qty: number; priceCents: number };

  const normalized: NormalizedItem[] = items.map((i: any) => ({
    productId: i.productId ?? i.id,
    qty: Number(i.qty ?? 1),
    priceCents: Number(i.priceCents),
  }));

  const productIds = normalized.map((n: NormalizedItem) => n.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));
  const verified = normalized.map((n) => {
    const p = productMap.get(n.productId);
    if (!p) throw new Error("Invalid product in cart");
    return {
      productId: n.productId,
      qty: Math.max(1, n.qty),
      priceCents: p.priceCents,
    };
  });

  const totalCents = verified.reduce(
    (sum, i) => sum + i.priceCents * i.qty,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: Number(session.user.id),
      totalCents,
      status: "PENDING",
      items: { create: verified },
    },
    include: { items: { include: { product: true } } },
  });

  return NextResponse.json(order, { status: 201 });
}
