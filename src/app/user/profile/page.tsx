"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PhoneVerificationModal from "@/components/PhoneVerificationModal";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
};

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/user/${session.user.email}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setPhoneInput(data.phone || "");
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [session]);

  const handleSavePhone = async () => {
    if (!phoneInput) return alert("Please enter a phone number.");

    try {
      const res = await fetch(`/api/user/update-phone`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, phone: phoneInput }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Phone updated. You can now verify it.");
        setUser((u) => (u ? { ...u, phone: phoneInput, phoneVerified: false } : u));
      } else {
        alert(data.error || "Failed to update phone.");
      }
    } catch (error) {
      console.error("Update phone error:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-amber-700">
        Loading profile...
      </div>
    );

  if (!session?.user)
    return (
      <div className="text-center mt-20 text-gray-700">
        Please login to view your profile.
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3A0D0D] via-[#5C1A1A] to-[#8B2F2F] text-[#FFF8E7] p-10">
      <div className="max-w-lg mx-auto bg-[#4B1E00]/60 backdrop-blur-md border border-[#FFD97A]/30 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-serif text-center text-[#FFD97A] mb-8">
          👤 My Profile
        </h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-[#FFD97A]/70 mb-1">Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7]/90"
            />
          </div>

          <div>
            <label className="block text-sm text-[#FFD97A]/70 mb-1">Email</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7]/90"
            />
          </div>

          <div>
            <label className="block text-sm text-[#FFD97A]/70 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91XXXXXXXXXX"
                className="flex-1 p-3 rounded-lg bg-[#FFF8E7]/10 border border-[#FFD97A]/30 text-[#FFF8E7]/90 focus:border-[#FFD97A]"
              />
              <button
                onClick={handleSavePhone}
                className="px-4 rounded-lg bg-[#FFD97A] text-[#4B1E00] font-semibold hover:bg-[#FFE28A] transition"
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-[#FFF8E7]/80">
              Status:{" "}
              {user?.phoneVerified ? (
                <span className="text-green-400 font-semibold">Verified ✅</span>
              ) : (
                <span className="text-red-400 font-semibold">Not Verified ❌</span>
              )}
            </p>

            {!user?.phoneVerified && user?.phone && (
              <button
                onClick={() => setShowOtp(true)}
                className="px-4 py-2 bg-[#FFD97A] text-[#4B1E00] rounded-lg font-medium hover:bg-[#FFE28A] transition"
              >
                Verify Now
              </button>
            )}
          </div>
        </div>
      </div>

      {showOtp && (
        <PhoneVerificationModal
          phone={user?.phone || ""}
          onClose={() => setShowOtp(false)}
          onVerified={() => setUser((u) => (u ? { ...u, phoneVerified: true } : u))}
        />
      )}
    </main>
  );
}
