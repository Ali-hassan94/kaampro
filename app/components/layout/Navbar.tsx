"use client";

import { useState } from "react";
import Link from "next/link";
import { MdLogin, MdAddIcCall } from "react-icons/md";
import { Menu, X, ChevronDown } from "lucide-react";

const PRODUCT_LINKS = [
  "Quoting", "Online Bookings", "Client Management", "Sales Pipeline",
  "AI Tools", "Invoicing", "Scheduling", "Client Hub", "Team Management",
  "Receptionist", "Payments", "Field Documentation", "Job Management",
  "Client Communication", "Marketing Tools",
];

const INDUSTRY_LINKS = [
  "Home Repair", "AC & HVAC", "Plumbing", "⚡ Electrical",
  "🧱 Roofing & Waterproofing", "🎨 Painting", "🪚 Carpentry", "🧹 Cleaning",
  "🐜 Pest Control", "🌳 Gardening & Landscaping", "🔨 Construction & Renovation",
  "🪟 Glass & Aluminum", "🔑 Locksmith", "📡 Internet & CCTV",
  "🚚 Moving & Delivery", "🚗 Auto Services", "🔧 Appliance Repair",
  "💧 Water Solutions",
];

const RESOURCE_GROUPS = [
  {
    title: "Learn",
    links: ["Home Servcies Trend", "Services Type", "Service Guide", "FAQs"],
  },
  {
    title: "Community",
    links: [
      "How to Book a Service",
      "Home Services Community",
      "Service Areas",
      "Jobber Summit",
      "Events",
    ],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us"],
  },
];

const PRICING_GROUPS = [
  {
    title: "Home Services",
    links: [
      "AC Repair",
      "Plumbing",
      "Electrical",
      "Home Appliance Repair",
      "General Home Repair",
    ],
  },
  {
    title: "Business Services",
    links: ["Office Electrical", "Commercial Plumbing", "AC Maintenance"],
  },
  {
    title: "Pricing Information",
    links: [
      "Service Charges",
      "Home Visit Charges",
      "Emergency Service",
      "How Pricing Works",
    ],
  },
];

const hoverLinkClass = "hover:text-[#FA7C0E]";

const megaLinkClass =
  "block py-2 text-sm hover:shadow-gray-200 hover:bg-amber-500 " +
  "hover:rounded-xl hover:text-center hover:font-serif hover:text-white";

function DesktopMegaMenu({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="group hidden lg:block">
      <Link
        href="#"
        className={`flex items-center gap-1 py-8 ${hoverLinkClass}`}
      >
        {label}
        <ChevronDown size={16} />
      </Link>

      <div className="absolute left-0 top-full z-50 hidden w-full group-hover:block">
        <div className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-12 py-10">{children}</div>
        </div>
      </div>
    </li>
  );
}

