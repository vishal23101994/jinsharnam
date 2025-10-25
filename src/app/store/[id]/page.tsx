"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params?.id) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((data) => {
          const found = data.find((p: Product) => p.id === params.id);
          setProduct(found || null);
        });
    }
  }, [params?.id]);

  const handleBuy = async (product: Product) => {
    const res = await fetch("/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ ...product, qty: 1 }] }),
    });
    const data = await res.json();

    if (!data?.id) {
      alert("Error creating order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: product.priceCents,
      currency: "INR",
      name: "Jinsharnam Media",
      description: product.title,
      order_id: data.id,
      handler: () => (window.location.href = "/store/success"),
      theme: { color: "#CFAF72" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!product)
    return (
      <p className="text-center py-20 text-gray-600">Loading product...</p>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-800 py-10 px-6 relative">
      {/* 🌟 Floating Back Button (below navbar and clickable) */}
      <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[9999]">
        <button
          onClick={() => {
            try {
              router.push("/store");
            } catch (e) {
              window.location.href = "/store";
            }
          }}
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-amber-700 transition-all text-sm md:text-base"
        >
          ← Back to Store
        </button>
      </div>

      {/* 🛍️ Product Detail Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white shadow-md rounded-3xl p-6 mt-16">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.imageUrl || "/images/default.jpg"}
            alt={product.title}
            className="rounded-2xl w-full max-w-md object-cover shadow-sm"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-serif text-amber-800 font-semibold mb-3">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl text-amber-700 font-semibold mb-6">
            ₹ {(product.priceCents / 100).toFixed(2)}
          </p>

          <button
            onClick={() => handleBuy(product)}
            className="w-full md:w-1/2 rounded-full bg-amber-600 text-white py-3 hover:bg-amber-700 transition-all"
          >
            Buy Now
          </button>

          <div className="mt-8 text-sm text-gray-500">
            <p>✅ Secure Payment via Razorpay</p>
            <p>🚚 Free Shipping on all orders</p>
            <p>📦 Delivery within 5–7 business days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
