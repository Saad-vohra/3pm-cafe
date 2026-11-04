import { useEffect, useState } from "react";
import { MENU, type FullMenuCategory, type FullMenuItem } from "@/data/menu";
import { BRAND } from "@/lib/brand";

// ─────────────────────────────────────────────────────────────
// 1. CAFE CONTACT & LOCATION SETTINGS
// ─────────────────────────────────────────────────────────────

export interface CafeSettings {
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  hours: string;
  mapsUrl: string;
}

export const DEFAULT_CAFE_SETTINGS: CafeSettings = {
  phone: BRAND.phone,
  whatsapp: BRAND.whatsapp,
  instagram: BRAND.instagram,
  instagramUrl: BRAND.instagramUrl || "https://www.instagram.com/__.sufiscafe?cplk=MW9saTB4NXppZnQzOA==",
  address: BRAND.locations[0].address,
  hours: BRAND.hours,
  mapsUrl: BRAND.locations[0].maps || "https://www.google.com/maps/search/?api=1&query=Sufi%27s+Cafe,+c/o+Dawat+Restaurant,+Ahmedabad-Narol-Kheda+Highway,+Kajipura,+Gujarat 387120",
};

const SETTINGS_KEY = "sufis_cafe_settings_v1";

const isRetiredNumber = (v?: string | null) => !!v && v.replace(/\D/g, "").endsWith("9173331535");
const withCurrentNumbers = (s: CafeSettings): CafeSettings => ({
  ...s,
  phone: isRetiredNumber(s.phone) ? DEFAULT_CAFE_SETTINGS.phone : s.phone,
  whatsapp: isRetiredNumber(s.whatsapp) ? DEFAULT_CAFE_SETTINGS.whatsapp : s.whatsapp,
});

export async function fetchLiveCafeSettings(): Promise<CafeSettings> {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return withCurrentNumbers({ ...DEFAULT_CAFE_SETTINGS, ...JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_CAFE_SETTINGS;
}

export async function saveLiveCafeSettings(settings: CafeSettings): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent("sufis_settings_updated", { detail: settings }));
    } catch {
      // ignore
    }
  }
  return { success: true };
}

export function useDynamicBrand() {
  const [settings, setSettings] = useState<CafeSettings>(DEFAULT_CAFE_SETTINGS);

  useEffect(() => {
    fetchLiveCafeSettings().then(setSettings);

    const onUpdate = (e: any) => {
      if (e.detail) {
        setSettings(e.detail);
      }
    };

    window.addEventListener("sufis_settings_updated", onUpdate);
    return () => window.removeEventListener("sufis_settings_updated", onUpdate);
  }, []);

  return settings;
}

// ─────────────────────────────────────────────────────────────
// 2. MENU CATEGORIES & ITEMS MANAGEMENT
// ─────────────────────────────────────────────────────────────

export interface CustomCategory {
  id: string;
  labelEn: string;
  labelHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
}

export interface CustomMenuItem {
  id: string;
  categoryId: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  price: number;
  img: string;
  isAvailable: boolean;
  isVeg: boolean;
  kcal?: number | null;
  weight?: number | null;
}

const MENU_ITEMS_KEY = "sufis_custom_menu_items_v2";
const DELETED_ITEMS_KEY = "sufis_deleted_menu_items_v2";
const CATEGORIES_KEY = "sufis_custom_categories_v2";
const DELETED_CATEGORIES_KEY = "sufis_deleted_categories_v2";

export async function fetchLiveCategories(): Promise<{
  customCategories: CustomCategory[];
  deletedCategoryIds: string[];
}> {
  let customCategories: CustomCategory[] = [];
  let deletedCategoryIds: string[] = [];

  if (typeof window !== "undefined") {
    try {
      const c = localStorage.getItem(CATEGORIES_KEY);
      if (c) customCategories = JSON.parse(c);
      const d = localStorage.getItem(DELETED_CATEGORIES_KEY);
      if (d) deletedCategoryIds = JSON.parse(d);
    } catch {
      // ignore
    }
  }

  return { customCategories, deletedCategoryIds };
}

