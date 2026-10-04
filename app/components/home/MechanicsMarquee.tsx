"use client";

import { useEffect, useState } from "react";
import { Wrench, Wind, Zap, Droplets, Paintbrush, Hammer } from "lucide-react";

interface Mechanic {
  id: string;
  name: string;
  shopName: string;
  category: string;
  shopImage: string;
  createdAt: string;
}

const STORAGE_KEY = "kaampro_mechanics";

// "ltr" = left se right, "rtl" = right se left
const DIRECTION: "ltr" | "rtl" = "ltr";

const CARD_WIDTH = 280;
const CARD_HEIGHT = 380;
const CARD_GAP = 24;

// Jab tak koi shop register na ho, ye placeholder cards dikhte hain
const PLACEHOLDERS = [
  { icon: Wind, title: "AC & HVAC" },
  { icon: Zap, title: "Electrical" },
  { icon: Droplets, title: "Plumbing" },
  { icon: Paintbrush, title: "Painting" },
  { icon: Hammer, title: "Carpentry" },
  { icon: Wrench, title: "Home Repair" },
];

const css = `
@keyframes kaampro-scroll-ltr {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
@keyframes kaampro-scroll-rtl {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.kaampro-track:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .kaampro-track { animation: none !important; }
}
`;

const overlayClass =
  "absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent";

function CaptionBlock({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="absolute bottom-5 left-5 right-5 flex items-stretch gap-3">
      <div className="w-0.5 bg-white/80" />
      <div>
        <p className="text-lg font-bold leading-tight text-white">{title}</p>
        <p className="mt-1 text-base text-white/90">{subtitle}</p>
      </div>
    </div>
  );
}

function ShopCard({ mechanic }: { mechanic: Mechanic }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden bg-[#151410]"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT, marginRight: CARD_GAP }}
    >
      <img
        src={mechanic.shopImage}
        alt={mechanic.shopName}
        className="h-full w-full object-cover"
        draggable={false}
      />
      <div className={overlayClass} />
      <CaptionBlock title={mechanic.name} subtitle={mechanic.shopName} />
    </div>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  const item = PLACEHOLDERS[index % PLACEHOLDERS.length];
  const Icon = item.icon;

  return (
    <div
      className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#1f1a10] to-[#3a2410]"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT, marginRight: CARD_GAP }}
    >
      <div className="flex h-full w-full items-center justify-center pb-16">
        <Icon size={90} strokeWidth={1.2} className="text-[#FA7C0E]/60" />
      </div>
      <div className={overlayClass} />
      <CaptionBlock title="Apni shop yahan" subtitle={item.title} />
    </div>
  );
}

export default function MechanicsMarquee() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const data: Mechanic[] = saved ? JSON.parse(saved) : [];
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMechanics(data);
      } catch (error) {
        console.error("Marquee data read error:", error);
      }
    };

    load();
    window.addEventListener("kaampro:mechanics-updated", load);
    window.addEventListener("storage", load);

    return () => {
      window.removeEventListener("kaampro:mechanics-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const hasShops = mechanics.length > 0;

  // Kam shops hon to repeat kar ke kam az kam 8 cards banayen
  const base: number[] = [];
  const baseCount = hasShops ? mechanics.length : PLACEHOLDERS.length;
  const minCards = 8;
  const repeats = Math.max(1, Math.ceil(minCards / baseCount));
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < baseCount; i++) base.push(i);
  }

  // Seamless loop ke liye list do baar
  const loopItems = [...base, ...base];
  const duration = Math.max(30, base.length * 6);
  const animationName =
    DIRECTION === "ltr" ? "kaampro-scroll-ltr" : "kaampro-scroll-rtl";

  return (
    <section className="overflow-hidden bg-[#0B0A07] py-16">
      <style>{css}</style>

      <div className="mb-10 px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Trusted by shops across Pakistan
        </h2>
        <p className="mt-3 text-[#9BA295]">
          Hamare platform par register hone wale mechanics aur service providers
        </p>
      </div>

      <div
        className="kaampro-track flex w-max"
        style={{
          animation: animationName + " " + duration + "s linear infinite",
        }}
      >
        {loopItems.map((itemIndex, key) =>
          hasShops ? (
            <ShopCard key={key} mechanic={mechanics[itemIndex]} />
          ) : (
            <PlaceholderCard key={key} index={itemIndex} />
          )
        )}
      </div>
    </section>
  );
}