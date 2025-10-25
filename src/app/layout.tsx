import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import { Poppins, Playfair_Display } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import NewsTicker from "@/components/NewsTicker"; // 👈 Added ticker import

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata = {
  title: "Jinsharnam Media - A Jain Spiritual Platform",
  description: "Spreading the message of peace, truth, and compassion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-spiritual-light text-spiritual-dark`}>
        {/* ✅ Wrap app inside Providers (for NextAuth + global context) */}
        <Providers>
          {/* 🌼 Navbar */}
          <Navbar />

          {/* 📰 Sliding News Line Below Navbar */}
          <NewsTicker />

          {/* 📖 Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* 🌻 Footer */}
          <Footer />
        </Providers>

        {/* 🌟 Floating Back-to-Top Button */}
        <BackToTop />
      </body>
    </html>
  );
}
