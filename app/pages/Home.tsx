"use client";

import React from "react";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaStarOfDavid } from "react-icons/fa";
import {
  Hammer, Wind, Wrench, Zap, Home, Paintbrush,
  Ruler, Sparkles, Bug, Trees, Building2, SquareStack,
  KeyRound, Wifi, Truck, Car, Cog, Droplets, Sun, Smartphone,
} from "lucide-react";
import services from "../data/services.json";
import MechanicsMarquee from "../components/home/MechanicsMarquee";
import MechanicListings from "../components/home/MechanicListings";
import Servicesdata from "../components/home/Servicesdata";


const iconMap: Record<string, React.ElementType> = {
  "Home Repair": Home,
  "AC & HVAC": Wind,
  "Plumbing": Wrench,
  "Electrical": Zap,
  "Roofing & Waterproofing": Building2,
  "Painting": Paintbrush,
  "Carpentry": Hammer,
  "Cleaning": Sparkles,
  "Pest Control": Bug,
  "Gardening & Landscaping": Trees,
  "Construction & Renovation": Ruler,
  "Glass & Aluminum": SquareStack,
  "Locksmith": KeyRound,
  "Internet & CCTV": Wifi,
  "Moving & Delivery": Truck,
  "Auto Services": Car,
  "Appliance Repair": Cog,
  "Water Solutions": Droplets,
  "Solar Services": Sun,
  "Mobile & Computer Repair": Smartphone,
};

const primaryBtn =
  "w-full sm:w-auto rounded-xl bg-[#FA7C0E] px-6 py-3 text-sm sm:px-9 " +
  "sm:py-4 sm:text-base font-semibold text-white transition-all " +
  "duration-300 hover:scale-105 hover:bg-[#12C2EE] text-center";

const outlineBtn =
  "w-full sm:w-auto rounded-xl border-2 border-[#FA7C0E] bg-transparent " +
  "px-6 py-3 text-sm sm:px-9 sm:py-4 sm:text-base font-semibold " +
  "text-white transition-all duration-300 hover:bg-[#FA7C0E] text-center";

const serviceCard =
  "flex flex-col items-center justify-center rounded-xl border " +
  "border-[#2A2820] bg-[#151410] p-3 sm:p-5 transition-all duration-200 " +
  "hover:scale-105 hover:shadow-md";

export default function Signup() {
  return (
    <>
      <section className="bg-[#0B0A07] px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
            Run a stronger service business
          </h1>

          <p className="mt-4 text-sm font-light text-[#9BA295] sm:mt-6 sm:text-base md:text-xl">
            Apni shop online karen, clients se seedha call, chat aur booking
            karwayen. Pakistan ke har tarah ke mechanics ek jagah.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href="/register-shop" className={primaryBtn}>
              Register Your Shop
            </Link>

            <a href="#shops" className={outlineBtn}>
              Find a Mechanic
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center text-white sm:mt-14">
            <IoLogoGooglePlaystore className="text-3xl sm:text-4xl" />

            <div className="mt-3 flex items-center gap-2 sm:gap-3">
              <span className="text-xl font-bold sm:text-2xl">4.5</span>
              <div className="flex gap-1 text-[#F0EC57]">
                <FaStarOfDavid />
                <FaStarOfDavid />
                <FaStarOfDavid />
                <FaStarOfDavid />
                <FaStarOfDavid />
              </div>
            </div>

            <span className="mt-2 text-xs text-[#9BA295] sm:text-sm">
              5880 Google Play Reviews
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl sm:mt-16">
          <h2 className="mb-4 text-center text-xl font-bold text-white sm:mb-6 sm:text-2xl">
            Browse by Service
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = iconMap[service.title] || Wrench;
              return (
                <div key={service.id} className={serviceCard}>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#FA7C0E]/10 sm:mb-3 sm:h-14 sm:w-14">
                    <Icon
                      className="h-6 w-6 text-[#FA7C0E] sm:h-7 sm:w-7"
                      strokeWidth={1.8}
                    />
                  </div>
                  <p className="text-center text-xs font-medium text-white sm:text-sm">
                    {service.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MechanicsMarquee />

      <MechanicListings />
      <Servicesdata/>

    
    </>
  );
}