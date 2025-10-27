"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Search, LogIn, UserPlus, User, Menu, X } from "lucide-react";
import Fuse from "fuse.js";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [fuse, setFuse] = useState<Fuse<any> | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/search");
      const data = await res.json();
      setAllData(data);
      const fuseInstance = new Fuse(data, {
        keys: ["title", "description", "type"],
        threshold: 0.3,
      });
      setFuse(fuseInstance);
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!fuse || value.trim() === "") {
      setResults([]);
      return;
    }
    const output = fuse.search(value);
    setResults(output.map((r) => r.item));
  };

  const handleSelect = (path: string) => {
    setSearchValue("");
    setResults([]);
    router.push(path);
  };

  const isAdmin =
    (session?.user as any)?.role === "ADMIN" ||
    (session?.user as any)?.role === "admin";

  const links = [
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#2d0000]/95 via-[#500000]/95 to-[#1a0000]/95 border-b border-yellow-700/40 shadow-lg">
      {/* === TOP SECTION === */}
      <div className="flex justify-between items-center px-6 md:px-12 py-2 border-b border-yellow-700/40 text-sm relative">
        {/* SEARCH BOX */}
        <div className="relative flex items-center gap-2 bg-[#400101]/70 border border-yellow-700/50 rounded-md px-2 py-[3px] w-36 md:w-64">
          <Search size={16} className="text-yellow-400" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchValue}
            onChange={handleSearch}
            className="bg-transparent outline-none text-yellow-100 placeholder-yellow-300/70 text-sm flex-1"
          />
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#2d0000]/95 border border-yellow-700/40 rounded-md shadow-lg text-yellow-100 text-sm max-h-56 overflow-y-auto z-50">
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(r.path)}
                  className="px-3 py-2 hover:bg-yellow-900/30 cursor-pointer"
                >
                  <p className="font-semibold text-yellow-300 flex justify-between">
                    {r.title}
                    <span className="text-xs text-yellow-400/70 uppercase">
                      {r.type}
                    </span>
                  </p>
                  <p className="text-yellow-100/80 text-xs">{r.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PROFILE / AUTH SECTION */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          {status === "loading" ? (
            <span className="text-yellow-200 text-sm">Loading...</span>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-700/50 bg-[#4B1E00]/40 text-yellow-300 hover:bg-[#FFD97A]/10"
              >
                <User size={16} />
                <span>{session.user?.name}</span>
                <span className="text-yellow-400/70">▼</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-[#4B1E00]/95 backdrop-blur-md border border-[#FFD97A]/30 rounded-xl shadow-xl p-4 text-sm z-50"
                  >
                    <p className="text-[#FFD97A] font-semibold mb-2">
                      {isAdmin ? "Admin Panel" : "User Profile"}
                    </p>

                    {isAdmin ? (
                      <Link
                        href="/admin/dashboard"
                        className="block py-1 text-[#FFF8E7]/80 hover:text-[#FFD97A] transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        🧭 Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/user/orders"
                        className="block py-1 text-[#FFF8E7]/80 hover:text-[#FFD97A] transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        📦 My Orders
                      </Link>
                    )}

                    <Link
                      href="/user/profile/edit"
                      onClick={() => setProfileOpen(false)}
                      className="block py-1 text-[#FFF8E7]/80 hover:text-[#FFD97A] transition"
                    >
                      🧍 Edit Profile
                    </Link>


                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left mt-3 text-[#FFF8E7]/80 hover:text-[#FFD97A] transition"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex items-center gap-1 text-yellow-200 hover:text-yellow-400 text-sm transition"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center gap-1 bg-yellow-400 text-[#4B1E00] px-3 py-[3px] rounded-md font-semibold text-sm hover:bg-yellow-300 transition"
              >
                <UserPlus size={16} /> Signup
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-300 hover:text-yellow-400 transition"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MAIN NAVBAR */}
      <div className="hidden md:flex items-center justify-between px-6 md:px-12 py-3">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Jinsharnam Media Logo"
            className="w-14 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
          />
          <h1 className="font-serif text-2xl font-bold text-yellow-300">
            Jinsharnam <span className="text-yellow-400">Media</span>
          </h1>
        </Link>

        <nav className="flex items-center space-x-5 font-medium text-sm">
          {links.map((link, index) => (
            <div key={link.path} className="flex items-center">
              <Link
                href={link.path}
                className={`relative group font-semibold transition-all ${
                  pathname === link.path
                    ? "text-yellow-400"
                    : "text-yellow-200"
                } hover:text-yellow-300`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                    pathname === link.path
                      ? "bg-yellow-400 scale-x-100"
                      : "bg-yellow-300/50 scale-x-0 group-hover:scale-x-100"
                  } origin-left`}
                ></span>
              </Link>
              {index < links.length - 1 && (
                <span className="mx-3 text-yellow-500/50">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
