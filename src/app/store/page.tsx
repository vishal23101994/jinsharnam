"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Product = {
  id: string;
  title: string;
  category: "Book" | "Calendar" | "Poster";
  description?: string;
  priceCents: number;
  imageUrl?: string;
  featured?: boolean;
};

type CartItem = Product & { qty: number };

export default function StorePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🧭 Fetch products
  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let result = [...items];
    if (selectedCategory !== "All") {
      result = result.filter((i) => i.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      result = result.filter((i) =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(result);
  }, [searchTerm, selectedCategory, items]);

  // 🛒 Cart logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");

    const res = await fetch("/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();

    if (!data?.id) return alert("Error creating order");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: cart.reduce((sum, p) => sum + p.priceCents * p.qty, 0),
      currency: "INR",
      name: "Jinsharnam Media",
      description: "Order Checkout",
      order_id: data.id,
      handler: () => (window.location.href = "/store/success"),
      theme: { color: "#CFAF72" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 💫 Loading skeleton
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-800 p-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-3xl shadow-md p-5 h-72"
          >
            <div className="bg-gray-200 h-40 w-full rounded-xl mb-4"></div>
            <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/2"></div>
          </div>
        ))}
      </main>
    );
  }

  const featured = items.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100/40 to-white text-gray-800">
      {/* 🌟 Hero Section */}
      <section className="relative w-full h-[480px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/images/redtextured.jpg"
          alt="Jinsharnam Media Store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-100 font-semibold drop-shadow-lg mb-4">
            Welcome to Jinsharnam Media Store
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-amber-50 drop-shadow-md">
            Explore spiritual books, divine calendars, and peaceful posters that
            enlighten your path.
          </p>
          <a
            href="#products"
            className="mt-8 inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-all shadow-md"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* ✨ Featured Section */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-serif text-center text-amber-800 mb-8">
            Featured Products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-gradient-to-br from-white to-amber-50/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden"
              >
                <img
                  src={p.imageUrl || "/images/default.jpg"}
                  alt={p.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg text-amber-800 font-semibold mb-1">
                    {p.title}
                  </h3>
                  <p className="text-amber-700 font-medium">
                    ₹ {(p.priceCents / 100).toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-3 w-full rounded-full bg-amber-600 text-white py-2 text-sm hover:bg-amber-700 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🧭 Filter + Search */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {["All", "Book", "Calendar", "Poster"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-amber-200 rounded-full px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* 🛒 Product Grid (Smaller, Cleaner Cards) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="border rounded-2xl bg-gradient-to-br from-white to-amber-50/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4"
            >
              <Link href={`/store/${p.id}`}>
                <img
                  src={p.imageUrl || '/images/default.jpg'}
                  alt={p.title}
                  className="rounded-xl w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-all"
                />
              </Link>

              <div className="mt-3 text-center">
                <Link href={`/store/${p.id}`}>
                  <h3 className="font-serif text-lg text-amber-800 font-medium hover:underline">
                    {p.title}
                  </h3>
                </Link>

                {p.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                )}

                <p className="mt-2 text-lg text-amber-700 font-semibold">
                  ₹ {(p.priceCents / 100).toFixed(2)}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 rounded-full bg-amber-600 text-white py-2 text-sm hover:bg-amber-700 transition-all shadow-sm"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/store/${p.id}`}
                    className="flex-1 rounded-full border border-amber-600 text-amber-700 py-2 text-sm hover:bg-amber-50 transition-all text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛍️ Cart Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-amber-800">Your Cart</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-amber-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
          ) : (
            cart.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center mb-4 border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-500">Qty: {p.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-700 font-semibold">
                    ₹ {((p.priceCents * p.qty) / 100).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t">
            <p className="text-right text-lg font-semibold text-amber-800 mb-3">
              Total: ₹{" "}
              {(cart.reduce((s, i) => s + i.priceCents * i.qty, 0) / 100).toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-amber-600 text-white py-2 hover:bg-amber-700 transition-all"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Floating Cart Button (above back-to-top arrow) */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-20 right-6 bg-amber-600 text-white rounded-full p-4 shadow-lg hover:bg-amber-700 transition-all z-[60]"
      >
        🛒 ({cart.reduce((s, i) => s + i.qty, 0)})
      </button>
    </main>
  );
}