export async function saveLiveCategory(cat: CustomCategory): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      let current: CustomCategory[] = [];
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if (stored) current = JSON.parse(stored);
      const idx = current.findIndex((x) => x.id === cat.id);
      if (idx >= 0) {
        current[idx] = cat;
      } else {
        current.push(cat);
      }
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(current));

      // Remove from deleted if re-adding
      let deleted: string[] = [];
      const dStored = localStorage.getItem(DELETED_CATEGORIES_KEY);
      if (dStored) {
        deleted = JSON.parse(dStored).filter((x: string) => x !== cat.id);
        localStorage.setItem(DELETED_CATEGORIES_KEY, JSON.stringify(deleted));
      }

      window.dispatchEvent(new CustomEvent("sufis_menu_updated"));
    } catch {
      // ignore
    }
  }

  return true;
}

export async function deleteLiveCategory(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      let current: CustomCategory[] = [];
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if (stored) current = JSON.parse(stored);
      current = current.filter((x) => x.id !== id);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(current));

      let deleted: string[] = [];
      const dStored = localStorage.getItem(DELETED_CATEGORIES_KEY);
      if (dStored) deleted = JSON.parse(dStored);
      if (!deleted.includes(id)) deleted.push(id);
      localStorage.setItem(DELETED_CATEGORIES_KEY, JSON.stringify(deleted));

      window.dispatchEvent(new CustomEvent("sufis_menu_updated"));
    } catch {
      // ignore
    }
  }

  return true;
}

export async function fetchLiveMenuItems(): Promise<{
  customItems: CustomMenuItem[];
  deletedTitles: string[];
}> {
  let customItems: CustomMenuItem[] = [];
  let deletedTitles: string[] = [];

  if (typeof window !== "undefined") {
    try {
      const c = localStorage.getItem(MENU_ITEMS_KEY);
      if (c) customItems = JSON.parse(c);
      const d = localStorage.getItem(DELETED_ITEMS_KEY);
      if (d) deletedTitles = JSON.parse(d);
    } catch {
      // ignore
    }
  }

  return { customItems, deletedTitles };
}

export async function saveLiveMenuItem(item: CustomMenuItem): Promise<{ local: boolean; online: boolean; error?: string }> {
  let local = true;
  if (typeof window !== "undefined") {
    try {
      let current: CustomMenuItem[] = [];
      const stored = localStorage.getItem(MENU_ITEMS_KEY);
      if (stored) current = JSON.parse(stored);

      const idx = current.findIndex(
        (x) => x.id === item.id || x.titleEn.toLowerCase() === item.titleEn.toLowerCase()
      );
      if (idx >= 0) {
        current[idx] = item;
      } else {
        current.push(item);
      }
      localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(current));

      // Remove from deleted list if re-saving
      let deleted: string[] = [];
      const dStored = localStorage.getItem(DELETED_ITEMS_KEY);
      if (dStored) {
        deleted = JSON.parse(dStored).filter(
          (t: string) => t.toLowerCase() !== item.titleEn.toLowerCase()
        );
        localStorage.setItem(DELETED_ITEMS_KEY, JSON.stringify(deleted));
      }

      window.dispatchEvent(new CustomEvent("sufis_menu_updated"));
    } catch (e: any) {
      local = false;
      return { local: false, online: true, error: e?.message || "Storage error" };
    }
  }

  return { local, online: true };
}

export async function deleteLiveMenuItem(item: { id?: string; titleEn: string }): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      let current: CustomMenuItem[] = [];
      const stored = localStorage.getItem(MENU_ITEMS_KEY);
      if (stored) current = JSON.parse(stored);
      current = current.filter((x) => x.id !== item.id && x.titleEn !== item.titleEn);
      localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(current));

      let deleted: string[] = [];
      const dStored = localStorage.getItem(DELETED_ITEMS_KEY);
      if (dStored) deleted = JSON.parse(dStored);
      if (!deleted.includes(item.titleEn)) {
        deleted.push(item.titleEn);
      }
      localStorage.setItem(DELETED_ITEMS_KEY, JSON.stringify(deleted));

      window.dispatchEvent(new CustomEvent("sufis_menu_updated"));
    } catch {
      // ignore
    }
  }

  return true;
}

