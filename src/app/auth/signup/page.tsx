"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FloatingParticles from "@/components/FloatingParticles";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }
    localStorage.setItem("user_role", "user");
    router.push("/");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A0D0D] via-[#5C1A1A] to-[#8B2F2F] text-white overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD97A] opacity-30 blur-md"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: Math.random() * 6 + 4 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-[#4B1E00]/50 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_30px_rgba(255,217,122,0.2)] border border-[#FFD97A]/40 w-[90%] max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo.jpg"
            alt="Jinsharnam Media Logo"
            width={60}
            height={60}
            className="rounded-full border border-[#FFD97A]/40 shadow-md"
          />
        </div>
        <h1 className="font-serif text-3xl text-[#FFD97A] mb-3">Jinsharnam Media</h1>
        <h2 className="text-lg text-[#FFF8E7]/90 mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 focus:outline-none focus:border-[#FFD97A] text-[#FFF8E7] placeholder-[#FFF8E7]/60"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-5 text-[#FFF8E7]/80 text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#FFD97A] hover:underline font-medium">
            Login here
          </a>
        </p>
      </motion.div>
    </section>
  );
}