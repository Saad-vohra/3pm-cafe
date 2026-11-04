"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Coffee, MessageCircle, Phone, Utensils } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BRAND } from "@/lib/brand";
import { useDynamicBrand, useDynamicLegal } from "@/lib/dynamic-store";

export default function TermsOfUsePage() {
  const brand = useDynamicBrand();
  const legal = useDynamicLegal();

  const sections = legal.termsOfUse
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
            <Utensils className="size-3.5" />
            <span>Cafe Guidelines · In-Store Dining & Showcase</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3932] tracking-tight">
            Terms of Use &amp; Cafe Guidelines
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#4a6058] leading-relaxed">
            Last updated: October 2026 · {BRAND.name}, Kajipura, Gujarat
          </p>
        </div>

        {/* Physical Cafe Notice Banner */}
        <div className="mb-10 rounded-2xl bg-amber-50 border border-amber-200/80 p-5 sm:p-6 shadow-xs">
          <h2 className="text-base font-bold text-amber-950 flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-amber-700" />
            <span>Important Notice: Purely a Digital Display Menu</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Sufi's Cafe operates this website exclusively as an informational culinary showcase. We do not sell food or beverages online, accept digital cart checkouts, or process web payments. All culinary items, specialty brews, and bakery treats are prepared and purchased exclusively in person at our cafe in Kajipura, Gujarat.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-white border border-[#006241]/15 shadow-xs">
            <Coffee className="size-5 text-[#07543D] mb-2" />
            <h3 className="font-bold text-sm text-[#1e3932]">Fresh Daily Preparation</h3>
            <p className="text-xs text-[#526a60] mt-1 leading-relaxed">
              All dishes and specialty coffees are served subject to daily in-store availability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#006241]/15 shadow-xs">
            <MessageCircle className="size-5 text-[#07543D] mb-2" />
            <h3 className="font-bold text-sm text-[#1e3932]">Table Inquiries</h3>
            <p className="text-xs text-[#526a60] mt-1 leading-relaxed">
              Online requests serve as inquiries and are confirmed by our manager based on floor seating.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#006241]/15 shadow-xs">
            <CheckCircle2 className="size-5 text-[#07543D] mb-2" />
            <h3 className="font-bold text-sm text-[#1e3932]">Tranquil Sanctuary</h3>
            <p className="text-xs text-[#526a60] mt-1 leading-relaxed">
              We cultivate a peaceful, respectful, and family-friendly atmosphere for all patrons.
            </p>
          </div>
        </div>

        {/* Dynamic Legal Content */}
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

        {/* Contact & Inquiries */}
        <div className="mt-14 rounded-2xl bg-[#1e3932] text-paper p-6 sm:p-8 shadow-xl">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Visiting Sufi's Cafe in Kajipura
          </h3>
          <p className="text-xs sm:text-sm text-[#d4e9e2] mb-6 leading-relaxed">
            We look forward to welcoming you for fresh brews, warm food, and peaceful conversations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={brand.mapsUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006241] hover:bg-[#004f36] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <span>Get Directions on Google Maps →</span>
            </a>

            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all"
            >
              <span>Read Privacy Policy →</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
