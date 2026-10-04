"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, MapPin, Wrench } from "lucide-react";

interface Mechanic {
  id: string;
  name: string;
  shopName: string;
  category: string;
  contactNumber: string;
  whatsappNumber: string;
  city: string;
  address: string;
  shopImage: string;
  ownerImage: string;
  createdAt: string;
}

const STORAGE_KEY = "kaampro_mechanics";

const cardClass =
  "group overflow-hidden rounded-2xl border border-[#2A2820] " +
  "bg-[#151410] transition duration-300 hover:-translate-y-2 " +
  "hover:border-[#FA7C0E] hover:shadow-xl";

const callBtnClass =
  "flex items-center justify-center gap-2 rounded-lg " +
  "bg-[#FA7C0E] px-3 py-2.5 text-xs sm:px-4 sm:py-3 sm:text-sm " +
  "font-semibold text-white transition hover:bg-[#12C2EE]";

const chatBtnClass =
  "flex items-center justify-center gap-2 rounded-lg " +
  "border border-[#2A2820] px-3 py-2.5 text-xs sm:px-4 sm:py-3 " +
  "sm:text-sm font-semibold text-white transition " +
  "hover:border-[#FA7C0E] hover:text-[#FA7C0E]";

function onlyDigits(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function MechanicCard({ mechanic }: { mechanic: Mechanic }) {
  const callLink = "tel:" + mechanic.contactNumber;
  const chatLink = "https://wa.me/" + onlyDigits(mechanic.whatsappNumber);

  return (
    <div className={cardClass}>
      <div className="relative h-44 overflow-hidden sm:h-56">
        <img
          src={mechanic.shopImage}
          alt={mechanic.shopName}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 rounded-full bg-[#FA7C0E] px-2.5 py-1 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
          {mechanic.category}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={mechanic.ownerImage}
            alt={mechanic.name}
            className="h-11 w-11 rounded-full border-2 border-[#FA7C0E] object-cover sm:h-14 sm:w-14"
          />
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-white sm:text-lg">
              {mechanic.shopName}
            </h3>
            <p className="truncate text-xs text-[#9BA295] sm:text-sm">
              {mechanic.name}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-[#9BA295] sm:mt-5 sm:text-sm">
          <MapPin size={15} className="shrink-0 text-[#FA7C0E] sm:size-[17px]" />
          <span className="truncate">{mechanic.city}</span>
        </div>

        {mechanic.address ? (
          <p className="mt-2 line-clamp-2 text-xs text-[#77786F] sm:text-sm">
            {mechanic.address}
          </p>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
          <a href={callLink} className={callBtnClass}>
            <Phone size={15} />
            Call
          </a>

          <a
            href={chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className={chatBtnClass}
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ShopsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  useEffect(() => {
    const loadMechanics = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const data: Mechanic[] = saved ? JSON.parse(saved) : [];

        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMechanics(data);
      } catch (error) {
        console.error("Mechanic data read error:", error);
      }
    };

    loadMechanics();
    window.addEventListener("kaampro:mechanics-updated", loadMechanics);
    window.addEventListener("storage", loadMechanics);

    return () => {
      window.removeEventListener("kaampro:mechanics-updated", loadMechanics);
      window.removeEventListener("storage", loadMechanics);
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#0B0A07] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3">
            <Wrench size={18} className="text-[#FA7C0E] sm:size-5" />
            <span className="text-xs font-semibold uppercase text-[#FA7C0E] sm:text-sm">
              KaamPro Services
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Find Trusted Service Providers
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#9BA295] sm:mt-3 sm:text-base">
            Apne area mein available mechanics aur service providers find karein.
          </p>
        </div>

        {mechanics.length === 0 ? (
          <div className="rounded-2xl border border-[#2A2820] bg-[#151410] px-4 py-12 text-center sm:px-6 sm:py-16">
            <Wrench size={38} className="mx-auto mb-3 text-[#FA7C0E] sm:mb-4 sm:size-[45px]" />
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Abhi koi service provider nahi hai
            </h3>
            <p className="mt-2 text-sm text-[#9BA295] sm:text-base">
              Apni shop list karne ke liye register-shop form submit karein.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {mechanics.map((mechanic) => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}