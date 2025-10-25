"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const STATUS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type Status = typeof STATUS[number];

type AdminOrder = {
  id: string;
  totalCents: number;
  status: Status;
  createdAt: string;
  user?: { id: string; name: string | null; email: string };
  items: { id: string; qty: number; priceCents: number; product: { title: string } }[];
};

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (!session) {
      router.push("/auth/login");
      return;
    }
    if (session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, sessionStatus, router]);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchOrders();
    }
  }, [session]);

  const visible = useMemo(
    () => orders.filter((o) => (filter === "ALL" ? true : o.status === filter)),
    [orders, filter]
  );

  const updateStatus = async (id: string, status: Status) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      fetchOrders();
    } catch (e) {
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Checking credentials...
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-100 to-yellow-50 p-10 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-spiritual-brown mb-6">
        🌺 Welcome, {session.user.name}
      </h1>
      <p className="text-center text-lg text-gray-700 mb-10">
        You are logged in as <strong>Admin</strong>. Manage your Jinsharnam Media content here.
      </p>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold text-spiritual-brown mb-2">🛒 Store Products</h2>
          <p>Manage your spiritual books, calendars, and media for sale.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold text-spiritual-brown mb-2">📜 Directory</h2>
          <p>View and update members in the Jinsharnam Media community.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold text-spiritual-brown mb-2">🎥 Videos</h2>
          <p>Upload or manage latest spiritual videos from Pulak Sagar Ji.</p>
        </div>
      </div>

      <section className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-amber-800">📦 Manage Orders</h2>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="ALL">All</option>
              {STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={fetchOrders} className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-amber-50 rounded-xl p-6 shadow">
                <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-amber-100 rounded-xl overflow-hidden">
              <thead className="bg-amber-50">
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
                {visible.map((o) => (
                  <tr key={o.id} className="border-t border-amber-100 hover:bg-amber-50/50">
                    <td className="p-3">
                      <div className="font-medium">#{o.id.slice(0, 8)}…</div>
                      <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{o.user?.name || "—"}</div>
                      <div className="text-xs text-gray-500">{o.user?.email}</div>
                    </td>
                    <td className="p-3">
                      <ul className="list-disc pl-5">
                        {o.items.map((it) => (
                          <li key={it.id}>{it.product.title} × {it.qty}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 font-semibold">₹ {(o.totalCents / 100).toFixed(2)}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <select
                          className="border rounded-lg px-2 py-1"
                          value={o.status}
                          onChange={(e) => updateStatus(o.id, e.target.value as Status)}
                          disabled={updatingId === o.id}
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {o.status === "PENDING" && (
                          <button
                            onClick={() => updateStatus(o.id, "PROCESSING")}
                            className="px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700"
                            disabled={updatingId === o.id}
                          >
                            Initiate
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