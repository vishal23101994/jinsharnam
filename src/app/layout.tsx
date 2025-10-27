import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import { Poppins, Playfair_Display } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import NewsTicker from "@/components/NewsTicker";
import { Toaster } from "react-hot-toast";

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
        <Providers>
          {/* 🌼 Navbar */}
          <Navbar />

          {/* 📰 Sliding News Line Below Navbar */}
          <NewsTicker />

          {/* 🌟 Global Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#4B1E00",
                color: "#FFD97A",
                border: "1px solid #FFD97A",
                fontFamily: "Playfair Display, serif",
                fontSize: "0.95rem",
                padding: "10px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#FFD97A",
                  secondary: "#4B1E00",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ff6b6b",
                  secondary: "#4B1E00",
                },
              },
            }}
          />

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
