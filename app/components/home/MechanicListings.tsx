"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Wrench } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

interface Mechanic {
  id: string;
  name: string;
  shop_name: string;
  category: string;
  contact_number: string;
  whatsapp_number: string;
  city: string;
  address: string | null;
  shop_image: string;
  owner_image: string;
  created_at: string;
}

const cardClass =
  "group overflow-hidden rounded-2xl border border-[#2A2820] " +
  "bg-[#151410] transition duration-300 hover:-translate-y-2 " +
  "hover:border-[#FA7C0E] hover:shadow-xl";

const callBtnClass =
  "flex items-center justify-center gap-2 rounded-lg " +
  "bg-[#FA7C0E] px-4 py-3 text-sm font-semibold text-white " +
  "transition hover:bg-[#12C2EE]";

const chatBtnClass =
  "flex items-center justify-center gap-2 rounded-lg " +
  "border border-[#2A2820] px-4 py-3 text-sm font-semibold " +
  "text-white transition hover:border-[#FA7C0E] hover:text-[#FA7C0E]";

function onlyDigits(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function MechanicCard({ mechanic }: { mechanic: Mechanic }) {
  const callLink = "tel:" + mechanic.contact_number;
  const chatLink = "https://wa.me/" + onlyDigits(mechanic.whatsapp_number);

  return (
    <div className={cardClass}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={mechanic.shop_image}
          alt={mechanic.shop_name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#FA7C0E] px-3 py-1.5 text-xs font-semibold text-white">
          {mechanic.category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={mechanic.owner_image}
            alt={mechanic.name}
            className="h-14 w-14 rounded-full border-2 border-[#FA7C0E] object-cover"
          />
          <div>
            <h3 className="text-lg font-bold text-white">
              {mechanic.shop_name}
            </h3>
            <p className="text-sm text-[#9BA295]">{mechanic.name}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-[#9BA295]">
          <MapPin size={17} className="text-[#FA7C0E]" />
          <span>{mechanic.city}</span>
        </div>

        {mechanic.address ? (
          <p className="mt-2 line-clamp-2 text-sm text-[#77786F]">
            {mechanic.address}
          </p>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a href={callLink} className={callBtnClass}>
            <Phone size={17} />
            Call
          </a>

          <a
            href={chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className={chatBtnClass}
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MechanicListings() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadMechanics = async () => {
      const { data, error } = await supabase
        .from("mechanics")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.error("Mechanic listings fetch error:", error);
      } else {
        setMechanics(data || []);
      }
      setLoading(false);
    };

    loadMechanics();

    const channel = supabase
      .channel("mechanics-listings-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mechanics" },
        () => loadMechanics()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section id="shops" className="bg-[#0B0A07] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Wrench size={20} className="text-[#FA7C0E]" />
            <span className="text-sm font-semibold uppercase text-[#FA7C0E]">
              KaamPro Services
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Find Trusted Service Providers
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[#9BA295]">
            Apne area mein available mechanics aur service providers find karein.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-sm text-[#9BA295]">Loading...</p>
        ) : mechanics.length === 0 ? (
          <div className="rounded-2xl border border-[#2A2820] bg-[#151410] px-6 py-16 text-center">
            <Wrench size={45} className="mx-auto mb-4 text-[#FA7C0E]" />
            <h3 className="text-xl font-semibold text-white">
              Abhi koi service provider nahi hai
            </h3>
            <p className="mt-2 text-[#9BA295]">
              Sab se pehle apni shop list karen.
            </p>
            <Link
              href="/register-shop"
              className="mt-6 inline-block rounded-lg bg-[#FA7C0E] px-6 py-3 font-semibold text-white"
            >
              Register Your Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mechanics.map((mechanic) => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}