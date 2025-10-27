"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const STATUS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type Status = typeof STATUS[number];

type AdminOrder = {
  id: number;
  totalCents: number;
  status: Status;
  createdAt: string;
  user?: { id: number; name: string | null; email: string };
  orderItems: { id: number; quantity: number; priceCents: number; product: { title: string } }[];
};

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // 🧭 Auth & Role Check
  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (!session) {
      router.push("/auth/login");
      return;
    }
    if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, sessionStatus, router]);

  // 📦 Fetch all orders
  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders/all") // endpoint returning all orders for admin
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchOrders();
    }
  }, [session]);

  const visibleOrders = useMemo(
    () => orders.filter((o) => (filter === "ALL" ? true : o.status === filter)),
    [orders, filter]
  );

  // 🔁 Update order status
  const updateStatus = async (id: number, status: Status) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchOrders();
    } catch (e) {
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🕐 Loading state
  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-yellow-200">
        Checking credentials...
      </div>
    );
  }

  // 🛑 Unauthorized access
  if (!session || session.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#3A0D0D] via-[#5C1A1A] to-[#8B2F2F] p-10 text-[#FFF8E7]">
      <h1 className="text-4xl font-serif text-center text-[#FFD97A] mb-6">
        🌼 Welcome, {session.user.name}
      </h1>
      <p className="text-center text-[#FFE8B0]/80 mb-10">
        You are logged in as <strong>Administrator</strong>. Manage all user orders and content below.
      </p>

      {/* === Quick Admin Cards === */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <div className="p-6 rounded-2xl bg-[#4B1E00]/40 border border-[#FFD97A]/30 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#FFD97A] mb-2">🛍️ Store Products</h2>
          <p className="text-sm text-[#FFF8E7]/80">
            Add, update, or remove items available for sale in the Jinsharnam Media store.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#4B1E00]/40 border border-[#FFD97A]/30 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#FFD97A] mb-2">📇 Directory</h2>
          <p className="text-sm text-[#FFF8E7]/80">
            Manage and update the spiritual member directory of Jinsharnam community.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#4B1E00]/40 border border-[#FFD97A]/30 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-[#FFD97A] mb-2">🎬 Videos</h2>
          <p className="text-sm text-[#FFF8E7]/80">
            Upload or organize new sermons, pravachans, and spiritual discourses.
          </p>
        </div>
      </div>

      {/* === Orders Management === */}
      <section className="bg-[#4B1E00]/40 border border-[#FFD97A]/30 rounded-2xl p-6 shadow-md backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-[#FFD97A]">📦 Manage Orders</h2>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-[#FFD97A]/40 bg-transparent text-[#FFF8E7] px-3 py-2 rounded-lg focus:outline-none"
            >
              <option value="ALL">All</option>
              {STATUS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold hover:shadow-md transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#FFF8E7]/10 rounded-xl p-6 shadow">
                <div className="h-4 bg-[#FFD97A]/30 w-1/2 mb-2 rounded" />
                <div className="h-4 bg-[#FFD97A]/30 w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-[#FFD97A]/20 rounded-xl overflow-hidden">
              <thead className="bg-[#FFD97A]/10 text-[#FFD97A] uppercase text-xs">
                <tr>
                  <th className="text-left p-3">Order</th>
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Items</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-[#FFD97A]/10 hover:bg-[#FFD97A]/5 transition"
                  >
                    <td className="p-3">
                      <div className="font-medium text-[#FFD97A]">#{o.id}</div>
                      <div className="text-xs text-[#FFF8E7]/70">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{o.user?.name || "—"}</div>
                      <div className="text-xs text-[#FFF8E7]/70">{o.user?.email}</div>
                    </td>
                    <td className="p-3">
                      <ul className="list-disc pl-5 space-y-1">
                        {o.orderItems.map((it) => (
                          <li key={it.id}>
                            {it.product.title} × {it.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 font-semibold text-[#FFD97A]">
                      ₹ {(o.totalCents / 100).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FFD97A]/20 text-[#FFD97A]">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <select
                          className="border border-[#FFD97A]/30 bg-transparent text-[#FFF8E7] rounded-lg px-2 py-1"
                          value={o.status}
                          onChange={(e) =>
                            updateStatus(o.id, e.target.value as Status)
                          }
                          disabled={updatingId === o.id}
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {o.status === "PENDING" && (
                          <button
                            onClick={() => updateStatus(o.id, "PROCESSING")}
                            className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#FFD97A] to-[#FFE28A] text-[#4B1E00] font-semibold hover:shadow-md"
                            disabled={updatingId === o.id}
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