export function useDynamicMenu() {
  const [categories, setCategories] = useState<FullMenuCategory[]>(MENU);

  const refresh = async () => {
    const { customItems, deletedTitles } = await fetchLiveMenuItems();
    const { customCategories, deletedCategoryIds } = await fetchLiveCategories();

    // 1. Start with base categories minus deleted ones
    let baseCats = MENU.filter((c) => !deletedCategoryIds.includes(c.id));

    // 2. Merge modified base categories
    baseCats = baseCats.map((cat) => {
      const customCat = customCategories.find((c) => c.id === cat.id);
      if (customCat) {
        return {
          ...cat,
          label: { en: customCat.labelEn, hi: customCat.labelHi || customCat.labelEn },
          subtitle: customCat.subtitleEn ? { en: customCat.subtitleEn, hi: customCat.subtitleHi || customCat.subtitleEn } : cat.subtitle,
        };
      }
      return cat;
    });

    // 3. Add brand new custom categories
    for (const cc of customCategories) {
      if (!baseCats.some((b) => b.id === cc.id) && !deletedCategoryIds.includes(cc.id)) {
        baseCats.push({
          id: cc.id,
          label: { en: cc.labelEn, hi: cc.labelHi || cc.labelEn },
          subtitle: cc.subtitleEn ? { en: cc.subtitleEn, hi: cc.subtitleHi || cc.subtitleEn } : undefined,
          items: [],
        });
      }
    }

    // 4. Map items into each category
    const merged = baseCats.map((cat) => {
      // Filter out deleted items
      let items = cat.items.filter((it) => !deletedTitles.includes(it.title.en));

      // Override items with edited versions
      items = items.map((it) => {
        const found = customItems.find(
          (c) => c.titleEn.toLowerCase() === it.title.en.toLowerCase()
        );
        if (found) {
          return {
            ...it,
            id: found.id,
            price: found.price,
            img: found.img || it.img,
            desc: { en: found.descEn || it.desc.en, hi: found.descHi || it.desc.hi },
            title: { en: found.titleEn || it.title.en, hi: found.titleHi || it.title.hi },
            kcal: found.kcal !== undefined ? found.kcal : it.kcal,
            weight: found.weight !== undefined ? found.weight : it.weight,
            isAvailable: found.isAvailable,
          } as FullMenuItem & { isAvailable?: boolean; id?: string };
        }
        return it;
      });

      // Add new custom items for this category
      const brandNew = customItems.filter(
        (c) =>
          c.categoryId === cat.id &&
          !cat.items.some(
            (orig) => orig.title.en.toLowerCase() === c.titleEn.toLowerCase()
          ) &&
          !deletedTitles.includes(c.titleEn)
      );

      const mappedNew: FullMenuItem[] = brandNew.map((bn) => ({
        id: bn.id,
        title: { en: bn.titleEn, hi: bn.titleHi || bn.titleEn },
        desc: { en: bn.descEn, hi: bn.descHi || bn.descEn },
        price: bn.price,
        kcal: bn.kcal ?? null,
        weight: bn.weight ?? null,
        allergens: { en: [], hi: [] },
        img: bn.img || "/images/flat-white.jpg",
        isAvailable: bn.isAvailable,
      } as any));

      return {
        ...cat,
        items: [...items, ...mappedNew],
      };
    });

    setCategories(merged);
  };

  useEffect(() => {
    refresh();

    const onUpdate = () => refresh();
    window.addEventListener("sufis_menu_updated", onUpdate);
    return () => window.removeEventListener("sufis_menu_updated", onUpdate);
  }, []);

  return { categories, refresh };
}

// ─────────────────────────────────────────────────────────────
// 3. HOME FAVORITES / HIGHLIGHTS MANAGEMENT
// ─────────────────────────────────────────────────────────────

export interface HomeFavoriteTile {
  id: string; // Category id or anchor
  labelEn: string;
  labelHi: string;
  img: string;
}

export const DEFAULT_HOME_FAVORITES: HomeFavoriteTile[] = [
  { id: "hot-coffee-manual", labelEn: "Coffee", labelHi: "कॉफ़ी", img: "/images/latte.jpg" },
  { id: "espresso-drinks", labelEn: "Signature Coffee", labelHi: "सिग्नेचर कॉफ़ी", img: "/images/spanish-latte.jpg" },
  { id: "burger", labelEn: "Food & Bites", labelHi: "फ़ूड और स्नैक्स", img: "/images/pizza-mexican.jpg" },
  { id: "mocktails", labelEn: "Refreshers & Mocktails", labelHi: "रिफ्रेशर्स और मॉकटेल्स", img: "/images/passionfruit.jpg" },
];

