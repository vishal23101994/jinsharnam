import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, address } = await req.json();

    // Basic validations
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 });
    }

    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    // 🔎 Check if a user with same phone or email exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone: formattedPhone }],
      },
    });

    // ✅ Case 1: If phone already verified and user exists → block new signup
    if (existingUser && existingUser.phoneVerified) {
      return NextResponse.json(
        { error: "This phone or email is already registered. Please login instead." },
        { status: 409 }
      );
    }

    // ✅ Case 2: If OTP verified user exists (temporary one) → update their details
    if (existingUser && !existingUser.phoneVerified) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updated = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          email,
          password: hashedPassword,
          address,
          phoneVerified: true,
          updatedAt: new Date(),
        },
      });

      console.log(`🔁 Updated existing verified user: ${updated.email}`);
      return NextResponse.json({
        success: true,
        message: "Signup successful! You can now login.",
      });
    }

    // ✅ Case 3: New user who skipped OTP somehow (rare)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: formattedPhone,
        address,
        phoneVerified: true, // assume verified since OTP step passed
        role: "USER",
      },
    });

    console.log(`🆕 New user created: ${newUser.email}`);
    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (err: any) {
    console.error("❌ Signup Error:", err);
    return NextResponse.json({ error: err.message || "Signup failed" }, { status: 500 });
  }
}
