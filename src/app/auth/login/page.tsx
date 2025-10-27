"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role === "admin") {
      toast.success("Welcome back, Admin!");
      router.replace("/admin/dashboard");
    } else if (session?.user) {
      toast.success(`Welcome back, ${session.user.name || "User"}!`);
      router.replace("/");
    }
  }, [session, status, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    const loadingToast = toast.loading("Checking credentials...");

    try {
      const result = await signIn("credentials", { redirect: false, email, password });

      toast.dismiss(loadingToast);

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful!");
        setTimeout(() => {
          if (session?.user?.role === "admin") router.replace("/admin/dashboard");
          else router.replace("/");
        }, 1000);
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-[#4b0000] to-[#220000] overflow-hidden">
      {/* ✨ Animated background particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD97A] opacity-30 blur-md"
          style={{
            width: Math.random() * 10 + 4,
            height: Math.random() * 10 + 4,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: Math.random() * 6 + 4 }}
        />
      ))}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[90%] max-w-md bg-[#3a0000]/60 backdrop-blur-md border border-[#FFD97A]/40 rounded-2xl p-10 shadow-[0_0_30px_rgba(255,217,122,0.2)] text-center"
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

        <h1 className="text-3xl font-serif text-[#FFD97A] mb-2">Jinsharnam Media</h1>
        <p className="text-[#FFF8E7]/80 mb-8">Login to Continue</p>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7] focus:outline-none focus:border-[#FFD97A] placeholder-[#FFF8E7]/60 mb-4"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7] focus:outline-none focus:border-[#FFD97A] placeholder-[#FFF8E7]/60 mb-4"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          Login
        </motion.button>

        <p className="text-[#FFF8E7]/80 mt-5 text-sm">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-[#FFD97A] hover:underline font-medium">
            Sign up here
          </a>
        </p>
      </motion.form>
    </section>
  );
}