function MobileAccordionGroup({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <p className="mb-2 font-bold text-[#FA7C0E]">{title}</p>
      <div className="flex flex-col gap-2 pl-2">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="text-sm text-[#0B0A07] hover:text-[#FA7C0E]"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 font-semibold text-[#0B0A07]"
      >
        {label}
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && <div className="space-y-6 pb-5">{children}</div>}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <nav className="flex h-auto min-h-[44px] flex-wrap items-center justify-between gap-2 bg-[#0B0A07] px-4 py-2 sm:px-8 lg:px-12">
        <div className="text-xs text-white sm:text-sm">
          <span className="hidden sm:inline">
            Limited offer time: save up to 30%
          </span>
          <span className="sm:hidden">Save up to 30%</span>
          <Link
            href="#"
            className="ml-3 text-[#FA7C0E] hover:text-[#62EF0A] sm:ml-10"
          >
            Save Now
          </Link>
        </div>

        <Link
          href="/register-shop"
          className={`flex items-center gap-2 text-sm text-white sm:text-base ${hoverLinkClass}`}
        >
          Log In
          <MdLogin className="text-xl sm:text-2xl" />
        </Link>
      </nav>

      {/* Main Navbar */}
      <nav className="relative flex h-[70px] items-center bg-white px-4 sm:px-8 lg:h-[80px] lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#0B0A07] lg:text-3xl"
        >
          JOB<span className="text-[#FA7C0E]">NEST</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="ml-8 hidden shrink items-center gap-5 whitespace-nowrap font-semibold lg:flex lg:ml-12 lg:gap-7 xl:ml-16 xl:gap-10">
          <DesktopMegaMenu label="Product">
            <div className="grid grid-cols-5 gap-x-10 gap-y-8">
              {PRODUCT_LINKS.map((link) => (
                <Link key={link} href="#" className={hoverLinkClass}>
                  {link}
                </Link>
              ))}
            </div>
          </DesktopMegaMenu>

          <DesktopMegaMenu label="Industries">
            <div className="grid grid-cols-5 gap-x-10 gap-y-8">
              {INDUSTRY_LINKS.map((link) => (
                <Link key={link} href="#" className={hoverLinkClass}>
                  {link}
                </Link>
              ))}
            </div>
          </DesktopMegaMenu>

          <DesktopMegaMenu label="Resources">
            <div className="grid grid-cols-3 gap-x-10">
              {RESOURCE_GROUPS.map((group) => (
                <div key={group.title}>
                  <span className="text-xl font-bold text-blue-500">
                    {group.title}
                  </span>
                  <div className="mt-3 grid grid-cols-1 gap-y-4 text-lg font-normal">
                    {group.links.map((link) => (
                      <Link key={link} href="#" className={megaLinkClass}>
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DesktopMegaMenu>

          <DesktopMegaMenu label="Pricing">
            <div className="grid grid-cols-3 gap-x-10">
              {PRICING_GROUPS.map((group) => (
                <div key={group.title}>
                  <span className="text-xl font-bold text-blue-500">
                    {group.title}
                  </span>
                  <div className="mt-3 grid grid-cols-1 gap-y-4 text-lg font-normal">
                    {group.links.map((link) => (
                      <Link key={link} href="#" className={megaLinkClass}>
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DesktopMegaMenu>
        </ul>

        {/* Right (desktop) */}
        <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex xl:gap-6">
          <Link
            href="tel:03103029594"
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-sm ${hoverLinkClass}`}
          >
            <MdAddIcCall />
            03103029594
          </Link>

          <Link
            href="/admin"
            className={`shrink-0 whitespace-nowrap text-sm ${hoverLinkClass}`}
          >
            Admin
          </Link>

          <button className="shrink-0 whitespace-nowrap rounded-xl bg-[#FA7C0E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B0A07] xl:px-7 xl:py-3 xl:text-base">
            Start Free Trial
          </button>
        </div>

        {/* Mobile / Tablet right side */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link
            href="tel:03103029594"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FA7C0E]/10 text-[#FA7C0E]"
          >
            <MdAddIcCall size={18} />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#0B0A07]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Menu Panel */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-gray-200 bg-white px-4 sm:px-8 lg:hidden">
          <MobileAccordion
            label="Product"
            isOpen={openSection === "product"}
            onToggle={() => toggleSection("product")}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-sm text-[#0B0A07] hover:text-[#FA7C0E]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </MobileAccordion>

          <MobileAccordion
            label="Industries"
            isOpen={openSection === "industries"}
            onToggle={() => toggleSection("industries")}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {INDUSTRY_LINKS.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-sm text-[#0B0A07] hover:text-[#FA7C0E]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </MobileAccordion>

          <MobileAccordion
            label="Resources"
            isOpen={openSection === "resources"}
            onToggle={() => toggleSection("resources")}
          >
            {RESOURCE_GROUPS.map((group) => (
              <MobileAccordionGroup
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </MobileAccordion>

          <MobileAccordion
            label="Pricing"
            isOpen={openSection === "pricing"}
            onToggle={() => toggleSection("pricing")}
          >
            {PRICING_GROUPS.map((group) => (
              <MobileAccordionGroup
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </MobileAccordion>

          <div className="flex flex-col gap-3 py-5">
            <Link
              href="tel:03103029594"
              className="flex items-center justify-center gap-2 text-[#0B0A07]"
            >
              <MdAddIcCall />
              03103029594
            </Link>

            <Link
              href="/admin"
              className="text-center text-sm text-[#0B0A07] hover:text-[#FA7C0E]"
            >
              Admin
            </Link>

            <button className="w-full rounded-xl bg-[#FA7C0E] py-3 font-semibold text-white transition hover:bg-[#0B0A07]">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </div>
  );
}