import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * ✅ Verifies OTP sent to user's phone
 * - Checks for validity & expiry
 * - Marks phone as verified on success
 * - Clears OTP after verification
 */
export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required." }, { status: 400 });
    }

    // Ensure +91 format consistency
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found for this phone number." }, { status: 404 });
    }

    // Check OTP
    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
    }

    // Check expiration
    if (!user.otpExpiresAt || new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    // ✅ Mark phone as verified and clear OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneVerified: true,
        otp: null,
        otpExpiresAt: null,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Phone verified for ${formattedPhone}`);

    return NextResponse.json({ success: true, message: "Phone verified successfully!" });
  } catch (error: any) {
    console.error("❌ OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