const FAVORITES_KEY = "sufis_home_favorites_v1";

export async function fetchLiveHomeFavorites(): Promise<HomeFavoriteTile[]> {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_HOME_FAVORITES;
}

export async function saveLiveHomeFavorites(tiles: HomeFavoriteTile[]): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(tiles));
      window.dispatchEvent(new CustomEvent("sufis_favorites_updated", { detail: tiles }));
    } catch {
      // ignore
    }
  }

  return { success: true };
}

export function useDynamicFavorites() {
  const [favorites, setFavorites] = useState<HomeFavoriteTile[]>(DEFAULT_HOME_FAVORITES);

  useEffect(() => {
    fetchLiveHomeFavorites().then(setFavorites);

    const onUpdate = (e: any) => {
      if (e.detail) {
        setFavorites(e.detail);
      }
    };

    window.addEventListener("sufis_favorites_updated", onUpdate);
    return () => window.removeEventListener("sufis_favorites_updated", onUpdate);
  }, []);

  return favorites;
}

// ─────────────────────────────────────────────────────────────
// 4. ABOUT US CONTENT
// ─────────────────────────────────────────────────────────────

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storySubtitle?: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  supportTitle: string;
  supportDesc: string;
}

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  heroTitle: "A place of peace, aroma, and warmth.",
  heroSubtitle:
    "Tucked in Kajipura, Kheda, Sufi's Cafe was envisioned as more than a coffee shop. It is a soulful neighborhood retreat designed for pause, presence, and pure flavor.",
  storyTitle: "The Sufi's Philosophy & The Art of Coffee",
  storySubtitle: "OUR ORIGIN & VALUES",
  storyP1:
    "The name Sufi's Cafe is inspired by the timeless tradition of Sufism — rooted in tranquility, sincerity, warmth, and the sacred beauty of gathering together. We believe that coffee is more than caffeine; it is a ritual of mindful presence and genuine connection.",
  storyP2:
    "From sourcing 100% specialty Arabica beans to precision-roasting and traditional preparation methods — like authentic Turkish coffee simmered with green cardamom in a copper cezve, slow hand-poured Chemex brews, and silky Spanish lattes — every beverage is prepared with passion and reverence.",
  storyP3:
    "Whether you are sitting down for a heartfelt conversation, getting lost in a favorite book, or enjoying an all-day brunch with loved ones, our doors and hearts are always open.",
  pillar1Title: "Good Food & Great Coffee",
  pillar1Desc:
    "Crafted with meticulous attention to detail, using only ethically sourced specialty coffee beans and wholesome bakery recipes.",
  pillar2Title: "Peaceful Sanctuary",
  pillar2Desc:
    "A thoughtfully designed cafe atmosphere bathed in warm ambient lighting, peaceful acoustic melodies, plush seating, and free high-speed Wi-Fi — the perfect space to unwind, read, write, or work.",
  pillar3Title: "Good Vibes",
  pillar3Desc:
    "Hospitality that comes from the heart. At Sufi's Cafe, kindness is our language. We greet every guest with a smile and strive to ensure you leave happier than when you walked in.",
  supportTitle: "Thank You For Supporting Local.",
  supportDesc:
    "Every cup of coffee you enjoy at Sufi's Cafe supports our local team, indigenous roasters, and community spirit here in Gujarat. We take pride in building a homegrown specialty coffee destination.",
};

const ABOUT_STORAGE_KEY = "sufis_about_content_v1";

export async function fetchLiveAboutContent(): Promise<AboutContent> {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(ABOUT_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_ABOUT_CONTENT, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_ABOUT_CONTENT;
}

export async function saveLiveAboutContent(content: AboutContent): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(content));
      window.dispatchEvent(new CustomEvent("sufis_about_updated", { detail: content }));
    } catch {
      // ignore
    }
  }

  return { success: true };
}

