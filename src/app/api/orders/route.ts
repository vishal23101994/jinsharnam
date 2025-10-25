import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"; // ensure this exists
import { authOptions } from "@/lib/auth"; // ensure this exports your NextAuth config


// Utility to require auth
async function requireSession() {
	const session = await getServerSession(authOptions as any);
	if (!session?.user?.id) {
		return { session: null as any, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
	}
	return { session, error: null } as const;
}


export async function GET() {
	const { session, error } = await requireSession();
	if (error) return error;


	const isAdmin = (session.user as any).role === "ADMIN";


	const orders = await prisma.order.findMany({
		where: isAdmin ? undefined : { userId: session.user.id as string },
		include: {
			user: isAdmin ? { select: { id: true, name: true, email: true } } : false,
			items: { include: { product: true } },
		},
		orderBy: { createdAt: "desc" },
	});


	return NextResponse.json(orders);
}


export async function POST(req: Request) {
	const { session, error } = await requireSession();
	if (error) return error;


	const body = await req.json();
	const items = Array.isArray(body.items) ? body.items : [];


	if (!items.length) {
		return NextResponse.json({ error: "No items provided" }, { status: 400 });
	}


	// Normalize items: allow either {productId, qty, priceCents} or {id, qty, priceCents}
	const normalized = items.map((i: any) => ({
		productId: i.productId ?? i.id,
		qty: Number(i.qty ?? 1),
		priceCents: Number(i.priceCents),
	}));


	// Optional: verify products and prices from DB to avoid tampering
	const productIds = normalized.map((n) => n.productId);
	const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
	const productMap = new Map(products.map((p) => [p.id, p]));


	const verified = normalized.map((n) => {
		const p = productMap.get(n.productId);
		if (!p) throw new Error("Invalid product in cart");
		return {
			productId: n.productId,
			qty: Math.max(1, n.qty),
			priceCents: p.priceCents, // trust server price
		};
	});

	const totalCents = verified.reduce((sum, i) => sum + i.priceCents * i.qty, 0);


	const order = await prisma.order.create({
		data: {
			userId: session.user.id as string,
			totalCents,
			status: "PENDING",
			items: { create: verified },
		},
		include: { items: { include: { product: true } } },
	});


	return NextResponse.json(order, { status: 201 });
}