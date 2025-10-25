"use client";
import { useState, useEffect } from "react";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/directory?q=${query}`)
      .then((res) => res.json())
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setMembers([]));
  }, [query]);


  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-center text-spiritual-brown mb-10">
        Jinsharnam Directory
      </h1>
      <input
        type="text"
        placeholder="Search by name or city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-full px-5 py-3 mb-10"
      />
      <div className="grid md:grid-cols-2 gap-6">
        {members.map((m) => (
          <div
            key={m.id}
            className="border rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="font-serif text-lg text-spiritual-brown">{m.fullName}</h3>
            <p className="text-sm text-spiritual-dark/80">{m.city}</p>
            <p className="text-sm text-spiritual-dark/80">{m.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
