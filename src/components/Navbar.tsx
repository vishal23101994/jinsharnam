"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, LogIn, UserPlus } from "lucide-react";
import Fuse from "fuse.js";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [fuse, setFuse] = useState<Fuse<any> | null>(null);

  // 🧩 Fetch all searchable data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/search");
      const data = await res.json();
      setAllData(data);

      // Create Fuse instance
      const fuseInstance = new Fuse(data, {
        keys: ["title", "description", "type"],
        threshold: 0.3,
      });
      setFuse(fuseInstance);
    }
    fetchData();
  }, []);

  // 🕵️ Handle typing
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

  // 🔗 Navigate on selection
  const handleSelect = (path: string) => {
    setSearchValue("");
    setResults([]);
    router.push(path);
  };

  // 🔍 Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].path);
    }
  };

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
      {/* === TOP STRIP === */}
      <div className="flex justify-between items-center px-6 md:px-12 py-2 border-b border-yellow-700/40 text-sm relative">
        {/* === SEARCH BOX === */}
        <div className="relative flex items-center gap-2 bg-[#400101]/70 border border-yellow-700/50 rounded-md px-2 py-[3px] focus-within:ring-2 focus-within:ring-yellow-400/40 transition-all w-36 md:w-64">
          <Search size={16} className="text-yellow-400" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchValue}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-yellow-100 placeholder-yellow-300/70 text-sm flex-1"
          />

          {/* === SEARCH RESULTS DROPDOWN === */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#2d0000]/95 border border-yellow-700/40 rounded-md shadow-lg text-yellow-100 text-sm max-h-56 overflow-y-auto z-50">
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(r.path)}
                  className="px-3 py-2 hover:bg-yellow-900/30 cursor-pointer"
                >
                  <p className="font-semibold text-yellow-300 flex items-center justify-between">
                    {r.title}
                    <span className="text-xs text-yellow-400/70 uppercase">{r.type}</span>
                  </p>
                  <p className="text-yellow-100/80 text-xs">{r.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === AUTH BUTTONS === */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* === MAIN NAVBAR === */}
      <div className="flex items-center justify-between px-6 md:px-12 py-3">
        {/* === LOGO === */}
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

        {/* === NAV LINKS === */}
        <nav className="hidden md:flex items-center space-x-5 font-medium text-sm">
          {links.map((link, index) => (
            <div key={link.path} className="flex items-center">
              <Link
                href={link.path}
                className={`relative group font-semibold transition-all ${
                  pathname === link.path ? "text-yellow-400" : "text-yellow-200"
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
