"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneVerificationModal from "@/components/PhoneVerificationModal";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // ✅ Client-side validation
  const validate = () => {
    if (!form.name.trim()) return toast.error("Please enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return toast.error("Please enter a valid email.");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters.");
    if (!form.phone.trim()) return toast.error("Phone number is required.");
    if (!form.address.trim()) return toast.error("Address is required.");
    return true;
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!phoneVerified) {
      toast("Please verify your phone number before continuing.", {
        icon: "📱",
      });
      setOtpOpen(true);
      return;
    }

    try {
      setSubmitting(true);
      const loadingToast = toast.loading("Creating your account...");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      // 🟡 If user already exists
      if (res.status === 409) {
        toast.error("This account already exists. Please log in instead.");
        router.push("/auth/login");
        return;
      }

      if (!res.ok) throw new Error(data.error || "Signup failed.");

      // ✅ Success
      toast.success("Account created successfully! Please log in.");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A0D0D] via-[#5C1A1A] to-[#8B2F2F] text-white overflow-hidden">
      {/* ✨ Floating lights background */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD97A] opacity-30 blur-md"
          style={{
            width: Math.random() * 10 + 6,
            height: Math.random() * 10 + 6,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ y: [0, -25, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ repeat: Infinity, duration: Math.random() * 6 + 4 }}
        />
      ))}

      {/* 🧾 Signup card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 bg-[#4B1E00]/50 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-[0_0_30px_rgba(255,217,122,0.2)] border border-[#FFD97A]/40 w-[92%] max-w-xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src="/images/logo.jpg"
            alt="Jinsharnam Media"
            width={64}
            height={64}
            className="rounded-full border border-[#FFD97A]/40 shadow-md"
          />
        </div>

        <h1 className="font-serif text-3xl text-[#FFD97A] text-center">
          Create Account
        </h1>
        <p className="text-center text-[#FFF8E7]/80 mb-6">
          Verify your phone to secure your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />

          {/* Phone & Verify */}
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone Number (+91...)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="flex-1 p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
            />
            <button
              type="button"
              onClick={() => setOtpOpen(true)}
              className={`px-4 rounded-lg font-semibold transition ${
                phoneVerified
                  ? "bg-emerald-600 text-white"
                  : "bg-[#FFD97A] text-[#4B1E00] hover:bg-[#FFE28A]"
              }`}
            >
              {phoneVerified ? "Verified" : "Verify"}
            </button>
          </div>

          {/* Address */}
          <textarea
            placeholder="Full Address (House No, City, State, Pincode)"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60 min-h-24"
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: phoneVerified ? 1.03 : 1 }}
            whileTap={{ scale: phoneVerified ? 0.97 : 1 }}
            type="submit"
            disabled={submitting || !phoneVerified}
            className="w-full py-3 bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <p className="mt-5 text-[#FFF8E7]/80 text-sm text-center">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#FFD97A] hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </motion.div>

      <AnimatePresence>
        {otpOpen && (
          <PhoneVerificationModal
            phone={form.phone}
            onClose={() => setOtpOpen(false)}
            onVerified={() => {
              setPhoneVerified(true);
              toast.success("Phone verified successfully!");
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
