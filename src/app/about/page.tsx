"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AtSign, Clock, Coffee, Heart, MapPin, Phone, Smile, Sparkles, Utensils, Wifi } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BRAND } from "@/lib/brand";
import { useDynamicAbout } from "@/lib/dynamic-store";
import { useLang } from "@/lib/i18n";
import { STILL, useLenis } from "@/lib/scroll";

export default function AboutPage() {
  const { lang, display } = useLang();
  const router = useRouter();
  const still = STILL();
  const about = useDynamicAbout();

  useLenis(!still);

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-[#d4e9e2] selection:text-[#1e3932] overflow-x-clip max-w-full w-full">
      {/* Ambient background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="bg-blob left-0 top-[5vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.18),transparent_65%)]"
          style={{ animation: "blobdrift 28s ease-in-out infinite" }}
        />
        <div
          className="bg-blob right-0 top-[40vh] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(30,57,50,0.15),transparent_65%)]"
          style={{ animation: "blobdrift 36s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Header bar */}
      <Navbar sticky showBack />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container-x pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={still ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#006241]/25 bg-white/90 px-5 py-2 shadow-sm backdrop-blur-sm"
            >
              <img
                src="/images/logo.png"
                alt="Sufi's Cafe"
                className="size-5 rounded-full object-contain"
              />
              <span className="eyebrow !text-[#006241] !tracking-[0.22em] font-semibold">
                {BRAND.name} · EST. 2026 · FRESH BREW
              </span>
            </motion.div>

            <motion.h1
              initial={still ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={`${display} mt-6 leading-[1.05] text-[#1e3932]`}
              style={{ fontSize: "clamp(42px,6.5vw,86px)" }}
            >
              {lang === "en" ? (
                <>
                  Coffee. Comfort. <span className="text-[#006241]">Connection.</span>
                </>
              ) : (
                <>
                  कॉफ़ी। सुकून। <span className="text-[#006241]">सद्भाव।</span>
                </>
              )}
            </motion.h1>

            <motion.div
              initial={still ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl"
            >
              <p className="font-serif text-2xl italic text-[#1e3932] sm:text-3xl leading-snug">
                {lang === "en"
                  ? "“Let the heart find peace in every sip.”"
                  : "“हर घूंट में दिल को सुकून और रूह को शांति मिले।”"}
              </p>
              <p className="mt-3 text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#006241]">
                {lang === "en"
                  ? "Where every sip brings peace to your soul."
                  : "जहाँ हर घूंट आपकी आत्मा को शांति और ताज़गी प्रदान करता है।"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero Visual Card */}
        <section className="container-x mb-20 lg:mb-28">
          <div className="relative overflow-hidden rounded-[36px] border border-white/60 bg-[#1e3932] shadow-2xl">
            <div className="relative aspect-[16/9] max-h-[580px] w-full min-h-[400px]">
              <img
                src="/images/about-cafe.jpg"
                alt="Sufi's Cafe Interior Ambiance"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142823]/95 via-[#142823]/60 to-black/30" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-14 text-white">
                <div className="max-w-3xl rounded-2xl sm:rounded-3xl bg-black/40 p-4 sm:p-6 md:p-8 backdrop-blur-md border border-white/15">
                  <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">OUR SANCTUARY</span>
                  <h2 className={`${display} mt-2 text-2xl sm:text-4xl lg:text-5xl text-white leading-tight break-words`}>
                    {about.heroTitle || (lang === "en"
                      ? "A place of peace, aroma, and warmth."
                      : "सुकून, सुगंध और आत्मीयता का सुंदर संगम।")}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base lg:text-lg text-paper/95 leading-relaxed break-words">
                    {about.heroSubtitle || (lang === "en"
                      ? "Tucked in Kajipura, Kheda, Sufi's Cafe was envisioned as more than a coffee shop. It is a soulful neighborhood retreat designed for pause, presence, and pure flavor."
                      : "काजीपुरा, खेड़ा (गुजरात) में बसा सूफ़ी कैफ़े सिर्फ़ एक कॉफ़ी शॉप नहीं है — यह दिल को तसल्ली देने वाला एक ऐसा आशियाना है जहाँ हर पल खास बन जाता है।")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story & Philosophy Details */}
        <section className="container-x mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 w-full">
            {/* Story Text */}
            <div className="w-full lg:col-span-7">
              <div className="rounded-[28px] sm:rounded-[32px] border border-[#006241]/15 bg-white/90 p-5 sm:p-8 md:p-12 shadow-sm backdrop-blur-sm">
                <span className="eyebrow !text-[#006241] !tracking-[0.22em] font-semibold">ABOUT OUR ORIGIN</span>
                <h2 className={`${display} mt-3 text-2xl sm:text-4xl lg:text-5xl text-[#1e3932] leading-tight break-words`}>
                  {about.storyTitle ? (
                    about.storyTitle
                  ) : lang === "en" ? (
                    <>
                      The Sufi’s Philosophy <br />
                      <span className="text-[#006241]">&amp; The Art of Coffee</span>
                    </>
                  ) : (
                    <>
                      सूफ़ी विचार दर्शन <br />
                      <span className="text-[#006241]">और कॉफ़ी का हुनर</span>
                    </>
                  )}
                </h2>

                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[#1e3932]/90 break-words">
                  {about.storyP1 ? (
                    <>
                      <p>{about.storyP1}</p>
                      {about.storyP2 && <p>{about.storyP2}</p>}
                      {about.storyP3 && <p>{about.storyP3}</p>}
                    </>
                  ) : (
                    <>
                      <p>
                        The name <strong className="font-semibold text-[#1e3932]">Sufi&apos;s Cafe</strong> is inspired by the timeless tradition of Sufism — rooted in tranquility, sincerity, warmth, and the sacred beauty of gathering together. We believe that coffee is more than caffeine; it is a ritual of mindful presence and genuine connection.
                      </p>
                      <p>
                        From sourcing <strong className="font-semibold text-[#006241]">100% specialty Arabica beans</strong> to precision-roasting and traditional preparation methods — like authentic Turkish coffee simmered with green cardamom in a copper cezve, slow hand-poured Chemex brews, and silky Spanish lattes — every beverage is prepared with passion and reverence.
                      </p>
                      <p>
                        Whether you are sitting down for a heartfelt conversation, getting lost in a favorite book, or enjoying an all-day brunch with loved ones, our doors and hearts are always open.
                      </p>
                    </>
                  )}
                </div>

                {/* Key feature pills */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#006241]/15">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-paper/80 p-3 border border-ink/10">
                    <Coffee className="size-5 text-[#006241] shrink-0" />
                    <span className="text-xs font-semibold text-[#1e3932]">100% Arabica</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-paper/80 p-3 border border-ink/10">
                    <Heart className="size-5 text-[#006241] shrink-0" />
                    <span className="text-xs font-semibold text-[#1e3932]">Mindful Presence</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-paper/80 p-3 border border-ink/10">
                    <Sparkles className="size-5 text-[#006241] shrink-0" />
                    <span className="text-xs font-semibold text-[#1e3932]">Slow-Brew Craft</span>
                  </div>
                </div>

                {/* Gold Quote Highlight */}
                <div className="mt-6 rounded-2xl border border-[rgba(0,98,65,0.25)] bg-gradient-to-r from-emerald-50 to-amber-50/80 p-5 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <span className="font-serif text-3xl leading-none text-[#006241]">“</span>
                    <div>
                      <p className="font-serif text-base sm:text-lg italic text-[#1e3932]">
                        {lang === "en"
                          ? "Where every sip brings peace to your soul."
                          : "जहाँ हर घूंट आपकी आत्मा को शांति और ताज़गी प्रदान करता है।"}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider text-muted font-sans font-semibold">
                        {lang === "en" ? "— The Sufi's Cafe Promise" : "— सूफ़ी कैफ़े का वादा"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Showcase Stack */}
            <div className="w-full lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {/* 1st: Latte */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-paper">
                  <img
                    src="/images/latte.jpg"
                    alt="Latte at Sufi's Cafe"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <span className="chip !border-white/30 !bg-white/20 !text-white text-[11px] backdrop-blur-sm">
                      {lang === "en" ? "Latte Art" : "लाते आर्ट"}
                    </span>
                  </div>
                </div>

                {/* 2nd: Pour Over */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-paper sm:mt-8">
                  <img
                    src="/images/pourover.jpg"
                    alt="Pour Over Coffee at Sufi's Cafe"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <span className="chip !border-white/30 !bg-white/20 !text-white text-[11px] backdrop-blur-sm">
                      {lang === "en" ? "Pour Over" : "पोर ओवर"}
                    </span>
                  </div>
                </div>

                {/* 3rd: Spanish Latte */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-paper sm:-mt-8">
                  <img
                    src="/images/spanish-latte.jpg"
                    alt="Spanish Latte at Sufi's Cafe"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <span className="chip !border-white/30 !bg-white/20 !text-white text-[11px] backdrop-blur-sm">
                      {lang === "en" ? "Spanish Latte" : "स्पैनिश लाते"}
                    </span>
                  </div>
                </div>

                {/* 4th: Siphon Brew */}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 shadow-lg aspect-[4/5] bg-paper">
                  <img
                    src="/images/siphon.jpg"
                    alt="Siphon Brew at Sufi's Cafe"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <span className="chip !border-white/30 !bg-white/20 !text-white text-[11px] backdrop-blur-sm">
                      {lang === "en" ? "Siphon Brew" : "साइफन ब्रू"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Pillars: Good Food, Good Mood, Good Vibes */}
        <section className="bg-[#1e3932] py-20 text-paper sm:py-28">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">OUR CORE FOUNDATION</span>
              <h2 className={`${display} mt-3 text-4xl sm:text-6xl text-white`}>
                Good Food · Good Mood · Good Vibes
              </h2>
              <p className="mt-4 text-base sm:text-lg text-paper/80">
                {lang === "en"
                  ? "Three simple promises that define every cup we brew and every plate we serve."
                  : "तीन सरल वादे जो हमारे हर कप और हर डिश में महसूस होते हैं।"}
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Pillar 1 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Utensils className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Food" : "स्वादिष्ट भोजन"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "From fresh grilled artisan sandwiches, peri-peri cottage cheese wraps, and loaded cheese fries to decadent desserts like chocolate lava cake and Lotus Biscoff cheesecake, our kitchen uses honest, premium ingredients."
                    : "ताज़े ग्रिल्ड सैंडविच, पनीर टिक्का व पेरी-पेरी रैप, चीज़ी लोडेड फ्राइज़ और चॉकलेट लावा केक व बिस्कॉफ चीज़केक जैसी स्वादिष्ट डेज़र्ट — यहाँ हर चीज़ शुद्ध और ताज़ा है।"}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Smile className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Mood" : "सुखद माहौल"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "A thoughtfully designed cafe atmosphere bathed in warm ambient lighting, peaceful acoustic melodies, plush seating, and free high-speed Wi-Fi — the perfect space to unwind, read, write, or work."
                    : "सुकून भरी सौम्य रोशनी, मधुर बैकग्राउंड संगीत, आरामदायक कुर्सियाँ और हाई-स्पीड फ़्री वाई-फ़ाई — चाहे काम करना हो, पढ़ना हो या सुकून के पल बिताना, यह जगह आपकी अपनी है।"}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#d4e9e2]">
                  <Heart className="size-7" />
                </div>
                <h3 className={`${display} mb-3 text-3xl text-white`}>
                  {lang === "en" ? "Good Vibes" : "पॉजिटिव वाइब्स"}
                </h3>
                <p className="text-base leading-relaxed text-paper/85">
                  {lang === "en"
                    ? "Hospitality that comes from the heart. At Sufi's Cafe, kindness is our language. We greet every guest with a smile and strive to ensure you leave happier than when you walked in."
                    : "सच्चे दिल से की जाने वाली मेहमाननवाज़ी। सूफ़ी कैफ़े में अपनापन ही हमारी पहचान है — हम सिर्फ़ कॉफ़ी नहीं परोसते, हम खुशियाँ बाँटते हैं।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Supporting Local Banner */}
        <section className="container-x py-20 lg:py-28">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[rgba(0,98,65,0.2)] bg-gradient-to-br from-white to-emerald-50/70 p-5 sm:p-8 md:p-14 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 w-full">
              <div className="w-full lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#006241]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#006241]">
                  WE DELIVER HAPPINESS
                </div>
                <h2 className={`${display} text-3xl sm:text-5xl text-[#1e3932] leading-tight`}>
                  {about.supportTitle || "Thank You For Supporting Local."}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#2c3e35]">
                  {about.supportDesc || "Every cup of coffee you enjoy at Sufi's Cafe supports our local team, indigenous roasters, and community spirit here in Gujarat. We take pride in building a homegrown specialty coffee destination."}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/menu")}
                    className="btn-ink"
                  >
                    {lang === "en" ? "Explore Our Full Menu" : "हमारा पूरा मेन्यू देखें"}
                  </button>
                  <a
                    href={BRAND.locations[0].maps ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line flex items-center gap-2"
                  >
                    <MapPin className="size-4" />
                    <span>{lang === "en" ? "Get Directions" : "रास्ता देखें"}</span>
                  </a>
                </div>
              </div>

              {/* Feature Badge Cards */}
              <div className="w-full lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Coffee className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">100% Specialty Arabica</h4>
                    <p className="text-xs text-muted">Single origin &amp; house blend</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Wifi className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Free High-Speed Wi-Fi</h4>
                    <p className="text-xs text-muted">Work and study friendly environment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Daily {BRAND.hours}</h4>
                    <p className="text-xs text-muted">Dine-in &amp; Takeaway available</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(0,98,65,0.12)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006241]">
                    <AtSign className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e3932]">Instagram: {BRAND.instagram}</h4>
                    <p className="text-xs text-muted">Follow our daily stories &amp; brews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Summary */}
        <section className="container-x mb-24">
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#1e3932] p-5 sm:p-8 md:p-14 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">VISIT US IN PERSON</span>
                <h2 className={`${display} mt-2 text-3xl sm:text-5xl text-white`}>
                  {BRAND.name}
                </h2>
                <p className="mt-4 text-paper/85 text-base sm:text-lg">
                  {BRAND.locations[0].address}
                </p>
                <p className="mt-1 text-sm text-[#d4e9e2]">
                  {BRAND.city}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={BRAND.locations[0].maps ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink !border-paper !bg-paper !text-[#1e3932] hover:!bg-[#d4e9e2]"
                  >
                    <MapPin className="size-4" />
                    <span>{lang === "en" ? "Open Google Maps" : "गूगल मैप्स"}</span>
                  </a>
                  <a
                    href={BRAND.tel}
                    className="btn-line !border-paper/40 !text-paper hover:!bg-paper/10"
                  >
                    <Phone className="size-4" />
                    <span>{BRAND.phone}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-md">
                <h3 className={`${display} text-2xl text-white mb-4`}>
                  {lang === "en" ? "Opening Hours" : "खुलने का समय"}
                </h3>
                <div className="space-y-3 text-sm text-paper/85">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday – Sunday</span>
                    <span className="font-semibold text-white">{BRAND.hours}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Dine-In &amp; Takeaway</span>
                    <span className="font-semibold text-white">Available Daily</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Wi-Fi &amp; Work Desks</span>
                    <span className="font-semibold text-[#d4e9e2]">Free Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

