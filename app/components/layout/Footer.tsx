"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const PRODUCT_LINKS = [
  "Quoting", "Online Bookings", "Client Management", "Scheduling",
  "Invoicing", "Payments",
];

const INDUSTRY_LINKS = [
  "Home Repair", "AC & HVAC", "Plumbing", "Electrical",
  "Cleaning", "Auto Services",
];

const RESOURCE_LINKS = [
  "Help Center", "Service Guide", "Success Stories", "FAQs", "Contact Us",
];

const COMPANY_LINKS = [
  "About Us", "Careers", "Privacy Policy", "Terms of Service",
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaXTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const colTitleClass = "mb-4 text-sm font-bold uppercase tracking-wide text-white sm:mb-5";

const colLinkClass = "text-sm text-[#9BA295] transition hover:text-[#FA7C0E]";

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className={colTitleClass}>{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className={colLinkClass}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const [secretClicks, setSecretClicks] = useState(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretClick = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);

    if (resetTimer.current) clearTimeout(resetTimer.current);

    if (next >= 5) {
      setSecretClicks(0);
      router.push("/admin");
      return;
    }

    // 2 second ke andar 5 click na hon to counter wapas 0
    resetTimer.current = setTimeout(() => setSecretClicks(0), 2000);
  };

  return (
    <footer className="bg-[#0B0A07] px-4 pt-14 text-white sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 gap-8 border-b border-[#2A2820] pb-12 sm:grid-cols-3 sm:gap-10 md:grid-cols-5 md:pb-14">
          {/* Brand block spans full width on mobile */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white sm:text-3xl">
              KAAM<span className="text-[#FA7C0E]">PRO</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9BA295]">
              Pakistan ka trusted platform jahan customers aur service
              providers seedha connect hote hain.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2820] text-[#9BA295] transition hover:border-[#FA7C0E] hover:text-[#FA7C0E]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Industries" links={INDUSTRY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        {/* Contact row */}
        <div className="flex flex-col gap-4 border-b border-[#2A2820] py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="flex flex-col gap-4 text-sm text-[#9BA295] sm:flex-row sm:items-center sm:gap-8">
            <a
              href="tel:03103029594"
              className="flex items-center gap-2 transition hover:text-[#FA7C0E]"
            >
              <Phone size={16} />
              03103029594
            </a>

            <a
              href="mailto:support@kaampro.pk"
              className="flex items-center gap-2 transition hover:text-[#FA7C0E]"
            >
              <Mail size={16} />
              support@kaampro.pk
            </a>

            <span className="flex items-center gap-2">
              <MapPin size={16} />
              Lahore, Pakistan
            </span>
          </div>

          <Link
            href="/register-shop"
            className="inline-block w-full rounded-xl bg-[#FA7C0E] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#12C2EE] sm:w-auto"
          >
            Register Your Shop
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-[#77786F] sm:flex-row sm:text-sm">
          <p
            onClick={handleSecretClick}
            className="cursor-default select-none"
          >
            © {year} KaamPro. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="#" className="transition hover:text-[#FA7C0E]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-[#FA7C0E]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}