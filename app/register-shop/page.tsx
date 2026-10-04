"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  User,
  Phone,
  MessageCircle,
  MapPin,
  Upload,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  "Home Repair",
  "AC & HVAC",
  "Shope",
  "Plumbing",
  "Electrical",
  "Roofing & Waterproofing",
  "Painting",
  "Carpentry",
  "Cleaning",
  "Pest Control",
  "Gardening & Landscaping",
  "Construction & Renovation",
  "Glass & Aluminum",
  "Locksmith",
  "Internet & CCTV",
  "Moving & Delivery",
  "Auto Services",
  "Appliance Repair",
  "Water Solutions",
  "Solar Services",
  "Mobile & Computer Repair",
];

const STORAGE_KEY = "kaampro_mechanics";

// Image ko chhota (max 800px) kar ke Base64 banata hai — localStorage limit (~5MB) ke liye zaroori
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image format support nahi hai, JPG ya PNG use karen"));
    };

    img.onload = () => {
      try {
        const maxSize = 800;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas support nahi hai");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      } catch (e) {
        reject(e);
      }
    };

    img.src = url;
  });
};

export default function BecomeMechanic() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    shopName: "",
    category: "",
    contactNumber: "",
    whatsappNumber: "",
    city: "",
    address: "",
  });

  const [shopImage, setShopImage] = useState<File | null>(null);
  const [ownerImage, setOwnerImage] = useState<File | null>(null);

  const [shopPreview, setShopPreview] = useState<string | null>(null);
  const [ownerPreview, setOwnerPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleShopImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setShopImage(file);
      setShopPreview(URL.createObjectURL(file));
    }
  };

  const handleOwnerImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setOwnerImage(file);
      setOwnerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!shopImage || !ownerImage) {
      setError("Shop image aur owner image dono zaroori hain");
      return;
    }

    if (
      !form.name ||
      !form.shopName ||
      !form.category ||
      !form.contactNumber ||
      !form.city
    ) {
      setError("Tamam required fields bharen");
      return;
    }

    setSubmitting(true);

    try {
      // Images ko chhota kar ke Base64 mein convert karna
      const shopImageBase64 = await fileToBase64(shopImage);
      const ownerImageBase64 = await fileToBase64(ownerImage);

      const newMechanic = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),

        name: form.name,
        shopName: form.shopName,
        category: form.category,

        contactNumber: form.contactNumber,
        whatsappNumber: form.whatsappNumber || form.contactNumber,

        city: form.city,
        address: form.address,

        shopImage: shopImageBase64,
        ownerImage: ownerImageBase64,

        createdAt: new Date().toISOString(),
      };

      const savedData = localStorage.getItem(STORAGE_KEY);
      const oldMechanics = savedData ? JSON.parse(savedData) : [];

      // NEW DATA SABSE UPAR
      const updatedMechanics = [newMechanic, ...oldMechanics];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMechanics));
      } catch (storageError) {
        console.error(storageError);
        setError(
          "Browser ki storage full hai. Purani listings delete karen ya chhoti images use karen"
        );
        return;
      }

      // Listing ko batao ke data update hua
      window.dispatchEvent(new Event("kaampro:mechanics-updated"));

      setSuccess(true);

      setTimeout(() => {
        router.push("/#shops");
      }, 1500);
    } catch (err) {
      console.error(err);
      const reason = err instanceof Error ? err.message : "Unknown error";
      setError("Submit nahi hua: " + reason);
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0A07] px-6">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#FA7C0E]" />

          <h2 className="mb-2 text-2xl font-bold text-white">
            Request Submit Ho Gayi
          </h2>

          <p className="text-[#9BA295]">
            Aapki shop successfully KaamPro par list ho gayi hai.
          </p>

          <p className="mt-4 text-sm text-[#9BA295]">
            Home page par le ja rahe hain...
          </p>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-[#2A2820] bg-[#0B0A07] py-3 pl-10 pr-4 text-white placeholder-[#9BA295] focus:border-[#FA7C0E] focus:outline-none";

  return (
    <section className="min-h-screen bg-[#0B0A07] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Apni Shop Online Karen
          </h1>

          <p className="mt-3 text-[#9BA295]">
            Apna data submit karen aur clients tak seedha pohonchen.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#2A2820] bg-[#151410] p-6 md:p-8"
        >
          {/* Images */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Shop Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Shop Image
              </label>

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#2A2820] bg-[#0B0A07] transition hover:border-[#FA7C0E]">
                {shopPreview ? (
                  <img
                    src={shopPreview}
                    alt="Shop preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#9BA295]">
                    <Upload size={22} />
                    <span className="mt-2 text-xs">
                      Shop ki photo upload karen
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleShopImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* Owner Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Owner Image
              </label>

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#2A2820] bg-[#0B0A07] transition hover:border-[#FA7C0E]">
                {ownerPreview ? (
                  <img
                    src={ownerPreview}
                    alt="Owner preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#9BA295]">
                    <Upload size={22} />
                    <span className="mt-2 text-xs">
                      Apni photo upload karen
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOwnerImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Text Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-[#9BA295]"
                size={18}
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Aapka naam"
                className={inputClass}
              />
            </div>

            {/* Shop Name */}
            <div className="relative">
              <Store
                className="absolute left-3 top-3.5 text-[#9BA295]"
                size={18}
              />
              <input
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                placeholder="Shop ka naam"
                className={inputClass}
              />
            </div>

            {/* Category */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#2A2820] bg-[#0B0A07] px-4 py-3 text-white focus:border-[#FA7C0E] focus:outline-none"
            >
              <option value="">Service category select karen</option>

              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Phone + WhatsApp */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <Phone
                  className="absolute left-3 top-3.5 text-[#9BA295]"
                  size={18}
                />
                <input
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact number"
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <MessageCircle
                  className="absolute left-3 top-3.5 text-[#9BA295]"
                  size={18}
                />
                <input
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  placeholder="WhatsApp number"
                  className={inputClass}
                />
              </div>
            </div>

            {/* City */}
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3.5 text-[#9BA295]"
                size={18}
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Shehar (city)"
                className={inputClass}
              />
            </div>

            {/* Address */}
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Poora address (optional)"
              className="w-full rounded-lg border border-[#2A2820] bg-[#0B0A07] px-4 py-3 text-white placeholder-[#9BA295] focus:border-[#FA7C0E] focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#FA7C0E] py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#12C2EE] disabled:opacity-50"
          >
            {submitting ? "Submit ho raha hai..." : "Submit Karen"}
          </button>
        </form>
      </div>
    </section>
  );
}