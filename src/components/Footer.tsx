import Link from "next/link";
import {
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pulak Sagar", path: "/pulak-sagar" },
    { name: "Jinsharnam Tirth", path: "/jinsharnam-tirth" },
    { name: "About", path: "/about" },
    { name: "Videos", path: "/videos" },
    { name: "Store", path: "/store" },
    { name: "Directory", path: "/directory" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#3a0000] via-[#600000] to-[#1a0000] border-t border-yellow-700/40 text-yellow-200 pt-12 pb-6">
      {/* === TOP SECTION === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-16 text-center md:text-left">
        {/* === LOGO + QUOTE === */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/images/logo.jpg"
            alt="Jinsharnam Media Logo"
            className="w-16 h-14 rounded-full shadow-lg mb-3"
          />
          <h2 className="font-serif text-2xl font-bold text-yellow-300 mb-2">
            Jinsharnam <span className="text-yellow-400">Media</span>
          </h2>
          <p className="text-sm text-yellow-100/90 leading-relaxed max-w-xs">
            Connecting hearts through truth, devotion, and technology.
            <br />
            <span className="italic text-yellow-400">
              “Peace · Faith · Knowledge”
            </span>
          </p>
        </div>

        {/* === QUICK LINKS === */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium">
            {navLinks.map((link, index) => (
              <div key={link.path} className="flex items-center">
                <Link
                  href={link.path}
                  className="hover:text-yellow-400 transition duration-300"
                >
                  {link.name}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="mx-2 text-yellow-500">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* === CONTACT === */}
        <div className="flex flex-col items-center md:items-end text-sm space-y-2 md:text-right">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">Contact</h3>
          <div className="flex items-center gap-2 md:justify-end md:self-end">
            <MapPin size={16} />
            <span className="max-w-xs">
              P-75, Gali Number 5, Bihari Colony, Shahdara, Delhi, 110032
            </span>
          </div>
          <div className="flex items-center gap-2 md:justify-end md:self-end">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 md:justify-end md:self-end">
            <Mail size={16} />
            <span>info@jinsharnammedia.com</span>
          </div>
        </div>
      </div>

      {/* === DIVIDER === */}
      <div className="w-11/12 md:w-2/3 mx-auto border-t border-yellow-700/40 my-6"></div>

      {/* === SOCIAL ICONS === */}
      <div className="flex justify-center gap-6 mb-6">
        <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
          <Youtube className="w-6 h-6 hover:text-red-400 transition duration-300" />
        </Link>
        <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
          <Facebook className="w-6 h-6 hover:text-blue-400 transition duration-300" />
        </Link>
        <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
          <Instagram className="w-6 h-6 hover:text-pink-400 transition duration-300" />
        </Link>
        <Link href="https://x.com" target="_blank" aria-label="X">
          <Twitter className="w-6 h-6 hover:text-sky-400 transition duration-300" />
        </Link>
        <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <Linkedin className="w-6 h-6 hover:text-blue-500 transition duration-300" />
        </Link>
      </div>

      {/* === COPYRIGHT === */}
      <div className="text-xs text-yellow-300/80 font-light text-center">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-400">
          Jinsharnam Media
        </span>{" "}
        · Spreading Peace · Truth · Compassion 🌼
      </div>
    </footer>
  );
}
