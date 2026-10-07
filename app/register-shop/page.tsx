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
import { supabase } from "../lib/supabaseClient";

const CATEGORIES = [
  "Home Repair", "AC & HVAC", "Plumbing", "Electrical",
  "Roofing & Waterproofing", "Painting", "Carpentry", "Cleaning",
  "Pest Control", "Gardening & Landscaping", "Construction & Renovation",
  "Glass & Aluminum", "Locksmith", "Internet & CCTV", "Moving & Delivery",
  "Auto Services", "Appliance Repair", "Water Solutions", "Solar Services",
  "Mobile & Computer Repair",
];

// Image ko chhota karta hai (max 1000px), upload tezi se ho
const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load nahi hui, JPG ya PNG use karen"));
    };

    img.onload = () => {
      const maxSize = 1000;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas support nahi hai"));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Image convert nahi hui"));
        },
        "image/jpeg",
        0.8
      );
    };

    img.src = url;
  });
};

const uploadImage = async (file: File, prefix: string): Promise<string> => {
  const compressed = await compressImage(file);
  const fileName = `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.jpg`;

  const { error } = await supabase.storage
    .from("shop-images")
    .upload(fileName, compressed, { contentType: "image/jpeg" });

  if (error) throw error;

  const { data } = supabase.storage.from("shop-images").getPublicUrl(fileName);
  return data.publicUrl;
};

export default function RegisterShopPage() {
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
    setForm({ ...form, [e.target.name]: e.target.value });
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
      const shopImageUrl = await uploadImage(shopImage, "shop");
      const ownerImageUrl = await uploadImage(ownerImage, "owner");

      const { error: insertError } = await supabase.from("mechanics").insert({
        name: form.name,
        shop_name: form.shopName,
        category: form.category,
        contact_number: form.contactNumber,
        whatsapp_number: form.whatsappNumber || form.contactNumber,
        city: form.city,
        address: form.address,
        shop_image: shopImageUrl,
        owner_image: ownerImageUrl,
      });

      if (insertError) throw insertError;

      setSuccess(true);

      setTimeout(() => {
        router.push("/shops");
      }, 1500);
    } catch (err) {
      console.error(err);
      const reason = err instanceof Error ? err.message : "Unknown error";
      setError("Submit nahi hua: " + reason);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0A07] px-6">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#FA7C0E]" />
          <h2 className="mb-2 text-2xl font-bold text-white">
            Request Submit Ho Gayi
          </h2>
          <p className="text-[#9BA295]">
            Aapki shop ab online hai aur sab ko nazar aayegi.
          </p>
          <p className="mt-4 text-sm text-[#9BA295]">
            Shops page par le ja rahe hain...
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
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Apni Shop Online Karen
          </h1>
          <p className="mt-3 text-[#9BA295]">
            Apna data submit karen aur clients tak seedha pohonchen.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#2A2820] bg-[#151410] p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

          <div className="space-y-4">
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

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Poora address (optional)"
              className="w-full rounded-lg border border-[#2A2820] bg-[#0B0A07] px-4 py-3 text-white placeholder-[#9BA295] focus:border-[#FA7C0E] focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

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
