"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";
export const LANGS: Lang[] = ["en", "hi"];
const KEY = "sufis-lang";

const en = {
  home: "Home",
  menu: "Menu",
  aboutUs: "About Us",
  gallery: "Gallery",
  contactUs: "Contact Us",
  favorites: "Favorites",
  contact: "Contact Us",
  start: "Home",
  viewMenu: "View menu",
  explore: "Explore the menu",
  book: "Book a table",
  bookShort: "Book",
  scroll: "Scroll to discover",
  openMenuBtn: "Open the menu",
  findUs: "Find us",
  moveCursor: "Move your cursor",
  moodA: "What will you have",
  moodB: "today?",
  favoriteTitle: "Favorites",
  fullMenu: "Full menu ↓",
  galleryTitle: "The display",
  eventsEyebrow: "Beyond the Cup",
  eventsTitle: "Host Your Next Event at Sufi's",
  eventsSubtitle: "From intimate gatherings to full-scale catering, we bring the warmth of Sufi's wherever you need it.",
  eventsPrivateTitle: "Private Events",
  eventsPrivateDesc: "Book our space for birthdays, meetings, or just a good excuse to get together. Great coffee and good vibes included.",
  eventsCateringTitle: "Catering",
  eventsCateringDesc: "Let us handle the coffee and pastries for your next event. We'll set up, pour, and make sure nobody runs on empty.",
  eventsCustomTitle: "Custom Menus",
  eventsCustomDesc: "Work with our team to build a tailored menu for your event — from espresso bars to pastry platters, we've got you covered.",
  eventsGetInTouch: "Get in Touch",
  eventsExpertEyebrow: "Get in Touch",
  eventsExpertTitle: "Speak with one of our experts",
  eventsWhatsapp: "WhatsApp",
  eventsEmail: "Email",
  eventsNumber: "Number",
  contactTitle: "Come see us.",
  openMaps: "Open in Google Maps",
  call: "Call",
  yourTable: "Your table.",
  yourTableBlurb:
    "Big table, small table, laptop corner or relaxing open Sufi cafe seating — tell us when and we will keep it warm.",
  faqTitle: "FAQ",
  addresses: "Addresses",
  hoursContact: "Hours & contact",
  add: "Add",
  viewDetails: "View Details",
  ingredients: "Ingredients",
  nutritionInfo: "Nutrition Information",
  allergensTitle: "Allergens",
  noAllergens: "No major allergens",
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbohydrates",
  fat: "Fat",
  dietary: "Dietary",
  orderAtTable: "Order / Call Table",
  close: "Close",
  itemsOne: "item",
  itemsMany: "items",
  clear: "clear",
  order: "Order",
  language: "Language",
  all: "All",
  menuTitle: "The menu.",
  from: "from",
  draftNote: "Draft list only — nothing is ordered or paid here.",
  photosNote: "All photography © Sufi's Cafe",
  faq: [
    {
      q: "Where is Sufis Cafe located?",
      a: "Sufis Cafe is located at c/o Dawat Restaurant, Ahmedabad-Narol-Kheda Highway,\nKajipura, Kheda, Gujarat 387120, India.",
    },
    {
      q: "Is Sufis Cafe suitable for friends and family?",
      a: "Absolutely! Sufis Cafe is a great place to spend quality time with friends, family, and loved ones.",
    },
    {
      q: "Does Sufis Cafe have free parking and Wi-Fi?",
      a: "Yes! Customers can enjoy both free parking and complimentary Wi-Fi.",
    },
    {
      q: "Is Sufis Cafe an open-air cafe?",
      a: "Yes! Sufis Cafe offers an open cafe experience where you can enjoy your time in a relaxed atmosphere.",
    },
    {
      q: "Is Sufis Cafe open now?",
      a: "Yes, Sufis Cafe is open daily (08:00 – 21:00). Please check our current operating hours before visiting.",
    },
  ],
};

