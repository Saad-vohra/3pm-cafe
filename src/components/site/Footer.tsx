"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Shield,
  X,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useDynamicBrand, useDynamicLegal } from "@/lib/dynamic-store";
import { useLang } from "@/lib/i18n";

// Small custom Instagram SVG Logo
function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Small custom WhatsApp SVG Logo
function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Footer() {
  const brandSettings = useDynamicBrand();
  const legal = useDynamicLegal();
  const { lang, t, display } = useLang();
  const router = useRouter();

  // State for Privacy Policy & Terms Modal
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const waUrl = BRAND.whatsappUrl;
  const igUrl = BRAND.instagramUrl;

  return (
    <footer className="relative z-10 mt-14 sm:mt-20 rounded-t-[28px] sm:rounded-t-[36px] bg-[#1e3932] px-[5%] sm:px-[6%] pt-8 sm:pt-12 pb-7 text-paper overflow-hidden shadow-2xl border-t border-white/10">
      {/* Top Branding Section: Balanced Logo Emblem + SUFI'S CAFE Header */}
      <div className="pb-6 sm:pb-8 border-b border-white/15">
        <div className="flex items-center gap-3.5 sm:gap-5">
          <img
            src="/images/logo.png"
            alt="Sufi's Cafe Logo Emblem"
            className="size-12 sm:size-16 rounded-full object-contain bg-white p-1 ring-2 ring-white/20 shadow-xl shrink-0 transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className={`${display} flex items-baseline gap-2 sm:gap-3 leading-none text-paper select-none font-bold tracking-tight text-[26px] sm:text-[38px] md:text-[46px]`}
            >
              <span>SUFI&apos;S</span>
              <span className="text-[#d4e9e2]">CAFE</span>
            </motion.div>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#d4e9e2]/85 mt-1 sm:mt-1.5">
              Coffee · Comfort · Connection
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Compact 3 Columns */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 py-8 sm:py-10 border-b border-white/15">
        {/* Column 1: Concise Blurb + Social / Call Icon Buttons (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <p className="max-w-md text-xs sm:text-sm text-paper/85 leading-relaxed font-normal">
            {lang === "en"
              ? "Where every sip brings peace to your soul. Authentic specialty coffees, Turkish brews, fresh French bakes & heartfelt conversations in Kajipura, Gujarat."
              : "कजीपुरा, गुजरात में ताज़ी कॉफ़ी, तुर्की काढ़ा, लज़ीज़ बेकरी और सुकून भरा सूफ़ी माहौल।"}
          </p>

          {/* Social & Contact Icons (Clean circular buttons without long number text) */}
          <div>
            <p className="eyebrow !text-[#d4e9e2] !text-[10px] font-bold mb-2.5 tracking-[0.2em]">
              {lang === "en" ? "CONNECT DIRECTLY" : "संपर्क करें"}
            </p>
            <div className="flex items-center gap-2.5">
              {/* Instagram Icon */}
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#1e3932] transition-all hover:scale-110 shadow-xs cursor-pointer"
              >
                <InstagramIcon className="size-4" />
              </a>

              {/* WhatsApp Icon */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full bg-[#006241] border border-white/20 text-white hover:bg-[#004f36] transition-all hover:scale-110 shadow-xs cursor-pointer"
              >
                <WhatsAppIcon className="size-4" />
              </a>

              {/* Call Primary Icon */}
              <a
                href={BRAND.tel}
                aria-label={`Call ${BRAND.phone}`}
                title={`Call ${BRAND.phone}`}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#1e3932] transition-all hover:scale-110 shadow-xs cursor-pointer"
              >
                <Phone className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links (Side by Side 2-col on Mobile!) (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <p className="eyebrow !text-[#d4e9e2] !text-[10px] font-bold tracking-[0.2em]">
            {lang === "en" ? "QUICK LINKS" : "त्वरित लिंक"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-paper/85">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline text-left cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{t.home}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/menu")}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline text-left cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{t.menu}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/about")}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline text-left cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{t.aboutUs}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/gallery")}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline text-left cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{t.gallery}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline text-left cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{t.contactUs}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/contact?booking=true#booking-form")}
              className="inline-flex items-center gap-1.5 transition-colors hover:underline text-left font-bold text-[#d4e9e2] hover:text-white cursor-pointer"
            >
              <ArrowRight className="size-3 text-[#d4e9e2]" />
              <span>{lang === "en" ? "Reserve a Table" : "टेबल बुक करें"}</span>
            </button>
          </div>
        </div>

        {/* Column 3: Location & Hours (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <p className="eyebrow !text-[#d4e9e2] !text-[10px] font-bold tracking-[0.2em]">
            {lang === "en" ? "LOCATION & HOURS" : "स्थान और समय"}
          </p>
          <div className="space-y-2.5 text-xs sm:text-sm text-paper/85">
            <div className="flex items-start gap-2">
              <Clock className="size-3.5 shrink-0 text-[#d4e9e2] mt-0.5" />
              <div>
                <span className="font-bold text-white">{lang === "en" ? "Open Daily: " : "रोज़ाना खुला: "}</span>
                <span className="text-paper/80">{BRAND.hours}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="size-3.5 shrink-0 text-[#d4e9e2] mt-0.5" />
              <div>
                <p className="font-bold text-white leading-tight">Kajipura, Gujarat</p>
                <p className="text-[11px] sm:text-xs text-paper/75 leading-relaxed mt-0.5">
                  Sufi&apos;s Cafe, c/o Dawat Restaurant, Ahmedabad-Narol-Kheda Highway, Kajipura, Gujarat 387120
                </p>
              </div>
            </div>

            {BRAND.locations[0]?.maps && (
              <div className="pt-1">
                <a
                  href={BRAND.locations[0].maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4e9e2] hover:underline hover:text-white transition-colors"
                >
                  <span>{lang === "en" ? "Open in Google Maps" : "गूगल मैप्स में देखें"}</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Copyright, Noor Technolab Credit, and Privacy/Terms */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/75">
        {/* Copyright */}
        <div className="flex items-center gap-1 text-center sm:text-left">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-bold text-white">{BRAND.name}.</span>
          <span>{lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}</span>
        </div>

        {/* Developer Credit: Noor Technolab */}
        <div className="flex items-center gap-1.5 text-center text-xs">
          <span>Developed by</span>
          <a
            href="https://www.noortechnolab.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#d4e9e2] hover:text-white underline underline-offset-4 transition-colors"
          >
            Noor Technolab
          </a>
        </div>

        {/* Privacy Policy & Terms and Conditions */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <Link
            href="/privacy"
            className="text-paper/80 hover:text-white hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <span>·</span>
          <Link
            href="/terms"
            className="text-paper/80 hover:text-white hover:underline transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>

      {/* PRIVACY POLICY & TERMS & CONDITIONS MODAL */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 text-ink">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[28px] border border-[#006241]/20 bg-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#006241]/10">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#006241]/10 text-[#006241]">
                    <Shield className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e3932]">
                      {legalModal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                    </h3>
                    <p className="text-xs text-[#4a6058]">{BRAND.name} · Kajipura, Gujarat</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="flex size-8 items-center justify-center rounded-full bg-paper text-[#1e3932] hover:bg-[#006241]/10 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Scrollable Legal Content */}
              <div className="overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-[#2d4a40] leading-relaxed pr-2 max-h-[60vh]">
                {(legalModal === "privacy" ? legal.privacyPolicy : legal.termsOfUse)
                  .split("\n\n")
                  .map((block: string, i: number) => {
                    const trimmed = block.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith("### ")) {
                      return (
                        <h4 key={i} className="font-bold text-sm sm:text-base text-[#1e3932] pt-2 border-t border-[#006241]/10 first:border-none first:pt-0">
                          {trimmed.replace("### ", "")}
                        </h4>
                      );
                    }
                    return (
                      <p key={i} className="leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#006241]/10 flex items-center justify-between gap-3">
                <Link
                  href={legalModal === "privacy" ? "/privacy" : "/terms"}
                  onClick={() => setLegalModal(null)}
                  className="text-xs text-[#07543D] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open Dedicated Page</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="btn-ink !py-2 !px-5 text-xs font-semibold cursor-pointer"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
