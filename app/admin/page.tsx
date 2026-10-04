"use client";

import { useState, useEffect } from "react";
import { Trash2, Lock, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "kaampro_mechanics";
const SESSION_KEY = "kaampro_admin_unlocked";

// Yahan apna khud ka password rakhen — kisi ko na batayen
const ADMIN_PASSWORD = "kaampro786";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [shopCount, setShopCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setUnlocked(true);
    }
    updateCount();
  }, []);

  const updateCount = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data = saved ? JSON.parse(saved) : [];
      setShopCount(data.length);
    } catch {
      setShopCount(0);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      setError("");
    } else {
      setError("Password ghalat hai");
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("kaampro:mechanics-updated"));
    setConfirming(false);
    updateCount();
  };

  if (!unlocked) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0A07] px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-[#2A2820] bg-[#151410] p-8 text-center"
        >
          <Lock className="mx-auto mb-4 h-10 w-10 text-[#FA7C0E]" />

          <h1 className="mb-2 text-xl font-bold text-white">Admin Access</h1>
          <p className="mb-6 text-sm text-[#9BA295]">
            Ye page sirf admin ke liye hai
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-[#2A2820] bg-[#0B0A07] px-4 py-3 text-center text-white placeholder-[#9BA295] focus:border-[#FA7C0E] focus:outline-none"
          />

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-[#FA7C0E] py-3 font-semibold text-white transition hover:bg-[#12C2EE]"
          >
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0B0A07] px-6 text-center">
      <ShieldCheck className="h-12 w-12 text-[#FA7C0E]" />

      <div>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="mt-2 text-[#9BA295]">
          Abhi <span className="text-white font-semibold">{shopCount}</span>{" "}
          shops register hain
        </p>
      </div>

      {confirming ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-red-900 bg-red-950/30 p-6">
          <p className="text-sm text-white">
            Pakka sab shops delete karni hain? Ye wapas nahi hogi.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Haan, Delete Karen
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-[#2A2820] px-4 py-2 text-sm font-semibold text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          disabled={shopCount === 0}
          className="flex items-center gap-2 rounded-xl border border-red-900 px-6 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-950/30 disabled:opacity-40"
        >
          <Trash2 size={16} />
          Sab Shops Delete Karen
        </button>
      )}
    </section>
  );
}