"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";

// Map Pin / Direct Directions Icon
function MapPinIcon({ className = "size-5" }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Instagram Icon
function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
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

// WhatsApp Icon
function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.07.81.82-2.99-.19-.31a8.18 8.18 0 0 1-1.25-4.47c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.16 1.6.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.24-.17-.49-.29z" />
    </svg>
  );
}

// Phone Call Handset Icon
function PhoneCallIcon({ className = "size-5" }: { className?: string }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function Navbar({
  headerRef,
}: {
  sticky?: boolean;
  showBack?: boolean;
  headerRef?: React.Ref<HTMLElement>;
} = {}) {
  const { t, display, lang } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Clean, direct navigation helper
  const handleNav = (path: string) => {
    setOpen(false);
    if (pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  const navLinks = [
    { id: "home", label: t.home, path: "/" },
    { id: "menu", label: t.menu, path: "/menu" },
    { id: "about", label: t.aboutUs, path: "/about" },
    { id: "gallery", label: t.gallery, path: "/gallery" },
    { id: "contact", label: t.contactUs, path: "/contact" },
  ];

  // Direct Google Maps Directions URL from user's location to Sufi's Cafe
  const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Sufi%27s+Cafe,+c/o+Dawat+Restaurant,+Ahmedabad-Narol-Kheda+Highway,+Kajipura,+Gujarat+387120";

  return (
    <>
      {/* Fullscreen Overlay Drawer Menu (primarily for mobile) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] bg-[#1e3932] overflow-y-auto"
          >
            {/* Top Close Button (floating top right) */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-8 z-10">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Main Content Container: Original left-aligned position */}
            <div className="container-x flex min-h-full flex-col justify-center gap-1 sm:gap-2 py-14 sm:py-20">
              {/* Navigation Links — Original position & display typography */}
              <div className="flex flex-col gap-1 sm:gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      onClick={() => handleNav(link.path)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 * idx }}
                      className={`group flex items-center gap-3 text-left text-paper hover:text-white ${display} transition-colors cursor-pointer py-0.5`}
                      style={{ fontSize: "clamp(38px, 6.5vh, 64px)", lineHeight: 1.15 }}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        {link.label}
                      </span>
                      {isActive && (
                        <span className="size-2 sm:size-2.5 rounded-full bg-[#d4e9e2] shadow-[0_0_8px_rgba(212,233,226,0.8)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Themed Divider Line */}
              <div className="hairline my-6 sm:my-8 border-t border-white/15" />

              {/* Themed Social & Direct Contact Actions */}
              <div className="flex flex-col items-start gap-4">
                {/* 4 Circular Outline Buttons: Locate Us / Directions, Instagram, WhatsApp, Call */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Locate Us / Directions to Sufi's Cafe */}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Locate Us - Get Directions to Sufi's Cafe"
                    title="Get Directions to Sufi's Cafe"
                    className="size-11 sm:size-12 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
                  >
                    <MapPinIcon className="size-5" />
                  </a>

                  {/* Instagram */}
                  <a
                    href={BRAND.instagramUrl || "https://www.instagram.com/__.sufiscafe?cplk=MW9saTB4NXppZnQzOA=="}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Follow Sufi's Cafe on Instagram"
                    className="size-11 sm:size-12 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
                  >
                    <InstagramIcon className="size-5" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918320812121"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                    className="size-11 sm:size-12 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
                  >
                    <WhatsAppIcon className="size-5" />
                  </a>

                  {/* Call */}
                  <a
                    href="tel:+918320812121"
                    aria-label="Call"
                    title="Call Sufi's Cafe"
                    className="size-11 sm:size-12 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
                  >
                    <PhoneCallIcon className="size-5" />
                  </a>
                </div>

                {/* Call / WhatsApp Text matching theme */}
                <p className="text-sm sm:text-base font-medium text-paper/90">
                  <span className="text-[#d4e9e2]">Call / WhatsApp: </span>
                  <a
                    href="tel:+918320812121"
                    className="text-white font-bold underline underline-offset-4 hover:text-[#d4e9e2] transition-colors"
                  >
                    +91 83208 12121
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky White/Cream Navbar Bar matching original design */}
      <header
        ref={headerRef as never}
        className="sticky top-0 z-[60] w-full border-b border-[#006241]/15 bg-[#fbf9f5]/95 backdrop-blur-md shadow-xs transition-colors duration-300"
      >
        <div className="w-full px-4 sm:px-8 lg:px-14 py-1.5 sm:py-2.5 lg:py-2 flex items-center justify-between">
          {/* Left: Brand Logo + SUFI'S (top) + CAFE (small below) */}
          <button
            type="button"
            onClick={() => handleNav("/")}
            className="group flex items-center gap-3 sm:gap-3.5 lg:gap-4 py-0.5 text-left cursor-pointer"
          >
            <img
              src="/images/logo.png"
              alt="Sufi's Cafe Logo"
              className="size-11 sm:size-12 lg:size-[50px] rounded-full object-contain ring-2 ring-[#006241]/25 drop-shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 bg-white p-0.5"
            />
            <div className="h-8 sm:h-9 lg:h-9 w-px bg-[#006241]/25" />
            <div className="flex flex-col text-left">
              <span
                className="font-serif tracking-[0.15em] font-bold leading-none text-[#006241]"
                style={{ fontSize: "clamp(20px, 2.2vw, 25px)" }}
              >
                SUFI&apos;S
              </span>
              <span className="text-[10px] sm:text-[11px] lg:text-[11px] font-bold uppercase tracking-[0.3em] mt-1 leading-none text-[#006241]/85">
                CAFE
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links (Home, Menu, About Us, Gallery, Contact) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className={`text-[15px] xl:text-[16px] font-bold transition-all relative py-1 cursor-pointer ${
                    active
                      ? "text-[#006241]"
                      : "text-[#1e3932]/75 hover:text-[#006241] hover:scale-105"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 block h-[2.5px] w-full rounded-full bg-[#006241]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Partition: Desktop has Call + Locate Us; Mobile has Call Icon + Navbar Hamburger Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Call Icon Button: White/Cream circle with dark green phone */}
            <a
              href={BRAND.tel}
              aria-label="Call Sufi's Cafe"
              title="Call Sufi's Cafe"
              className="lg:hidden size-9 rounded-full border border-[#006241]/35 bg-white text-[#006241] hover:bg-[#006241]/10 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Phone className="size-4 text-[#006241]" />
            </a>

            {/* Desktop Call Pill Button */}
            <a
              href={BRAND.tel}
              aria-label="Call Sufi's Cafe"
              className="hidden lg:inline-flex btn-line !py-1.5 !px-3.5 text-xs sm:text-sm items-center gap-2 !border-[#006241]/35 !text-[#006241] hover:!bg-[#006241]/10 font-bold rounded-full shadow-2xs"
            >
              <Phone className="size-4 text-[#006241]" />
              <span>{BRAND.phone}</span>
            </a>

            {/* Desktop Locate Us Button with Map Pin Symbol */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Locate Us - Directions to Sufi's Cafe"
              className="hidden lg:inline-flex btn-ink !bg-[#006241] !border-[#006241] text-white hover:!bg-[#004f36] shadow-sm items-center gap-2 !py-1.5 !px-4 !rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 cursor-pointer"
            >
              <MapPin className="size-4 text-white" />
              <span>Locate Us</span>
            </a>

            {/* Mobile Navbar Hamburger Button: Dark green button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden size-9 rounded-full bg-[#006241] border border-[#006241] text-white hover:bg-[#004f36] shadow-sm flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.8px] w-4 bg-white"
                  animate={open ? { y: 0, rotate: 45 } : { y: -5, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.8px] w-4 bg-white"
                  animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
