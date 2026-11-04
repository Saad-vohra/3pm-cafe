"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  Copy,
  ExternalLink,
  Heart,
  MapPin,
  MessageCircle,
  PartyPopper,
  Phone,
  Send,
  Share2,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { STILL, useLenis, scrollToId } from "@/lib/scroll";

function InstagramIcon({ className = "size-5" }: { className?: string }) {
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

const BOOKING_TYPES = [
  {
    id: "table",
    label: { en: "Table Reservation (Dine-in)", hi: "टेबल बुकिंग (डाइन-इन)" },
    icon: "🍽️",
    desc: { en: "Reserve a table for couples, friends, or family", hi: "दोस्तों, जोड़ों या परिवार के लिए टेबल बुक करें" },
  },
  {
    id: "birthday",
    label: { en: "Birthday Celebration", hi: "जन्मदिन पार्टी सेलिब्रेशन" },
    icon: "🎂",
    desc: { en: "Celebrate with special desserts, coffee & table decor", hi: "खास केक, कॉफ़ी और डेकोरेशन के साथ मनाएं" },
  },
  {
    id: "private-party",
    label: { en: "Private Event / Gathering", hi: "प्राइवेट पार्टी / इवेंट" },
    icon: "🎉",
    desc: { en: "Book our open cafe space for intimate gatherings", hi: "ओपन सूफ़ी कैफ़े स्पेस को निजी कार्यक्रम के लिए बुक करें" },
  },
  {
    id: "catering-bulk",
    label: { en: "Party Catering & Bulk Food/Coffee Order", hi: "पार्टी केटरिंग / बल्क ऑर्डर" },
    icon: "☕",
    desc: { en: "Fresh coffee bar, burgers, and dessert platters for your event", hi: "आपके कार्यक्रम के लिए कॉफ़ी, स्नैक्स और डेज़र्ट्स" },
  },
  {
    id: "meeting",
    label: { en: "Corporate / Casual Team Meeting", hi: "मीटिंग / वर्क सेशन" },
    icon: "💼",
    desc: { en: "Quiet seating with power outlets and high-speed WiFi", hi: "शांत कोना, चार्जिंग सॉकेट्स और तेज़ वाई-फ़ाई" },
  },
] as const;

const TIME_SLOTS = [
  "08:30 AM",
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "01:30 PM",
  "02:30 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM",
  "07:30 PM",
  "08:30 PM",
];

const CAFE_PHOTOS = [
  {
    src: "/images/venue.jpg",
    title: { en: "Courtyard & Warm Evening Glow", hi: "शाम का नज़ारा और मुख्य आंगन" },
    desc: { en: "Aesthetic outdoor setting for relaxed evenings", hi: "शाम के वक्त सुकून से बैठने के लिए खूबसूरत जगह" },
  },
  {
    src: "/images/events-catering.jpg",
    title: { en: "Serene Open Cafe Space", hi: "सुकूनदेह ओपन सूफ़ी कैफ़े स्पेस" },
    desc: { en: "Open sky breeze, potted plants, and fairy lights", hi: "खुला आसमान, हरियाली और मनमोहक रोशनी" },
  },
  {
    src: "/images/about-cafe.jpg",
    title: { en: "Handcrafted Timber Interior Lounge", hi: "इनडोर वुडन डाइनिंग हॉल" },
    desc: { en: "Comfortable seating designed for long conversations", hi: "आरामदेह सोफ़े और सुकूनदेह इंटीरियर" },
  },
  {
    src: "/images/events-private.jpg",
    title: { en: "Private Celebrations & Party Space", hi: "प्राइवेट पार्टी और सेलिब्रेशन स्पेस" },
    desc: { en: "Tailored setup for birthday parties & reunions", hi: "जन्मदिन और खास मुलाकातों के लिए बेहतरीन सेटअप" },
  },
];

export default function ContactPage() {
  const { lang, display } = useLang();
  const router = useRouter();
  const still = STILL();

  useLenis(!still);

  // Smooth scroll directly to booking form when requested from Home or Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const isBooking =
          window.location.hash.includes("booking") ||
          window.location.search.includes("booking");
        if (isBooking) {
          scrollToId("booking-form");
        }
      }
    };

    const t0 = setTimeout(handleScroll, 50);
    const t1 = setTimeout(handleScroll, 200);
    const t2 = setTimeout(handleScroll, 500);
    const t3 = setTimeout(handleScroll, 900);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);


  // Today date formatted as YYYY-MM-DD for min date attribute
  const todayStr = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingType, setBookingType] = useState<string>("table");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("06:30 PM");
  const [guests, setGuests] = useState("2 People");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedBooking = useMemo(
    () => BOOKING_TYPES.find((b) => b.id === bookingType) ?? BOOKING_TYPES[0],
    [bookingType]
  );

  // Copy phone helper
  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+918320812121");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Build formatted WhatsApp message & redirect
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg(lang === "en" ? "Please enter your name." : "कृपया अपना नाम दर्ज करें।");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(lang === "en" ? "Please enter your phone number." : "कृपया अपना फ़ोन नंबर दर्ज करें।");
      return;
    }
    if (date && date < todayStr) {
      setErrorMsg(lang === "en" ? "Please select today or a future date." : "कृपया आज या आने वाली तारीख चुनें।");
      return;
    }
    setErrorMsg("");

    const message = `✨ *New Booking Request — ${BRAND.name}* ✨
──────────────────────────
👤 *Name:* ${name.trim()}
📱 *Phone / WhatsApp:* ${phone.trim()}
🎯 *Booking Type:* ${selectedBooking.label.en} (${selectedBooking.label.hi})
📅 *Date:* ${date || "Earliest Available"}
⏰ *Time:* ${time}
👥 *Guests / Quantity:* ${guests}
${notes.trim() ? `📝 *Special Notes / Menu Preferences:* ${notes.trim()}\n` : ""}──────────────────────────
ℹ️ *Our staff will contact you soon about available seats and booking confirmation.*
📍 *Location:* 3PM Cafe, krishna empire, 201-202, Road, Vallabh Vidyanagar, Anand, Gujarat 388120`;

    const cleanNumber = "918320812121";
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Reservation handled directly via WhatsApp

    setSubmitted(true);

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Direct General WhatsApp Chat URL
  const generalWaUrl = `https://wa.me/918320812121?text=${encodeURIComponent(
    `Hello ${BRAND.name}! I would like to inquire about table availability and party bookings.`
  )}`;

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-[#d4e9e2] selection:text-[#1e3932]">
      {/* Background ambient lighting */}
      <div
        className="bg-blob left-[-10vw] top-[5vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.16),transparent_65%)]"
        style={{ animation: "blobdrift 28s ease-in-out infinite" }}
      />
      <div
        className="bg-blob right-[-8vw] top-[40vh] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(30,57,50,0.14),transparent_65%)]"
        style={{ animation: "blobdrift 36s ease-in-out infinite reverse" }}
      />

      {/* Main Navbar */}
      <Navbar sticky showBack />

      <main className="relative z-10 pt-10 pb-24">
        {/* HERO SECTION */}
        <section className="container-x pt-6 pb-14 text-center lg:pt-12 lg:pb-16">
          <motion.div
            initial={still ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#006241]/25 bg-white/90 px-5 py-2 shadow-sm backdrop-blur-sm"
          >
            <MessageCircle className="size-4 text-[#006241]" />
            <span className="eyebrow !text-[#006241] !tracking-[0.22em] font-semibold">
              {BRAND.name} · CONTACT, VISIT & BOOKINGS · KAJIPURA, GUJARAT
            </span>
          </motion.div>

          <motion.h1
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`${display} mt-6 leading-[1.05] text-[#1e3932]`}
            style={{ fontSize: "clamp(38px,6vw,78px)" }}
          >
            {lang === "en" ? (
              <>
                Come Visit, Say Hello & <span className="text-[#006241]">Reserve Your Table.</span>
              </>
            ) : (
              <>
                हमसे मिलिए, कॉफ़ी का मज़ा लें और <span className="text-[#006241]">अपनी टेबल बुक करें।</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={still ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#2d4a40]"
          >
            {lang === "en"
              ? "Whether you are planning a relaxed coffee date, birthday celebration, private gathering, or party catering — we are ready to welcome you with warm smiles and exceptional brews."
              : "चाहे सुकून भरी कॉफ़ी की मुलाक़ात हो, जन्मदिन का जश्न, दोस्तों की महफ़िल या पार्टी के लिए बल्क केटरिंग — सूफ़ी कैफ़े में हम आपके हर पल को खास बनाने के लिए तैयार हैं।"}
          </motion.p>
        </section>

        {/* 4 PRIMARY CONTACT CHANNELS (CARDS) */}
        <section className="container-x mb-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phone Card */}
            <div className="group rounded-[24px] border border-[#006241]/15 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#006241]/10 text-[#006241] mb-4">
                  <Phone className="size-6" />
                </div>
                <p className="eyebrow !text-[#006241] !text-[11px] font-bold">
                  {lang === "en" ? "CALL US DIRECT" : "फ़ोन पर बात करें"}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#1e3932] tracking-tight">{BRAND.phone}</h3>
                <p className="mt-2 text-xs text-[#4a6058] leading-relaxed">
                  {lang === "en" ? "Daily 08:00 AM – 09:00 PM for instant inquiries & reservations." : "प्रतिदिन 08:00 AM से 09:00 PM तक तुरंत संपर्क करें।"}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-[#006241]/10">
                <a
                  href={BRAND.tel}
                  className="btn-ink flex-1 !py-2 !px-3 text-xs font-semibold justify-center"
                >
                  <Phone className="size-3.5" />
                  {lang === "en" ? "Call Now" : "कॉल करें"}
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="btn-line !py-2 !px-3 text-xs justify-center text-[#1e3932]"
                  title="Copy Phone Number"
                >
                  {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="group rounded-[24px] border border-emerald-600/25 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white mb-4 shadow-md">
                  <MessageCircle className="size-6" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="eyebrow !text-emerald-700 !text-[11px] font-bold">
                    {lang === "en" ? "WHATSAPP DIRECT" : "व्हाट्सएप चैट"}
                  </p>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="mt-1 text-xl font-bold text-[#1e3932] tracking-tight">{BRAND.phone}</h3>
                <p className="mt-2 text-xs text-[#4a6058] leading-relaxed">
                  {lang === "en"
                    ? "Chat directly with our team for quick table holds, party menus & questions."
                    : "टेबल होल्ड, पार्टी मेन्यू और सवालों के लिए सीधे व्हाट्सएप पर बात करें।"}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-600/15">
                <a
                  href={generalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg"
                >
                  <MessageCircle className="size-4" />
                  {lang === "en" ? "Chat on WhatsApp" : "व्हाट्सएप पर चैट करें"}
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="group rounded-[24px] border border-[#006241]/15 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white mb-4 shadow-md">
                  <InstagramIcon className="size-6" />
                </div>
                <p className="eyebrow !text-rose-700 !text-[11px] font-bold">
                  {lang === "en" ? "INSTAGRAM SOCIAL" : "इंस्टाग्राम"}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#1e3932] tracking-tight">{BRAND.instagram}</h3>
                <p className="mt-2 text-xs text-[#4a6058] leading-relaxed">
                  {lang === "en"
                    ? "Follow our daily stories, aesthetic cafe reels, and customer spotlights."
                    : "हमारी ताज़ा रील्स, खूबसूरत तस्वीरें और रोज़ाना की अपडेट्स देखने के लिए फॉलो करें।"}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#006241]/10">
                <a
                  href={BRAND.instagramUrl || "https://www.instagram.com/__.3pmcafe?cplk=MW9saTB4NXppZnQzOA=="}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line w-full !py-2 text-xs font-semibold justify-center !border-rose-300 text-rose-800 hover:!bg-rose-50"
                >
                  <InstagramIcon className="size-3.5" />
                  {lang === "en" ? "Follow @__.3pmcafe" : "इंस्टाग्राम पर फॉलो करें"}
                </a>
              </div>
            </div>

            {/* Location & Timings Card */}
            <div className="group rounded-[24px] border border-[#006241]/15 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#006241]/10 text-[#006241] mb-4">
                  <MapPin className="size-6" />
                </div>
                <p className="eyebrow !text-[#006241] !text-[11px] font-bold">
                  {lang === "en" ? "VISIT OUR CAFE" : "कैफ़े का पता"}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#1e3932] tracking-tight">Vallabh Vidyanagar, Anand, Gujarat</h3>
                <p className="mt-2 text-xs text-[#4a6058] leading-relaxed line-clamp-2">
                  {BRAND.locations[0].address}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#006241]">
                  <Clock className="size-3.5" />
                  <span>Open Daily: {BRAND.hours}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#006241]/10">
                {BRAND.locations[0].maps && (
                  <a
                    href={BRAND.locations[0].maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink w-full !py-2 text-xs font-semibold justify-center"
                  >
                    <ExternalLink className="size-3.5" />
                    {lang === "en" ? "Open in Google Maps" : "गूगल मैप्स खोलें"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MAIN SECTION: BOOKING FORM (LEFT) + LOCATE US & VENUE PHOTOS (RIGHT) */}
        <section id="booking-section" className="container-x mb-20 scroll-mt-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* BOOKING / PARTY ORDER FORM (7 COLS) */}
            <div id="booking-form" className="lg:col-span-7 rounded-[32px] border border-[#006241]/20 bg-white p-6 sm:p-10 shadow-xl scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#006241]/10 text-[#006241]">
                  <Calendar className="size-5" />
                </span>
                <div>
                  <span className="eyebrow !text-[#006241] font-bold">
                    {lang === "en" ? "EASY INSTANT BOOKING" : "आसान ऑनलाइन बुकिंग"}
                  </span>
                  <h2 className={`${display} text-2xl sm:text-3xl font-bold text-[#1e3932]`}>
                    {lang === "en" ? "Reserve a Table or Book an Event" : "टेबल बुक करें या पार्टी ऑर्डर दें"}
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-sm text-[#4a6058] leading-relaxed">
                {lang === "en"
                  ? "Select your request type below. When you submit, your reservation details will open directly in WhatsApp for instant confirmation with our team."
                  : "नीचे अपना विवरण और बुकिंग प्रकार चुनें। सबमिट करते ही आपका अनुरोध सीधे व्हाट्सएप पर हमारी टीम तक पहुँच जाएगा।"}
              </p>

              {/* Success Notification */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
                >
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">
                      {lang === "en" ? "WhatsApp opened with your details!" : "व्हाट्सएप में आपका विवरण तैयार है!"}
                    </h4>
                    <p className="mt-1 text-xs text-emerald-800">
                      {lang === "en"
                        ? "Please click 'Send' in WhatsApp. Our staff will contact you soon about available seats and booking confirmation."
                        : "कृपया व्हाट्सएप में 'Send' बटन दबाकर संदेश भेजें। उपलब्ध सीटों और बुकिंग पुष्टि के लिए हमारा स्टाफ जल्द ही आपसे संपर्क करेगा।"}
                    </p>
                  </div>
                </motion.div>
              )}

              {errorMsg && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* 1. Booking Category Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-2">
                    {lang === "en" ? "1. Select Booking / Order Type" : "1. बुकिंग / ऑर्डर का प्रकार चुनें"} *
                  </label>
                  <div className="relative">
                    <select
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-4 py-3.5 pr-10 text-sm font-semibold text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20 cursor-pointer"
                    >
                      {BOOKING_TYPES.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.label[lang]}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#006241]">
                      ▼
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-[#4a6058] italic">
                    {selectedBooking.desc[lang]}
                  </p>
                </div>

                {/* 2. Name & Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                      {lang === "en" ? "Your Full Name" : "आपका नाम"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "en" ? "e.g. Rahul Sharma" : "उदा. राहुल शर्मा"}
                      className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-4 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                      {lang === "en" ? "Phone / WhatsApp Number" : "फ़ोन / व्हाट्सएप नंबर"} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-4 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20"
                    />
                  </div>
                </div>

                {/* 3. Date, Time & Number of Guests */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                      {lang === "en" ? "Preferred Date" : "तारीख"}
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-3.5 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                      {lang === "en" ? "Time Slot" : "समय"}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-3.5 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20 cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                      {lang === "en" ? "Guests / Quantity" : "मेहमानों की संख्या"}
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-3.5 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20 cursor-pointer"
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="3-4 People">3 - 4 People</option>
                      <option value="5-8 People">5 - 8 People</option>
                      <option value="10-15 People">10 - 15 People</option>
                      <option value="20+ People (Bulk Party)">20+ People (Bulk Party)</option>
                    </select>
                  </div>
                </div>

                {/* Staff Contact & Booking Confirmation Notice */}
                <div className="rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] p-4 flex items-start sm:items-center gap-3.5 shadow-sm">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#006241]/10 text-[#006241] shrink-0">
                    <Clock className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#006241]">
                      {lang === "en" ? "Seat Availability & Confirmation" : "सीट उपलब्धता और पुष्टि"}
                    </h4>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#1e3932] leading-relaxed">
                      {lang === "en"
                        ? "Our staff will contact you soon about available seats and booking confirmation."
                        : "उपलब्ध सीटों और बुकिंग पुष्टि के लिए हमारा स्टाफ जल्द ही आपसे संपर्क करेगा।"}
                    </p>
                  </div>
                </div>

                {/* 4. Special Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3932] mb-1.5">
                    {lang === "en" ? "4. Special Requests or Menu Preferences" : "4. विशेष निर्देश या मेन्यू की पसंद"}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === "en"
                        ? "e.g. Birthday celebration, open cafe table, specific dishes needed..."
                        : "उदा. जन्मदिन का केक, ओपन सूफ़ी कैफ़े टेबल, स्पेशल कॉफ़ी..."
                    }
                    className="w-full rounded-2xl border border-[#006241]/20 bg-[#f7f5f0] px-4 py-3 text-sm text-[#1e3932] shadow-sm transition-all focus:border-[#006241] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/20"
                  />
                </div>

                {/* WhatsApp Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-emerald-700 hover:shadow-2xl hover:scale-[1.01]"
                  >
                    <MessageCircle className="size-5" />
                    <span>
                      {lang === "en" ? "Send Booking via WhatsApp →" : "व्हाट्सएप पर बुकिंग भेजें →"}
                    </span>
                  </button>
                  <p className="mt-2.5 text-center text-xs text-[#4a6058]">
                    {lang === "en"
                      ? "Free cancellation & instant response. No upfront payment required."
                      : "मुफ़्त कैंसिलेशन और त्वरित उत्तर। कोई अग्रिम भुगतान आवश्यक नहीं है।"}
                  </p>
                </div>
              </form>
            </div>

            {/* LOCATE US & CAFE PHOTOS (5 COLS) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Landmark & Map Card */}
              <div className="rounded-[32px] border border-[#006241]/20 bg-white p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#006241]/10 text-[#006241]">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <span className="eyebrow !text-[#006241] font-bold">
                      {lang === "en" ? "LANDMARK & DIRECTIONS" : "पहुंचने का रास्ता"}
                    </span>
                    <h3 className={`${display} text-2xl font-bold text-[#1e3932]`}>
                      {lang === "en" ? "Locate 3PM Cafe" : "सूफ़ी कैफ़े की लोकेशन"}
                    </h3>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#006241]/15 bg-[#f7f5f0] p-4 text-xs sm:text-sm text-[#1e3932] space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#006241] shrink-0">📍 {lang === "en" ? "Full Address:" : "पूरा पता:"}</span>
                    <span>{BRAND.locations[0].address}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-[#006241]/10">
                    <span className="font-bold text-[#006241] shrink-0">🚩 {lang === "en" ? "Landmarks:" : "मुख्य पहचान:"}</span>
                    <span>Opposite Sumar Logistics, Beside Dawat Restaurant, Nearby Coca-Cola</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-[#006241]/10">
                    <span className="font-bold text-[#006241] shrink-0">🚗 {lang === "en" ? "Parking:" : "पार्किंग:"}</span>
                    <span>Free on-site parking available for cars and two-wheelers.</span>
                  </div>
                </div>

                {/* Google Maps Button */}
                {BRAND.locations[0].maps && (
                  <div className="mt-5">
                    <a
                      href={BRAND.locations[0].maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ink w-full py-3.5 text-sm font-semibold justify-center shadow-lg"
                    >
                      <MapPin className="size-4" />
                      <span>{lang === "en" ? "Open Live Google Maps Navigation" : "गूगल मैप्स नेविगेशन खोलें"}</span>
                      <ExternalLink className="size-3.5 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              {/* Cafe Ambiance Photo Showcase */}
              <div className="rounded-[32px] border border-[#006241]/20 bg-white p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="eyebrow !text-[#006241] font-bold">
                      {lang === "en" ? "CAFE AMBIANCE" : "कैफ़े का माहौल"}
                    </span>
                    <h3 className={`${display} text-xl font-bold text-[#1e3932]`}>
                      {lang === "en" ? "Our Welcoming Spaces" : "हमारे खूबसूरत कोने"}
                    </h3>
                  </div>
                  <button
                    onClick={() => router.push("/gallery")}
                    className="text-xs font-semibold text-[#006241] hover:underline"
                  >
                    {lang === "en" ? "View Gallery →" : "पूरी गैलरी →"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {CAFE_PHOTOS.map((photo, i) => (
                    <div
                      key={photo.src + i}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8e4dc] border border-[#006241]/15 shadow-sm"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title[lang]}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 p-2.5 flex items-end">
                        <p className="text-[11px] font-semibold text-white drop-shadow-sm leading-tight">
                          {photo.title[lang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl bg-paper/80 p-3 text-center border border-[#006241]/10">
                  <p className="text-xs text-[#2d4a40]">
                    {lang === "en"
                      ? "Open cafe experience, peaceful ambiance, and quiet corners for laptop work."
                      : "ओपन सूफ़ी कैफ़े का सुकून भरा माहौल और शांत वर्क कॉर्नर उपलब्ध हैं।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="container-x">
          <div className="rounded-[32px] bg-[#1e3932] p-8 sm:p-14 text-paper shadow-2xl border border-white/20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="eyebrow !text-[#d4e9e2]">FAQ</span>
              <h2
                className={`${display} text-white mt-2 leading-tight`}
                style={{ fontSize: "clamp(30px,4vw,50px)" }}
              >
                {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Coffee className="size-4 text-[#d4e9e2]" />
                  {lang === "en" ? "Can I host birthday parties at 3PM Cafe?" : "क्या मैं सूफ़ी में जन्मदिन पार्टी मना सकता हूँ?"}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-paper/85 leading-relaxed">
                  {lang === "en"
                    ? "Yes! We host birthdays, anniversaries, and family celebrations with special cake arrangements, customized beverage platters, and reserved seating."
                    : "जी हाँ! हम जन्मदिन, सालगिरह और परिवार के कार्यक्रमों के लिए टेबल डेकोरेशन, स्पेशल केक और कस्टमाइज़्ड मेन्यू की सुविधा देते हैं।"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="size-4 text-[#d4e9e2]" />
                  {lang === "en" ? "Do you offer bulk catering for events?" : "क्या आप कार्यक्रमों के लिए केटरिंग देते हैं?"}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-paper/85 leading-relaxed">
                  {lang === "en"
                    ? "Yes, we provide bulk party orders for specialty coffees, fresh bakes, burgers, and wraps for home parties or corporate events."
                    : "हाँ, हम घर की पार्टियों और मीटिंग्स के लिए ताज़ा कॉफ़ी, स्नैक्स और पेस्ट्रीज़ के बल्क ऑर्डर तैयार करते हैं।"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="size-4 text-[#d4e9e2]" />
                  {lang === "en" ? "What are your cafe timings?" : "कैफ़े का समय क्या है?"}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-paper/85 leading-relaxed">
                  {lang === "en"
                    ? "We are open seven days a week, Monday through Sunday, from 08:00 AM to 09:00 PM."
                    : "हम सातों दिन सुबह 08:00 बजे से रात 09:00 बजे तक खुले रहते हैं।"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Utensils className="size-4 text-[#d4e9e2]" />
                  {lang === "en" ? "Is parking and WiFi available?" : "क्या पार्किंग और वाई-फ़ाई उपलब्ध है?"}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-paper/85 leading-relaxed">
                  {lang === "en"
                    ? "Yes, dedicated vehicle parking is available on-site, and we offer high-speed complimentary WiFi for visitors."
                    : "हाँ, कैफ़े परिसर में वाहन पार्किंग उपलब्ध है और अतिथियों के लिए हाई-स्पीड वाई-फ़ाई की सुविधा है।"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
