'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Radio,
  Megaphone,
  Camera,
  Globe2,
  Users,
  FileText,
  Tv,
  Network,
  Sparkles,
  Target,
} from 'lucide-react';

export default function AboutPage() {
  const services = [
    {
      icon: <Radio className="w-10 h-10 text-[#C45A00]" />,
      title: 'Religious Live Broadcasting',
      desc: 'Streaming of Jain Saints’ spiritual programs and discourses live on social media platforms using cutting-edge technology.',
    },
    {
      icon: <Megaphone className="w-10 h-10 text-[#C45A00]" />,
      title: 'Advertising & Brand Promotion',
      desc: 'Comprehensive marketing campaigns through digital, print, and outdoor media — helping your brand reach millions effectively.',
    },
    {
      icon: <Camera className="w-10 h-10 text-[#C45A00]" />,
      title: 'Event & Media Production',
      desc: 'Professional management of events, exhibitions, roadshows, and festivals with high-quality filming and digital content creation.',
    },
    {
      icon: <Globe2 className="w-10 h-10 text-[#C45A00]" />,
      title: 'Digital & Social Media Marketing',
      desc: 'Managing and growing your brand’s presence across YouTube, Facebook, Instagram, and other major platforms.',
    },
    {
      icon: <Users className="w-10 h-10 text-[#C45A00]" />,
      title: 'Public Relations & Corporate Launches',
      desc: 'Building connections through corporate events, launches, and PR activities designed for maximum engagement.',
    },
    {
      icon: <FileText className="w-10 h-10 text-[#C45A00]" />,
      title: 'Print & Publication Services',
      desc: 'Publishing newspapers, magazines, and newsletters in multiple languages to deliver stories that inspire and inform.',
    },
    {
      icon: <Tv className="w-10 h-10 text-[#C45A00]" />,
      title: 'Media Communication & Broadcasting',
      desc: 'Advertising through TV, radio, cable, cinema, and digital displays with innovative messaging and design.',
    },
    {
      icon: <Network className="w-10 h-10 text-[#C45A00]" />,
      title: 'IT & Online Support Solutions',
      desc: 'Providing advanced digital, online, and technological support for marketing and media operations in India and abroad.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF4E0] via-[#FFE0A8] to-[#FFD580] text-[#3A0A00] py-20">
      <div className="absolute inset-0 bg-[url('/swastik-pattern.png')] opacity-10 bg-cover bg-center"></div>

      {/* Header */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-serif text-[#8B0000] mb-6 drop-shadow-lg">
          About <span className="text-[#C45A00]">Jinsharnam Media</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-[#4B2200]">
          Spreading the timeless wisdom of Jain philosophy through compassion,
          peace, and technology.
        </p>
      </motion.div>

      {/* About Company Section (Hero Style) */}
      <motion.div
        className="relative max-w-6xl mx-auto mt-20 px-6 py-12 bg-gradient-to-r from-[#FDE68A]/90 to-[#FBBF24]/80 rounded-3xl shadow-2xl border border-[#C45A00]/30 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)]"></div>

        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#8B0000]">
            About the Company
          </h2>
          <p className="max-w-5xl mx-auto text-lg leading-relaxed text-[#3A0A00]">
            <strong>Jinsharnam Media Pvt Ltd</strong> is a leading media and marketing company with
            unparalleled local-to-national reach. We connect consumers, communities, and
            businesses through powerful storytelling and a dynamic blend of digital, print,
            and social media platforms.
          </p>
          <p className="max-w-5xl mx-auto text-lg leading-relaxed text-[#3A0A00]">
            Harnessing modern innovations, we provide 360° solutions — from religious live
            broadcasts of Jain Saints to digital campaigns, brand management, event
            organization, and IT-enabled media services that inspire and connect audiences
            worldwide.
          </p>
          <p className="max-w-5xl mx-auto text-lg leading-relaxed text-[#3A0A00]">
            Our mission is to empower spiritual, social, and corporate voices through
            technology-driven storytelling and unmatched creativity.
          </p>
        </div>
      </motion.div>

      {/* Who We Are & Vision Section in Cards */}
      <div className="max-w-7xl mx-auto mt-24 grid md:grid-cols-2 gap-10 px-6 relative z-10">
        {/* Who We Are Card */}
        <motion.div
          className="p-8 bg-white/80 rounded-3xl border border-[#ECA400]/40 shadow-xl hover:shadow-2xl backdrop-blur-sm transition-transform hover:scale-105"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-[#C45A00]" />
          </div>
          <h2 className="text-3xl text-[#A43B00] font-serif font-bold text-center mb-4">
            Who We Are
          </h2>
          <p className="text-[#3A0A00] leading-relaxed text-center">
            <strong>Jinsharnam Media</strong> is a digital spiritual platform inspired by Jain
            philosophy, blending faith and technology. We share teachings of
            <em> Ahimsa (non-violence)</em>, truth, and compassion through digital media —
            reaching hearts across the world.
          </p>
        </motion.div>

        {/* Our Vision Card */}
        <motion.div
          className="p-8 bg-white/80 rounded-3xl border border-[#ECA400]/40 shadow-xl hover:shadow-2xl backdrop-blur-sm transition-transform hover:scale-105"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-[#C45A00]" />
          </div>
          <h2 className="text-3xl text-[#A43B00] font-serif font-bold text-center mb-4">
            Our Vision
          </h2>
          <p className="text-[#3A0A00] leading-relaxed text-center">
            To build a global community guided by Jain values — encouraging a life of purity,
            mindfulness, and peace through spiritual programs, lectures, and literature that
            uplift humanity and spread compassion worldwide.
          </p>
        </motion.div>
      </div>

      {/* Call to Action under Cards */}
      <div className="text-center mt-12">
        <Link
          href="/videos"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#3A0A00] font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Watch Our Videos →
        </Link>
      </div>

      {/* Services Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-24 px-6 relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl text-[#A43B00] font-serif font-bold mb-12">
          Our Services
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/70 rounded-3xl shadow-lg hover:shadow-2xl border border-[#ECA400]/30 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#8B0000] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[#3A0A00] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Acharya Section with Centered Aura and Layout Fix */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center mt-24 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Glowing Aura Background */}
        <div className="absolute inset-0 -z-10 flex justify-center items-center">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#FFD580]/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-[#FBBF24]/20 blur-2xl"
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Centered Acharya Image */}
        <div className="relative inline-block mb-6">
          <Image
            src="/images/7.jpg"
            alt="Acharya Pulak Sagar Ji"
            width={220}
            height={220}
            className="rounded-full border-4 border-[#C45A00] shadow-2xl object-cover"
          />
          <div className="absolute inset-0 rounded-full border-2 border-[#FBBF24]/50 animate-pulse"></div>
        </div>

        {/* Text Content */}
        <h3 className="text-2xl md:text-3xl text-[#8B0000] font-serif font-semibold">
          Acharya Pulak Sagar Ji Maharaj
        </h3>
        <p className="max-w-2xl mx-auto mt-3 text-[#4B2200] text-base leading-relaxed">
          Our inspiration and guiding light — Acharya Pulak Sagar Ji teaches us to live with
          mindfulness, purity, and compassion in every action.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <h2 className="text-3xl text-[#A43B00] mb-3 font-serif font-bold">
          Join Our Journey
        </h2>
        <p className="max-w-3xl mx-auto text-[#3A0A00] mb-6">
          Be part of a global community walking the path of truth and peace.
          Support our mission to spread spiritual knowledge through Jinsharnam Media.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#3A0A00] font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Connect With Us
        </Link>
      </motion.div>
    </section>
  );
}
