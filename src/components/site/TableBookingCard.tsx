"use client";

import { useState } from "react";
import { Calendar, Clock, MessageCircle, Sparkles, Users, Utensils } from "lucide-react";
import { BRAND } from "@/lib/brand";

interface TableBookingCardProps {
  whatsappNumber?: string;
  phone?: string;
  lang?: "en" | "hi";
}

export function TableBookingCard({
  whatsappNumber = BRAND.whatsapp,
  phone = BRAND.phone,
  lang = "en",
}: TableBookingCardProps) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [dateType, setDateType] = useState<"today" | "tomorrow" | "custom">("today");
  const [customDate, setCustomDate] = useState("");
  const [time, setTime] = useState("7:00 PM");
  const [seating, setSeating] = useState<"terrace" | "indoor" | "laptop" | "family">("terrace");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "") || "918320812121";

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === "en" ? "Please enter your name" : "कृपया अपना नाम दर्ज करें");
      return;
    }
    setError("");

    // Format date text
    let dateStr = "Today";
    if (dateType === "tomorrow") dateStr = "Tomorrow";
    else if (dateType === "custom" && customDate) dateStr = customDate;

    // Seating label
    const seatingLabels = {
      terrace: "Outdoor Terrace",
      indoor: "Indoor AC Lounge",
      laptop: "Work / Laptop Corner",
      family: "Family / Large Table",
    };

    const textLines = [
      "✨ *TABLE RESERVATION REQUEST - 3PM CAFE* ✨",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `👤 *Guest Name:* ${name.trim()}`,
      `👥 *Number of Guests:* ${guests} ${guests === "1" ? "Guest" : "Guests"}`,
      `📅 *Date:* ${dateStr}`,
      `⏰ *Preferred Time:* ${time}`,
      `🪑 *Preferred Seating:* ${seatingLabels[seating]}`,
    ];

    if (note.trim()) {
      textLines.push(`📝 *Special Note:* ${note.trim()}`);
    }

    textLines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    textLines.push("Please confirm table availability. Thank you!");

    const finalMessage = textLines.join("\n");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const quickChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi 3PM Cafe! I'd like to ask a question.")}`;

  return (
    <div className="rounded-2xl border border-white/15 bg-black/25 p-4 sm:p-5 backdrop-blur-sm shadow-inner text-paper">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white">
          <Utensils className="size-4 text-[#d4e9e2]" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4e9e2]">
            {lang === "en" ? "Reserve Your Table" : "टेबल बुक करें"}
          </span>
        </div>
        <span className="text-[11px] rounded-full bg-white/10 px-2.5 py-0.5 text-paper/80 font-medium">
          Instant WhatsApp Confirm
        </span>
      </div>

      <form onSubmit={handleBooking} className="space-y-3.5">
        {/* Name Input */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1">
            {lang === "en" ? "Your Name *" : "आपका नाम *"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder={lang === "en" ? "e.g. Aarav Patel" : "उदा. आरव पटेल"}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#d4e9e2] focus:bg-white/15 focus:outline-none transition-all"
          />
          {error && <p className="mt-1 text-xs text-rose-300 font-medium">{error}</p>}
        </div>

        {/* Guests Selection */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1.5">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" />
              {lang === "en" ? "Number of Guests" : "अतिथियों की संख्या"}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: "2", label: "2 Guests" },
              { val: "4", label: "4 Guests" },
              { val: "6", label: "6 Guests" },
              { val: "8+", label: "8+ Group" },
            ].map((g) => (
              <button
                key={g.val}
                type="button"
                onClick={() => setGuests(g.val)}
                className={`py-1.5 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  guests === g.val
                    ? "bg-[#006241] border border-[#d4e9e2] text-white shadow-xs"
                    : "bg-white/5 border border-white/15 text-paper/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Date */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {lang === "en" ? "Date" : "तारीख"}
              </span>
            </label>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setDateType("today")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dateType === "today"
                    ? "bg-[#006241] border border-[#d4e9e2] text-white shadow-xs"
                    : "bg-white/5 border border-white/15 text-paper/80 hover:bg-white/10"
                }`}
              >
                {lang === "en" ? "Today" : "आज"}
              </button>
              <button
                type="button"
                onClick={() => setDateType("tomorrow")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dateType === "tomorrow"
                    ? "bg-[#006241] border border-[#d4e9e2] text-white shadow-xs"
                    : "bg-white/5 border border-white/15 text-paper/80 hover:bg-white/10"
                }`}
              >
                {lang === "en" ? "Tomorrow" : "कल"}
              </button>
              <button
                type="button"
                onClick={() => setDateType("custom")}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dateType === "custom"
                    ? "bg-[#006241] border border-[#d4e9e2] text-white shadow-xs"
                    : "bg-white/5 border border-white/15 text-paper/80 hover:bg-white/10"
                }`}
              >
                {lang === "en" ? "Other" : "अन्य"}
              </button>
            </div>
            {dateType === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-white/10 border border-white/20 px-2.5 py-1 text-xs text-white focus:outline-none"
              />
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {lang === "en" ? "Time Slot" : "समय"}
              </span>
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 text-xs text-white focus:border-[#d4e9e2] focus:bg-[#142823] focus:outline-none transition-all cursor-pointer"
            >
              <option value="11:00 AM" className="bg-[#1e3932] text-white">11:00 AM (Brunch)</option>
              <option value="1:00 PM" className="bg-[#1e3932] text-white">1:00 PM (Lunch)</option>
              <option value="3:30 PM" className="bg-[#1e3932] text-white">3:30 PM (Coffee Hours)</option>
              <option value="5:30 PM" className="bg-[#1e3932] text-white">5:30 PM (Sunset / Evening)</option>
              <option value="7:00 PM" className="bg-[#1e3932] text-white">7:00 PM (Dinner & Vibes)</option>
              <option value="8:15 PM" className="bg-[#1e3932] text-white">8:15 PM (Late Evening)</option>
            </select>
          </div>
        </div>

        {/* Seating Preference */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1.5">
            {lang === "en" ? "Seating Preference" : "बैठने की पसंद"}
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "terrace", label: "🌿 Outdoor Terrace" },
              { id: "indoor", label: "❄️ Indoor AC Lounge" },
              { id: "laptop", label: "💻 Laptop / Quiet Corner" },
              { id: "family", label: "👥 Large Family Table" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSeating(s.id as any)}
                className={`py-1.5 px-2 rounded-lg text-left text-xs transition-all cursor-pointer truncate ${
                  seating === s.id
                    ? "bg-[#006241] border border-[#d4e9e2] text-white font-semibold shadow-xs"
                    : "bg-white/5 border border-white/15 text-paper/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Special Note (Optional) */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4e9e2] mb-1">
            {lang === "en" ? "Special Request (Optional)" : "विशेष अनुरोध (वैकल्पिक)"}
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={lang === "en" ? "e.g. Birthday celebration, quiet table" : "उदा. जन्मदिन, शांत टेबल"}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-[#d4e9e2] focus:bg-white/15 focus:outline-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="btn-ink !border-[#00754a] !bg-[#006241] text-white hover:!bg-[#004f36] w-full !py-3.5 text-xs sm:text-sm font-bold justify-center shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
          >
            <MessageCircle className="size-4.5" />
            <span>{lang === "en" ? `Confirm & Send via WhatsApp` : `व्हाट्सएप पर बुक करें`}</span>
          </button>
        </div>
      </form>

      {/* Alternative direct chat link */}
      <div className="mt-3 text-center border-t border-white/10 pt-2.5">
        <a
          href={quickChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#d4e9e2] hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <Sparkles className="size-3 text-amber-300" />
          <span>{lang === "en" ? "Just have a quick question? Direct WhatsApp Chat →" : "सीधा सवाल पूछें? व्हाट्सएप चैट →"}</span>
        </a>
      </div>
    </div>
  );
}