const hi: typeof en = {
  home: "होम",
  menu: "मेन्यू",
  aboutUs: "हमारे बारे में",
  gallery: "गैलरी",
  contactUs: "संपर्क करें",
  favorites: "पसंदीदा",
  contact: "संपर्क करें",
  start: "होम",
  viewMenu: "मेन्यू देखें",
  explore: "मेन्यू देखिए",
  book: "टेबल बुक करें",
  bookShort: "बुक करें",
  scroll: "स्क्रॉल कीजिए",
  openMenuBtn: "मेन्यू खोलें",
  findUs: "हमें ढूंढें",
  moveCursor: "कर्सर घुमाइए",
  moodA: "आज आप क्या",
  moodB: "लेंगे?",
  favoriteTitle: "पसंदीदा",
  fullMenu: "पूरा मेन्यू ↓",
  galleryTitle: "झलकियाँ",
  eventsEyebrow: "कॉफ़ी से परे",
  eventsTitle: "सूफ़िज़ कैफ़े में अपना अगला इवेंट आयोजित करें",
  eventsSubtitle: "छोटी मुलाकातों से लेकर बड़े स्तर की केटरिंग तक, हम आपके हर खास मौके पर सूफ़िज़ की गर्मजोशी और स्वाद लाते हैं।",
  eventsPrivateTitle: "प्राइवेट इवेंट्स",
  eventsPrivateDesc: "जन्मदिन, मीटिंग्स या बस एक साथ मिलने के लिए हमारा खूबसूरत स्पेस बुक करें। ताज़ा कॉफ़ी और बेहतरीन माहौल शामिल हैं।",
  eventsCateringTitle: "केटरिंग",
  eventsCateringDesc: "अपने अगले इवेंट के लिए कॉफ़ी और पेस्ट्रीज़ की जिम्मेदारी हमें सौंपें। हम पूरा सेटअप संभालेंगे ताकि कोई भी खाली न रहे।",
  eventsCustomTitle: "कस्टम मेन्यू",
  eventsCustomDesc: "अपने इवेंट के लिए हमारे साथ मिलकर एक स्पेशल मेन्यू तैयार करें — एस्प्रेसो बार से लेकर पेस्ट्री प्लेटर तक, सब कुछ उपलब्ध।",
  eventsGetInTouch: "संपर्क करें",
  eventsExpertEyebrow: "संपर्क करें",
  eventsExpertTitle: "हमारे इवेंट विशेषज्ञ से बात करें",
  eventsWhatsapp: "व्हाट्सएप",
  eventsEmail: "ईमेल",
  eventsNumber: "फ़ोन नंबर",
  contactTitle: "हमसे मिलिए।",
  openMaps: "गूगल मैप्स में खोलें",
  call: "कॉल करें",
  yourTable: "आपकी टेबल।",
  yourTableBlurb:
    "बड़ा टेबल, छोटा टेबल, लैपटॉप कॉर्नर या सुकून भरी ओपन सूफ़ी कैफ़े सिटिंग — हमें बताएं, हम तैयार रखेंगे",
  faqTitle: "सवाल-जवाब",
  addresses: "पते",
  hoursContact: "समय और संपर्क",
  add: "जोड़ें",
  viewDetails: "विवरण देखें",
  ingredients: "सामग्री",
  nutritionInfo: "पोषण संबंधी जानकारी",
  allergensTitle: "एलर्जी कारक",
  noAllergens: "कोई प्रमुख एलर्जी कारक नहीं",
  calories: "कैलोरी",
  protein: "प्रोटीन",
  carbs: "कार्ब्स",
  fat: "फैट",
  dietary: "आहार",
  orderAtTable: "ऑर्डर / कॉल करें",
  close: "बंद करें",
  itemsOne: "आइटम",
  itemsMany: "आइटम",
  clear: "हटाएँ",
  order: "ऑर्डर",
  language: "भाषा",
  all: "सभी",
  menuTitle: "मेन्यू।",
  from: "से",
  draftNote: "यह केवल एक सूची है — यहाँ कोई ऑर्डर या भुगतान नहीं होता।",
  photosNote: "सभी तस्वीरें © सूफ़ी कैफ़े",
  faq: [
    {
      q: "सूफ़ी कैफ़े कहाँ स्थित है?",
      a: "सूफ़ी कैफ़े दावत रेस्टोरेंट, अहमदाबाद-नरोल-खेड़ा हाईवे,\nकाजीपुरा, खेड़ा, गुजरात 387120, भारत में स्थित है।",
    },
    {
      q: "क्या सूफ़ी कैफ़े दोस्तों और परिवार के लिए उपयुक्त है?",
      a: "बिल्कुल! सूफ़ी कैफ़े दोस्तों, परिवार और प्रियजनों के साथ बेहतरीन समय बिताने के लिए एक आदर्श जगह है।",
    },
    {
      q: "क्या सूफ़ी कैफ़े में मुफ़्त पार्किंग और वाई-फ़ाई की सुविधा है?",
      a: "हाँ! ग्राहक मुफ़्त पार्किंग और कॉम्प्लिमेंट्री वाई-फ़ाई दोनों का आनंद ले सकते हैं।",
    },
    {
      q: "क्या सूफ़ी कैफ़े एक ओपन-एयर कैफ़े है?",
      a: "हाँ! सूफ़ी कैफ़े एक खुला कैफ़े अनुभव प्रदान करता है जहाँ आप शांत और सुकूनदेह माहौल में समय बिता सकते हैं।",
    },
    {
      q: "क्या सूफ़ी कैफ़े अभी खुला है?",
      a: "हाँ, सूफ़ी कैफ़े खुला है (प्रतिदिन 08:00 – 21:00)। आने से पहले कृपया हमारे कार्य समय की जांच अवश्य कर लें।",
    },
  ],
};

export const STRINGS: Record<Lang, typeof en> = { en, hi };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof en; display: string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem(KEY);
    const next = (LANGS as string[]).includes(p ?? "")
      ? (p as Lang)
      : (LANGS as string[]).includes(stored ?? "")
        ? (stored as Lang)
        : "en";
    setLang(next);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: STRINGS[lang],
      // Gaegu carries no Devanagari — Hindi headings fall back to the body face.
      display: lang === "en" ? "font-serif" : "font-sans font-bold",
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