export function useDynamicAbout() {
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT_CONTENT);

  useEffect(() => {
    fetchLiveAboutContent().then(setAbout);

    const onUpdate = (e: any) => {
      if (e.detail) {
        setAbout(e.detail);
      }
    };

    window.addEventListener("sufis_about_updated", onUpdate);
    return () => window.removeEventListener("sufis_about_updated", onUpdate);
  }, []);

  return about;
}

// ─────────────────────────────────────────────────────────────
// 5. PRIVACY POLICY & TERMS OF USE (NON-ECOMMERCE DISPLAY ONLY)
// ─────────────────────────────────────────────────────────────

export interface LegalContent {
  privacyPolicy: string;
  termsOfUse: string;
  updatedDate: string;
}

export const DEFAULT_LEGAL_CONTENT: LegalContent = {
  updatedDate: "October 2026",
  privacyPolicy: `### 1. Purely Informational Display — Not an E-Commerce Platform
Sufi's Cafe operates this website strictly as a digital menu, culinary showcase, and informational resource for our physical cafe located in Kajipura, Kheda, Gujarat. We do not sell items online, process digital shopping carts, accept credit card checkouts, or execute commercial e-commerce transactions through this website.

### 2. Information We Handle
We respect the privacy of our patrons. We do not require visitors to register accounts. If you voluntarily send a WhatsApp reservation or direct inquiry, your contact information (such as your name and phone number) is used solely to respond to your inquiry and coordinate table seating at our physical premises.

### 3. No Commercial Sale or Rental of Data
Sufi's Cafe does not sell, lease, monetize, or disclose your contact details to third-party commercial marketing networks. All communication is strictly between our cafe hospitality team and you.

### 4. External Services & Links
Our website links to WhatsApp for direct customer communication and Google Maps for navigation assistance. Please refer to their respective terms and privacy policies when utilizing external platforms.

### 5. Questions & Contact
For any inquiries regarding our privacy standards or to request deletion of any contact details, please call us directly at our published contact numbers or visit Sufi's Cafe in person.`,

  termsOfUse: `### 1. Informational Display Only (No Online Sales)
This website is maintained solely for the presentation of our cafe brand, ambiance, and digital menu. No binding sales contracts, online ordering transactions, or e-commerce purchases are conducted via this website. All purchases occur exclusively in person at our physical cafe.

### 2. Daily Availability & Pricing Notice
All beverages, specialty coffees, brunch dishes, and bakery items displayed on our website are freshly prepared daily and are served subject to actual in-store availability. Prices, menu items, and ingredient selections may be updated from time to time without prior notice.

### 3. Seat Inquiries & Table Reservations
Submitting a booking request via our website or via WhatsApp serves as an inquiry only and does not constitute a guaranteed reservation until directly confirmed by our cafe manager based on live table availability.

### 4. Cafe Etiquette & Tranquil Environment
Sufi's Cafe is dedicated to maintaining a tranquil, respectful, and family-friendly atmosphere. We kindly request all guests visiting our premises in Kajipura to respect fellow patrons, staff members, and cafe property.

### 5. Proprietary Content & Trademarks
All branding, logos, photography, typography, and original descriptions on this website are the intellectual property of Sufi's Cafe and may not be reproduced without prior written permission.`,
};

const LEGAL_STORAGE_KEY = "sufis_legal_content_v1";

export async function fetchLiveLegalContent(): Promise<LegalContent> {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LEGAL_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_LEGAL_CONTENT, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_LEGAL_CONTENT;
}

export async function saveLiveLegalContent(content: LegalContent): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(content));
      window.dispatchEvent(new CustomEvent("sufis_legal_updated", { detail: content }));
    } catch {
      // ignore
    }
  }

  return { success: true };
}

export function useDynamicLegal() {
  const [legal, setLegal] = useState<LegalContent>(DEFAULT_LEGAL_CONTENT);

  useEffect(() => {
    fetchLiveLegalContent().then(setLegal);

    const onUpdate = (e: any) => {
      if (e.detail) {
        setLegal(e.detail);
      }
    };

    window.addEventListener("sufis_legal_updated", onUpdate);
    return () => window.removeEventListener("sufis_legal_updated", onUpdate);
  }, []);

  return legal;
}
