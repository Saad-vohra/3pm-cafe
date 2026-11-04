"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { AtSign, Clock, Leaf, Mail, MapPin, MessageCircle, Phone, Plus, Sparkles, Utensils } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CursorTrail } from "@/components/site/CursorTrail";
import { Footer } from "@/components/site/Footer";
import { IntroRibbon } from "@/components/site/IntroRibbon";
import { Navbar } from "@/components/site/Navbar";
import { categoryMin } from "@/data/menu";
import { BRAND, money } from "@/lib/brand";
import { useDynamicFavorites, useDynamicBrand } from "@/lib/dynamic-store";
import { useLang } from "@/lib/i18n";
import { homeIntroSeen, markHomeIntroSeen } from "@/lib/introState";
import { pendingScroll, setPendingScroll } from "@/lib/pendingScroll";
import { NOINTRO, STILL, scrollToId, useLenis } from "@/lib/scroll";

const HERO_SLIDES = [
  {
    src: "/images/hero-slide-2.jpg",
    alt: "Warm cafe counter with iced matcha latte, cappuccino and fresh croissants at Sufi's Cafe",
    objectPosition: "center center",
    transformOrigin: "center center",
  },
  {
    src: "/images/hero-slide-1.jpg",
    alt: "Matcha iced latte, toast with avocado, cappuccino and croissant at Sufi's Cafe",
    objectPosition: "center center",
    transformOrigin: "center center",
  },
  {
    src: "/images/hero-slide-3.jpg",
    alt: "Caramel iced drink, grilled cheese sandwich and tiramisu at Sufi's Cafe",
    objectPosition: "88% 70%",
    transformOrigin: "88% 70%",
  },
];

const MOBILE_HERO_SLIDES = [
  {
    src: "/images/hero-mobile-cheese.jpg",
    alt: "Cheesy pull-apart garlic bread, loaded nachos and strawberry drink at Sufi's Cafe",
  },
  {
    src: "/images/hero-mobile-terracotta.jpg",
    alt: "Iced caramel latte, artisan tiramisu dessert and roasted coffee beans at Sufi's Cafe",
  },
  {
    src: "/images/hero-mobile-mocktail.jpg",
    alt: "Vibrant blue curacao mocktail, mint lime mojito and fresh citrus at Sufi's Cafe",
  },
];

function TeardropPin({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C7.58 2 4 5.58 4 10C4 15.35 11.24 21.46 11.55 21.72C11.68 21.83 11.84 21.89 12 21.89C12.16 21.89 12.32 21.83 12.45 21.72C12.76 21.46 20 15.35 20 10C20 5.58 16.42 2 12 2ZM12 13.2C10.23 13.2 8.8 11.77 8.8 10C8.8 8.23 10.23 6.8 12 6.8C13.77 6.8 15.2 8.23 15.2 10C15.2 11.77 13.77 13.2 12 13.2Z"
      />
    </svg>
  );
}

const GALLERY = [
  "/images/caramel-iced-latte.jpg",
  "/images/veg-burger.jpg",
  "/images/berry-bliss.jpg",
  "/images/tiramisu-dessert.jpg",
  "/images/latte.jpg",
  "/images/sufi-special-dessert.jpg",
  "/images/cheesecake.jpg",
  "/images/iced-coffee.jpg",
  "/images/kitkat-shake.jpg",
  "/images/loaded-fries.jpg",
  "/images/masala-chai.jpg",
  "/images/hot-matcha.jpg",
];

const galleryAlt = (src: string) =>
  `${src
    .split("/")
    .pop()!
    .replace(/\.[a-z]+$/, "")
    .replace(/-/g, " ")} at ${BRAND.name}`;

