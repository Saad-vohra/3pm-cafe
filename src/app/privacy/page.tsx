"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, MessageCircle, Phone, Shield } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BRAND } from "@/lib/brand";
import { useDynamicBrand, useDynamicLegal } from "@/lib/dynamic-store";

export default function PrivacyPolicyPage() {
  const brand = useDynamicBrand();
  const legal = useDynamicLegal();

  const sections = legal.privacyPolicy
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="relative min-h-screen bg-paper text-[#1e3932] overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#07543D] hover:underline transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-10 pb-8 border-b border-[#006241]/15">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006241]/10 text-[#07543D] text-xs font-bold tracking-wider uppercase mb-4">
            <Shield className="size-3.5" />
            <span>Legal Notice · Informational Showcase</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3932] tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#4a6058] leading-relaxed">
            Last updated: October 2026 · {BRAND.name}, Kajipura, Gujarat
          </p>
        </div>

        {/* Highlight Summary Box */}
        <div className="mb-10 rounded-2xl bg-[#f4ece1] border border-[#006241]/15 p-5 sm:p-6 shadow-xs">
          <h2 className="text-base font-bold text-[#1e3932] flex items-center gap-2 mb-3">
            <Lock className="size-4 text-[#07543D]" />
            <span>Summary of Our Privacy Standards</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#334d43]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Non-E-Commerce Display:</strong> This website is purely a culinary showcase and digital menu for our physical cafe in Kajipura. We do not process online payments, charge credit cards, or store financial credentials.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Commercial Sale of Data:</strong> We never sell, lease, or monetize your contact information to third-party advertisers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Direct Guest Inquiries:</strong> Contact information provided via WhatsApp or phone is used solely to respond to table reservations and cafe event requests.
              </span>
            </li>
          </ul>
        </div>

        {/* Dynamic Legal Policy Content */}
        <div className="space-y-6">
          {sections.map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <div
                  key={idx}
                  className="pt-4 border-t border-[#006241]/10 first:border-none first:pt-0"
                >
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1e3932] mb-2 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#07543D]" />
                    <span>{block.replace("### ", "")}</span>
                  </h3>
                </div>
              );
            }
            return (
              <p
                key={idx}
                className="text-sm sm:text-base text-[#2d4a40] leading-relaxed font-sans"
              >
                {block}
              </p>
            );
          })}
        </div>

        {/* Contact & Queries Box */}
        <div className="mt-14 rounded-2xl bg-[#1e3932] text-paper p-6 sm:p-8 shadow-xl">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Have questions about our privacy guidelines?
          </h3>
          <p className="text-xs sm:text-sm text-[#d4e9e2] mb-6 leading-relaxed">
            Our hospitality team is happy to assist you directly regarding your personal inquiries or table reservations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={brand.whatsapp ? `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%203PM%20Cafe%21` : BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006241] hover:bg-[#004f36] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1e3932] hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <Phone className="size-4" />
              <span>Call {brand.phone}</span>
            </a>

            <Link
              href="/terms"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all"
            >
              <span>View Terms of Use →</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
