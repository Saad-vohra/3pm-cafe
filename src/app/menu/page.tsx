"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IntroRibbon } from "@/components/site/IntroRibbon";
import { MenuItemModal } from "@/components/site/MenuItemModal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MENU_GROUPS, type FullMenuItem } from "@/data/menu";
import { useDynamicMenu } from "@/lib/dynamic-store";
import { BRAND, money } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { STILL, getScroll, onLenisScroll, scrollToY, useLenis } from "@/lib/scroll";

export default function MenuPage() {
  const { t, lang, display } = useLang();
  const router = useRouter();
  const still = STILL();
  const { categories } = useDynamicMenu();
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [active, setActive] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<FullMenuItem | null>(null);
  const [cart, setCart] = useState<{ id: string; price: number }[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [navH, setNavH] = useState(72);
  const [intro, setIntro] = useState(!still);

  useLenis(!still);

  useEffect(() => {
    const measure = () => setNavH(navRef.current?.offsetHeight ?? 72);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const chromeHeight = () =>
    (navRef.current?.offsetHeight ?? 0) + (railRef.current?.offsetHeight ?? 0);

  useEffect(() => {
    if (active === "all") {
      return onLenisScroll(() => {
        const limit = chromeHeight() + 20;
        let current = "all";
        for (const cat of categories) {
          const h = document.getElementById(`h-${cat.id}`);
          if (h && h.getBoundingClientRect().top <= limit) {
            current = cat.id;
          }
        }
        // Only highlight if scrolled into sections, else keep active
        const chip = document.querySelector<HTMLElement>(`[data-chip="${current}"]`);
        const rail = railRef.current?.querySelector<HTMLElement>(".no-scrollbar");
        if (chip && rail && current !== "all") {
          const target = chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2;
          const max = rail.scrollWidth - rail.clientWidth;
          rail.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
        }
      });
    }
  }, [active]);

  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    const rail = railRef.current?.querySelector<HTMLElement>(".no-scrollbar");
    if (!chip || !rail) return;
    const target = chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2;
    const max = rail.scrollWidth - rail.clientWidth;
    rail.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
  }, [active]);

  const onCategorySelect = (id: string) => {
    setActive(id);
    if (railRef.current) {
      const railRect = railRef.current.getBoundingClientRect();
      const currentScroll = getScroll();
      const railDocTop = railRect.top + currentScroll - navH;
      if (currentScroll > railDocTop) {
        scrollToY(railDocTop);
      }
    }
  };

  // Only show available items to customers on the public menu
  const availableCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((it: any) => it.isAvailable !== false),
    }))
    .filter((cat) => cat.items.length > 0);

  // Main groups with their sub-categories, in the order defined in MENU_GROUPS.
  // Categories not in any group go into a trailing "More" group.
  const groupedIds = MENU_GROUPS.flatMap((g) => g.categoryIds);
  const extraCats = availableCategories.filter((c) => !groupedIds.includes(c.id));
  const groups = [
    ...MENU_GROUPS.map((g) => ({
      id: g.id,
      label: g.label,
      cats: g.categoryIds
        .map((id) => availableCategories.find((c) => c.id === id))
        .filter((c): c is (typeof availableCategories)[number] => !!c),
    })),
    ...(extraCats.length
      ? [{ id: "more", label: { en: "More", hi: "और" }, cats: extraCats }]
      : []),
  ].filter((g) => g.cats.length > 0);

  const currentGroup = groups.find((g) => g.id === activeGroup);
  const groupCategories = currentGroup ? currentGroup.cats : groups.flatMap((g) => g.cats);
  const displayedCategories =
    active === "all" ? groupCategories : groupCategories.filter((cat) => cat.id === active);

  const onGroupSelect = (id: string) => {
    setActiveGroup(id);
    setActive("all");
    onCategorySelect("all");
  };

  const total = cart.reduce((s, c) => s + c.price, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      {intro && <IntroRibbon onDone={() => setIntro(false)} color="#006241" />}

      <Navbar sticky showBack headerRef={navRef} />

      <motion.div
        className="container-x pb-6 pt-8 sm:pb-8 sm:pt-12"
        initial={still ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{BRAND.tagline[lang]}</p>
        <h1
          className={`${display} mt-2 leading-[0.95]`}
          style={{ fontSize: "clamp(40px,10vw,104px)" }}
        >
          {t.menuTitle}
        </h1>
      </motion.div>

      <div
        id="menu-rail"
        ref={railRef}
        className="sticky z-[40] border-y bg-paper/90 backdrop-blur"
        style={{ top: navH }}
      >
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3 [-webkit-overflow-scrolling:touch]">
          <button
            data-chip="all"
            onClick={() => onGroupSelect("all")}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
              activeGroup === "all"
                ? "border-ink bg-ink text-paper"
                : "border-[rgba(0,98,65,0.22)] text-ink hover:bg-[rgba(0,98,65,0.05)]"
            }`}
          >
            {t.all || "All"}
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              data-chip={g.id}
              onClick={() => onGroupSelect(g.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                activeGroup === g.id
                  ? "border-ink bg-ink text-paper"
                  : "border-[rgba(0,98,65,0.22)] text-ink hover:bg-[rgba(0,98,65,0.05)]"
              }`}
            >
              {g.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <main className="container-x pb-44 sm:pb-40">
        {displayedCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="pt-12 sm:pt-16">
            <motion.h2
              id={`h-${cat.id}`}
              className={display}
              style={{ fontSize: "clamp(26px,6.5vw,50px)" }}
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {cat.label[lang]}
            </motion.h2>
            {cat.subtitle && (
              <p className="mt-1 text-[14px] text-muted font-medium italic">
                {cat.subtitle[lang]}
              </p>
            )}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {cat.items.map((it, i) => (
                <motion.div
                  key={it.title.en}
                  className="flex"
                  initial={still ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: still ? 0 : Math.min(i, 4) * 0.04,
                  }}
                >
                  <MenuCard
                    item={it}
                    onViewDetails={() => setSelectedItem(it)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Representation & Availability Disclaimer at bottom of menu */}
        <div className="mt-14 sm:mt-18 border-t border-[rgba(0,98,65,0.15)] pt-6 pb-2 text-center space-y-1">
          <p className="text-[11px] sm:text-[12px] text-muted tracking-wide font-normal italic">
            * {lang === "en"
              ? "Freshly prepared daily on every visit · All dishes are served subject to daily availability."
              : "हर विज़िट पर ताज़ा तैयार · सभी व्यंजन दैनिक उपलब्धता के अनुसार परोसे जाते हैं।"}
          </p>
          <p className="text-[10px] sm:text-[11px] text-muted/80 tracking-wide font-normal italic">
            Images and descriptions are for representation only. Actual dish may vary.
          </p>
          {lang === "hi" && (
            <p className="mt-1 text-[11px] text-muted tracking-wide font-normal italic">
              * चित्र और विवरण केवल प्रस्तुति के लिए हैं। वास्तविक व्यंजन भिन्न हो सकता है।
            </p>
          )}
        </div>
      </main>

      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {cart.length > 0 && !still && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-5 sm:px-4"
        >
          <div className="flex w-full max-w-[560px] flex-wrap items-center justify-center gap-3 rounded-[28px] bg-[#1e3932] px-4 py-3 text-paper shadow-[0_24px_50px_-24px_rgba(0,98,65,.6)] sm:gap-4 sm:rounded-full sm:px-6">
            <span className="text-[13px] sm:text-[14px]">
              {cart.length} {cart.length === 1 ? t.itemsOne : t.itemsMany} · {money(total)}
            </span>
            <button onClick={() => setCart([])} className="text-[13px] text-paper/70 hover:text-paper underline">
              {t.clear}
            </button>
            <a href={BRAND.tel} className="btn-ink !border-paper !bg-paper !text-ink !px-4 !py-2 hover:!bg-[#d4e9e2]">
              {t.order}
            </a>
            <span className="w-full text-center text-[11px] text-paper/60">{t.draftNote}</span>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}

function MenuCard({
  item,
  onViewDetails,
}: {
  item: FullMenuItem;
  onViewDetails: () => void;
}) {
  const { t, lang } = useLang();
  const chips: string[] = [];
  if (item.allergens[lang].length) chips.push(item.allergens[lang].join(", "));
  return (
    <article
      onClick={onViewDetails}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_24px_50px_-40px_rgba(0,98,65,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,98,65,.25)] sm:rounded-[26px]"
    >
      {item.img && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={item.img}
            alt={`${item.title[lang]} — ${BRAND.name} menu item`}
            loading="lazy"
            decoding="async"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[17px] font-semibold sm:text-[18px] transition-colors group-hover:text-[#006241]">
          {item.title[lang]}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[#d4e9e2] px-2.5 py-1 text-[12px] font-medium text-[#006241]"
            >
              {c}
            </span>
          ))}

          {item.weight !== null && (
            <span className="rounded-full bg-[rgba(0,98,65,0.06)] px-2.5 py-1 text-[12px] text-muted">
              {item.weight} g
            </span>
          )}
        </div>
        <p className="mt-3 text-[13.5px] text-muted">{item.desc[lang]}</p>
        <p className="mt-2 text-[11px] text-muted/75 italic font-normal leading-snug">
          * {lang === "en"
            ? "Freshly prepared daily on every visit · Subject to daily availability"
            : "हर विज़िट पर ताज़ा तैयार · दैनिक उपलब्धता के अनुसार"}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-[17px] font-semibold text-ink">{money(item.price)}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="btn-ink !px-4 !py-2 text-[13px] font-medium whitespace-nowrap hover:scale-105 transition-transform"
          >
            {t.viewDetails}
          </button>
        </div>
      </div>
    </article>
  );
}