export default function HomePage() {
  const { t, lang, display } = useLang();
  const router = useRouter();
  const brand = useDynamicBrand();
  const still = STILL();
  const [intro, setIntro] = useState(() => !NOINTRO() && !homeIntroSeen());

  useLenis(!still);

  useEffect(() => {
    if (!intro) return;
    markHomeIntroSeen();
  }, [intro]);

  useEffect(() => {
    if (pendingScroll) {
      const id = pendingScroll;
      setPendingScroll(null);
      window.setTimeout(() => scrollToId(id), 260);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-paper overflow-x-hidden max-w-full">
      {intro && <IntroRibbon color="#006241" onDone={() => setIntro(false)} />}
      <div
        className="bg-blob left-[-10vw] top-[10vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.2),transparent_65%)]"
        style={{ animation: "blobdrift 26s ease-in-out infinite" }}
      />
      <div
        className="bg-blob right-[-8vw] top-[45vh] h-[38vw] w-[38vw] bg-[radial-gradient(circle,rgba(30,57,50,0.18),transparent_65%)]"
        style={{ animation: "blobdrift 34s ease-in-out infinite reverse" }}
      />
      <div
        className="bg-blob bottom-[-10vh] left-[30vw] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(212,233,226,0.35),transparent_65%)]"
        style={{ animation: "blobdrift 30s ease-in-out infinite" }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Mood />
        <Favorites />
        <Gallery />
        <Events />
        <Contact />
        <Faq />
      </main>

      <Footer />
    </div>
  );

  function Hero() {
    const ref = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
      isFirstRender.current = false;
    }, []);

    // 5.5 seconds per photo in infinite loop
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5500);
      return () => clearInterval(timer);
    }, [currentSlide]);

    const handleDotClick = (index: number) => {
      if (index !== currentSlide) {
        setCurrentSlide(index);
      }
    };

    return (
      <>
        {/* ========================================================
            MOBILE HERO SECTION (Exact match to reference mockup)
            ======================================================== */}
        <section
          id="start"
          className="relative lg:hidden w-full h-[calc(100svh-60px)] min-h-[580px] max-h-[820px] overflow-hidden select-none bg-[#f4ece1]"
        >
          {/* Portrait Tabletop Photography: 3-slide rotation with smooth cross-fade */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={MOBILE_HERO_SLIDES[currentSlide].src}
                  alt={MOBILE_HERO_SLIDES[currentSlide].alt}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preload mobile images */}
          <div className="hidden" aria-hidden="true">
            {MOBILE_HERO_SLIDES.map((slide) => (
              <img key={slide.src} src={slide.src} alt="" />
            ))}
          </div>

          {/* Left Text & Branding Container */}
          <div className="relative z-10 flex h-full flex-col justify-center px-[26px] max-w-[340px] sm:max-w-[360px] pt-1 pb-4">
            {/* 4. Location: KHEDA, GUJARAT in black with black location pin */}
            <div className="flex items-center gap-1.5 text-black">
              <TeardropPin className="size-[15px] sm:size-4 shrink-0 fill-black text-black" />
              <p className="font-poppins text-[13px] sm:text-[14px] font-semibold tracking-[0.22em] uppercase leading-none text-black">
                KHEDA, GUJARAT
              </p>
            </div>

            {/* 5. Main Headline: Coffee. (forest) Matcha. (sage) Brunch. (forest) in Fredoka 600 */}
            <h1 className="mt-4 sm:mt-5 font-fredoka font-semibold leading-[1.12] tracking-[0.2px] text-left text-[48px] sm:text-[52px]">
              <span className="block text-[#07543D]">Coffee.</span>
              <span className="block text-[#71875A]">Matcha.</span>
              <span className="block text-[#07543D]">Brunch.</span>
            </h1>

            {/* 6. Decorative Divider: Sage green lines + botanical leaf icon */}
            <div className="mt-4 sm:mt-5 flex items-center gap-2 max-w-[130px]">
              <span className="h-[1.5px] flex-1 bg-[#71875A] rounded-full" />
              <Leaf className="size-3.5 text-[#71875A] shrink-0 fill-[#71875A]" />
              <span className="h-[1.5px] flex-1 bg-[#71875A] rounded-full" />
            </div>

            {/* 7. Supporting Text: Good food. Good mood. Good vibes. */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15px] leading-[1.55] font-normal text-[#333333] font-poppins text-left">
              Good food. Good mood.
              <br />
              Good vibes.
            </p>

            {/* 8. Primary Button: Explore menu with subtle leaf icon (best proportioned & slightly decreased size) */}
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => router.push("/menu")}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-[#07543D] hover:bg-[#053d2c] text-white px-5 sm:px-6 text-[14px] font-semibold font-poppins shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Leaf className="size-3.5 text-white fill-white shrink-0" />
                <span>Explore menu</span>
              </button>
            </div>
          </div>

          {/* Mobile Slideshow Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-auto">
            {MOBILE_HERO_SLIDES.map((_, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Slide ${idx + 1} of ${MOBILE_HERO_SLIDES.length}`}
                  onClick={() => handleDotClick(idx)}
                  className="p-1 focus:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            DESKTOP HERO SECTION (Wide Editorial 3-Photo Slideshow)
            ======================================================== */}
        <section
          ref={ref as never}
          className="relative hidden lg:block h-[calc(100vh-66px)] w-full overflow-hidden select-none bg-[#f7f4ee]"
        >
          {/* 3-photo Slideshow with smooth cross-fade & soft Ken Burns zoom */}
          <motion.div style={{ y }} className="absolute inset-0 h-full w-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{
                  opacity: isFirstRender.current ? 1 : 0,
                  scale: still ? 1 : 1.0,
                }}
                animate={{
                  opacity: 1,
                  scale: still ? 1 : 1.025,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  opacity: { duration: 1.3, ease: "easeInOut" },
                  scale: { duration: 6.5, ease: "easeOut" },
                }}
                className="absolute inset-0 h-full w-full"
                style={{ transformOrigin: HERO_SLIDES[currentSlide].transformOrigin || "center center" }}
              >
                <img
                  src={HERO_SLIDES[currentSlide].src}
                  alt={HERO_SLIDES[currentSlide].alt}
                  className="h-full w-full object-cover pointer-events-none select-none"
                  style={{ objectPosition: HERO_SLIDES[currentSlide].objectPosition || "center center" }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Preload slide images */}
          <div className="hidden" aria-hidden="true">
            {HERO_SLIDES.map((slide) => (
              <img key={slide.src} src={slide.src} alt="" />
            ))}
          </div>



          {/* Desktop: left-side cream gradient — just enough for text readability */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,238,0.55)_0%,rgba(247,244,238,0.35)_30%,rgba(247,244,238,0.1)_50%,transparent_65%)] pointer-events-none z-10" />

          {/* Hero Content Desktop */}
          <div className="relative z-20 flex h-full flex-col justify-center px-16 max-w-xl">
            {/* Green dash + KHEDA, INDIA eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-8 rounded-full bg-[#468e72]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#163e34]/80">
                {BRAND.city}, INDIA
              </p>
            </div>

            {/* Main Headline */}
            <h1
              className={`${display} mt-4 leading-[1.02] font-semibold`}
              style={{ fontSize: "clamp(64px, 6.5vw, 108px)" }}
            >
              {lang === "en" ? (
                <>
                  <span className="block text-[#163e34]">Coffee.</span>
                  <span className="block text-[#468e72]">Matcha.</span>
                  <span className="block text-[#163e34]">Brunch.</span>
                </>
              ) : (
                <>
                  <span className="block text-[#163e34]">कॉफ़ी।</span>
                  <span className="block text-[#468e72]">माचा।</span>
                  <span className="block text-[#163e34]">ब्रंच।</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed font-normal text-[#485d53]">
              {lang === "en"
                ? "Sufi’s Cafe blends coffee, comfort, and connection into a peaceful sanctuary where the heart finds peace in every sip."
                : "सूफ़ी कैफ़े कॉफ़ी, सुकून और रिश्तों को एक शांत पनाहगाह में पिरोता है, जहाँ हर घूंट में दिल को शांति मिलती है।"}
            </p>

            {/* Action buttons Desktop */}
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/menu")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#163e34] hover:bg-[#102e27] text-white px-7 py-3.5 text-base font-medium shadow-md transition-all hover:-translate-y-0.5 active:scale-95 font-display cursor-pointer"
              >
                <span>Explore Menu</span>
                <span className="text-lg leading-none">→</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center justify-center rounded-full border border-[#d8cfc2] bg-[#ede6dd] hover:bg-[#dfd7cc] text-[#163e34] px-7 py-3.5 text-base font-medium transition-all hover:-translate-y-0.5 active:scale-95 font-display cursor-pointer"
              >
                <span>Visit Us</span>
              </button>
            </div>
          </div>

          {/* Desktop Slideshow Navigation Dots (3 photos) */}
          <div
            role="tablist"
            aria-label="Hero slideshow navigation"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/60 px-3.5 py-1.5 rounded-full border border-[#163e34]/15 shadow-sm pointer-events-auto"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}`}
                  onClick={() => handleDotClick(idx)}
                  className="group relative p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163e34] rounded-full transition-transform active:scale-90"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 h-2 bg-[#163e34] shadow-sm"
                        : "w-2 h-2 bg-[#163e34]/30 group-hover:bg-[#163e34]/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  function Mood() {
    const host = useRef<HTMLElement | null>(null);
    return (
      <section id="mood" ref={host} className="relative overflow-hidden py-[16vh] scroll-mt-24">
        <CursorTrail hostRef={host} />
        <div className="container-x relative z-10 text-center">
          <p className="eyebrow">{t.moveCursor}</p>
          <h2 className={`${display} mt-4 leading-[1.02]`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.moodA}
            <br />
            <span className="text-terra">{t.moodB}</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => router.push("/menu")} className="btn-ink">
              {t.openMenuBtn}
            </button>
            <button onClick={() => scrollToId("contact")} className="btn-line">
              {t.findUs}
            </button>
          </div>
        </div>
      </section>
    );
  }

  function Favorites() {
    const favorites = useDynamicFavorites();
    return (
      <section id="favorites" className="container-x scroll-mt-28 py-[10vh]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className={display} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.favoriteTitle}
          </h2>
          <button onClick={() => router.push("/menu")} className="btn-line">
            {t.fullMenu}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {favorites.map((tile) => {
            const min = categoryMin(tile.id);
            const label = lang === "hi" ? (tile.labelHi || tile.labelEn) : tile.labelEn;
            return (
              <button key={tile.id} onClick={() => router.push("/menu")} className="group text-left">
                <div className="photo-card relative aspect-[4/5]">
                  <img
                    src={tile.img}
                    alt={`${tile.labelEn} served at ${BRAND.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {min !== null && (
                    <span className="chip absolute left-4 top-4">
                      {t.from} {money(min)}
                    </span>
                  )}
                </div>
                <h3 className={`${display} mt-4`} style={{ fontSize: 26 }}>
                  {label}
                </h3>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  function Gallery() {
    return (
      <section id="gallery" className="container-x scroll-mt-28 py-[10vh] overflow-hidden">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className={display} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.galleryTitle}
          </h2>
          <button
            onClick={() => router.push("/gallery")}
            className="btn-line inline-flex items-center gap-2"
          >
            <span>{lang === "en" ? "View All 30+ Photos" : "सभी 30+ तस्वीरें देखें"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        {/* 2 images in one line on mobile (grid-cols-2) matching original layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {GALLERY.map((src, i) => (
            <div
              key={src + i}
              className="photo-card relative aspect-[4/5] w-full overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={src}
                alt={galleryAlt(src)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/gallery")}
            className="inline-flex items-center gap-3 rounded-full bg-[#006241] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#004f36] hover:shadow-xl hover:-translate-y-0.5"
          >
            {lang === "en" ? "Explore Full Gallery (30+ Photos)" : "पूरी गैलरी देखें (30+ तस्वीरें)"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    );
  }

  function Events() {
    return (
      <section id="events" className="container-x scroll-mt-28 py-[10vh]">
        <div className="text-center">
          <span className="inline-block rounded-full border border-ink/20 bg-paper/80 px-4 py-1 text-[12px] uppercase tracking-[0.18em] text-ink/80 backdrop-blur font-medium">
            {t.eventsEyebrow}
          </span>
          <h2 className={`${display} mt-4 leading-[1.06]`} style={{ fontSize: "clamp(34px,4.5vw,68px)" }}>
            {t.eventsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] sm:text-[17px] text-muted leading-relaxed">
            {t.eventsSubtitle}
          </p>
        </div>

        {/* Top 2 Cards: Private Events & Catering */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Private Events */}
          <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-paper">
                <img
                  src="/images/events-private.jpg"
                  alt={`${t.eventsPrivateTitle} at ${BRAND.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <h3 className={`${display} mt-6 text-[26px] sm:text-[30px]`}>
                {t.eventsPrivateTitle}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-muted leading-relaxed">
                {t.eventsPrivateDesc}
              </p>
            </div>
          </div>

          {/* Card 2: Catering */}
          <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-paper">
                <img
                  src="/images/events-catering.jpg"
                  alt={`${t.eventsCateringTitle} by ${BRAND.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <h3 className={`${display} mt-6 text-[26px] sm:text-[30px]`}>
                {t.eventsCateringTitle}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-muted leading-relaxed">
                {t.eventsCateringDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Card: Custom Menus */}
        <div className="mt-6 rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-center">
            <div className="flex flex-col items-start">
              <h3 className={`${display} text-[28px] sm:text-[34px]`}>
                {t.eventsCustomTitle}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[16px] text-muted leading-relaxed">
                {t.eventsCustomDesc}
              </p>
              <div className="mt-6">
                <a
                  href="https://wa.me/918320812121?text=Hi%20Sufi's%20Cafe,%20I'd%20like%20to%20customize%20a%20menu%20for%20an%20event!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink !bg-[#006241] !text-paper hover:!bg-[#1e3932] shadow-sm inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4" />
                  {t.eventsGetInTouch}
                </a>
              </div>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-paper">
              <img
                src="/images/events-custom-menus.jpg"
                alt={`${t.eventsCustomTitle} at ${BRAND.name}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Speak with one of our experts */}
        <div className="mt-8 rounded-[28px] border border-ink/10 bg-[#fbf9f4] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#006241] font-semibold">
              {t.eventsExpertEyebrow}
            </p>
            <h3 className={`${display} mt-1 text-[24px] sm:text-[32px]`}>
              {t.eventsExpertTitle}
            </h3>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 max-sm:w-full max-sm:justify-around">
            <a
              href="https://wa.me/918320812121?text=Hi%20Sufi's%20Cafe,%20I'd%20like%20to%20inquire%20about%20hosting%20an%20event!"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#1e3932] text-paper flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#006241] group-hover:scale-105">
                <MessageCircle className="size-6 sm:size-7" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80 group-hover:text-[#006241] transition-colors">
                {t.eventsWhatsapp}
              </span>
            </a>
            <a
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#1e3932] text-paper flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#006241] group-hover:scale-105">
                <Phone className="size-6 sm:size-7" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80 group-hover:text-[#006241] transition-colors">
                {BRAND.phone}
              </span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  function Contact() {
    return (
      <section id="contact" className="container-x scroll-mt-28 py-[10vh]">
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block rounded-full border border-ink/20 bg-paper/80 px-4 py-1 text-[12px] uppercase tracking-[0.18em] text-ink/80 backdrop-blur font-medium mb-3">
            VISIT &amp; CONNECT
          </span>
          <h2 className={`${display} leading-[1.06]`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
            {t.contactTitle}
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 items-stretch">
          {/* Left Card: Authentic Cafe Storefront & Directions */}
          <div className="group flex flex-col justify-between rounded-[32px] border border-[#006241]/20 bg-white/90 p-6 sm:p-8 backdrop-blur shadow-lg hover:shadow-2xl transition-all duration-300">
            <div>
              {/* Storefront Photography */}
              <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 aspect-[16/10] overflow-hidden rounded-t-[32px] bg-neutral-100 shadow-inner">
                <img
                  src="/images/venue.jpg"
                  alt="Sufi's Cafe Kajipura authentic welcoming storefront and outdoor patio"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dine-In · Takeaway · Open Sufi Cafe</span>
                </div>
              </div>

              {/* Title & Location details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e3932] tracking-tight">
                    Sufi's Cafe
                    <span className="text-base sm:text-lg font-sans font-normal text-[#07543D] ml-2">
                      · Kajipura
                    </span>
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#4a6058] font-semibold mt-1">
                    Ahmedabad - Narol - Kheda Highway
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-sm text-[#2d4a40]">
                    <div className="size-8 rounded-full bg-[#006241]/10 flex items-center justify-center text-[#006241] shrink-0 mt-0.5">
                      <MapPin className="size-4" />
                    </div>
                    <span className="leading-relaxed font-medium">
                      {brand.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#2d4a40]">
                    <div className="size-8 rounded-full bg-[#006241]/10 flex items-center justify-center text-[#006241] shrink-0">
                      <Clock className="size-4" />
                    </div>
                    <span className="font-semibold text-[#1e3932]">
                      Open Daily: {brand.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button: Get Directions */}
            <div className="mt-8 pt-5 border-t border-[#006241]/15">
              <a
                href={brand.mapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink !bg-[#006241] hover:!bg-[#004f36] text-white w-full !py-3.5 text-xs sm:text-sm font-semibold justify-center shadow-md transition-all hover:scale-[1.01]"
              >
                <MapPin className="size-4 text-white" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Card: Your Table · Book Your Table */}
          <div className="flex flex-col justify-between rounded-[32px] bg-[#1e3932] p-6 sm:p-8 text-paper shadow-xl border border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logo.png"
                  alt="Sufi's Cafe Logo"
                  className="size-13 rounded-full object-contain bg-white p-1 ring-2 ring-white/30 shadow-md"
                />
                <div className="h-9 w-px bg-white/20" />
                <div className="flex flex-col text-left">
                  <span className="font-serif tracking-[0.18em] font-bold text-white text-[17px] leading-tight">
                    {BRAND.mark}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#d4e9e2] font-semibold mt-0.5">
                    COFFEE &amp; CRAFT · SANCTUARY
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {lang === "en" ? "Your Table" : "आपकी टेबल"}
                  <span className="text-base sm:text-lg font-sans font-normal text-[#d4e9e2] ml-2">
                    · {lang === "en" ? "Book Your Table" : "टेबल बुक करें"}
                  </span>
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#d4e9e2]/80 font-semibold mt-1">
                  {lang === "en" ? "Dine-In · Open Sufi Cafe · Celebrations" : "डाइन-इन · ओपन सूफ़ी कैफ़े · समारोह"}
                </p>
              </div>

              <p className="mt-4 text-sm sm:text-base text-paper/85 leading-relaxed font-sans">
                {t.yourTableBlurb}
              </p>

              {/* Delicate Perks / Details */}
              <div className="space-y-3 pt-5">
                <div className="flex items-center gap-3 text-sm text-paper/90">
                  <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-[#d4e9e2] shrink-0">
                    <Utensils className="size-4" />
                  </div>
                  <span className="leading-relaxed">
                    {lang === "en"
                      ? "Open Sufi cafe experience, peaceful ambiance & cozy seating"
                      : "ओपन सूफ़ी कैफ़े का सुकून भरा माहौल और आरामदायक सिटिंग"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-paper/90">
                  <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-[#d4e9e2] shrink-0">
                    <Sparkles className="size-4 text-amber-300" />
                  </div>
                  <span className="leading-relaxed">
                    {lang === "en"
                      ? "Fresh brews, bakery delights & celebration setup"
                      : "ताज़ा कॉफ़ी, लज़ीज़ व्यंजन और खास तैयारी"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button: Direct Route to Contact Booking Form */}
            <div className="mt-8 pt-5 border-t border-white/15">
              <button
                type="button"
                onClick={() => router.push("/contact?booking=true#booking-form")}
                className="btn-ink !bg-[#d4e9e2] hover:!bg-white !text-[#1e3932] w-full !py-3.5 text-xs sm:text-sm font-bold justify-center shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Utensils className="size-4 text-[#006241]" />
                <span>{lang === "en" ? "Book Your Table" : "टेबल बुक करें"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Faq() {
    const [open, setOpen] = useState<number | null>(null);
    return (
      <section className="container-x py-[10vh]">
        <h2 className={`${display} mb-10`} style={{ fontSize: "clamp(38px,5vw,74px)" }}>
          {t.faqTitle}
        </h2>
        <div className="divide-y divide-[rgba(0,98,65,0.12)] border-y border-[rgba(0,98,65,0.12)]">
          {t.faq.map((f, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[17px] font-semibold transition-transform duration-300 group-hover:translate-x-1">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex size-[34px] shrink-0 items-center justify-center rounded-full border border-[rgba(0,98,65,0.22)] bg-white/70"
                >
                  <Plus className="size-4 text-ink" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden"
              >
                <p className="pb-6 pr-16 text-[15px] text-muted whitespace-pre-line leading-relaxed">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
