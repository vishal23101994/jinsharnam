"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingParticles from "@/components/FloatingParticles";

// 🎥 YouTube video type
type Video = { id: string; title: string };

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/youtube/latest")
      .then((r) => r.json())
      .then((data) => setVideos(data.videos))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <YouTubeSection videos={videos} />
    </>
  );
}

/* --------------------------------------------------
 🪷 HERO SECTION
-------------------------------------------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-br from-[#4B1E00] via-[#B97A2B] to-[#FAE3A3] text-white">
      {/* ✨ Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4B1E00]/70 via-transparent to-[#FFD97A]/10" />

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD97A] opacity-30 blur-md"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 6 + 5,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 items-center max-w-7xl mx-auto px-6 gap-12">
        <div className="relative flex justify-center items-center">
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="w-[580px] h-[580px] opacity-50 text-[#FFD97A]"
            >
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 200 + 160 * Math.cos(angle);
                const y = 200 + 160 * Math.sin(angle);
                return (
                  <motion.text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="40"
                    fill="currentColor"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      delay: i * 0.5,
                    }}
                  >
                    卐
                  </motion.text>
                );
              })}
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative rounded-full border-[10px] border-[#FFD97A] p-2 shadow-[0_0_50px_rgba(255,217,122,0.6)] bg-gradient-to-br from-[#FFF8E7] via-[#FFE28A]/40 to-[#FFD97A]/10"
          >
            <Image
              src="/images/b1.jpeg"
              alt="Acharya Pulak Sagar Ji"
              width={360}
              height={360}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </div>

        <div className="text-center md:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-6xl text-[#FFF8E7]"
          >
            Acharya Shri Pulak Sagar Ji
          </motion.h1>
          <p className="text-lg md:text-xl text-[#FFF8E7]/90 max-w-lg">
            A revered Jain monk and spiritual teacher, guiding souls towards{" "}
            <span className="text-[#FFD97A] font-semibold">Ahimsa</span>,{" "}
            <span className="text-[#FFD97A] font-semibold">Satya</span>, and{" "}
            <span className="text-[#FFD97A] font-semibold">Aparigraha</span>.
          </p>
          <Link
            href="/pulak-sagar"
            className="inline-block rounded-full bg-[#FFD97A] text-[#4B1E00] px-8 py-3 font-semibold hover:bg-[#FFE28A] transition-all duration-300 shadow-md"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
 🌿 MESSAGE SECTION
-------------------------------------------------- */
function AboutSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#FAE3A3]/40 via-[#FFF8E7] to-[#FAE3A3]/20 text-center px-6 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD97A] opacity-30 blur-md"
          style={{
            width: Math.random() * 6 + 4,
            height: Math.random() * 6 + 4,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 5 + 4,
            delay: i * 0.2,
          }}
        />
      ))}

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative font-serif text-4xl md:text-4xl text-[#4B1E00] mb-14 italic"
      >
        A Message from Pulak Sagar Ji
      </motion.h2>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(185,122,43,0.5)] border-[6px] border-[#FFD97A] bg-gradient-to-br from-[#FFF8E7]/70 to-[#FFD97A]/30 p-2">
            <Image
              src="/images/b2.jpg"
              alt="A Message from Pulak Sagar Ji"
              width={500}
              height={500}
              className="rounded-2xl object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-gradient-to-br from-[#FFF8E7]/80 to-[#FAE3A3]/40 rounded-3xl border-[4px] border-[#FFD97A] shadow-[0_0_50px_rgba(255,217,122,0.4)] p-10 text-left"
        >
          <p className="text-[#4B1E00] text-md md:text-xl leading-relaxed italic">
            “In this age of distractions and desires, peace is not found outside
            but within. Let your thoughts be pure, your speech truthful, and
            your actions compassionate — for these are the pillars of a
            spiritual life.”
          </p>
          <p className="text-[#B97A2B] font-semibold mt-6 text-right text-lg italic">
            – Acharya Shri Pulak Sagar Ji
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
 📸 GALLERY SECTION — CLEAN VERSION (no overlay text)
-------------------------------------------------- */
function GallerySection() {
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FAE3A3]/20 to-[#FFF8E7] text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-[#4B1E00] mb-12">
        Moments of Divinity
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-2xl overflow-hidden border-4 border-[#FFD97A]/60 shadow-[0_0_40px_rgba(255,217,122,0.3)] hover:shadow-[0_0_60px_rgba(255,217,122,0.5)] cursor-pointer transition-shadow duration-500"
          >
            <div className="relative w-full h-72">
              <Image
                src={src}
                alt={`Divine moment ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



/* --------------------------------------------------
 🎥 YOUTUBE SECTION
-------------------------------------------------- */
function YouTubeSection({ videos }: { videos: Video[] }) {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FFF8E7] to-[#FAE3A3]/40">
      <h2 className="font-serif text-3xl text-center text-[#4B1E00] mb-8">
        Latest Videos from Jinsharnam Media
      </h2>

      {videos.length === 0 ? (
        <p className="text-center text-[#5A4A3B]">Loading latest videos...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
          {videos.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              <iframe
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allowFullScreen
              ></iframe>
              <p className="p-4 text-center text-[#4B1E00] font-medium">
                {v.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
