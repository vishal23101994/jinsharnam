"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#4b0000] via-[#5c1a00] to-[#1a0000] text-white px-6 py-16">
      {/* Floating gold particles for ambiance */}
      <FloatingParticles count={25} />

      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mb-10"
      >
        <h1 className="font-serif text-5xl text-[#FFD97A] mb-4 drop-shadow-md">
          Contact Us
        </h1>
        <p className="text-[#FFF8E7]/80 max-w-2xl mx-auto">
          Have any questions, suggestions, or wish to connect? We’d love to hear
          from you.
        </p>
      </motion.div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-[#3a0000]/70 backdrop-blur-md border border-[#FFD97A]/40 rounded-3xl shadow-[0_0_30px_rgba(255,217,122,0.2)] p-8 md:p-12 w-full max-w-3xl"
      >
        <form className="grid gap-5 text-left">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7] placeholder-[#FFF8E7]/60 focus:outline-none focus:border-[#FFD97A]"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7] placeholder-[#FFF8E7]/60 focus:outline-none focus:border-[#FFD97A]"
            />
          </div>

          <textarea
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7] placeholder-[#FFF8E7]/60 focus:outline-none focus:border-[#FFD97A] h-32"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold shadow-md hover:shadow-lg transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative z-10 mt-12 text-center space-y-3 text-[#FFF8E7]/80"
      >
        <div className="flex justify-center items-center gap-3">
          <MapPin className="text-[#FFD97A]" size={20} />
          <span>P-75, Gali No. 5, Bihari Colony, Shahdara, Delhi, 110032</span>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Phone className="text-[#FFD97A]" size={20} />
          <span>+91 98765 43210</span>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Mail className="text-[#FFD97A]" size={20} />
          <span>info@jinsharnammedia.com</span>
        </div>
      </motion.div>

      {/* Embedded Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 mt-12 w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,217,122,0.2)] border border-[#FFD97A]/30"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6161988496186!2d77.2825304!3d28.6687881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd6a53b21e8b%3A0xc9c8d1cd61d3854b!2sJinsharnam%20Media!5e0!3m2!1sen!2sin!4v1730663000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-3xl"
        ></iframe>
      </motion.div>
    </section>
  );
}
