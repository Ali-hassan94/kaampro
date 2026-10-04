"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Mic, ArrowRight } from "lucide-react";

const STORY_IMAGE = "";
const GUIDE_IMAGE = "";

const stats = [
  {
    number: "Easy Booking",
    text: "Apni zaroorat ke mutabiq service provider asani se book karein",
  },
  {
    number: "Multiple Services",
    text: "Home repair se AC, plumbing aur electrical tak",
  },
  {
    number: "Local Providers",
    text: "Apne area ke service providers ko discover karein",
  },
  {
    number: "Direct Connection",
    text: "Customer aur service provider ke darmiyan direct contact",
  },
];

const ctaBtnClass =
  "inline-flex items-center gap-2 rounded-xl bg-[#FA7C0E] px-6 py-3.5 " +
  "text-sm font-extrabold text-white no-underline sm:px-8 sm:py-4 " +
  "sm:text-base";

const resourceLinkClass =
  "mt-5 inline-flex items-center gap-2 font-bold text-[#FA7C0E] " +
  "no-underline sm:mt-6";

function ImageBox({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  if (src) {
    return (
      <div className="h-48 w-full overflow-hidden sm:h-56 md:h-64">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#172033] via-[#263b55] to-[#FA7C0E] sm:h-56 md:h-64">
      {children}
    </div>
  );
}

export default function KaamProGrowthSection() {
  return (
    <section className="bg-[#071827] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-[42px]">
            Pakistan ke service professionals ko customers se connect karein
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#B7C2CC] sm:mt-4 sm:text-base md:text-lg">
            Plumbers, electricians, AC technicians, mechanics, cleaners aur
            doosre service providers ko customers tak pohanchne aur apna
            business grow karne ka mauqa.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:gap-5 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-[#244357] bg-[#10283A] p-4 text-center sm:p-7"
            >
              <h3 className="mb-2 text-base font-extrabold text-[#FA7C0E] sm:mb-3 sm:text-xl">
                {item.number}
              </h3>

              <p className="text-xs leading-relaxed text-[#D6DEE5] sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Book a service CTA */}
        <div className="mb-14 text-center sm:mb-[70px]">
          <h2 className="mb-3 text-xl font-extrabold sm:mb-4 sm:text-[34px]">
            Apni service ki zaroorat hai?
          </h2>

          <p className="mb-6 text-sm text-[#B7C2CC] sm:mb-7 sm:text-base">
            Apni problem batayein aur apne area mein available service
            provider find karein.
          </p>

          <Link href="/bookservice" className={ctaBtnClass}>
            Book a Service
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Growth heading */}
        <div className="mb-8 text-center sm:mb-11">
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-[40px]">
            KaamPro aapki growth mein kaise madad karta hai
          </h2>

          <p className="mt-2 text-sm text-[#B7C2CC] sm:mt-3 sm:text-base">
            Customers aur service providers dono ke liye useful resources.
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="overflow-hidden rounded-[20px] border border-[#244357] bg-[#10283A]">
            <ImageBox src={STORY_IMAGE} alt="KaamPro Success Stories">
              <Mic size={64} strokeWidth={1.2} className="text-[#FA7C0E] sm:size-20" />
            </ImageBox>

            <div className="p-5 sm:p-7 md:p-8">
              <h3 className="mb-3 text-xl font-extrabold sm:mb-4 sm:text-2xl">
                KaamPro Success Stories
              </h3>

              <p className="text-sm leading-relaxed text-[#B7C2CC] sm:text-base">
                Kamyab mechanics, plumbers, electricians aur doosre service
                providers ki kahaniyan, tips aur business experiences.
              </p>

              <Link href="/successstories" className={resourceLinkClass}>
                Success Stories
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#244357] bg-[#10283A]">
            <ImageBox src={GUIDE_IMAGE} alt="KaamPro Service Guide">
              <BookOpen size={64} strokeWidth={1.2} className="text-[#FA7C0E] sm:size-20" />
            </ImageBox>

            <div className="p-5 sm:p-7 md:p-8">
              <h3 className="mb-3 text-xl font-extrabold sm:mb-4 sm:text-2xl">
                KaamPro Service Guide
              </h3>

              <p className="text-sm leading-relaxed text-[#B7C2CC] sm:text-base">
                AC repair, plumbing, electrical, cleaning aur doosri services
                ke liye useful guides aur practical information.
              </p>

              <Link href="/serviceguide" className={resourceLinkClass}>
                Explore Guide
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Register CTA */}
        <div className="mt-14 text-center sm:mt-[65px]">
          <h2 className="mb-3 text-xl font-extrabold sm:mb-4 sm:text-[32px]">
            Kya aap service provide karte hain?
          </h2>

          <p className="mb-6 text-sm text-[#B7C2CC] sm:mb-7 sm:text-base">
            Apni shop ya service KaamPro par register karein aur naye
            customers tak pohanchein.
          </p>

          <Link href="/registershop" className={ctaBtnClass}>
            Register Your Business
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}