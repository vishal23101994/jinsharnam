import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const product = items[0];

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: product.priceCents,
      currency: "INR",
      receipt: `receipt_${product.id}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
