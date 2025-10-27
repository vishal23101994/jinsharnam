import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * ✅ Send OTP using Fast2SMS
 * - Works for new or existing users
 * - Creates a temporary user if not found
 * - Saves OTP & expiry in DB
 */
export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    }

    // Ensure +91 format
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // 🧩 Upsert user: create if not exists
    const user = await prisma.user.upsert({
      where: { phone: formattedPhone },
      update: {
        otp,
        otpExpiresAt: expiresAt,
        updatedAt: new Date(),
      },
      create: {
        name: "User", // temporary placeholder (user can update later)
        email: `temp_${Date.now()}@jinsharnam.com`,
        password: "TEMP_PASSWORD",
        phone: formattedPhone,
        phoneVerified: false,
        otp,
        otpExpiresAt: expiresAt,
        role: "USER",
      },
    });

    console.log(`📱 OTP for ${formattedPhone}: ${otp}`);

    // ✅ Send via Fast2SMS API
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.FAST2SMS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "v3",
        sender_id: "TXTIND",
        message: `Your Jinsharnam verification code is ${otp}. It expires in 5 minutes.`,
        language: "english",
        flash: 0,
        numbers: formattedPhone.replace("+91", ""),
      }),
    });

    const data = await response.json();

    if (data.return === true) {
      console.log(`✅ OTP sent successfully to ${formattedPhone}`);
      return NextResponse.json({ success: true, message: "OTP sent successfully" });
    } else {
      console.error("❌ Fast2SMS API error:", data);
      return NextResponse.json({ error: "Failed to send OTP", details: data }, { status: 500 });
    }
  } catch (error: any) {
    console.error("❌ OTP Send Error:", error);
    return NextResponse.json({ error: "Failed to send OTP", details: error.message }, { status: 500 });
  }
}
